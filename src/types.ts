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
  pageable?: {
    pageNumber: number;
    pageSize: number;
    sort: SortMetadata;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  sort?: SortMetadata;
}

export interface SortMetadata {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: 'ADMIN';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ApiError {
  timestamp: string;
  status: number;
  code: string;
  message: string;
  fieldErrors?: Record<string, string>;
  path: string;
}

export interface AdminServiceSummary extends Omit<PublicServiceSummary, 'icon'> {
  icon: string | null;
}

export interface AdminService extends AdminServiceSummary {
  fullContent: string | null;
  detailedPoints: string[];
  benefits: string[];
  processSteps: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminServiceQueryParams {
  category?: string;
  active?: boolean;
  page?: number;
  size?: number;
  sort?: string;
}

export interface ServiceUpsertRequest {
  slug: string;
  title: string;
  categoryId: string;
  shortDesc: string;
  icon?: string | null;
  fullContent?: string | null;
  active?: boolean | null;
  displayOrder?: number | null;
  detailedPoints?: string[] | null;
  benefits?: string[] | null;
  processSteps?: string[] | null;
}

export interface ActivePatchRequest {
  active: boolean;
}

export type DeleteServiceResult =
  | { deleted: true; active: false; message: string }
  | { deleted: false; active: false; message: string };

export interface ServiceCategoryUpsertRequest {
  slug: string;
  name: string;
  active?: boolean | null;
  displayOrder?: number | null;
}

export interface AdminServiceCategoryResponse {
  id: string;
  slug: string;
  name: string;
  active: boolean;
  displayOrder: number;
}

export interface AdminCategoryQueryParams {
  active?: boolean;
  page?: number;
  size?: number;
  sort?: string;
}

export type DeleteCategoryResult =
  | { deleted: true; active: false; message: string }
  | { deleted: false; active: false; message: string };

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
