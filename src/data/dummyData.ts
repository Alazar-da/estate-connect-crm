import { User, Lead, Activity, Assignment } from '@/types';

// Users with different roles
export const users: User[] = [
  {
    id: 'user-1',
    email: 'admin@realestate.com',
    password: 'admin123',
    name: 'Emran Hayredin',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-2',
    email: 'supervisor@realestate.com',
    password: 'super123',
    name: 'Alazar Damena',
    role: 'sales_supervisor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'user-3',
    email: 'agent1@realestate.com',
    password: 'agent123',
    name: 'Abenezer T',
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




export const mockMeetings: any[] = [
  {
    id: '1',
    title: 'Property Showing - Beverly Hills Estate',
    leadId: '1',
    leadName: 'Michael Chen',
    propertyId: '1',
    propertyAddress: '1234 Sunset Boulevard',
    date: '2024-01-20',
    time: '10:00',
    duration: 60,
    type: 'showing',
    status: 'scheduled',
    agent: 'Sarah Johnson'
  },
  {
    id: '2',
    title: 'Contract Review',
    leadId: '2',
    leadName: 'Emily Rodriguez',
    propertyId: '2',
    propertyAddress: '567 Grand Avenue, Unit PH1',
    date: '2024-01-20',
    time: '14:00',
    duration: 90,
    type: 'closing',
    status: 'scheduled',
    agent: 'Sarah Johnson'
  },
  {
    id: '3',
    title: 'Initial Consultation',
    leadId: '3',
    leadName: 'David Thompson',
    date: '2024-01-21',
    time: '11:00',
    duration: 45,
    type: 'consultation',
    status: 'scheduled',
    agent: 'James Wilson'
  },
  {
    id: '4',
    title: 'Follow-up Call',
    leadId: '4',
    leadName: 'Jennifer Park',
    date: '2024-01-22',
    time: '15:30',
    duration: 30,
    type: 'follow_up',
    status: 'scheduled',
    agent: 'Maria Garcia'
  },
];


// Add meeting function
export const addMeeting = (meeting: Omit<typeof mockMeetings[0], 'id'>): typeof mockMeetings[0] => {
  const meetings = getMeetings();
  
  // Generate proper lead name if not provided
  let leadName = meeting.leadName;
  if (!leadName && meeting.leadId) {
    const leads = getLeads();
    const lead = leads.find(l => l.id === meeting.leadId);
    leadName = lead?.name || 'Unknown Lead';
  }
  
  const newMeeting = {
    ...meeting,
    id: `meeting-${Date.now()}`,
    leadName: leadName,
  };
  
  meetings.push(newMeeting);
  saveMeetings(meetings);
  return newMeeting;
};

// Helper functions to manage meetings in localStorage
const MEETINGS_STORAGE_KEY = 'crm_meetings';

export const getMeetings = (): any[] => {
  const data = localStorage.getItem(MEETINGS_STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  } else {
    // Initialize with mock meetings if none exist
    saveMeetings(mockMeetings);
    return mockMeetings;
  }
};

export const saveMeetings = (meetings: any[]) => {
  localStorage.setItem(MEETINGS_STORAGE_KEY, JSON.stringify(meetings));
};

// Also update initializeData function to include meetings initialization
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
  if (!localStorage.getItem(MEETINGS_STORAGE_KEY)) {
    localStorage.setItem(MEETINGS_STORAGE_KEY, JSON.stringify(mockMeetings));
  }
};

// Optional: Add functions for updating and deleting meetings
export const updateMeeting = (id: string, updates: Partial<typeof mockMeetings[0]>): typeof mockMeetings[0] | null => {
  const meetings = getMeetings();
  const index = meetings.findIndex(m => m.id === id);
  if (index === -1) return null;
  
  meetings[index] = {
    ...meetings[index],
    ...updates,
  };
  saveMeetings(meetings);
  return meetings[index];
};

export const deleteMeeting = (id: string): boolean => {
  const meetings = getMeetings();
  const filtered = meetings.filter(m => m.id !== id);
  if (filtered.length === meetings.length) return false;
  saveMeetings(filtered);
  return true;
};

// Optional: Get meetings by agent ID
export const getMeetingsByAgent = (agentId: string): any[] => {
  const meetings = getMeetings();
  // Assuming the 'agent' field contains the agent's name or ID
  // You might need to adjust this based on your data structure
  return meetings.filter(meeting => meeting.agent === agentId || meeting.agentId === agentId);
};

// Optional: Get meetings by lead ID
export const getMeetingsByLead = (leadId: string): any[] => {
  const meetings = getMeetings();
  return meetings.filter(meeting => meeting.leadId === leadId);
};



export const mockProperties:any[] = [
  {
    id: '1',
    title: 'Abay Homes Downtown',
    address: 'African Union Headquarters',
    city: 'Addis Ababa',
    state: 'AA',
    zipCode: '1000',
    price: 2450000,
    type: 'house',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4200,
    yearBuilt: 2019,
    status: 'active',
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'],
    mlsNumber: 'MLS-2024-001',
    description: 'Stunning modern estate with panoramic city views',
    features: ['Pool', 'Smart Home', 'Wine Cellar', 'Home Theater'],
    listedDate: '2024-01-10',
    agent: 'Sarah Johnson'
  },
  {
    id: '2',
     title: 'Abay Homes Complex',
  address: 'African Union Headquarters',
    city: 'Addis Ababa',
    state: 'AA',
    zipCode: '1000',
    price: 1850000,
    type: 'condo',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2800,
    yearBuilt: 2021,
    status: 'pending',
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
    mlsNumber: 'MLS-2024-002',
    description: 'Ultra-modern penthouse with 360-degree views',
    features: ['Rooftop Access', 'Concierge', 'Gym', 'Valet Parking'],
    listedDate: '2024-01-05',
    agent: 'Sarah Johnson'
  },
  {
    id: '3',
    title: 'Abay Homes Complex2',
    address: 'African Union Headquarters',
    city: 'Addis Ababa',
    state: 'AA',
    zipCode: '1000',
    price: 895000,
    type: 'house',
    bedrooms: 4,
    bathrooms: 2,
    sqft: 2400,
    yearBuilt: 1925,
    status: 'active',
    images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
    mlsNumber: 'MLS-2024-003',
    description: 'Beautifully restored craftsman with original details',
    features: ['Original Woodwork', 'Garden', 'Updated Kitchen', 'Detached Garage'],
    listedDate: '2024-01-15',
    agent: 'Maria Garcia'
  },
  {
    id: '4',
  title: 'Abay Homes Complex3',
  address: 'African Union Headquarters',
    city: 'Addis Ababa',
    state: 'AA',
    zipCode: '1000',
    price: 1250000,
    type: 'condo',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1600,
    yearBuilt: 2018,
    status: 'active',
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
    mlsNumber: 'MLS-2024-004',
    description: 'Steps from the beach with stunning ocean views',
    features: ['Ocean View', 'Balcony', 'Parking', 'Fitness Center'],
    listedDate: '2024-01-12',
    agent: 'James Wilson'
  },
];
