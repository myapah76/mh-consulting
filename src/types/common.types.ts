export interface NavItem {
  label: string;
  path: string;
}

export interface SortMetadata {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
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

export interface ApiError {
  timestamp: string;
  status: number;
  code: string;
  message: string;
  fieldErrors?: Record<string, string>;
  path: string;
}

export interface ActivePatchRequest {
  active: boolean;
}

export interface MessageResponse {
  message: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  comment: string;
  avatar?: string;
}
