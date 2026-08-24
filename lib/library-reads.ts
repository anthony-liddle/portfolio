import { getReads, type ReadEntry } from 'library-reads';
import {
  assertSourceUsable,
  isSourceReadError,
  logSectionDegraded,
  logSectionOutcome,
  SectionSourceError,
} from '@/lib/lately-diagnostics';

const LIBBY_PATH = 'content/reading/libbytimeline-all-loans.csv';
const EXTRAS_PATH = 'content/reading/extras.yaml';
const CACHE_PATH = 'content/reading/library-reads-cache.json';

/**
 * Warnings that mean the source itself was unusable rather than merely
 * imperfect. `getReads` reports a missing file by throwing, but reports a
 * malformed one by warning, so both routes have to be covered. Everything not
 * listed here (a fuzzy title match, an Open Library miss, an entry with no
 * enrichment path) describes one imperfect row and leaves the section valid.
 */
const BROKEN_SOURCE_WARNINGS = [
  /^No input provided:/,
  /^Header missing:/,
  /must be a list/,
  /unknown extension/,
  /none of `path`/,
] as const;

/**
 * Every request the package makes (Open Library ISBN, work, and title-author
 * lookups) runs once per build and never at runtime.
 *
 * Deliberately no `next.revalidate`: the lowest revalidate across any fetch in
 * a route sets that route's revalidation frequency, so a value here would drag
 * /lately back into ISR regardless of its `export const revalidate = false`.
 * That matters more here than elsewhere, because this path also reads content/
 * from disk, which does not exist inside the serverless function.
 *
 * No AbortSignal is forwarded: a fetch carrying a signal is never cached by
 * Next, which would silently flip the route to dynamic.
 */
const buildTimeFetch: typeof fetch = (input, init) =>
  fetch(input, { ...init, cache: 'force-cache' });

/**
 * Most recent reads, newest first.
 *
 * Throws when the source could not be read or parsed, and returns [] for every
 * other failure. That split is the point: a count of zero is a legitimate
 * result the day the CSV holds no eligible rows, so the only honest way to tell
 * "broken" from "nothing to show" is whether the source itself was usable, not
 * how many entries came back.
 *
 * Because /lately is prerendered and never revalidates, a throw here fails the
 * build and leaves the previous good deployment serving, which is the intended
 * outcome. An unreachable Open Library still degrades quietly to [] with the
 * cached covers it already has, since that is a missing nicety rather than a
 * missing source.
 *
 * Warnings are logged either way: they are how a fuzzy match or an Open Library
 * miss announces itself, and the build console is the only place they surface.
 * `limit` is passed through so the package's sort and cap apply first.
 */
export async function getRecentReads(limit = 3): Promise<ReadEntry[]> {
  try {
    const result = await getReads({
      libby: { path: LIBBY_PATH },
      extras: { path: EXTRAS_PATH },
      cache: { path: CACHE_PATH },
      userAgent: 'anthonyliddle.dev (anthony@anthonyliddle.dev)',
      limit,
      fetchImpl: buildTimeFetch,
    });
    for (const warning of result.warnings) {
      console.warn('library-reads:', warning);
    }
    assertSourceUsable('Reading', result.warnings, BROKEN_SOURCE_WARNINGS);
    logSectionOutcome('Reading', result.entries.length);
    return result.entries;
  } catch (error) {
    // Raised by assertSourceUsable just above; already the right shape.
    if (error instanceof SectionSourceError) throw error;

    // A throw carrying one of the input paths is a missing or unreadable
    // source. A throw carrying the cache path is not: the entries were fully
    // assembled by then, and a cache that failed to persist should never cost
    // a deploy.
    if (isSourceReadError(error, [LIBBY_PATH, EXTRAS_PATH])) {
      throw new SectionSourceError('Reading', String(error), { cause: error });
    }

    logSectionDegraded('Reading', error);
    return [];
  }
}
