import { cn } from '@/lib/cn';
import type { ProjectStatus } from '@/content/projects';

interface StatusTagProps {
  status: ProjectStatus;
  className?: string;
}

export default function StatusTag({ status, className }: StatusTagProps) {
  return (
    <span
      className={cn(
        'status-tag',
        status === 'Shipped' ? 'status-tag--shipped' : 'status-tag--active',
        className,
      )}
      aria-label={`Status: ${status}`}
    >
      {status}
    </span>
  );
}
