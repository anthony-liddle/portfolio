interface ViewMoreLink {
  href: string;
  label: string;
}

interface LatelySectionProps {
  /** Section name, e.g. "Watching". Doubles as the accessible label. */
  title: string;
  children: React.ReactNode;
  /** Optional trailing link out to the source, e.g. a Letterboxd profile. */
  viewMore?: ViewMoreLink;
  /**
   * Optional muted footnote shown on the same trailing row as the view-more
   * link (separated by a bullet), e.g. a data-source attribution. Lives here so
   * it sits inside the section that actually uses the data, not at page level.
   */
  footnote?: React.ReactNode;
}

/**
 * Presentational shell shared by every section on the Lately page. It owns the
 * label heading and the optional "view more" footer link; each section (e.g.
 * Watching) supplies its own content. Reading and Listening reuse this as-is.
 */
export default function LatelySection({
  title,
  children,
  viewMore,
  footnote,
}: LatelySectionProps) {
  const labelId = `lately-${title.toLowerCase()}`;

  return (
    <section aria-labelledby={labelId} className="lately-section">
      <h2 id={labelId} className="lately-section__label">
        {title}
      </h2>

      {children}

      {(viewMore || footnote) && (
        <p className="lately-section__more">
          {viewMore && (
            <a
              href={viewMore.href}
              className="lately-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${viewMore.label} (opens in new tab)`}
            >
              {viewMore.label}
            </a>
          )}
          {viewMore && footnote && ' · '}
          {footnote}
        </p>
      )}
    </section>
  );
}
