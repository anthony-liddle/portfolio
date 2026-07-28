import type { Metadata } from 'next';
import WorkTile from '@/components/WorkTile';
import { caseStudies, caseStudyOrder } from '@/content/case-studies';

const DESCRIPTION =
  "Essays about the things Anthony Liddle has built. Every one of them started somewhere personal, because none of them started as a technical problem. From Mozilla's Pocket to side projects in audio, games, and civic tech.";

export const metadata: Metadata = {
  title: 'Writing',
  description: DESCRIPTION,
  openGraph: {
    title: 'Writing — Anthony Liddle',
    description: DESCRIPTION,
  },
};

/**
 * Resolved at module scope so a slug typo in `caseStudyOrder` fails the build
 * rather than silently dropping a case study from the index. A missing slug is
 * invisible to the type system, since `find` returning undefined is legal.
 */
const orderedCaseStudies = caseStudyOrder
  .map((slug) => caseStudies.find((study) => study.slug === slug))
  .filter((study) => study !== undefined);

if (orderedCaseStudies.length !== caseStudies.length) {
  throw new Error(
    `caseStudyOrder must list every case study exactly once (resolved ${orderedCaseStudies.length} of ${caseStudies.length}).`,
  );
}

export default function WritingPage() {
  return (
    <div className="page-container">
      <h1 className="work-index__heading">Writing</h1>
      <p className="work-index__intro">
        Essays about the things I&rsquo;ve built. Every one of them started
        somewhere personal, because none of them started as a technical problem.
      </p>

      <div className="work-grid" role="list">
        {orderedCaseStudies.map((study) => (
          <div key={study.slug} role="listitem">
            <WorkTile project={study} />
          </div>
        ))}
      </div>
    </div>
  );
}
