import Image from 'next/image';
import LatelySection from './LatelySection';
import { getRecentlyWatched, LETTERBOXD_PROFILE_URL } from '@/lib/letterboxd';
import { getDirectorsForFilm } from '@/lib/tmdb';

const NOTE_MAX_LENGTH = 200;

/** Trim a review to a short note on a word boundary, with an ellipsis. */
function toNote(review: string): string {
  if (review.length <= NOTE_MAX_LENGTH) return review;
  const slice = review.slice(0, NOTE_MAX_LENGTH);
  const lastSpace = slice.lastIndexOf(' ');
  return `${slice.slice(0, lastSpace > 0 ? lastSpace : NOTE_MAX_LENGTH).trimEnd()}…`;
}

/**
 * Join director names the way a credit reads: a single name as is, otherwise the
 * leading names comma separated with an ampersand before the last (so two names
 * give "A & B" and three give "A, B & C").
 */
function formatDirectors(directors: string[]): string {
  if (directors.length === 1) return directors[0];
  const head = directors.slice(0, -1).join(', ');
  const last = directors[directors.length - 1];
  return `${head} & ${last}`;
}

export default async function WatchingSection() {
  const entries = await getRecentlyWatched(3);

  // Enrich each film with its director(s) from TMDB, in parallel. The lookup is
  // keyed on title and year, so films with an unknown year (or no TMDB match)
  // carry null directors and fall back to a year-only meta line.
  const films = await Promise.all(
    entries.map(async (entry) => {
      const lookup =
        entry.year !== null
          ? await getDirectorsForFilm(entry.film, entry.year)
          : null;
      return { entry, directors: lookup?.directors ?? null };
    }),
  );

  return (
    <LatelySection
      title="Watching"
      viewMore={
        entries.length > 0
          ? { href: LETTERBOXD_PROFILE_URL, label: 'View more on Letterboxd' }
          : undefined
      }
      footnote={
        // TMDB's terms of use require attribution wherever their data is shown,
        // so it lives in this section rather than orphaned in the page footer.
        entries.length > 0 ? (
          <>
            Film data from{' '}
            <a
              href="https://www.themoviedb.org/"
              className="lately-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Movie Database
            </a>
          </>
        ) : undefined
      }
    >
      {entries.length === 0 ? (
        <p className="lately-empty">Nothing logged just now.</p>
      ) : (
        <ul role="list" className="lately-entries">
          {films.map(({ entry, directors }) => {
            // Director(s) lead the meta line when known, then the year, mirroring
            // the book "author · year" pattern. A null lookup leaves just the
            // year with no empty separator.
            const meta: string[] = [];
            if (directors) meta.push(formatDirectors(directors));
            if (entry.year !== null) meta.push(String(entry.year));

            return (
              <li key={entry.link} className="lately-entry">
                {entry.posterUrl && (
                  <Image
                    src={entry.posterUrl}
                    alt=""
                    width={56}
                    height={84}
                    className="lately-entry__cover"
                  />
                )}

                <div className="lately-entry__body">
                  <a
                    href={entry.link}
                    className="lately-entry__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${entry.film} on Letterboxd (opens in new tab)`}
                  >
                    <span className="lately-entry__title">{entry.film}</span>
                  </a>

                  {meta.length > 0 && (
                    <p className="lately-entry__meta">{meta.join(' · ')}</p>
                  )}

                  {entry.review && (
                    <p className="lately-entry__note">{toNote(entry.review)}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </LatelySection>
  );
}
