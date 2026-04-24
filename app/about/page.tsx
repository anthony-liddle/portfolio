import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'A bit about Anthony Liddle — Staff / Lead Frontend Engineer in Portland, OR.',
  openGraph: {
    title: 'About — Anthony Liddle',
    description:
      'A bit about Anthony Liddle — Staff / Lead Frontend Engineer in Portland, OR.',
  },
};

export default function AboutPage() {
  return (
    <div className="page-container">
      <h1 className="about-heading">About</h1>

      <div className="about-body">
        <p>
          I&rsquo;m a Staff / Lead Frontend Engineer based in Portland, OR.
          I&rsquo;ve been building data-intensive web and mobile products for
          fifteen years, at BreakAway Data, Microsoft, Mozilla, McAfee, and
          agencies before that.
        </p>

        <p>
          My work tends to live at the intersection of complex data and
          interactive surfaces: analytics platforms, live-capture systems,
          personalization, editorial surfaces. I care about the part of
          engineering that affects how software actually feels to use:
          accessibility, performance, and code that a future engineer will be
          grateful for, not curse.
        </p>

        <p>
          Outside work I cook, sing karaoke badly, play piano slightly better,
          and sew. I&rsquo;m a parent. I care about software that respects the
          people using it.
        </p>

        <p className="about-contact">
          Say hello:{' '}
          <a href="mailto:anthonyliddle@gmail.com" className="about-link">
            anthonyliddle@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
