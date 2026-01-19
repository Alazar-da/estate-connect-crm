import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import {
  getLeads,
  getUsers,
  getActivities,
  updateLead,
  addActivity,
} from '@/data/dummyData';
import { Lead, Activity, LeadStatus } from '@/types';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { PriorityBadge } from '@/components/shared/PriorityBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Building2,
  Calendar,
  Clock,
  MessageSquare,
  PhoneCall,
  Users,
  Send,
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export default function LeadDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [lead, setLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newStatus, setNewStatus] = useState<LeadStatus | ''>('');

  const users = getUsers();

  useEffect(() => {
    const leads = getLeads();
    const foundLead = leads.find((l) => l.id === id);
    if (foundLead) {
      setLead(foundLead);
      setNewStatus(foundLead.status);
    }

    const allActivities = getActivities();
    setActivities(allActivities.filter((a) => a.leadId === id));
  }, [id]);

  const assignedAgent = useMemo(
    () => users.find((u) => u.id === lead?.assignedTo),
    [users, lead]
  );

  const handleStatusChange = (status: LeadStatus) => {
    if (!lead || !user) return;

    const updated = updateLead(lead.id, { status });
    if (updated) {
      setLead(updated);
      setNewStatus(status);

      // Log activity
      addActivity({
        leadId: lead.id,
        userId: user.id,
        type: 'status_change',
        description: `Status changed from ${lead.status} to ${status}`,
        date: new Date().toISOString(),
      });

      setActivities(getActivities().filter((a) => a.leadId === id));

      toast({
        title: 'Status updated',
        description: `Lead status changed to ${status}`,
      });
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !lead || !user) return;

    addActivity({
      leadId: lead.id,
      userId: user.id,
      type: 'comment',
      description: newComment,
      date: new Date().toISOString(),
    });

    setActivities(getActivities().filter((a) => a.leadId === id));
    setNewComment('');

    toast({
      title: 'Comment added',
      description: 'Your comment has been saved.',
    });
  };

  const handleLogCall = () => {
    if (!lead || !user) return;

    addActivity({
      leadId: lead.id,
      userId: user.id,
      type: 'call',
      description: 'Phone call with client',
      date: new Date().toISOString(),
      duration: 15,
    });

    setActivities(getActivities().filter((a) => a.leadId === id));

    toast({
      title: 'Call logged',
      description: 'Call activity has been recorded.',
    });
  };

  const handleLogMeeting = () => {
    if (!lead || !user) return;

    addActivity({
      leadId: lead.id,
      userId: user.id,
      type: 'meeting',
      description: 'Meeting scheduled with client',
      date: new Date().toISOString(),
      duration: 60,
    });

    setActivities(getActivities().filter((a) => a.leadId === id));

    toast({
      title: 'Meeting logged',
      description: 'Meeting activity has been recorded.',
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call':
        return PhoneCall;
      case 'meeting':
        return Users;
      case 'comment':
        return MessageSquare;
      case 'status_change':
        return Clock;
      default:
        return MessageSquare;
    }
  };

  const formatBudget = (min: number, max: number) => {
    const formatNumber = (n: number) => {
      if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
      if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
      return `$${n}`;
    };
    return `${formatNumber(min)} - ${formatNumber(max)}`;
  };

  if (!lead) {
    return (
      <AppLayout title="Lead Not Found">
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-muted-foreground">Lead not found or has been deleted.</p>
          <Button variant="link" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Lead Details" subtitle={lead.name}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{lead.name}</h1>
              <StatusBadge status={lead.status} />
              <PriorityBadge priority={lead.priority} />
            </div>
            <p className="text-muted-foreground capitalize">
              {lead.propertyInterest === 'buy' ? 'Buyer' : 'Renter'} • {lead.source}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{lead.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{lead.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{lead.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="font-medium">
                      {formatBudget(lead.budgetMin, lead.budgetMax)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            {lead.notes && (
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{lead.notes}</p>
                </CardContent>
              </Card>
            )}

            {/* Activity Timeline */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add Comment */}
                <div className="mb-6 pb-6 border-b">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-3"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="gradient-primary"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Add Comment
                    </Button>
                    <Button variant="outline" onClick={handleLogCall}>
                      <PhoneCall className="mr-2 h-4 w-4" />
                      Log Call
                    </Button>
                    <Button variant="outline" onClick={handleLogMeeting}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Log Meeting
                    </Button>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  {activities.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No activity yet
                    </p>
                  ) : (
                    activities.map((activity) => {
                      const Icon = getActivityIcon(activity.type);
                      const activityUser = users.find((u) => u.id === activity.userId);

                      return (
                        <div key={activity.id} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="w-px flex-1 bg-border mt-2" />
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-foreground capitalize">
                                {activity.type.replace('_', ' ')}
                              </span>
                              {activity.duration && (
                                <span className="text-xs text-muted-foreground">
                                  ({activity.duration} min)
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {activity.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              {activityUser && (
                                <>
                                  <Avatar className="h-5 w-5">
                                    <AvatarImage src={activityUser.avatar} />
                                    <AvatarFallback className="text-[8px]">
                                      {activityUser.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{activityUser.name}</span>
                                  <span>•</span>
                                </>
                              )}
                              <span>
                                {format(new Date(activity.date), 'MMM d, yyyy h:mm a')}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Update */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Update Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={newStatus}
                  onValueChange={(value) => handleStatusChange(value as LeadStatus)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="promising">Promising</SelectItem>
                    <SelectItem value="future">Future</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Assigned Agent */}
            {assignedAgent && (
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">Assigned Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={assignedAgent.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {assignedAgent.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{assignedAgent.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {assignedAgent.email}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Metadata */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span>{format(new Date(lead.createdAt), 'MMM d, yyyy')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span>{format(new Date(lead.updatedAt), 'MMM d, yyyy')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Source</span>
                  <span className="capitalize">{lead.source}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Interest</span>
                  <span className="capitalize">{lead.propertyInterest}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
