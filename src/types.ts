export interface Project {
  id: string;
  title: string;
  slogan: string;
  description: string;
  category: 'web' | 'ai' | 'mobile' | 'cloud' | 'cybersecurity';
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured: boolean;
  completionDate?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  clientName?: string;
  budgetEstimated?: string; // Estimated budget for corporate reference
}

export interface Profile {
  fullName: string;
  title: string;
  bio: string;
  avatarUrl: string;
  resumeUrl?: string;
  email: string;
  phone?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  telegramUrl?: string;
  whatsappUrl?: string;
  experienceYears: number;
  completedProjectsCount: number;
  satisfiedClientsCount: number;
  // Holding Specific Fields
  holdingName: string;
  holdingSlogan: string;
  holdingAddress: string;
  staffCount: number;
  investedCapitalAmount: string; 
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  iconType: 'growth' | 'technology' | 'partnership' | 'award';
}

export interface Executive {
  id: string;
  name: string;
  role: string;
  biography: string;
  imageUrl: string;
  linkedinUrl?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export type CategoryKey = 'all' | 'web' | 'ai' | 'mobile' | 'cloud' | 'cybersecurity';

export interface CategoryInfo {
  key: CategoryKey;
  label: string;
  icon: string;
}
