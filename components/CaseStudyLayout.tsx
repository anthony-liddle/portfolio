import Link from 'next/link';
import Prose from './Prose';

interface CaseStudyLayoutProps {
  children: React.ReactNode;
}

export default function CaseStudyLayout({ children }: CaseStudyLayoutProps) {
  return (
    <div className="page-container--wide">
      <nav aria-label="Breadcrumb" className="case-study__breadcrumb">
        <Link href="/writing" className="case-study__back-link">
          ← Writing
        </Link>
      </nav>

      <article>
        <Prose className="prose--case-study">{children}</Prose>
      </article>

      <p className="case-study__signature">-A</p>
    </div>
  );
}
