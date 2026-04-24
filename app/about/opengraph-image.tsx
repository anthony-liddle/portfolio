import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'About — Anthony Liddle';

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

export default function Image(): ImageResponse {
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
          About
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
          A bit about Anthony Liddle
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
    { width: W, height: H, fonts },
  );
}
