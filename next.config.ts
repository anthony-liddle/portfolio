import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // /work and /made were the previous names for these two indexes. The Pocket
  // case study in particular has been shared publicly, so its old URL has to
  // keep resolving. `permanent: true` emits a 308, which preserves the method
  // and tells crawlers to transfer ranking to the new path. The `:path*` rules
  // cover both the case studies and the generated opengraph-image routes.
  async redirects() {
    return [
      { source: '/work', destination: '/writing', permanent: true },
      {
        source: '/work/:path*',
        destination: '/writing/:path*',
        permanent: true,
      },
      { source: '/made', destination: '/projects', permanent: true },
      {
        source: '/made/:path*',
        destination: '/projects/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      // Letterboxd film posters. The `?v=` hash varies per poster, so `search`
      // is omitted to allow any query string on this trusted, path-restricted host.
      // The prefix stops at `/resized/` rather than `/resized/film-poster/`
      // because posters sourced from TMDB are served under `/resized/sm/upload/`
      // instead, and those 400ed against the narrower pattern.
      {
        protocol: 'https',
        hostname: 'a.ltrbxd.com',
        pathname: '/resized/**',
      },
      // Open Library book covers. No query string, so pin `search` to empty.
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        pathname: '/b/id/**',
        search: '',
      },
      // Apple Music album artwork. The host is sharded across is1-ssl through
      // is5-ssl, so the subdomain is wildcarded; the path is pinned to the
      // image CDN prefix. No query string, so `search` is pinned to empty.
      {
        protocol: 'https',
        hostname: '**.mzstatic.com',
        pathname: '/image/thumb/**',
        search: '',
      },
      // OG images for the /projects index, one pattern per project, each
      // pinned to the exact file its site's og:image tag declares. Two live
      // on GitHub Pages project paths rather than their own domains.
      {
        protocol: 'https',
        hostname: 'out-of-sorts.vercel.app',
        pathname: '/og.png',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'peachofaword.com',
        pathname: '/og.png',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'forgetting-machine.com',
        pathname: '/og-image.png',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'anthony-liddle.github.io',
        pathname: '/rock-paper-scissors/og-image.png',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'anthony-liddle.github.io',
        pathname: '/soundscape/og-image.png',
        search: '',
      },
      // A generated Next.js route, not a static file. Served without its
      // optional cache-buster query, so `search` is pinned to empty.
      {
        protocol: 'https',
        hostname: 'contact-your-reps.org',
        pathname: '/opengraph-image',
        search: '',
      },
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
