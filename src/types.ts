export interface NavItem {
  label: string;
  path: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'thanh-lap' | 'ke-toan' | 'thue' | 'khac';
  shortDesc: string;
  icon: string; // Lucide icon name
  fullContent?: string;
  detailedPoints?: string[];
  benefits?: string[];
  processSteps?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  comment: string;
  avatar?: string;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}
