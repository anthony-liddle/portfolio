const TMDB_API_BASE = 'https://api.themoviedb.org/3';
const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

/** The director(s) of a film, plus the TMDB id of the matched movie. */
export interface DirectorLookup {
  directors: string[];
  tmdbId: number;
}

/** Only the fields read off a `/search/movie` result; the rest are ignored. */
interface TmdbSearchResult {
  id: number;
  release_date?: string;
}

interface TmdbSearchResponse {
  results?: TmdbSearchResult[];
}

interface TmdbCrewMember {
  job?: string;
  name?: string;
}

interface TmdbCreditsResponse {
  crew?: TmdbCrewMember[];
}

/**
 * Look up the director(s) of a film on TMDB by title and release year.
 *
 * The lookup is deliberately self-contained (title plus year, not a TMDB id):
 * it searches `/search/movie`, takes the top result, and verifies that result's
 * release year matches the year passed in before trusting it. The year check is
 * the primary defense against common-title mismatches (a search for "Heat"
 * returns many films, sorted by relevance rather than year), so a mismatch
 * returns null rather than risk showing the wrong film's director.
 *
 * Degrades to null on every failure path (missing token, network error, no
 * search results, missing or mismatched release date, no credited "Director"),
 * which lets the caller fall back to a year-only display. The v4 read access
 * token is read from `TMDB_READ_ACCESS_TOKEN` and sent as a Bearer header; it is
 * never placed in a URL or an error message, so it cannot leak through logs.
 *
 * Both requests opt into Next's data cache with a 24 hour revalidate, so TMDB is
 * hit at most once per film per day and warm builds reuse the cached result.
 */
export async function getDirectorsForFilm(
  title: string,
  year: number,
): Promise<DirectorLookup | null> {
  const token = process.env.TMDB_READ_ACCESS_TOKEN;
  if (!token) return null;

  const headers = {
    Authorization: `Bearer ${token}`,
    accept: 'application/json',
  };

  try {
    const searchUrl = new URL(`${TMDB_API_BASE}/search/movie`);
    searchUrl.searchParams.set('query', title);
    searchUrl.searchParams.set('year', String(year));

    const searchResponse = await fetch(searchUrl, {
      headers,
      next: { revalidate: ONE_DAY_IN_SECONDS },
    });
    if (!searchResponse.ok) return null;

    const search = (await searchResponse.json()) as TmdbSearchResponse;
    const top = search.results?.[0];
    if (!top) return null;

    // Guard against a missing release_date before parsing, then require the
    // matched film's release year to be within one year of the diary year. The
    // slack absorbs festival-premiere vs wide-release and international release
    // date variance, while still rejecting wrong-film matches: same-title
    // remakes are typically separated by decades, not a single year.
    if (!top.release_date) return null;
    if (Math.abs(Number(top.release_date.slice(0, 4)) - year) > 1) return null;

    const creditsResponse = await fetch(
      `${TMDB_API_BASE}/movie/${top.id}/credits`,
      { headers, next: { revalidate: ONE_DAY_IN_SECONDS } },
    );
    if (!creditsResponse.ok) return null;

    const credits = (await creditsResponse.json()) as TmdbCreditsResponse;

    // Filter strictly on the exact "Director" job in crew order, so co-directors
    // are kept (multiple entries) while "Co-Director", "Series Director", and the
    // like fall through to a year-only display rather than being misidentified.
    const directors = (credits.crew ?? [])
      .filter((member) => member.job === 'Director')
      .map((member) => member.name)
      .filter((name): name is string => Boolean(name));

    if (directors.length === 0) return null;

    return { directors, tmdbId: top.id };
  } catch (error) {
    // Never include the token in a surfaced message; the error object holds the
    // failed request but not the Authorization header, so this is safe to log.
    console.error('TMDB director lookup failed:', error);
    return null;
  }
}
