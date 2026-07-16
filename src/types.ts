export interface NavItem {
  label: string;
  path: string;
}

export interface PublicServiceSummary {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryId: string;
  categoryName: string;
  shortDesc: string;
  icon: string;
  active: boolean;
  displayOrder: number;
}

export interface PublicServiceCategory {
  id: string;
  slug: string;
  name: string;
  active: boolean;
  displayOrder: number;
}

export interface PublicServiceDetail extends PublicServiceSummary {
  fullContent: string;
  detailedPoints: string[];
  benefits: string[];
  processSteps: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PublicServiceQueryParams {
  category?: string;
  active?: boolean;
  page?: number;
  size?: number;
  sort?: string;
}

export interface PageResponse<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ConsultationCreateRequest {
  customerName: string;
  phone: string;
  email?: string;
  serviceId: string;
  message?: string;
}

export interface ConsultationCreatedResponse {
  id: string;
  status: string;
  message: string;
  createdAt: string;
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
