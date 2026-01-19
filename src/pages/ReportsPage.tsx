import { useMemo } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { getLeads, getUsers, getActivities } from '@/data/dummyData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { format } from 'date-fns';

const SOURCE_COLORS = {
  website: '#3b82f6',
  referral: '#10b981',
  call: '#f59e0b',
  social: '#8b5cf6',
  other: '#6b7280',
};

const INTEREST_COLORS = {
  buy: 'hsl(var(--primary))',
  rent: 'hsl(var(--secondary))',
};

export default function ReportsPage() {
  const leads = getLeads();
  const users = getUsers();
  const activities = getActivities();

  // Source Distribution
  const sourceData = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((lead) => {
      counts[lead.source] = (counts[lead.source] || 0) + 1;
    });

    return Object.entries(counts).map(([source, count]) => ({
      name: source.charAt(0).toUpperCase() + source.slice(1),
      value: count,
      fill: SOURCE_COLORS[source as keyof typeof SOURCE_COLORS] || '#6b7280',
    }));
  }, [leads]);

  // Interest Distribution
  const interestData = useMemo(() => {
    const buyers = leads.filter((l) => l.propertyInterest === 'buy').length;
    const renters = leads.filter((l) => l.propertyInterest === 'rent').length;

    return [
      { name: 'Buyers', value: buyers, fill: INTEREST_COLORS.buy },
      { name: 'Renters', value: renters, fill: INTEREST_COLORS.rent },
    ];
  }, [leads]);

  // Monthly Lead Trend (simplified for demo)
  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, i) => ({
      month,
      leads: Math.floor(Math.random() * 20) + 10 + i * 2,
      conversions: Math.floor(Math.random() * 8) + 2 + Math.floor(i * 0.5),
    }));
  }, []);

  // Top Performing Agents
  const topAgents = useMemo(() => {
    const salesAgents = users.filter((u) => u.role === 'sales_agent');

    return salesAgents
      .map((agent) => {
        const agentLeads = leads.filter((l) => l.assignedTo === agent.id);
        const converted = agentLeads.filter((l) => l.status === 'converted').length;
        const revenue = converted * 15000; // Assumed commission

        return {
          id: agent.id,
          name: agent.name,
          totalLeads: agentLeads.length,
          converted,
          conversionRate:
            agentLeads.length > 0
              ? ((converted / agentLeads.length) * 100).toFixed(1)
              : '0',
          revenue,
        };
      })
      .sort((a, b) => b.converted - a.converted);
  }, [users, leads]);

  // Recent Activity Summary
  const activitySummary = useMemo(() => {
    const now = new Date();
    const last7Days = activities.filter((a) => {
      const actDate = new Date(a.date);
      const diffDays = (now.getTime() - actDate.getTime()) / (1000 * 60 * 60 * 24);
      return diffDays <= 7;
    });

    return {
      totalActivities: last7Days.length,
      calls: last7Days.filter((a) => a.type === 'call').length,
      meetings: last7Days.filter((a) => a.type === 'meeting').length,
      comments: last7Days.filter((a) => a.type === 'comment').length,
    };
  }, [activities]);

  return (
    <AppLayout title="Reports" subtitle="Analytics and insights for your business">
      <div className="space-y-8">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-0 shadow-card">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Leads</p>
              <p className="text-3xl font-bold">{leads.length}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-card">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-3xl font-bold">
                {(
                  (leads.filter((l) => l.status === 'converted').length / leads.length) *
                  100
                ).toFixed(1)}
                %
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-card">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Active Agents</p>
              <p className="text-3xl font-bold">
                {users.filter((u) => u.role === 'sales_agent').length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-card">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">This Week Activities</p>
              <p className="text-3xl font-bold">{activitySummary.totalActivities}</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Lead Sources */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Lead Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Interest Type */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Interest Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={interestData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {interestData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Activity Breakdown */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Calls</span>
                  <span className="text-lg font-semibold">{activitySummary.calls}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Meetings</span>
                  <span className="text-lg font-semibold">{activitySummary.meetings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Comments</span>
                  <span className="text-lg font-semibold">{activitySummary.comments}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-lg font-bold">
                    {activitySummary.totalActivities}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trend */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Monthly Lead Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="leads"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    name="Leads"
                  />
                  <Bar
                    dataKey="conversions"
                    fill="hsl(var(--secondary))"
                    radius={[4, 4, 0, 0]}
                    name="Conversions"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Agents Table */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Agent Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead className="text-right">Total Leads</TableHead>
                  <TableHead className="text-right">Converted</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead className="text-right">Est. Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell className="text-right">{agent.totalLeads}</TableCell>
                    <TableCell className="text-right">{agent.converted}</TableCell>
                    <TableCell className="text-right">{agent.conversionRate}%</TableCell>
                    <TableCell className="text-right">
                      ${agent.revenue.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
