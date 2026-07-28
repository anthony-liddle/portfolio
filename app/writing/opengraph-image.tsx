import { writingOgImage } from '@/lib/og';
import { siteTitle } from '@/lib/site';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = siteTitle('Writing');

export default writingOgImage;
