import { useMemo, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { getLeads, getUsers, getActivities, getMeetings } from '@/data/dummyData';
import { StatCard } from '@/components/shared/StatCard';
import { Calendar } from '@/components/ui/calendar';
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
  MessageSquare,
} from 'lucide-react';

import { mockMeetings } from '@/data/dummyData';
import { Badge } from '@/components/ui/badge';
import { format, parseISO, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, Clock, MapPin, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const meetingTypeColors = {
  showing: 'bg-accent/10 text-accent border-accent/20',
  consultation: 'bg-info/10 text-info border-info/20',
  closing: 'bg-success/10 text-success border-success/20',
  follow_up: 'bg-primary/10 text-primary border-primary/20',
};



export default function CalendarPage() {
  const { user } = useAuth();
  const leads = getLeads();
  const meetings = getMeetings();
  const users = getUsers();
   const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const selectedDateMeetings = meetings.filter(meeting => 
    selectedDate && isSameDay(parseISO(meeting.date), selectedDate)
  );

  const meetingDates = meetings.map(m => parseISO(m.date));

  return (
    <AppLayout
      title={"Calendar"}
      subtitle="Manage your meetings and property showings"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-2xl p-6 shadow-md">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md"
              modifiers={{
                hasMeeting: meetingDates
              }}
              modifiersStyles={{
                hasMeeting: {
                  fontWeight: 'bold',
                  backgroundColor: 'hsl(var(--accent) / 0.1)',
                  color: 'hsl(var(--accent))'
                }
              }}
            />
          </div>
        </div>

        {/* Selected Date Meetings */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-6">
              <CalendarIcon className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-lg">
                {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
              </h3>
            </div>

            {selectedDateMeetings.length > 0 ? (
              <div className="space-y-4">
                {selectedDateMeetings.map((meeting, index) => (
                  <div 
                    key={meeting.id}
                    className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{meeting.title}</h4>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <User className="w-4 h-4" />
                          <span>{meeting.leadName}</span>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={cn("capitalize", meetingTypeColors[meeting.type])}
                      >
                        {meeting.type.replace('_', ' ')}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{meeting.time} ({meeting.duration} min)</span>
                      </div>
                      {meeting.propertyAddress && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate max-w-xs">{meeting.propertyAddress}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No meetings scheduled for this date.</p>
              </div>
            )}
          </div>

          {/* All Upcoming Meetings */}
          <div className="bg-card rounded-2xl p-6 shadow-md mt-6">
            <h3 className="font-semibold text-lg mb-6">All Upcoming Meetings</h3>
            <div className="space-y-3">
              {mockMeetings
                .filter(m => m.status === 'scheduled')
                .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
                .map((meeting) => (
                  <div 
                    key={meeting.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
                        <span className="text-xs text-muted-foreground">
                          {format(parseISO(meeting.date), 'MMM')}
                        </span>
                        <span className="text-lg font-bold text-primary">
                          {format(parseISO(meeting.date), 'd')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{meeting.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {meeting.time} • {meeting.leadName}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={cn("capitalize", meetingTypeColors[meeting.type])}
                    >
                      {meeting.type.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
