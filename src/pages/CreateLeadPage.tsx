import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { addLead, getUsers, addActivity } from '@/data/dummyData';
import { LeadStatus, LeadPriority, PropertyInterest, LeadSource } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CreateLeadPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const users = getUsers();
  const salesAgents = users.filter((u) => u.role === 'sales_agent');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyInterest: 'buy' as PropertyInterest,
    budgetMin: '',
    budgetMax: '',
    location: '',
    source: 'website' as LeadSource,
    priority: 'medium' as LeadPriority,
    status: 'new' as LeadStatus,
    assignedTo: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.budgetMin) newErrors.budgetMin = 'Min budget is required';
    if (!formData.budgetMax) newErrors.budgetMax = 'Max budget is required';
    if (Number(formData.budgetMin) > Number(formData.budgetMax))
      newErrors.budgetMax = 'Max must be greater than min';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form.',
        variant: 'destructive',
      });
      return;
    }

    const newLead = addLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      propertyInterest: formData.propertyInterest,
      budgetMin: Number(formData.budgetMin),
      budgetMax: Number(formData.budgetMax),
      location: formData.location,
      source: formData.source,
      priority: formData.priority,
      status: formData.status,
      assignedTo: formData.assignedTo || undefined,
      notes: formData.notes || undefined,
    });

    // Log activity
    if (user) {
      addActivity({
        leadId: newLead.id,
        userId: user.id,
        type: 'comment',
        description: 'Lead created',
        date: new Date().toISOString(),
      });
    }

    toast({
      title: 'Lead created',
      description: `${formData.name} has been added successfully.`,
    });

    navigate('/leads');
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <AppLayout title="Create Lead" subtitle="Add a new lead to the system">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">New Lead</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter full name"
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Enter email address"
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Preferred Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g., Downtown Manhattan"
                  className={errors.location ? 'border-destructive' : ''}
                />
                {errors.location && (
                  <p className="text-xs text-destructive">{errors.location}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Property Requirements */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Property Requirements</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Property Interest *</Label>
                <Select
                  value={formData.propertyInterest}
                  onValueChange={(value) => handleChange('propertyInterest', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="rent">Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Lead Source</Label>
                <Select
                  value={formData.source}
                  onValueChange={(value) => handleChange('source', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="call">Phone Call</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budgetMin">
                  Min Budget ($) *
                </Label>
                <Input
                  id="budgetMin"
                  type="number"
                  value={formData.budgetMin}
                  onChange={(e) => handleChange('budgetMin', e.target.value)}
                  placeholder="500000"
                  className={errors.budgetMin ? 'border-destructive' : ''}
                />
                {errors.budgetMin && (
                  <p className="text-xs text-destructive">{errors.budgetMin}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="budgetMax">
                  Max Budget ($) *
                </Label>
                <Input
                  id="budgetMax"
                  type="number"
                  value={formData.budgetMax}
                  onChange={(e) => handleChange('budgetMax', e.target.value)}
                  placeholder="1000000"
                  className={errors.budgetMax ? 'border-destructive' : ''}
                />
                {errors.budgetMax && (
                  <p className="text-xs text-destructive">{errors.budgetMax}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Lead Classification */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Lead Classification</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => handleChange('priority', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Initial Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Assign to Agent</Label>
                <Select
                  value={formData.assignedTo}
                  onValueChange={(value) => handleChange('assignedTo', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {salesAgents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Add any additional notes about this lead..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary">
              <Save className="mr-2 h-4 w-4" />
              Create Lead
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
