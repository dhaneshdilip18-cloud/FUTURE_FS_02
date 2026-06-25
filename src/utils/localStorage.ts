const LEADS_KEY = 'crm_leads';
const AUTH_KEY = 'crm_auth';
const SETTINGS_KEY = 'crm_settings';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  email: string;
  name: string;
  avatar?: string;
}

export interface Settings {
  notifications: boolean;
  darkMode: boolean;
  emailAlerts: boolean;
  soundEnabled: boolean;
  autoSave: boolean;
}

export const getLeads = (): Lead[] => {
  try {
    const data = localStorage.getItem(LEADS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveLeads = (leads: Lead[]): void => {
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
};

export const addLead = (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Lead => {
  const leads = getLeads();
  const newLead: Lead = {
    ...lead,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  leads.push(newLead);
  saveLeads(leads);
  return newLead;
};

export const updateLead = (id: string, updates: Partial<Lead>): Lead | null => {
  const leads = getLeads();
  const index = leads.findIndex((lead) => lead.id === id);
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
  const filtered = leads.filter((lead) => lead.id !== id);
  if (filtered.length === leads.length) return false;
  saveLeads(filtered);
  return true;
};

export const getAuth = (): User | null => {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const setAuth = (user: User | null): void => {
  if (user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
};

export const getSettings = (): Settings => {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data
      ? JSON.parse(data)
      : {
          notifications: true,
          darkMode: true,
          emailAlerts: true,
          soundEnabled: false,
          autoSave: true,
        };
  } catch {
    return {
      notifications: true,
      darkMode: true,
      emailAlerts: true,
      soundEnabled: false,
      autoSave: true,
    };
  }
};

export const saveSettings = (settings: Settings): void => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};
