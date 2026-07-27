import Image from 'next/image';
import LatelySection from './LatelySection';
import { getRecentListening } from '@/lib/listening-log';

/**
 * Listening section of the Lately page. Mirrors ReadingSection: an async server
 * component that fetches its own data and renders into the shared LatelySection
 * shell. There is no "view more" link because the log is a hand-edited file,
 * not a profile on a service to deep-link to. The empty state covers both
 * "nothing logged" and "fetch failed", since getRecentListening degrades to []
 * on any error. The per-entry markup is duplicated from ReadingSection rather
 * than extracted into a shared component, matching that file's deliberate
 * choice: one renderer per section, sharing the lately-* CSS classes instead.
 *
 * playCount is deliberately not rendered. It is in the data if the design
 * evolves, but leaving it out keeps the section to "what I have been into"
 * rather than "how many times I played it".
 */
export default async function ListeningSection() {
  const entries = await getRecentListening(3);

  return (
    <LatelySection
      title="Listening"
      footnote={
        // Credit for the enrichment cascade, shown only when there is something
        // it actually enriched. No source to deep-link to, so no view-more link.
        entries.length > 0
          ? 'Album data from Apple Music and Discogs.'
          : undefined
      }
    >
      {entries.length === 0 ? (
        <p className="lately-empty">Nothing logged just now.</p>
      ) : (
        <ul role="list" className="lately-entries">
          {entries.map((entry) => {
            // Artist and format are both required on every entry, so they
            // always show; source is free-form and only present when the row
            // said where the record came from.
            const meta: string[] = [entry.artist, entry.format];
            if (entry.source) meta.push(entry.source);

            // The catalog ID is the stable identity when the album matched;
            // otherwise fall back to title plus the aggregated play date.
            const key =
              entry.appleMusicAlbumId ?? `${entry.title}-${entry.playedAt}`;

            return (
              <li key={key} className="lately-entry">
                {entry.artwork && (
                  <Image
                    src={entry.artwork.url}
                    alt=""
                    width={84}
                    height={84}
                    className="lately-entry__cover lately-entry__cover--square"
                  />
                )}

                <div className="lately-entry__body">
                  {entry.appleMusicUrl ? (
                    <a
                      href={entry.appleMusicUrl}
                      className="lately-entry__link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${entry.title} on Apple Music (opens in new tab)`}
                    >
                      <span className="lately-entry__title">{entry.title}</span>
                    </a>
                  ) : (
                    <span className="lately-entry__title">{entry.title}</span>
                  )}

                  <p className="lately-entry__meta">{meta.join(' · ')}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </LatelySection>
  );
}
