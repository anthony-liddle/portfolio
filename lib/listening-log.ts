import { getListeningLog, type ListeningEntry } from 'listening-log';

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

/**
 * Route every request the package makes (Apple Music catalog lookups and
 * searches, Discogs release lookups and searches) through Next's data cache.
 * This is what makes the page statically generated at build time and refreshed
 * on a daily cadence (ISR). Cold-cache fetches are cached by Next for a day;
 * warm hits served from the committed cache JSON never reach the network at
 * all. No AbortSignal is forwarded: a fetch carrying a signal is never cached
 * by Next, which would silently flip the route to dynamic.
 */
const revalidatingFetch: typeof fetch = (input, init) =>
  fetch(input, {
    ...init,
    next: { revalidate: ONE_DAY_IN_SECONDS, tags: ['listening-log'] },
  });

/**
 * Most recent albums, newest first. Degrades to an empty array on any failure
 * so a broken yaml file, missing credentials, or an unreachable Apple Music
 * never fails the build; the broken case is logged rather than swallowed
 * silently. The page renders neither `warnings` nor `lastEntryDate`, but
 * warnings are logged: they are how a catalog miss announces itself, and the
 * build console is the only place they can surface. They never fail the build,
 * matching the package's own stance that a catalog having a bad afternoon
 * should cost a cover image rather than a deploy. `limit` is passed through to
 * `getListeningLog` so the package's sort and cap apply before the result is
 * returned.
 *
 * Note this only ever prints during a local build. Once the cache is committed
 * and complete, a deploy makes no network calls, so there is nothing to warn
 * about.
 */
export async function getRecentListening(limit = 3): Promise<ListeningEntry[]> {
  try {
    const result = await getListeningLog({
      listeningYaml: { path: 'content/listening/listening.yaml' },
      appleMusic: {
        keyId: process.env.APPLE_MUSIC_KEY_ID!,
        teamId: process.env.APPLE_MUSIC_TEAM_ID!,
        privateKeyBase64: process.env.APPLE_MUSIC_PRIVATE_KEY_BASE64!,
      },
      discogs: { userToken: process.env.DISCOGS_USER_TOKEN! },
      cache: { path: 'content/listening/listening-log-cache.json' },
      userAgent: 'anthonyliddle.dev (anthony@anthonyliddle.dev)',
      limit,
      fetchImpl: revalidatingFetch,
    });
    for (const warning of result.warnings) {
      console.warn('listening-log:', warning);
    }
    return result.entries;
  } catch (error) {
    console.error('Failed to load listening-log:', error);
    return [];
  }
}
