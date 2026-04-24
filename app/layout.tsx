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
  metadataBase: new URL('https://anthonyliddle.dev'),
  title: {
    default: 'Anthony Liddle',
    template: '%s — Anthony Liddle',
  },
  description: 'Staff / Lead Frontend Engineer in Portland, OR',
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anthony Liddle',
    description: 'Staff / Lead Frontend Engineer in Portland, OR',
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
