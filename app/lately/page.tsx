import type { Metadata } from 'next';
import WatchingSection from '@/components/WatchingSection';
import ReadingSection from '@/components/ReadingSection';
import ListeningSection from '@/components/ListeningSection';
import { pageMetadata } from '@/lib/site';

// Generate once at build time and never regenerate at runtime. This page reads
// content/ from disk (reading and listening), and those files ship with the
// repo but not into the serverless function, so an ISR regeneration would find
// nothing and render empty sections over a perfectly good cached page. Freshness
// comes from a daily redeploy instead, which is the only context where those
// files exist. See .github/workflows/daily-redeploy.yml.
//
// `false` is the documented spelling for "cache indefinitely". It is not enough
// on its own: the lowest `next.revalidate` across any fetch in the route sets
// the route's revalidation frequency, so the fetch wrappers in lib/ must also
// avoid it or the route silently returns to ISR.
export const revalidate = false;

export const metadata: Metadata = pageMetadata({
  title: 'Lately',
  description:
    'A snapshot of what Anthony Liddle has been watching, reading, and listening to.',
  path: '/lately',
});

export default function LatelyPage() {
  return (
    <div className="page-container">
      <h1 className="lately-heading">Lately</h1>
      <p className="lately-intro">
        A snapshot of what I&rsquo;ve been watching, reading, and listening to.
        Updated whenever I finish something worth mentioning.
      </p>

      <div className="lately-sections">
        <WatchingSection />
        <ReadingSection />
        <ListeningSection />
      </div>
    </div>
  );
}
