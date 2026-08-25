import type { Metadata } from 'next';
import Link from 'next/link';
import { caseStudies, caseStudyOrder } from '@/content/case-studies';
import { readingTimeLabel } from '@/lib/reading-time';
import { pageMetadata } from '@/lib/site';

/**
 * Reading times are read off disk from the MDX sources, which exist on the
 * builder but not inside a serverless function. Pinning the route static keeps
 * that read at build time, where it belongs, and stops a future change from
 * quietly reintroducing the /lately failure mode. This is a hard constraint
 * rather than a hint: under `force-static`, `cookies()`, `headers()`, and
 * `searchParams` return empty instead of throwing, so anything added here that
 * needs request data has to move to its own route.
 */
export const dynamic = 'force-static';

const DESCRIPTION =
  "Essays about the things Anthony Liddle has built. Every one of them started somewhere personal, because none of them started as a technical problem. From Mozilla's Pocket to side projects in audio, games, and civic tech.";

export const metadata: Metadata = pageMetadata({
  title: 'Writing',
  description: DESCRIPTION,
  path: '/writing',
});

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

      {/* Explicit role because `list-style: none` drops list semantics in
          Safari/VoiceOver. Same reason `.work-tile__tags` carries it. */}
      <ul className="essay-list" role="list">
        {orderedCaseStudies.map((study) => (
          <li key={study.slug} className="essay-list__item">
            <Link href={`/writing/${study.slug}`} className="essay-list__link">
              <h2 className="essay-list__title">{study.name}</h2>
              <p className="essay-list__description">
                {study.essayPitch ?? study.pitch}
              </p>
              <p className="essay-list__meta">{readingTimeLabel(study.slug)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
