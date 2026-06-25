import { Lead } from '../utils/localStorage';

const sources = ['Website', 'Facebook', 'Instagram', 'Google Ads', 'Referral', 'LinkedIn'];
const statuses = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];

const firstNames = ['James', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'Alexander', 'Isabella', 'Benjamin', 'Mia', 'Daniel', 'Charlotte', 'Henry', 'Amelia', 'Sebastian', 'Harper', 'Jack', 'Evelyn', 'Aiden', 'Abigail'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
const companySuffixes = ['Inc', 'LLC', 'Corp', 'Solutions', 'Technologies', 'Group', 'Partners', 'Consulting'];

const generatePhone = (): string => {
  const area = Math.floor(Math.random() * 800) + 200;
  const prefix = Math.floor(Math.random() * 800) + 200;
  const line = Math.floor(Math.random() * 9000) + 1000;
  return `(${area}) ${prefix}-${line}`;
};

const generateEmail = (firstName: string, lastName: string): string => {
  const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'company.com', 'mail.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
};

const generateCompany = (): string => {
  const prefix = ['Tech', 'Global', 'Prime', 'Alpha', 'NexGen', 'Quantum', 'Stellar', 'Peak', 'Apex', 'Core'];
  const pre = prefix[Math.floor(Math.random() * prefix.length)];
  const suffix = companySuffixes[Math.floor(Math.random() * companySuffixes.length)];
  return `${pre} ${suffix}`;
};

const generateDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

export const generateSampleLeads = (): Lead[] => {
  const leads: Lead[] = [];

  for (let i = 0; i < 20; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const email = generateEmail(firstName, lastName);
    const phone = generatePhone();
    const company = generateCompany();
    const source = sources[Math.floor(Math.random() * sources.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const daysAgo = Math.floor(Math.random() * 90);

    leads.push({
      id: `sample-${i + 1}`,
      name,
      email,
      phone,
      company,
      source,
      status,
      notes: `Lead interested in ${['premium services', 'monthly subscription', 'enterprise solution', 'consultation', 'product demo'][Math.floor(Math.random() * 5)]}.`,
      createdAt: generateDate(daysAgo),
      updatedAt: generateDate(Math.floor(Math.random() * daysAgo)),
    });
  }

  return leads.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};

export const getMonthlyData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month) => ({
    month,
    leads: Math.floor(Math.random() * 50) + 20,
    conversions: Math.floor(Math.random() * 15) + 5,
    revenue: Math.floor(Math.random() * 50000) + 10000,
  }));
};

export const getSourceData = () => [
  { name: 'Website', value: 35, color: '#3b82f6' },
  { name: 'Facebook', value: 20, color: '#8b5cf6' },
  { name: 'Instagram', value: 15, color: '#ec4899' },
  { name: 'LinkedIn', value: 12, color: '#0077b5' },
  { name: 'Referral', value: 10, color: '#22c55e' },
  { name: 'Google Ads', value: 8, color: '#f59e0b' },
];

export const getConversionData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month) => ({
    month,
    rate: Math.floor(Math.random() * 30) + 20,
  }));
};
