import { useState, useMemo } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { getLeads, getUsers, deleteLead } from '@/data/dummyData';
import { LeadCard } from '@/components/leads/LeadCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Filter, Grid, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Lead, LeadStatus, LeadPriority } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface LeadsPageProps {
  myLeadsOnly?: boolean;
}

export default function LeadsPage({ myLeadsOnly = false }: LeadsPageProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [leads, setLeads] = useState(getLeads());
  const users = getUsers();

  const filteredLeads = useMemo(() => {
    let result = leads;

    // Filter by assignment for sales agents
    if (myLeadsOnly || user?.role === 'sales_agent') {
      result = result.filter((l) => l.assignedTo === user?.id);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.location.toLowerCase().includes(query) ||
          lead.phone.includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((lead) => lead.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      result = result.filter((lead) => lead.priority === priorityFilter);
    }

    return result.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [leads, searchQuery, statusFilter, priorityFilter, myLeadsOnly, user]);

  const getUserById = (id: string) => users.find((u) => u.id === id);

  const handleDeleteLead = (leadId: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      const success = deleteLead(leadId);
      if (success) {
        setLeads(getLeads());
        toast({
          title: 'Lead deleted',
          description: 'The lead has been removed successfully.',
        });
      }
    }
  };

  const pageTitle = myLeadsOnly ? 'My Leads' : 'All Leads';
  const pageSubtitle = myLeadsOnly
    ? 'View and manage your assigned leads'
    : 'Manage all leads in your organization';

  return (
    <AppLayout title={pageTitle} subtitle={pageSubtitle}>
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="promising">Promising</SelectItem>
                <SelectItem value="future">Future</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex items-center border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Add Lead Button (for supervisors and admins) */}
            {user?.role !== 'sales_agent' && (
              <Button
                onClick={() => navigate('/leads/new')}
                className="gradient-primary hover:opacity-90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Lead
              </Button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground">
          Showing {filteredLeads.length} lead{filteredLeads.length !== 1 ? 's' : ''}
        </p>

        {/* Leads Grid/List */}
        {filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No leads found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
                : 'space-y-4'
            }
          >
            {filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                assignedAgent={getUserById(lead.assignedTo || '')}
                onDelete={user?.role !== 'sales_agent' ? handleDeleteLead : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
