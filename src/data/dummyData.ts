import { User, Lead, Activity, Assignment } from '@/types';

// Users with different roles
export const users: User[] = [
  {
    id: 'user-1',
    email: 'admin@realestate.com',
    password: 'admin123',
    name: 'Marcus Thompson',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-2',
    email: 'supervisor@realestate.com',
    password: 'super123',
    name: 'Sarah Mitchell',
    role: 'sales_supervisor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'user-3',
    email: 'agent1@realestate.com',
    password: 'agent123',
    name: 'James Wilson',
    role: 'sales_agent',
    supervisorId: 'user-2',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'user-4',
    email: 'agent2@realestate.com',
    password: 'agent123',
    name: 'Emily Chen',
    role: 'sales_agent',
    supervisorId: 'user-2',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 'user-5',
    email: 'agent3@realestate.com',
    password: 'agent123',
    name: 'Michael Brown',
    role: 'sales_agent',
    supervisorId: 'user-2',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-03-01T00:00:00Z',
  },
];

// Leads data
export const leads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Robert Anderson',
    email: 'robert.anderson@email.com',
    phone: '+1 (555) 123-4567',
    propertyInterest: 'buy',
    budgetMin: 500000,
    budgetMax: 750000,
    location: 'Downtown Manhattan',
    source: 'website',
    priority: 'high',
    status: 'promising',
    assignedTo: 'user-3',
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-06-15T14:30:00Z',
    notes: 'Looking for a 2-bedroom apartment with city view. Very motivated buyer.',
  },
  {
    id: 'lead-2',
    name: 'Jennifer Lopez',
    email: 'j.lopez@email.com',
    phone: '+1 (555) 234-5678',
    propertyInterest: 'rent',
    budgetMin: 3000,
    budgetMax: 5000,
    location: 'Brooklyn Heights',
    source: 'referral',
    priority: 'medium',
    status: 'contacted',
    assignedTo: 'user-3',
    createdAt: '2024-06-05T09:00:00Z',
    updatedAt: '2024-06-12T11:00:00Z',
    notes: 'Relocating for work, needs pet-friendly apartment.',
  },
  {
    id: 'lead-3',
    name: 'William Chen',
    email: 'w.chen@email.com',
    phone: '+1 (555) 345-6789',
    propertyInterest: 'buy',
    budgetMin: 1000000,
    budgetMax: 1500000,
    location: 'Upper East Side',
    source: 'call',
    priority: 'high',
    status: 'new',
    assignedTo: 'user-4',
    createdAt: '2024-06-18T15:00:00Z',
    updatedAt: '2024-06-18T15:00:00Z',
    notes: 'Investment property, cash buyer.',
  },
  {
    id: 'lead-4',
    name: 'Maria Garcia',
    email: 'maria.g@email.com',
    phone: '+1 (555) 456-7890',
    propertyInterest: 'buy',
    budgetMin: 800000,
    budgetMax: 1200000,
    location: 'SoHo',
    source: 'website',
    priority: 'high',
    status: 'converted',
    assignedTo: 'user-4',
    createdAt: '2024-05-01T10:00:00Z',
    updatedAt: '2024-06-10T16:00:00Z',
    notes: 'Successfully closed! Purchased 3BR loft.',
  },
  {
    id: 'lead-5',
    name: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1 (555) 567-8901',
    propertyInterest: 'rent',
    budgetMin: 2000,
    budgetMax: 3500,
    location: 'Williamsburg',
    source: 'referral',
    priority: 'low',
    status: 'future',
    assignedTo: 'user-5',
    createdAt: '2024-06-10T08:00:00Z',
    updatedAt: '2024-06-14T10:00:00Z',
    notes: 'Not ready to move for 6 months, follow up in September.',
  },
  {
    id: 'lead-6',
    name: 'Amanda White',
    email: 'a.white@email.com',
    phone: '+1 (555) 678-9012',
    propertyInterest: 'buy',
    budgetMin: 600000,
    budgetMax: 900000,
    location: 'Chelsea',
    source: 'website',
    priority: 'medium',
    status: 'lost',
    assignedTo: 'user-5',
    createdAt: '2024-05-15T11:00:00Z',
    updatedAt: '2024-06-08T09:00:00Z',
    notes: 'Found property with another agency.',
  },
  {
    id: 'lead-7',
    name: 'Thomas Johnson',
    email: 't.johnson@email.com',
    phone: '+1 (555) 789-0123',
    propertyInterest: 'buy',
    budgetMin: 2000000,
    budgetMax: 3000000,
    location: 'Tribeca',
    source: 'call',
    priority: 'high',
    status: 'promising',
    assignedTo: 'user-3',
    createdAt: '2024-06-12T14:00:00Z',
    updatedAt: '2024-06-17T16:00:00Z',
    notes: 'Looking for luxury penthouse with terrace.',
  },
  {
    id: 'lead-8',
    name: 'Lisa Martinez',
    email: 'lisa.m@email.com',
    phone: '+1 (555) 890-1234',
    propertyInterest: 'rent',
    budgetMin: 4000,
    budgetMax: 6000,
    location: 'Financial District',
    source: 'website',
    priority: 'medium',
    status: 'contacted',
    assignedTo: 'user-4',
    createdAt: '2024-06-15T10:00:00Z',
    updatedAt: '2024-06-16T11:00:00Z',
    notes: 'Corporate relocation, needs furnished apartment.',
  },
];

