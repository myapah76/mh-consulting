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

export interface AdminServiceQueryParams extends PublicServiceQueryParams {}

export interface ServiceUpsertRequest {
  slug: string;
  title: string;
  categoryId: string;
  shortDesc: string;
  icon?: string | null;
  fullContent?: string | null;
  active?: boolean | null;
  detailedPoints?: string[] | null;
  benefits?: string[] | null;
  processSteps?: string[] | null;
}

export type DeleteServiceResult =
  | { deleted: true; active: false; message: string }
  | { deleted: false; active: false; message: string };
