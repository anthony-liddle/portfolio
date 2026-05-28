import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';
import { projects } from '@/content/projects';

const W = 1200;
const H = 630;
const BG = '#0a0a0a';
const TEXT = '#f5f1eb';
const MUTED = '#8a8680';
const ACCENT = '#c97047';
const PAD = 80;

const serifBold = readFileSync(
  join(process.cwd(), 'public/fonts/LibreBaskerville-Bold.woff'),
);
const sansRegular = readFileSync(
  join(process.cwd(), 'public/fonts/Inter-Regular.woff'),
);

const fonts = [
  {
    name: 'Libre Baskerville',
    data: serifBold,
    weight: 700 as const,
    style: 'normal' as const,
  },
  {
    name: 'Inter',
    data: sansRegular,
    weight: 400 as const,
    style: 'normal' as const,
  },
];

const opts = { width: W, height: H, fonts };

export function homeOgImage(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        background: BG,
        width: W,
        height: H,
        display: 'flex',
        flexDirection: 'column',
        padding: PAD,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          gap: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Libre Baskerville',
            fontSize: 72,
            fontWeight: 700,
            color: TEXT,
            lineHeight: 1.1,
          }}
        >
          Anthony Liddle
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Inter',
            fontSize: 36,
            color: MUTED,
            marginTop: 24,
          }}
        >
          Staff / Lead Frontend Engineer
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Inter',
            fontSize: 24,
            color: MUTED,
            marginTop: 8,
          }}
        >
          Portland, OR
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          fontFamily: 'Inter',
          fontSize: 20,
          color: ACCENT,
        }}
      >
        anthonyliddle.dev
      </div>
    </div>,
    opts,
  );
}

export function workOgImage(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        background: BG,
        width: W,
        height: H,
        display: 'flex',
        flexDirection: 'column',
        padding: PAD,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          gap: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Libre Baskerville',
            fontSize: 96,
            fontWeight: 700,
            color: TEXT,
            lineHeight: 1.1,
          }}
        >
          Work
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Inter',
            fontSize: 28,
            color: MUTED,
            marginTop: 24,
          }}
        >
          A selection of things I&apos;ve built
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          fontFamily: 'Inter',
          fontSize: 20,
          color: ACCENT,
        }}
      >
        anthonyliddle.dev
      </div>
    </div>,
    opts,
  );
}

export function latelyOgImage(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        background: BG,
        width: W,
        height: H,
        display: 'flex',
        flexDirection: 'column',
        padding: PAD,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          gap: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Libre Baskerville',
            fontSize: 96,
            fontWeight: 700,
            color: TEXT,
            lineHeight: 1.1,
          }}
        >
          Lately
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            fontFamily: 'Inter',
            fontSize: 28,
            color: MUTED,
            lineHeight: 1.45,
            maxWidth: 920,
            marginTop: 24,
          }}
        >
          What I&apos;ve been watching, reading, and listening to
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          fontFamily: 'Inter',
          fontSize: 20,
          color: ACCENT,
        }}
      >
        anthonyliddle.dev
      </div>
    </div>,
    opts,
  );
}

export function caseStudyOgImage(slug: string): ImageResponse {
  const project = projects.find((p) => p.slug === slug);
  const name = project?.name ?? slug;
  const pitch = project?.pitch ?? '';

  return new ImageResponse(
    <div
      style={{
        background: BG,
        width: W,
        height: H,
        display: 'flex',
        flexDirection: 'column',
        padding: PAD,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          gap: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Libre Baskerville',
            fontSize: 72,
            fontWeight: 700,
            color: TEXT,
            lineHeight: 1.1,
          }}
        >
          {name}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            fontFamily: 'Inter',
            fontSize: 26,
            color: MUTED,
            lineHeight: 1.45,
            maxWidth: 920,
            marginTop: 24,
          }}
        >
          {pitch}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          fontFamily: 'Inter',
          fontSize: 20,
          color: ACCENT,
        }}
      >
        anthonyliddle.dev
      </div>
    </div>,
    opts,
  );
}
