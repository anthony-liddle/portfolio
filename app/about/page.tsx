import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'A bit about Anthony Liddle, a design engineer in Portland, OR. Building things at BreakAway Data, and on my own time.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="page-container">
      <h1 className="about-heading">About</h1>

      <div className="about-body">
        <p>
          I&rsquo;ve been building software for fifteen years, at BreakAway
          Data, Microsoft, Mozilla, McAfee, and agencies before that, and every
          one of those jobs put me on the interface. Most of those products were
          data-intensive. Analytics platforms, editorial surfaces, live-capture
          systems, personalization. My part was turning that data into screens a
          person could read and act on, and lately it includes more of the
          backend under them. I live and work in Portland, OR.
        </p>

        <p>
          Whether a tool is something you want to use or something you have to
          use comes down to details: how it looks, how it answers a tap, whether
          it works with a screen reader, how fast it loads, and whether the next
          engineer can change it without cursing your name. Those choices stack
          up. They become the defaults a team works from, and a team&rsquo;s
          defaults are the experience the user gets.
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
