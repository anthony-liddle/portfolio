import { Fragment } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  projectSections,
  type ProjectEntry,
  type ProjectLink,
} from '@/content/projects';
import { siteTitle } from '@/lib/site';

const DESCRIPTION =
  'An index of everything Anthony Liddle has built that is finished and live: word games, browser audio, civic tools, and npm packages.';

export const metadata: Metadata = {
  title: 'Projects',
  description: DESCRIPTION,
  openGraph: {
    title: siteTitle('Projects'),
    description: DESCRIPTION,
  },
};

/**
 * Every entry carries a "GitHub" link, so the visible text alone leaves screen
 * reader users with a dozen identical links (WCAG 2.4.4). Qualifying each one
 * with the entry name keeps them distinguishable in a links list.
 */
function linkLabel(entry: ProjectEntry, link: ProjectLink, external: boolean) {
  const base = link.primary ? link.label : `${link.label}: ${entry.name}`;
  return external ? `${base} (opens in new tab)` : base;
}

function EntryLink({
  entry,
  link,
}: {
  entry: ProjectEntry;
  link: ProjectLink;
}) {
  const className = link.primary
    ? 'lately-link made-link--primary'
    : 'lately-link';
  const external = !link.href.startsWith('/');

  if (!external) {
    return (
      <Link
        href={link.href}
        className={className}
        aria-label={linkLabel(entry, link, false)}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <a
      href={link.href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={linkLabel(entry, link, true)}
    >
      {link.label}
    </a>
  );
}

export default function ProjectsPage() {
  return (
    <div className="page-container">
      <h1 className="lately-heading">Projects</h1>
      <p className="lately-intro">
        Everything here is finished and running. Open it, install it, or fork
        it.
      </p>

      <div className="lately-sections">
        {projectSections.map((section) => {
          const labelId = `projects-${section.title.replace(/\s+/g, '-').toLowerCase()}`;

          return (
            <section key={section.title} aria-labelledby={labelId}>
              <h2 id={labelId} className="lately-section__label">
                {section.title}
              </h2>

              <ul className="lately-entries">
                {section.entries.map((entry, entryIndex) => (
                  <li key={entry.name}>
                    {entry.image && (
                      <Image
                        src={entry.image.src}
                        alt={entry.image.alt}
                        width={1200}
                        height={630}
                        sizes="(max-width: 700px) calc(100vw - 4rem), 636px"
                        className="made-entry__image"
                        // Only the first image is above the fold; the rest
                        // stay on next/image's default lazy loading.
                        priority={entryIndex === 0}
                      />
                    )}
                    <h3 className="lately-entry__title made-entry__name">
                      {entry.name}
                    </h3>
                    <p className="lately-entry__note">{entry.description}</p>
                    <p className="made-entry__links">
                      {entry.links.map((link, index) => (
                        <Fragment key={link.href}>
                          {index > 0 && ' · '}
                          <EntryLink entry={entry} link={link} />
                        </Fragment>
                      ))}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
