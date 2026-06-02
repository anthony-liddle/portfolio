import { getReads, type ReadEntry } from 'library-reads';

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

/**
 * Route every request the package makes (Open Library ISBN, work, and
 * title-author lookups) through Next's data cache. This is what makes the page
 * statically generated at build time and refreshed on a daily cadence (ISR).
 * Cold-cache fetches are cached by Next for a day; warm hits served from the
 * committed cache JSON never reach the network at all. No AbortSignal is
 * forwarded: a fetch carrying a signal is never cached by Next, which would
 * silently flip the route to dynamic.
 */
const revalidatingFetch: typeof fetch = (input, init) =>
  fetch(input, {
    ...init,
    next: { revalidate: ONE_DAY_IN_SECONDS, tags: ['library-reads'] },
  });

/**
 * Most recent reads, newest first. Degrades to an empty array on any failure so
 * a broken input file or an unreachable Open Library never fails the build; the
 * broken case is logged rather than swallowed silently. The package also returns
 * `warnings` and `lastEntryDate`, but the page renders neither, so only
 * `entries` is read here. `limit` is passed through to `getReads` so the
 * package's sort and cap apply before the result is returned.
 */
export async function getRecentReads(limit = 3): Promise<ReadEntry[]> {
  try {
    const result = await getReads({
      libby: { path: 'content/reading/libbytimeline-all-loans.csv' },
      extras: { path: 'content/reading/extras.yaml' },
      cache: { path: 'content/reading/library-reads-cache.json' },
      userAgent: 'anthonyliddle.dev (anthony@anthonyliddle.dev)',
      limit,
      fetchImpl: revalidatingFetch,
    });
    return result.entries;
  } catch (error) {
    console.error('Failed to load library-reads:', error);
    return [];
  }
}