// Activity logs
export const activities: Activity[] = [
  {
    id: 'act-1',
    leadId: 'lead-1',
    userId: 'user-3',
    type: 'call',
    description: 'Initial discovery call - discussed requirements and budget',
    date: '2024-06-02T10:00:00Z',
    duration: 25,
  },
  {
    id: 'act-2',
    leadId: 'lead-1',
    userId: 'user-3',
    type: 'meeting',
    description: 'Property viewing at 425 Park Avenue',
    date: '2024-06-08T14:00:00Z',
    duration: 60,
  },
  {
    id: 'act-3',
    leadId: 'lead-1',
    userId: 'user-3',
    type: 'status_change',
    description: 'Status changed from Contacted to Promising',
    date: '2024-06-08T16:00:00Z',
  },
  {
    id: 'act-4',
    leadId: 'lead-2',
    userId: 'user-3',
    type: 'call',
    description: 'Follow-up call to discuss available properties',
    date: '2024-06-10T11:00:00Z',
    duration: 15,
  },
  {
    id: 'act-5',
    leadId: 'lead-3',
    userId: 'user-4',
    type: 'comment',
    description: 'Lead submitted inquiry through website contact form',
    date: '2024-06-18T15:00:00Z',
  },
  {
    id: 'act-6',
    leadId: 'lead-4',
    userId: 'user-4',
    type: 'meeting',
    description: 'Final walkthrough and contract signing',
    date: '2024-06-10T10:00:00Z',
    duration: 120,
  },
  {
    id: 'act-7',
    leadId: 'lead-4',
    userId: 'user-4',
    type: 'status_change',
    description: 'Deal closed! Status changed to Converted',
    date: '2024-06-10T16:00:00Z',
  },
  {
    id: 'act-8',
    leadId: 'lead-7',
    userId: 'user-3',
    type: 'call',
    description: 'Introduced available luxury properties in Tribeca',
    date: '2024-06-13T10:00:00Z',
    duration: 30,
  },
  {
    id: 'act-9',
    leadId: 'lead-7',
    userId: 'user-3',
    type: 'meeting',
    description: 'Showed 3 penthouses, client very interested in One Tribeca Park',
    date: '2024-06-17T14:00:00Z',
    duration: 180,
  },
  {
    id: 'act-10',
    leadId: 'lead-6',
    userId: 'user-5',
    type: 'status_change',
    description: 'Marked as lost - client went with competitor',
    date: '2024-06-08T09:00:00Z',
  },
];

// Helper functions to manage data with localStorage
const STORAGE_KEYS = {
  USERS: 'crm_users',
  LEADS: 'crm_leads',
  ACTIVITIES: 'crm_activities',
  CURRENT_USER: 'crm_current_user',
};

export const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }
  if (!localStorage.getItem(STORAGE_KEYS.LEADS)) {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }
};

export const getUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : users;
};

export const getLeads = (): Lead[] => {
  const data = localStorage.getItem(STORAGE_KEYS.LEADS);
  return data ? JSON.parse(data) : leads;
};

export const getActivities = (): Activity[] => {
  const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
  return data ? JSON.parse(data) : activities;
};

export const saveUsers = (data: User[]) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(data));
};

export const saveLeads = (data: Lead[]) => {
  localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(data));
};

export const saveActivities = (data: Activity[]) => {
  localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(data));
};

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export const addLead = (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Lead => {
  const leads = getLeads();
  const newLead: Lead = {
    ...lead,
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  leads.push(newLead);
  saveLeads(leads);
  return newLead;
};

export const updateLead = (id: string, updates: Partial<Lead>): Lead | null => {
  const leads = getLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index === -1) return null;
  
  leads[index] = {
    ...leads[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveLeads(leads);
  return leads[index];
};

export const deleteLead = (id: string): boolean => {
  const leads = getLeads();
  const filtered = leads.filter(l => l.id !== id);
  if (filtered.length === leads.length) return false;
  saveLeads(filtered);
  return true;
};

export const addActivity = (activity: Omit<Activity, 'id'>): Activity => {
  const activities = getActivities();
  const newActivity: Activity = {
    ...activity,
    id: `act-${Date.now()}`,
  };
  activities.unshift(newActivity);
  saveActivities(activities);
  return newActivity;
};

export const addUser = (user: Omit<User, 'id' | 'createdAt'>): User => {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const updateUser = (id: string, updates: Partial<User>): User | null => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  
  users[index] = { ...users[index], ...updates };
  saveUsers(users);
  return users[index];
};

export const deleteUser = (id: string): boolean => {
  const users = getUsers();
  const filtered = users.filter(u => u.id !== id);
  if (filtered.length === users.length) return false;
  saveUsers(filtered);
  return true;
};
