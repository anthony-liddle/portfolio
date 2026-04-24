'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <nav aria-label="Site navigation" className="site-nav">
      <div className="site-nav__home">
        {isHome ? (
          <span className="nav-wordmark" aria-hidden="true">
            Anthony Liddle
          </span>
        ) : (
          <Link href="/" className="nav-link nav-link--wordmark">
            Anthony Liddle
          </Link>
        )}
      </div>

      <ul role="list" className="site-nav__list">
        <li>
          <Link href="/work" className="nav-link">
            Work
          </Link>
        </li>
        <li>
          <Link href="/about" className="nav-link">
            About
          </Link>
        </li>
        <li>
          <a
            href="mailto:anthonyliddle@gmail.com"
            className="nav-link nav-link--external"
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'baseline',
                gap: '0.25em',
                whiteSpace: 'nowrap',
              }}
            >
              Contact
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                style={{ alignSelf: 'center' }}
              >
                <path
                  d="M2 8 L8 2 M4 2 L8 2 L8 6"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
