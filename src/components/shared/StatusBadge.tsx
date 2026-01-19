import { cn } from '@/lib/utils';
import { LeadStatus } from '@/types';

interface StatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  new: { label: 'New', className: 'status-new' },
  contacted: { label: 'Contacted', className: 'status-contacted' },
  promising: { label: 'Promising', className: 'status-promising' },
  future: { label: 'Future', className: 'status-future' },
  lost: { label: 'Lost', className: 'status-lost' },
  converted: { label: 'Converted', className: 'status-converted' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
