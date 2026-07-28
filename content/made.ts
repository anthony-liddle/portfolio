export interface MadeLink {
  /** Visible text. Live sites use their bare domain, tools use "npm"/"GitHub". */
  label: string;
  /** Absolute URL, or a leading-slash path for an internal /work case study. */
  href: string;
  /** Marks the entry's live destination so it reads louder than the rest. */
  primary?: boolean;
}

export interface MadeEntry {
  name: string;
  description: string;
  links: MadeLink[];
}

export interface MadeSection {
  title: string;
  entries: MadeEntry[];
}

const repo = (name: string) => `https://github.com/anthony-liddle/${name}`;
const npm = (name: string) => `https://www.npmjs.com/package/${name}`;

/**
 * The /made index: finished, running work, including the pieces that otherwise
 * only surface inside a case study or on GitHub. Kept separate from
 * `content/projects.ts`, which is a curated portfolio rather than a directory,
 * so an entry can live here without earning a work tile.
 */
export const madeSections: MadeSection[] = [
  {
    title: 'Things you can use',
    entries: [
      {
        name: 'Out of Sorts',
        description:
          "A daily word game. Eight scrambled letters, and you lose the ones you don't use.",
        links: [
          {
            label: 'out-of-sorts.vercel.app',
            href: 'https://out-of-sorts.vercel.app',
            primary: true,
          },
          { label: 'GitHub', href: repo('out-of-sorts') },
        ],
      },
      {
        name: 'Peach of a Word',
        description:
          'A daily word game I built as a gift. My partner plays it every morning, which is the metric that matters most to me.',
        links: [
          {
            label: 'peachofaword.com',
            href: 'https://peachofaword.com',
            primary: true,
          },
          { label: 'GitHub', href: repo('peach-of-a-word') },
        ],
      },
      {
        name: 'The Forgetting Machine',
        description:
          'Write something down and watch it come apart. It was never stored anywhere to begin with.',
        links: [
          {
            label: 'forgetting-machine.com',
            href: 'https://forgetting-machine.com',
            primary: true,
          },
          { label: 'GitHub', href: repo('forgetting-machine') },
          { label: 'Case study', href: '/work/forgetting-machine' },
        ],
      },
      {
        name: 'RO-SHAM-BO.EXE',
        description:
          "Rock paper scissors against something that acts like it's watching you. The coin flip is provably fair. The menace is theater.",
        links: [
          {
            label: 'ro-sham-bo.dev',
            href: 'https://ro-sham-bo.dev',
            primary: true,
          },
          { label: 'GitHub', href: repo('rock-paper-scissors') },
          { label: 'Case study', href: '/work/ro-sham-bo-exe' },
        ],
      },
      {
        name: 'Soundscape',
        description:
          'A sequencer and synthesizer that runs entirely in the browser. The audio in The Forgetting Machine was composed here.',
        links: [
          {
            label: 'soundscape-editor.vercel.app',
            href: 'https://soundscape-editor.vercel.app',
            primary: true,
          },
          { label: 'GitHub', href: repo('soundscape') },
          { label: 'Case study', href: '/work/soundscape' },
        ],
      },
      {
        name: 'Contact Your Reps',
        description:
          "Type a ZIP code, get your representatives and a message you can edit. It can't send anything for you, which is the point.",
        links: [
          {
            label: 'contact-your-reps.org',
            href: 'https://contact-your-reps.org',
            primary: true,
          },
          { label: 'GitHub', href: repo('contact-your-reps') },
          { label: 'Case study', href: '/work/contact-your-reps' },
        ],
      },
    ],
  },
  {
    title: 'Packages and tools',
    entries: [
      {
        name: 'soundscape-engine',
        description:
          'The audio engine behind the Soundscape sequencer. Zero dependencies.',
        links: [
          { label: 'npm', href: npm('soundscape-engine') },
          { label: 'GitHub', href: repo('soundscape') },
          { label: 'Case study', href: '/work/soundscape' },
        ],
      },
      {
        name: 'letterboxd-rss',
        description:
          'Turns a Letterboxd RSS feed into typed diary entries. Letterboxd has no public API, so everyone rebuilds this. Built for the Lately page.',
        links: [
          { label: 'npm', href: npm('letterboxd-rss') },
          { label: 'GitHub', href: repo('letterboxd-rss') },
        ],
      },
      {
        name: 'library-reads',
        description:
          'Turns a Libby export into typed entries, with covers and metadata from Open Library. Built for the Lately page.',
        links: [
          { label: 'npm', href: npm('library-reads') },
          { label: 'GitHub', href: repo('library-reads') },
        ],
      },
      {
        name: 'listening-log',
        description:
          'Reads a hand-kept log of albums and enriches it against the Apple Music catalog, with Discogs as a fallback. Built for the Lately page.',
        links: [
          { label: 'npm', href: npm('listening-log') },
          { label: 'GitHub', href: repo('listening-log') },
        ],
      },
      {
        name: 'apple-music-developer-token',
        description:
          'Signs Apple Music developer tokens. About a hundred lines that most tutorials hand-wave. Signs the tokens for listening-log.',
        links: [
          { label: 'npm', href: npm('apple-music-developer-token') },
          { label: 'GitHub', href: repo('apple-music-developer-token') },
        ],
      },
      {
        name: 'ascii-roto',
        description:
          'Converts video into ASCII animation from the command line. Built for RO-SHAM-BO.EXE.',
        links: [
          { label: 'GitHub', href: repo('ascii-roto') },
          { label: 'Case study', href: '/work/ascii-roto' },
        ],
      },
      {
        name: 'discord-channel-change-bot',
        description:
          'Renames a Discord channel on a weekly schedule, rotating through themes and announcing each one. Built for a server I help run, generic enough to fork.',
        links: [{ label: 'GitHub', href: repo('discord-channel-change-bot') }],
      },
    ],
  },
];
