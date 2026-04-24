import type { Metadata } from 'next';
import { Inter, Libre_Baskerville } from 'next/font/google';
import SiteNav from '@/components/SiteNav';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-baskerville',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Anthony Liddle',
    template: '%s — Anthony Liddle',
  },
  description: 'Staff / Lead Frontend Engineer in Portland, OR',
  metadataBase: new URL('https://anthonyliddle.dev'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Anthony Liddle',
    description: 'Staff / Lead Frontend Engineer in Portland, OR',
    url: 'https://anthonyliddle.dev',
    siteName: 'Anthony Liddle',
    type: 'website',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Anthony Liddle — Staff / Lead Frontend Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anthony Liddle',
    description: 'Staff / Lead Frontend Engineer in Portland, OR',
    images: ['/og-default.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${libreBaskerville.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <div className="layout-shell">
          <header>
            <SiteNav />
          </header>

          <main id="main-content" tabIndex={-1} className="site-main">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
