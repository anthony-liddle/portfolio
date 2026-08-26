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
  /**
   * Used only by the /writing index, which needs an essay description rather
   * than a project description. A different fact from `pitch`, not an
   * override of it: `pitch` describes what the thing is, `essayPitch`
   * describes what the piece of writing is about. Falls back to `pitch` when
   * absent.
   */
  essayPitch?: string;
  /**
   * Absent on entries that are an argument rather than a project. Only the
   * home page tiles render it, and nothing there is required to be a project,
   * so an essay with no shipped artifact leaves it off instead of claiming a
   * status it does not have.
   */
  status?: CaseStudyStatus;
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
    essayPitch:
      'Six and a half years on a product I loved, two rebuilds, and a layoff I did not choose.',
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
    essayPitch:
      'An idea I carried since 2015, and what it means to design for people who are taking a risk by showing up.',
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
    essayPitch:
      'Twelve years of audio engineering, and the class that made me start building instruments instead of using them.',
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
    essayPitch:
      'A dead Flash game, a promise to my partner, and what it took to rebuild it for exactly one player.',
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
    essayPitch:
      'A song fading out on Highway 101 at midnight, twenty years ago, rebuilt as something you can use.',
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
    essayPitch:
      'What I built while cycling through anger about the state of this country.',
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
    essayPitch:
      'A horror game built the week after a layoff, where the menace is an argument about surveillance.',
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
    essayPitch:
      'An idea I carried for a decade, built because another project finally needed it.',
    status: 'Active',
    tags: ['Node.js', 'TypeScript', 'CLI', 'ffmpeg'],
    links: [
      { label: 'Source', url: 'https://github.com/anthony-liddle/ascii-roto' },
    ],
    summary:
      'Command-line tool that converts video files into ASCII animations. Built to generate the animations in RO-SHAM-BO.EXE, later extended with color for a future project.',
  },
  {
    slug: 'bottleneck',
    name: 'The Bottleneck Was Never the Code',
    pitch:
      "An argument about where an organization's throughput actually gets stuck. One tournament week as the only engineer at a desk, ninety-six merged pull requests, and the pipeline I built after.",
    essayPitch:
      'One week as the only engineer not at the tournament, and what I built after.',
    // No status and no links: this is an essay, not a shipped project. Empty
    // rather than a placeholder stack, for the same reason.
    tags: [],
    summary:
      'An essay rather than a project writeup. What a week of covering a national tournament alone taught me about where throughput is really bounded, and the agent pipeline that came out of it.',
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
 * ranking: adjacent entries belong together thematically (love and loss, the
 * two political projects, the audio engine beside the piece whose audio was
 * composed in it, the game beside the tool built to make its visuals). The
 * list renders single-column, so adjacency is semantic rather than visual.
 * Do not sort this alphabetically or chronologically. Kept separate from the
 * `caseStudies` array so reordering the page never means editing the data.
 *
 * `bottleneck` sits last on purpose: it is the only entry with nothing to go
 * look at, and its closing line reads as the close of the whole page.
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
  'bottleneck',
];
