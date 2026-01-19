import { Lead, User } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { PriorityBadge } from '@/components/shared/PriorityBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Building2,
  Eye,
  MoreVertical,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

interface LeadCardProps {
  lead: Lead;
  assignedAgent?: User;
  onEdit?: (lead: Lead) => void;
  onDelete?: (leadId: string) => void;
  showActions?: boolean;
}

export function LeadCard({
  lead,
  assignedAgent,
  onEdit,
  onDelete,
  showActions = true,
}: LeadCardProps) {
  const navigate = useNavigate();

  const formatBudget = (min: number, max: number) => {
    const formatNumber = (n: number) => {
      if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
      if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
      return `$${n}`;
    };
    return `${formatNumber(min)} - ${formatNumber(max)}`;
  };

  return (
    <Card className="overflow-hidden border border-border/50 shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
              {lead.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {lead.name}
              </h3>
              <p className="text-xs text-muted-foreground capitalize">
                {lead.propertyInterest === 'buy' ? 'Buyer' : 'Renter'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={lead.status} />
            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate(`/leads/${lead.id}`)}>
                    <Eye className="mr-2 h-4 w-4" /> View Details
                  </DropdownMenuItem>
                  {onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(lead)}>
                      Edit Lead
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <DropdownMenuItem
                      onClick={() => onDelete(lead.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      Delete Lead
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              <span className="truncate max-w-32">{lead.email}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              <span>{lead.phone}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>{lead.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5" />
              <span>{formatBudget(lead.budgetMin, lead.budgetMax)}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-2">
              <PriorityBadge priority={lead.priority} />
              <span className="text-xs text-muted-foreground capitalize px-2 py-0.5 bg-muted rounded-full">
                {lead.source}
              </span>
            </div>
            {assignedAgent && (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={assignedAgent.avatar} />
                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                    {assignedAgent.name.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  {assignedAgent.name.split(' ')[0]}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
