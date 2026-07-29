export interface ProjectLink {
  /** Visible text. Live sites use their bare domain, tools use "npm"/"GitHub". */
  label: string;
  /** Absolute URL, or a leading-slash path for an internal /writing case study. */
  href: string;
  /** Marks the entry's live destination so it reads louder than the rest. */
  primary?: boolean;
}

export interface ProjectImage {
  /** Absolute URL of the project's own OG image, served from its domain. */
  src: string;
  /**
   * What the image shows, not the project name, which is already the heading
   * directly below it. An empty string marks a pure title card as decorative.
   */
  alt: string;
}

export interface ProjectEntry {
  name: string;
  description: string;
  links: ProjectLink[];
  /**
   * Only "Things you can use" entries carry one. Packages get no image on
   * purpose: a generated card for a library would be furniture standing in
   * for something with no appearance.
   */
  image?: ProjectImage;
}

export interface ProjectSection {
  title: string;
  entries: ProjectEntry[];
}

const repo = (name: string) => `https://github.com/anthony-liddle/${name}`;
const npm = (name: string) => `https://www.npmjs.com/package/${name}`;

/**
 * The /projects index: finished, running work, including the pieces that
 * otherwise only surface inside a case study or on GitHub. Kept separate from
 * `content/case-studies.ts`, which backs the written essays, so an entry can
 * live here without an essay having been written about it.
 */
export const projectSections: ProjectSection[] = [
  {
    title: 'Things you can use',
    // Deliberate order, not alphabetical. Changing it changes the page.
    entries: [
      {
        name: 'Peach of a Word',
        description:
          'A daily word game I built as a gift. My partner plays it every morning, which is the metric that matters most to me.',
        image: {
          src: 'https://peachofaword.com/og.png',
          alt: 'A smiling peach above letter tiles spelling serenade, under the tagline: a game about finding words in words',
        },
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
        name: 'Contact Your Reps',
        description:
          "Type a ZIP code, get your representatives and a message you can edit. It can't send anything for you, which is the point.",
        // Headline, subline, and a button on a gradient. The words repeat
        // what the entry text below already says, so decorative is honest.
        image: {
          src: 'https://contact-your-reps.org/opengraph-image',
          alt: '',
        },
        links: [
          {
            label: 'contact-your-reps.org',
            href: 'https://contact-your-reps.org',
            primary: true,
          },
          { label: 'GitHub', href: repo('contact-your-reps') },
          { label: 'Case study', href: '/writing/contact-your-reps' },
        ],
      },
      {
        name: 'RO-SHAM-BO.EXE',
        description:
          "Rock paper scissors against something that acts like it's watching you. The coin flip is provably fair. The menace is theater.",
        image: {
          src: 'https://anthony-liddle.github.io/rock-paper-scissors/og-image.png',
          alt: 'A green phosphor terminal boots ro-sham-bo.exe and prints a warning: opponent is aware',
        },
        links: [
          {
            label: 'ro-sham-bo.dev',
            href: 'https://ro-sham-bo.dev',
            primary: true,
          },
          { label: 'GitHub', href: repo('rock-paper-scissors') },
          { label: 'Case study', href: '/writing/ro-sham-bo-exe' },
        ],
      },
      {
        name: 'Out of Sorts',
        description:
          "A daily word game. Eight scrambled letters, and you lose the ones you don't use.",
        image: {
          src: 'https://out-of-sorts.vercel.app/og.png',
          alt: 'Eight scrambled letter tiles over a pyramid of completed words, while small ghosts float away carrying the letters G, O, N, E',
        },
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
        name: 'The Forgetting Machine',
        description:
          'Write something down and watch it come apart. It was never stored anywhere to begin with.',
        // Pure title card: the name in serif on near-black, nothing else.
        // Decorative by design; the heading below already carries the name.
        image: {
          src: 'https://forgetting-machine.com/og-image.png',
          alt: '',
        },
        links: [
          {
            label: 'forgetting-machine.com',
            href: 'https://forgetting-machine.com',
            primary: true,
          },
          { label: 'GitHub', href: repo('forgetting-machine') },
          { label: 'Case study', href: '/writing/forgetting-machine' },
        ],
      },
      {
        name: 'Soundscape',
        description:
          'A sequencer and synthesizer that runs entirely in the browser. The audio in The Forgetting Machine was composed here.',
        image: {
          src: 'https://anthony-liddle.github.io/soundscape/og-image.png',
          alt: 'A piano roll melody of glowing blue and purple notes on a dark grid, with a playhead beam lighting the sounding note amber',
        },
        links: [
          {
            label: 'soundscape-editor.vercel.app',
            href: 'https://soundscape-editor.vercel.app',
            primary: true,
          },
          { label: 'GitHub', href: repo('soundscape') },
          { label: 'Case study', href: '/writing/soundscape' },
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
          { label: 'Case study', href: '/writing/soundscape' },
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
          { label: 'Case study', href: '/writing/ascii-roto' },
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
