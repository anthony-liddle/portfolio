import Link from 'next/link';
import StatusTag from './StatusTag';
import type { CaseStudy } from '@/content/case-studies';

interface WorkTileProps {
  project: CaseStudy;
}

export default function WorkTile({ project }: WorkTileProps) {
  const displayName = project.tileName ?? project.name;

  return (
    <Link
      href={`/writing/${project.slug}`}
      className="work-tile"
      aria-label={displayName}
    >
      <article>
        <header className="work-tile__header">
          <h3 className="work-tile__title">{displayName}</h3>
          <StatusTag status={project.status} />
        </header>

        <p className="work-tile__pitch">{project.pitch}</p>

        <footer className="work-tile__footer" aria-label="Technologies">
          <ul role="list" className="work-tile__tags">
            {project.tags.map((tag) => (
              <li key={tag} className="work-tile__tag">
                {tag}
              </li>
            ))}
          </ul>
        </footer>
      </article>
    </Link>
  );
}
