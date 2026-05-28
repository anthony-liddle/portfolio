import LatelySection from './LatelySection';
import { getRecentlyWatched, LETTERBOXD_PROFILE_URL } from '@/lib/letterboxd';

const NOTE_MAX_LENGTH = 200;

/** Trim a review to a short note on a word boundary, with an ellipsis. */
function toNote(review: string): string {
  if (review.length <= NOTE_MAX_LENGTH) return review;
  const slice = review.slice(0, NOTE_MAX_LENGTH);
  const lastSpace = slice.lastIndexOf(' ');
  return `${slice.slice(0, lastSpace > 0 ? lastSpace : NOTE_MAX_LENGTH).trimEnd()}…`;
}

export default async function WatchingSection() {
  const entries = await getRecentlyWatched(3);

  return (
    <LatelySection
      title="Watching"
      viewMore={
        entries.length > 0
          ? { href: LETTERBOXD_PROFILE_URL, label: 'View more on Letterboxd' }
          : undefined
      }
    >
      {entries.length === 0 ? (
        <p className="lately-empty">Nothing logged just now.</p>
      ) : (
        <ul role="list" className="lately-entries">
          {entries.map((entry) => {
            const meta = [
              entry.year !== null ? String(entry.year) : null,
              entry.rating !== null ? `${entry.rating}/5` : null,
            ].filter(Boolean);

            return (
              <li key={entry.link} className="lately-entry">
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
              </li>
            );
          })}
        </ul>
      )}
    </LatelySection>
  );
}
