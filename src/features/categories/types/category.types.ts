export interface PublicServiceCategory {
  id: string;
  slug: string;
  name: string;
  active: boolean;
}

export interface ServiceCategoryUpsertRequest {
  slug: string;
  name: string;
  active?: boolean | null;
}

export interface AdminServiceCategoryResponse {
  id: string;
  slug: string;
  name: string;
  active: boolean;
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
