import { getDiary, type DiaryEntry } from 'letterboxd-rss';
import {
  logSectionDegraded,
  logSectionOutcome,
} from '@/lib/lately-diagnostics';

const LETTERBOXD_USERNAME = 'sparklebeard';

/** Public profile, used for the "View more on Letterboxd" link. */
export const LETTERBOXD_PROFILE_URL = `https://letterboxd.com/${LETTERBOXD_USERNAME}/`;

/**
 * The diary feed is fetched once per build and never revalidated at runtime.
 *
 * Deliberately no `next.revalidate`: the lowest revalidate across any fetch in
 * a route sets that route's revalidation frequency, so a value here would drag
 * /lately back into ISR regardless of its `export const revalidate = false`.
 * Freshness comes from the daily redeploy instead.
 *
 * No AbortSignal is forwarded either: a fetch carrying a signal is never cached
 * by Next, which would silently flip the route to dynamic.
 */
const buildTimeFetch: typeof fetch = (input, init) =>
  fetch(input, { ...init, cache: 'force-cache' });

/**
 * Most recent diary entries, newest first. Degrades to an empty array on any
 * failure so a broken or unreachable feed never fails the build; the broken
 * case is logged rather than swallowed silently. A valid but empty feed also
 * returns [], so callers handle "nothing to show" and "fetch failed" the same
 * quiet way.
 *
 * Unlike the reading and listening wrappers, there are no warnings to log here:
 * getDiary returns a bare array and signals trouble by throwing, so the catch
 * below is the whole error surface. A feed either parses or it does not; there
 * is no soft-failure middle ground to report.
 *
 * This wrapper keeps the quiet [] on failure that the other two gave up. Its
 * source is someone else's server rather than a file in this repo, and an
 * outage at Letterboxd should not be able to block a deploy.
 */
export async function getRecentlyWatched(limit = 3): Promise<DiaryEntry[]> {
  try {
    const entries = await getDiary(LETTERBOXD_USERNAME, {
      fetch: buildTimeFetch,
    });
    const recent = entries.slice(0, limit);
    logSectionOutcome('Watching', recent.length);
    return recent;
  } catch (error) {
    logSectionDegraded('Watching', error);
    return [];
  }
}
