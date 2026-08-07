export type CaseStudyStatus = 'Shut down' | 'Active' | 'Development';

export interface CaseStudyLink {
  label: string;
  url: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  tileName?: string;
  pitch: string;
  status: CaseStudyStatus;
  tags: string[];
  links?: CaseStudyLink[];
  summary: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'pocket',
    name: 'Pocket',
    tileName: 'Pocket',
    pitch:
      "Mozilla's article-discovery service. 2M+ daily page views at peak. Co-architected across six years, two full rewrites.",
    status: 'Shut down',
    tags: ['Next.js', 'React', 'Redux', 'GraphQL'],
    links: [{ label: 'Source', url: 'https://github.com/Pocket/web-client' }],
    summary:
      "The web home of Pocket, Mozilla's article-discovery service. A multi-surface editorial and personal-library platform that served more than 2 million daily page views at its peak.",
  },
  {
    slug: 'crowd',
    name: 'Crowd',
    pitch:
      'Location-based ephemeral messaging for protest organizing. Full backend: Fastify, Drizzle, rotating device identities, proximity-gated groups.',
    status: 'Development',
    tags: ['React Native', 'Expo', 'Fastify', 'Drizzle', 'PostgreSQL'],
    links: [
      { label: 'Source', url: 'https://github.com/anthony-liddle/crowd' },
    ],
    summary:
      "Location-based ephemeral messaging. Messages live only within a radius and only for a limited time. When everything you've posted expires, your identity expires with it.",
  },
  {
    slug: 'soundscape',
    name: 'Soundscape',
    pitch:
      'A browser-native music sequencer and synthesizer, shipped as a zero-dependency npm package with a web-based composer.',
    status: 'Active',
    tags: ['TypeScript', 'Web Audio API', 'AudioWorklet'],
    links: [
      { label: 'Source', url: 'https://github.com/anthony-liddle/soundscape' },
      { label: 'npm', url: 'https://npmjs.com/package/soundscape-engine' },
      { label: 'Composer', url: 'https://soundscape-editor.vercel.app' },
    ],
    summary:
      'A zero-dependency audio library (22KB) that does Web Audio scheduling, synthesis, and effects. Plus a React composer. Powers the music in two of my other projects.',
  },
  {
    slug: 'peach-of-a-word',
    name: 'Peach of a Word',
    pitch:
      'A daily word game built as a gift for my partner, shaped around how she actually plays instead of how the original ran.',
    status: 'Active',
    tags: ['React', 'TypeScript', 'Vite'],
    links: [
      { label: 'Live', url: 'https://peachofaword.com' },
      {
        label: 'Source',
        url: 'https://github.com/anthony-liddle/peach-of-a-word',
      },
    ],
    summary:
      'A remix of a Flash game my partner loved and can no longer play. Eight scrambled letters, and the eight-letter word they all came from. Untimed, offline, and rebuilt repeatedly around how she plays.',
  },
  {
    slug: 'forgetting-machine',
    name: 'The Forgetting Machine',
    pitch:
      'Write a secret. Watch it dematerialize for 60 seconds. Nothing is saved, by design, not policy.',
    status: 'Active',
    tags: ['Vanilla TypeScript', 'Vite', 'Web Audio'],
    links: [
      { label: 'Live', url: 'https://forgetting-machine.com' },
      {
        label: 'Source',
        url: 'https://github.com/anthony-liddle/forgetting-machine',
      },
    ],
    summary:
      "A small web experience where someone writes a secret, watches it dematerialize for 60 seconds with music, and then it's gone.",
  },
  {
    slug: 'contact-your-reps',
    name: 'Contact Your Reps',
    pitch:
      "A free, open-source tool for contacting US federal representatives, with a visualization of each House member's voting record alongside the issues you care about.",
    status: 'Active',
    tags: [
      'Next.js',
      'TypeScript',
      'Congress.gov API',
      'Vercel Blob cache',
      'AI pipeline',
    ],
    links: [
      { label: 'Live', url: 'https://contact-your-reps.org' },
      {
        label: 'Source',
        url: 'https://github.com/anthony-liddle/contact-your-reps',
      },
    ],
    summary:
      'A civic tool that surfaces your reps, shows their voting records on issues you care about, and helps you write them.',
  },
  {
    slug: 'ro-sham-bo-exe',
    name: 'RO-SHAM-BO.EXE',
    pitch:
      'A retro-terminal rock-paper-scissors game that pretends to watch you. The game is fair; the adversarial feeling is performance.',
    status: 'Active',
    tags: ['React', 'TypeScript', 'Web APIs', 'ASCII'],
    links: [
      {
        label: 'Live',
        url: 'https://anthony-liddle.github.io/rock-paper-scissors/',
      },
      { label: 'itch.io', url: 'https://sparklebeard.itch.io/ro-sham-bo-exe' },
      {
        label: 'Source',
        url: 'https://github.com/anthony-liddle/rock-paper-scissors',
      },
    ],
    summary:
      'A retro-terminal rock-paper-scissors game that claims to watch your patterns, learn your strategy, and remember everything. None of that is true. The game is playing fair, the rest is performance.',
  },
  {
    slug: 'ascii-roto',
    name: 'ascii-roto',
    pitch:
      'A CLI that converts video files into ASCII animations. An idea I carried for a decade, built for the right project.',
    status: 'Active',
    tags: ['Node.js', 'TypeScript', 'CLI', 'ffmpeg'],
    links: [
      { label: 'Source', url: 'https://github.com/anthony-liddle/ascii-roto' },
    ],
    summary:
      'Command-line tool that converts video files into ASCII animations. Built to generate the animations in RO-SHAM-BO.EXE, later extended with color for a future project.',
  },
];

/**
 * The six tiles shown on the home page, distinct from `caseStudyOrder` below,
 * which governs the full /writing index. Six rather than five so the
 * two-column grid fills three even rows instead of stranding one tile on a
 * row of its own.
 */
export const featuredSlugs = [
  'pocket',
  'crowd',
  'contact-your-reps',
  'peach-of-a-word',
  'soundscape',
  'forgetting-machine',
];

/**
 * Display order for the /writing index. Intentional and pair-based, not a
 * ranking: the two-column grid renders these as four thematic rows, so each
 * adjacent pair belongs together (love and loss, the two political projects,
 * the audio engine beside the piece whose audio was composed in it, the game
 * beside the tool built to make its visuals). Do not sort this alphabetically
 * or chronologically. Kept separate from the `caseStudies` array so reordering
 * the page never means editing the data.
 */
export const caseStudyOrder = [
  'pocket',
  'peach-of-a-word',
  'contact-your-reps',
  'crowd',
  'soundscape',
  'forgetting-machine',
  'ro-sham-bo-exe',
  'ascii-roto',
];
