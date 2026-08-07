import type { Metadata } from 'next';
import WorkTile from '@/components/WorkTile';
import ExperienceItem from '@/components/ExperienceItem';
import { caseStudies, featuredSlugs } from '@/content/case-studies';

export const metadata: Metadata = {
  title: 'Anthony Liddle',
  description: 'Full stack engineer in Portland, OR',
};

const featuredProjects = featuredSlugs.map((slug) =>
  caseStudies.find((p) => p.slug === slug)!,
);

const experience = [
  {
    company: 'BreakAway Data',
    role: 'Lead Frontend Engineer',
    period: '2025–present',
    bullets: [
      'The person the team defers to on architecture across the platform: web, React Native mobile, backend services, and enterprise applications.',
      'Designed the GraphQL schema and built real-time multi-user data entry on subscriptions, with an IndexedDB queue that syncs when the network returns. Coaches keep their data through a dropped connection mid-game.',
      'Moved a heavy account merge off the GraphQL request path onto a pg-boss worker queue, out of an interactive transaction that had been running identity deletes, per-play rewrites, and object storage operations inline.',
      'Built the NWSL Sporting Platform alone, schema through UI: player registration, matchday dashboards, media release forms, and server-rendered PDF exports. Three months.',
      'Built the sharing infrastructure end to end: dynamic OG image generation, SSR metadata, canonical share URLs, Branch.io deep linking on both platforms, and iOS App Clip support.',
      'Built the mobile feed from GraphQL schema through the client: Apollo pagination, masonry layout, skeleton states, impression and click analytics, and the performance work to keep it smooth.',
      'Extracted shared packages to replace logic that had drifted into six hand-maintained copies. Led the monorepo modernization: npm to pnpm, Apollo Client v3 to v4, Tailwind v3 to v4, E2E test sharding across parallel CI runners, and Docker BuildKit caching.',
      'Covered the NFL Flag Championships solo while the rest of the team worked the event on site. Triaged live field reports, fixed what was mine, routed the rest, and shipped to production continuously for three days.',
    ],
  },
  {
    company: 'Microsoft',
    role: 'UI Engineer',
    period: '2024–2025',
    bullets: [
      'Built and maintained a React component library used by engineers across Microsoft, held to the internal accessibility bar.',
      "Led the authentication work for the component library's documentation site, wiring identity into a site that had been open.",
      'Shipped full-text search for that site so engineers could find the component they needed.',
    ],
  },
  {
    company: 'Mozilla / Pocket',
    role: 'Staff Software Engineer',
    period: '2017–2024',
    bullets: [
      "Employee #24, stayed through the Mozilla acquisition. Co-architected two generations of Pocket's web client over six years, serving 2M+ daily page views at peak.",
      'Rebuilt the cross-platform analytics instrumentation and data pipeline. I was tired of debugging Snowplow failures, so I sorted through thousands of logs, found the real causes, and rewrote it. Event errors dropped 70%.',
      "Led the full rebuild of Pocket's Chrome extension for Manifest V3, finished ahead of schedule. Support incidents dropped by half.",
      'Founded the frontend accessibility working group and wrote the guidelines covering color blindness, screen readers, and keyboard navigation across every application. Then made it a default, reviewed in PRs and covered by regression tests.',
      'Defined the hiring requirements, wrote the take-home test, ran every frontend interview, and wrote the onboarding docs. Tripled the team and mentored an engineer through a promotion.',
      'Pitched Listen, an audio narration feature, four separate times over several years before it shipped. Coordinated it across legal, design, and publishing myself. Over a thousand people a day used it.',
    ],
  },
  {
    company: 'McAfee / Intel Security',
    role: 'UI Cloud Developer',
    period: '2015–2017',
    bullets: [
      'Rebuilt an API pipeline connecting several external data sources to a Node.js server, with 90% unit test coverage.',
      'Designed the frontend architecture for enterprise cloud security applications using AngularJS, React, D3, KeyLines, and Highcharts. Those decisions influenced frontend standards across McAfee.',
      'Built an application for corporate malware researchers to evaluate files and network activity.',
    ],
  },
  {
    company: 'Level Studios',
    role: 'Senior Creative Engineer',
    period: '2012–2015',
    bullets: [
      "Built web experiences for Apple, the agency's only client, and served as project lead across multiple offices.",
      'Worked at the edge of what browsers could do at the time: the Web Audio API when it was new, and early mobile ad platform integrations.',
      'Made architectural recommendations, ran technical training, and mentored associate and senior developers through code review.',
    ],
  },
];

