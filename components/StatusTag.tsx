import { cn } from '@/lib/cn';
import type { CaseStudyStatus } from '@/content/case-studies';

interface StatusTagProps {
  status: CaseStudyStatus;
  className?: string;
}

export default function StatusTag({ status, className }: StatusTagProps) {
  return (
    <span
      className={cn(
        'status-tag',
        status === 'Shut down' ? 'status-tag--shutdown' : 'status-tag--active',
        className,
      )}
      aria-label={`Status: ${status}`}
    >
      {status}
    </span>
  );
}
