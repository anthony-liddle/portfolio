import { getListeningLog, type ListeningEntry } from 'listening-log';
import {
  assertSourceUsable,
  logSectionDegraded,
  logSectionOutcome,
  SectionSourceError,
} from '@/lib/lately-diagnostics';

const LISTENING_PATH = 'content/listening/listening.yaml';
const CACHE_PATH = 'content/listening/listening-log-cache.json';

/**
 * Warnings that mean the source itself was unusable rather than merely
 * imperfect.
 *
 * This list carries more weight here than in the reading wrapper.
 * `getListeningLog` never throws for source reasons: an unreadable or
 * unparseable yaml comes back as `{ entries: [], warnings }`, so the caller's
 * `catch` is never entered and the section would otherwise go quietly empty.
 * Inspecting warnings is the only way to see it.
 *
 * A yaml file that parses to null is deliberately absent: an emptied log is
 * legitimately empty, not broken.
 */
const BROKEN_SOURCE_WARNINGS = [
  /^Could not read the listening log:/,
  /has an unrecognized extension/,
  /^Invalid (YAML|JSON):/,
  /^The listening log must be a list of rows/,
] as const;

/**
 * Read a required environment variable.
 *
 * Replaces a non-null assertion, which is a compile-time claim with no runtime
 * check: an unset variable used to reach the signing code as `undefined` and
 * surface as "Cannot read properties of undefined (reading 'includes')", which
 * says nothing about which credential is missing. Throwing here fails the build
 * with the variable's name instead, and since /lately is prerendered that
 * leaves the previous good deployment serving.
 */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined || value === '') {
    throw new Error(
      `${name} is not set; the Listening section needs it to sign an Apple Music developer token`,
    );
  }
  return value;
}

/**
 * Every request the package makes (Apple Music catalog lookups and searches,
 * Discogs release lookups and searches) runs once per build and never at
 * runtime.
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
 * Most recent albums, newest first.
 *
 * Throws when the source could not be read or parsed, or when an Apple Music
 * credential is missing, and returns [] for every other failure. A count of
 * zero is a legitimate result the day the log holds no rows, so the source's
 * usability is the discriminator rather than the entry count.
 *
 * Because /lately is prerendered and never revalidates, a throw fails the build
 * and leaves the previous good deployment serving. A catalog having a bad
 * afternoon still costs only a cover image: those come back as warnings and
 * leave the section valid.
 *
 * `limit` is passed through so the package's sort and cap apply first.
 */
export async function getRecentListening(limit = 3): Promise<ListeningEntry[]> {
  // Resolved before the try on purpose. Inside it, a missing credential would
  // be caught by the same handler that absorbs catalog hiccups and would render
  // the section empty rather than saying which variable is unset.
  const appleMusic = {
    keyId: requireEnv('APPLE_MUSIC_KEY_ID'),
    teamId: requireEnv('APPLE_MUSIC_TEAM_ID'),
    privateKeyBase64: requireEnv('APPLE_MUSIC_PRIVATE_KEY_BASE64'),
  };
  const discogsToken = process.env.DISCOGS_USER_TOKEN;

  try {
    const result = await getListeningLog({
      listeningYaml: { path: LISTENING_PATH },
      appleMusic,
      // Genuinely optional in the package: without it the Discogs steps of the
      // enrichment cascade are skipped rather than failing, so it is passed
      // only when set instead of being asserted into existence.
      ...(discogsToken ? { discogs: { userToken: discogsToken } } : {}),
      cache: { path: CACHE_PATH },
      userAgent: 'anthonyliddle.dev (anthony@anthonyliddle.dev)',
      limit,
      fetchImpl: buildTimeFetch,
    });
    for (const warning of result.warnings) {
      console.warn('listening-log:', warning);
    }
    assertSourceUsable('Listening', result.warnings, BROKEN_SOURCE_WARNINGS);
    logSectionOutcome('Listening', result.entries.length);
    return result.entries;
  } catch (error) {
    // Raised by assertSourceUsable just above. Re-thrown rather than absorbed,
    // or the catch would undo the one check that makes a broken source visible.
    if (error instanceof SectionSourceError) throw error;

    logSectionDegraded('Listening', error);
    return [];
  }
}
