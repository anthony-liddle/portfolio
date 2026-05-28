import { getDiary, type DiaryEntry } from 'letterboxd-rss';

const LETTERBOXD_USERNAME = 'sparklebeard';

/** Public profile, used for the "View more on Letterboxd" link. */
export const LETTERBOXD_PROFILE_URL = `https://letterboxd.com/${LETTERBOXD_USERNAME}/`;

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

/**
 * Route the package's internal request through Next's data cache. This is what
 * makes the page statically generated at build time and refreshed on a daily
 * cadence (ISR). No AbortSignal is forwarded: a fetch carrying a signal is
 * never cached by Next, which would silently flip the route to dynamic.
 */
const revalidatingFetch: typeof fetch = (input, init) =>
  fetch(input, {
    ...init,
    next: { revalidate: ONE_DAY_IN_SECONDS, tags: ['letterboxd-diary'] },
  });

/**
 * Most recent diary entries, newest first. Degrades to an empty array on any
 * failure so a broken or unreachable feed never fails the build; the broken
 * case is logged rather than swallowed silently. A valid but empty feed also
 * returns [], so callers handle "nothing to show" and "fetch failed" the same
 * quiet way.
 */
export async function getRecentlyWatched(limit = 3): Promise<DiaryEntry[]> {
  try {
    const entries = await getDiary(LETTERBOXD_USERNAME, {
      fetch: revalidatingFetch,
    });
    return entries.slice(0, limit);
  } catch (error) {
    console.error('Failed to load Letterboxd diary:', error);
    return [];
  }
}
