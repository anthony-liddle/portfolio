import { caseStudyOgImage } from '@/lib/og';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'ascii-roto — Anthony Liddle';

export default function Image() {
  return caseStudyOgImage('ascii-roto');
}
