import { useMemo } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { getLeads, getUsers, getActivities } from '@/data/dummyData';
import { StatCard } from '@/components/shared/StatCard';
import { LeadCard } from '@/components/leads/LeadCard';
import { LeadsChart } from '@/components/charts/LeadsChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  TrendingUp,
  Target,
  DollarSign,
  ClipboardList,
  ArrowUpRight,
  Phone,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import { format } from 'date-fns';

export default function Dashboard() {
  const { user } = useAuth();
  const leads = getLeads();
  const users = getUsers();
  const activities = getActivities();

  const stats = useMemo(() => {
    let filteredLeads = leads;

    // Filter leads based on role
    if (user?.role === 'sales_agent') {
      filteredLeads = leads.filter((l) => l.assignedTo === user.id);
    }

    const totalLeads = filteredLeads.length;
    const newLeads = filteredLeads.filter((l) => l.status === 'new').length;
    const promisingLeads = filteredLeads.filter((l) => l.status === 'promising').length;
    const convertedLeads = filteredLeads.filter((l) => l.status === 'converted').length;
    const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0';

    return {
      totalLeads,
      newLeads,
      promisingLeads,
      convertedLeads,
      conversionRate,
    };
  }, [leads, user]);

  const recentLeads = useMemo(() => {
    let filteredLeads = leads;
    if (user?.role === 'sales_agent') {
      filteredLeads = leads.filter((l) => l.assignedTo === user.id);
    }
    return filteredLeads
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 4);
  }, [leads, user]);

  const recentActivities = useMemo(() => {
    let filteredActivities = activities;
    if (user?.role === 'sales_agent') {
      filteredActivities = activities.filter((a) => a.userId === user.id);
    }
    return filteredActivities
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [activities, user]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call':
        return Phone;
      case 'meeting':
        return Calendar;
      case 'comment':
      case 'status_change':
        return MessageSquare;
      default:
        return ClipboardList;
    }
  };

  const getLeadById = (id: string) => leads.find((l) => l.id === id);
  const getUserById = (id: string) => users.find((u) => u.id === id);

  const greetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <AppLayout
      title={`${greetingMessage()}, ${user?.name.split(' ')[0]}!`}
      subtitle="Here's what's happening with your leads today"
    >
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 stagger-children">
          <StatCard
            title="Total Leads"
            value={stats.totalLeads}
            icon={ClipboardList}
            trend={{ value: 12, isPositive: true }}
            variant="primary"
          />
          <StatCard
            title="New Leads"
            value={stats.newLeads}
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Promising"
            value={stats.promisingLeads}
            icon={Target}
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Conversion Rate"
            value={`${stats.conversionRate}%`}
            icon={TrendingUp}
            trend={{ value: 3, isPositive: true }}
            variant="secondary"
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <LeadsChart leads={leads} type="bar" title="Leads by Status" />
          <LeadsChart leads={leads} type="pie" title="Status Distribution" />
        </div>

        {/* Recent Leads and Activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Leads */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Recent Leads</h2>
              <a
                href={user?.role === 'sales_agent' ? '/my-leads' : '/leads'}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View all <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {recentLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  assignedAgent={getUserById(lead.assignedTo || '')}
                  showActions={false}
                />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            <Card className="border-0 shadow-card">
              <CardContent className="p-4 space-y-4">
                {recentActivities.map((activity) => {
                  const lead = getLeadById(activity.leadId);
                  const activityUser = getUserById(activity.userId);
                  const Icon = getActivityIcon(activity.type);

                  return (
                    <div
                      key={activity.id}
                      className="flex gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground line-clamp-2">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {lead && (
                            <span className="text-xs text-muted-foreground truncate">
                              {lead.name}
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(activity.date), 'MMM d, h:mm a')}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Performance (for supervisors and admins) */}
        {user?.role !== 'sales_agent' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Team Overview</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {users
                .filter((u) => u.role === 'sales_agent')
                .map((agent) => {
                  const agentLeads = leads.filter((l) => l.assignedTo === agent.id);
                  const converted = agentLeads.filter((l) => l.status === 'converted').length;

                  return (
                    <Card key={agent.id} className="border-0 shadow-card">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={agent.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {agent.name.split(' ').map((n) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{agent.name}</p>
                            <p className="text-sm text-muted-foreground">Sales Agent</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border/50">
                          <div className="text-center">
                            <p className="text-xl font-bold text-foreground">
                              {agentLeads.length}
                            </p>
                            <p className="text-xs text-muted-foreground">Leads</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xl font-bold text-foreground">{converted}</p>
                            <p className="text-xs text-muted-foreground">Converted</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xl font-bold text-foreground">
                              {agentLeads.length > 0
                                ? ((converted / agentLeads.length) * 100).toFixed(0)
                                : 0}
                              %
                            </p>
                            <p className="text-xs text-muted-foreground">Rate</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
