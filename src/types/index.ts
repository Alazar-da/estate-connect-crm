export type UserRole = 'super_admin' | 'sales_supervisor' | 'sales_agent';

export type LeadStatus = 'new' | 'contacted' | 'promising' | 'future' | 'lost' | 'converted';

export type LeadPriority = 'low' | 'medium' | 'high';

export type PropertyInterest = 'buy' | 'rent';

export type LeadSource = 'website' | 'referral' | 'call' | 'social' | 'other';

export type ActivityType = 'call' | 'meeting' | 'comment' | 'status_change' | 'follow_up';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatar?: string;
  supervisorId?: string; // For sales agents
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest: PropertyInterest;
  budgetMin: number;
  budgetMax: number;
  location: string;
  source: LeadSource;
  priority: LeadPriority;
  status: LeadStatus;
  assignedTo?: string; // User ID
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  leadId: string;
  userId: string;
  type: ActivityType;
  description: string;
  date: string;
  duration?: number; // in minutes, for calls and meetings
}

export interface Assignment {
  id: string;
  leadId: string;
  agentId: string;
  assignedBy: string;
  assignedAt: string;
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  promisingLeads: number;
  convertedLeads: number;
  lostLeads: number;
  conversionRate: number;
}
