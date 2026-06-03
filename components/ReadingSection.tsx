import Image from 'next/image';
import LatelySection from './LatelySection';
import { getRecentReads } from '@/lib/library-reads';

/**
 * Reading section of the Lately page. Mirrors WatchingSection: an async server
 * component that fetches its own data and renders into the shared LatelySection
 * shell. There is no "view more" link because the package is the whole story;
 * there is no external service to deep-link to. The empty state covers both
 * "nothing logged" and "fetch failed", since getRecentReads degrades to [] on
 * any error. The per-entry markup is duplicated from WatchingSection rather than
 * extracted into a shared component, matching that file's deliberate choice:
 * one renderer per section, sharing the lately-* CSS classes instead.
 */
export default async function ReadingSection() {
  const entries = await getRecentReads(3);

  return (
    <LatelySection
      title="Reading"
      footnote={
        // A nudge toward libraries, shown only when there is something to credit
        // them for. There is no source to deep-link to, so no view-more link.
        entries.length > 0
          ? 'Most of these came from my local library. Support yours.'
          : undefined
      }
    >
      {entries.length === 0 ? (
        <p className="lately-empty">Nothing logged just now.</p>
      ) : (
        <ul role="list" className="lately-entries">
          {entries.map((entry) => {
            // Author always shows (it plays the role year/rating does for
            // films); publish year follows when known; source shows only when
            // it is interesting, i.e. not the default 'library' that Libby
            // borrows carry.
            const meta: string[] = [];
            if (entry.author) meta.push(entry.author);
            if (entry.publishYear) meta.push(String(entry.publishYear));
            if (entry.source && entry.source !== 'library') {
              meta.push(entry.source);
            }

            // ISBN is the stable identity when present; otherwise fall back to
            // title plus the package's computed sortDate.
            const key = entry.isbn ?? `${entry.title}-${entry.sortDate}`;

            return (
              <li key={key} className="lately-entry">
                {entry.coverUrl && (
                  <Image
                    src={entry.coverUrl}
                    alt=""
                    width={56}
                    height={84}
                    className="lately-entry__cover"
                  />
                )}

                <div className="lately-entry__body">
                  <span className="lately-entry__title">{entry.title}</span>

                  {meta.length > 0 && (
                    <p className="lately-entry__meta">{meta.join(' · ')}</p>
                  )}

                  {entry.notes && (
                    <p className="lately-entry__note">{entry.notes}</p>
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