export default function HomePage() {
  return (
    <div className="page-container">
      {/* Hero */}
      <section aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="sr-only">
          Anthony Liddle
        </h1>
        <p className="home-hero__paragraph">
          I&rsquo;m Anthony Liddle, a full stack engineer in Portland, OR. I
          currently lead frontend at BreakAway Data, a sports performance
          platform, and work across the stack: GraphQL schema and API design,
          Postgres, worker queues, and the CI that ships it. Fifteen years
          building data-intensive web and mobile products, most recently at
          Microsoft and Mozilla. At Mozilla I co-architected two generations of
          Pocket&rsquo;s web client over six years, helping serve 2M+ daily page
          views at peak.
        </p>
        <p className="home-hero__paragraph">
          At Pocket I founded the frontend team&rsquo;s accessibility practice,
          ran the hiring loop, mentored an engineer through a promotion,
          onboarded new hires, and held the team together through several
          leadership transitions. I never had a manager title. I led anyway. I
          lead through relationships and mutual respect, because that&rsquo;s
          how I want to work and because I believe it&rsquo;s what teams
          actually need.
        </p>
        <p className="home-hero__paragraph">
          On my own time I build small projects that aren&rsquo;t trying to
          scale, aren&rsquo;t trying to last, and aren&rsquo;t trying to impress
          anyone but me. The audio in one is composed in another. The animations
          in a third were generated by a fourth. The work loops back on itself.
        </p>
      </section>

      {/* Featured Work */}
      <section aria-labelledby="work-heading" style={{ marginTop: '5rem' }}>
        <hr className="section-rule" />
        <h2 id="work-heading" className="home-section-heading">
          Featured Work
        </h2>
        <div className="work-grid" role="list">
          {featuredProjects.map((project) => (
            <div key={project.slug} role="listitem">
              <WorkTile project={project} />
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section
        aria-labelledby="experience-heading"
        style={{ marginTop: '5rem' }}
      >
        <hr className="section-rule" />
        <h2 id="experience-heading" className="home-section-heading">
          Experience
        </h2>
        <div className="experience-list">
          {experience.map((item) => (
            <ExperienceItem key={item.company} {...item} />
          ))}
        </div>
      </section>

      {/* About footer */}
      <footer style={{ marginTop: '5rem' }}>
        <hr className="section-rule" />
        <p className="home-prose">
          I&rsquo;m interested in talking to people building software that
          respects the people using it. That covers a lot of ground: privacy,
          accessibility, audio, civic tools, and the kinds of weird projects
          that exist for their own reasons.
        </p>
        <p className="home-prose" style={{ marginTop: '1rem' }}>
          Outside work I cook, sing karaoke badly, play piano slightly better,
          and sew. I&rsquo;m a parent. I care about software that respects the
          people using it.
        </p>
        <p className="home-prose" style={{ marginTop: '1rem' }}>
          <a href="mailto:anthony@anthonyliddle.dev" className="home-link">
            anthony@anthonyliddle.dev
          </a>
          {' · '}
          <a
            href="https://github.com/anthony-liddle"
            className="home-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in new tab)"
          >
            GitHub
          </a>
          {' · '}
          <a
            href="https://linkedin.com/in/anthony-liddle"
            className="home-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in new tab)"
          >
            LinkedIn
          </a>
        </p>
      </footer>
    </div>
  );
}
