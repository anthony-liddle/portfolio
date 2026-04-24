import Link from 'next/link';
import Prose from './Prose';

interface CaseStudyLayoutProps {
  children: React.ReactNode;
}

export default function CaseStudyLayout({ children }: CaseStudyLayoutProps) {
  return (
    <div className="page-container--wide">
      <nav aria-label="Breadcrumb" className="case-study__breadcrumb">
        <Link href="/work" className="case-study__back-link">
          ← Work
        </Link>
      </nav>

      <article>
        <Prose className="prose--case-study">{children}</Prose>
      </article>
    </div>
  );
}
