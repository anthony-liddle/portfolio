import type { Metadata } from 'next';
import WorkTile from '@/components/WorkTile';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Work',
  description:
    "A selection of things I've built, both at work and on my own time.",
  openGraph: {
    title: 'Work — Anthony Liddle',
    description:
      "A selection of things I've built, both at work and on my own time.",
  },
};

export default function WorkPage() {
  return (
    <div className="page-container">
      <h1 className="work-index__heading">Work</h1>
      <p className="work-index__intro">
        A selection of things I&rsquo;ve built, both at work and on my own time.
      </p>

      <section aria-labelledby="featured-label">
        <h2 id="featured-label" className="work-index__section-label">
          Featured
        </h2>
        <div className="work-grid" role="list">
          {projects.slice(0, 5).map((project) => (
            <div key={project.slug} role="listitem">
              <WorkTile project={project} />
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="more-label" style={{ marginTop: '4rem' }}>
        <h2 id="more-label" className="work-index__section-label">
          More projects
        </h2>
        <div className="work-grid" role="list">
          {projects.slice(5).map((project) => (
            <div key={project.slug} role="listitem">
              <WorkTile project={project} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
