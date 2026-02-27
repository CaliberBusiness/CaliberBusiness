export interface Job {
  id: string;
  title: string;
  location: 'Office-based' | 'Hybrid' | 'Remote';
  type: 'Full-time' | 'Part-time' | 'Contract';
  category: 'open' | 'pooling';
  description: string;
  responsibilities: string[];
  qualifications: string[];
  applyUrl: string;
  featured?: boolean;
}