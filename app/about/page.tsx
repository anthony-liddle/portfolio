import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'A bit about Anthony Liddle — Staff / Lead Frontend Engineer in Portland, OR. Building things at BreakAway Data, and on my own time.',
  openGraph: {
    title: 'About — Anthony Liddle',
    description:
      'A bit about Anthony Liddle — Staff / Lead Frontend Engineer in Portland, OR. Building things at BreakAway Data, and on my own time.',
  },
};

export default function AboutPage() {
  return (
    <div className="page-container">
      <h1 className="about-heading">About</h1>

      <div className="about-body">
        <p>
          I&rsquo;m a Staff / Lead Frontend Engineer based in Portland, OR.
          Fifteen years of experience, at BreakAway Data, Microsoft, Mozilla,
          McAfee, and agencies before that. I&rsquo;ve spent most of that time
          on data-intensive products: analytics platforms, editorial surfaces,
          live-capture systems, personalization. The data is complicated. The
          user-facing surface needs to feel simple. The space between is where I
          thrive.
        </p>

        <p>
          I care about the parts of engineering that decide whether a tool is
          something you want to use, or something you have to use.
          Accessibility. Performance. Code that the next engineer to touch it
          will thank you for, not curse at. Those choices stack up. They become
          the defaults a team works from, and a team&rsquo;s defaults are the
          experience the user gets.
        </p>

        <p>
          Beyond shipping features, I build teams. At Pocket I founded the
          frontend accessibility practice, ran the hiring loop, mentored an
          engineer through a promotion, onboarded new engineers, and held the
          team&rsquo;s rituals through multiple leadership transitions. Daily
          emoji check-ins, monthly lightning talks, retros that one teammate
          described as a form of group therapy. I&rsquo;ve never had a manager
          title. I lead anyway. I lead through relationships and mutual respect,
          because that&rsquo;s how I want to work and because it&rsquo;s what I
          believe good teams actually need.
        </p>

        <p>
          Outside work I cook, sing karaoke badly, play piano slightly better,
          and sew. I&rsquo;m a parent. I care about software that respects the
          people using it.
        </p>

        <p className="about-contact">
          Say hello:{' '}
          <a href="mailto:anthony@anthonyliddle.dev" className="about-link">
            anthony@anthonyliddle.dev
          </a>
        </p>
      </div>
    </div>
  );
}
