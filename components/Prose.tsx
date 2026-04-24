import { cn } from '@/lib/cn';

interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

export default function Prose({ children, className }: ProseProps) {
  return <div className={cn('prose', className)}>{children}</div>;
}
