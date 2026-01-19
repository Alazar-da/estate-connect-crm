import { useMemo } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { getLeads, getUsers, getActivities } from '@/data/dummyData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { TrendingUp, Users, Target, Phone } from 'lucide-react';
import { StatCard } from '@/components/shared/StatCard';

export default function PerformancePage() {
  const leads = getLeads();
  const users = getUsers();
  const activities = getActivities();

  const salesAgents = users.filter((u) => u.role === 'sales_agent');

  const agentPerformance = useMemo(() => {
    return salesAgents.map((agent) => {
      const agentLeads = leads.filter((l) => l.assignedTo === agent.id);
      const converted = agentLeads.filter((l) => l.status === 'converted').length;
      const promising = agentLeads.filter((l) => l.status === 'promising').length;
      const agentActivities = activities.filter((a) => a.userId === agent.id);
      const calls = agentActivities.filter((a) => a.type === 'call').length;
      const meetings = agentActivities.filter((a) => a.type === 'meeting').length;

      return {
        id: agent.id,
        name: agent.name,
        avatar: agent.avatar,
        totalLeads: agentLeads.length,
        converted,
        promising,
        conversionRate:
          agentLeads.length > 0
            ? ((converted / agentLeads.length) * 100).toFixed(1)
            : '0',
        calls,
        meetings,
        activities: agentActivities.length,
      };
    });
  }, [salesAgents, leads, activities]);

  const chartData = agentPerformance.map((agent) => ({
    name: agent.name.split(' ')[0],
    leads: agent.totalLeads,
    converted: agent.converted,
    rate: parseFloat(agent.conversionRate),
  }));

  const totalStats = useMemo(() => {
    const totalLeads = leads.length;
    const totalConverted = leads.filter((l) => l.status === 'converted').length;
    const totalCalls = activities.filter((a) => a.type === 'call').length;
    const avgConversion =
      totalLeads > 0 ? ((totalConverted / totalLeads) * 100).toFixed(1) : '0';

    return {
      totalLeads,
      totalConverted,
      totalCalls,
      avgConversion,
    };
  }, [leads, activities]);

  return (
    <AppLayout
      title="Team Performance"
      subtitle="Monitor and analyze your team's performance"
    >
      <div className="space-y-8">
        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Team Leads"
            value={totalStats.totalLeads}
            icon={Users}
            variant="primary"
          />
          <StatCard
            title="Total Conversions"
            value={totalStats.totalConverted}
            icon={Target}
          />
          <StatCard
            title="Total Calls"
            value={totalStats.totalCalls}
            icon={Phone}
          />
          <StatCard
            title="Avg. Conversion Rate"
            value={`${totalStats.avgConversion}%`}
            icon={TrendingUp}
            variant="secondary"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Leads by Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="name"
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
                    <Bar dataKey="leads" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Total Leads" />
                    <Bar dataKey="converted" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="Converted" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Conversion Rate by Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      formatter={(value) => [`${value}%`, 'Conversion Rate']}
                    />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Cards */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Individual Performance</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {agentPerformance.map((agent) => (
              <Card key={agent.id} className="border-0 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={agent.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        {agent.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-lg">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">Sales Agent</p>
                    </div>
                  </div>

                  {/* Conversion Progress */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Conversion Rate</span>
                      <span className="font-medium">{agent.conversionRate}%</span>
                    </div>
                    <Progress value={parseFloat(agent.conversionRate)} className="h-2" />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {agent.totalLeads}
                      </p>
                      <p className="text-xs text-muted-foreground">Total Leads</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {agent.converted}
                      </p>
                      <p className="text-xs text-muted-foreground">Converted</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{agent.calls}</p>
                      <p className="text-xs text-muted-foreground">Calls</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {agent.meetings}
                      </p>
                      <p className="text-xs text-muted-foreground">Meetings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
