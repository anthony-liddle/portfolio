import { caseStudyOgImage } from '@/lib/og';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Contact Your Reps — Anthony Liddle';

export default function Image() {
  return caseStudyOgImage('contact-your-reps');
}
