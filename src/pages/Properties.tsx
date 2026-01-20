import { useMemo, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { getLeads, getUsers, getActivities } from '@/data/dummyData';
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
import { Search, Grid, List, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockProperties } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PropertyCard } from '@/components/properties/PropertyCard';

const meetingTypeColors = {
  showing: 'bg-accent/10 text-accent border-accent/20',
  consultation: 'bg-info/10 text-info border-info/20',
  closing: 'bg-success/10 text-success border-success/20',
  follow_up: 'bg-primary/10 text-primary border-primary/20',
};



export default function PropertyPage() {
  const { user } = useAuth();
  const leads = getLeads();
  const users = getUsers();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = mockProperties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout
      title={"Properties"}
      subtitle={`${mockProperties.length} properties in your portfolio`}
    >
         <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search properties..." 
            className="pl-10 bg-card"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </Button>
          
          <div className="flex items-center border border-border rounded-lg p-1 bg-card">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className={cn(
        "grid gap-6",
        viewMode === 'grid' 
          ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
          : "grid-cols-1"
      )}>
        {filteredProperties.map((property, index) => (
          <div key={property.id} style={{ animationDelay: `${index * 50}ms` }}>
            <PropertyCard property={property} />
          </div>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No properties found matching your criteria.</p>
        </div>
      )}
    </AppLayout>
  );
}
