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
  addMeeting
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
  CalendarPlus2,
  File,
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { MeetingPopup } from '@/components/meetings/MeetingPopup';
import { FileSendPopup } from '@/components/files/FileSendPopup';

export default function LeadDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [lead, setLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newStatus, setNewStatus] = useState<LeadStatus | ''>('');
  const [showMeetingPopup, setShowMeetingPopup] = useState(false);
  const [showFileSendPopup, setShowFileSendPopup] = useState(false);

// Add these handler functions:
const handleScheduleMeeting = () => {
  setShowMeetingPopup(true);
};

const handleSendFile = () => {
  setShowFileSendPopup(true);
};

const handleFileSubmit = async (fileData: any) => {
  if (!lead || !user) return;

  try {
    // Add activity log for file sending
    addActivity({
      leadId: lead.id,
      userId: user.id,
      type: 'file_sent', // You might need to add this type to your Activity type
      description: `Sent ${fileData.fileType} file: ${fileData.fileName}. ${fileData.description}`,
      date: new Date().toISOString(),
  
    });

    // Update local activities state
    setActivities(getActivities().filter((a) => a.leadId === id));

    toast({
      title: 'File Sent',
      description: `${fileData.fileName} has been sent to ${lead.name}`,
    });

    setShowFileSendPopup(false);
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to send file. Please try again.',
      variant: 'destructive',
    });
  }
};

const handleMeetingSubmit = async (meetingData: any) => {
  if (!lead || !user) return;

  try {
    // 1. Add the meeting using addMeeting function
    const newMeeting = addMeeting({
      title: meetingData.title,
      leadId: lead.id,
      leadName: lead.name,
      propertyId: meetingData.propertyId,
      propertyAddress: meetingData.propertyAddress,
      date: meetingData.date,
      time: meetingData.time,
      duration: meetingData.duration,
      type: meetingData.type,
      status: 'scheduled',
      agent: user.name, // or user.id depending on your data structure
      agentId: user.id,
    });

    // 2. Add activity log for the meeting
    addActivity({
      leadId: lead.id,
      userId: user.id,
      type: 'meeting',
      description: `Scheduled ${meetingData.type} meeting: ${meetingData.title}`,
      date: new Date().toISOString(),
      duration: meetingData.duration,
      meetingId: newMeeting.id, // You might want to add this field to Activity type
    });

    // 3. Update local activities state
    setActivities(getActivities().filter((a) => a.leadId === id));

    toast({
      title: 'Meeting Scheduled',
      description: `Meeting with ${lead.name} has been scheduled successfully.`,
    });

  } catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to schedule meeting. Please try again.',
      variant: 'destructive',
    });
  }
};

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
      description: newComment || 'Call made to client',
      date: new Date().toISOString(),
      duration: 15,
    });

    setActivities(getActivities().filter((a) => a.leadId === id));
        setNewComment('');

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
        setNewComment('');

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
    <>
   
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
                <div className='flex justify-between items-center'>
                
                <CardTitle className="text-base">Activity Timeline</CardTitle>
                <div className="flex gap-2">
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
               <div className="flex gap-2 justify-between">
  <Button
    onClick={handleAddComment}
    disabled={!newComment.trim()}
    className="gradient-primary"
  >
    <Send className="mr-2 h-4 w-4" />
    Add Comment
  </Button>
<div className='flex gap-2'>
  <Button variant="outline" onClick={handleScheduleMeeting}>
    <CalendarPlus2 className="mr-2 h-4 w-4" />
    Schedule Meeting
  </Button>
 
  {/* Add the Send File button */}
  <Button variant="outline" onClick={handleSendFile}>
    <File className="mr-2 h-4 w-4" />
    Send File
  </Button>
  </div>
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

    {showMeetingPopup && lead && user && (
  <MeetingPopup
    isOpen={showMeetingPopup}
    onClose={() => setShowMeetingPopup(false)}
    leadId={lead.id}
    leadName={lead.name}
    onSubmit={handleMeetingSubmit}
    userId={user.id}
  />
)}

{showFileSendPopup && lead && user && (
  <FileSendPopup
    isOpen={showFileSendPopup}
    onClose={() => setShowFileSendPopup(false)}
    leadId={lead.id}
    leadName={lead.name}
    onSubmit={handleFileSubmit}
    userId={user.id}
  />
)}

     </>
  );
}
