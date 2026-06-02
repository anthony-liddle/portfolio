import type { Metadata } from 'next';
import WatchingSection from '@/components/WatchingSection';
import ReadingSection from '@/components/ReadingSection';

// Statically generate at build time, then refresh daily (ISR). The literal is
// required: the segment revalidate value must be statically analyzable.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Lately',
  description:
    'A snapshot of what Anthony Liddle has been watching, reading, and listening to.',
  openGraph: {
    title: 'Lately — Anthony Liddle',
    description:
      'A snapshot of what Anthony Liddle has been watching, reading, and listening to.',
  },
};

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
        {/* Listening section drops in here. */}
      </div>
    </div>
  );
}
