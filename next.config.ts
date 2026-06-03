import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      // Letterboxd film posters. The `?v=` hash varies per poster, so `search`
      // is omitted to allow any query string on this trusted, path-restricted host.
      {
        protocol: 'https',
        hostname: 'a.ltrbxd.com',
        pathname: '/resized/film-poster/**',
      },
      // Open Library book covers. No query string, so pin `search` to empty.
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        pathname: '/b/id/**',
        search: '',
      },
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
