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
}: LatelySectionProps) {
  const labelId = `lately-${title.toLowerCase()}`;

  return (
    <section aria-labelledby={labelId} className="lately-section">
      <h2 id={labelId} className="lately-section__label">
        {title}
      </h2>

      {children}

      {viewMore && (
        <p className="lately-section__more">
          <a
            href={viewMore.href}
            className="lately-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${viewMore.label} (opens in new tab)`}
          >
            {viewMore.label}
          </a>
        </p>
      )}
    </section>
  );
}
