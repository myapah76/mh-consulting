import apiClient from '../api/client';
import type {
  ActivePatchRequest,
  AdminCategoryQueryParams,
  AdminServiceCategoryResponse,
  DeleteCategoryResult,
  PageResponse,
  ServiceCategoryUpsertRequest,
} from '../types';

export async function getAdminCategories(params: AdminCategoryQueryParams): Promise<PageResponse<AdminServiceCategoryResponse>> {
  const { data } = await apiClient.get<PageResponse<AdminServiceCategoryResponse>>('/api/admin/service-categories', { params });
  return data;
}

export async function getAdminCategoryById(id: string): Promise<AdminServiceCategoryResponse> {
  const { data } = await apiClient.get<AdminServiceCategoryResponse>(`/api/admin/service-categories/${encodeURIComponent(id)}`);
  return data;
}

export async function createCategory(request: ServiceCategoryUpsertRequest): Promise<AdminServiceCategoryResponse> {
  const { data } = await apiClient.post<AdminServiceCategoryResponse>('/api/admin/service-categories', request);
  return data;
}

export async function updateCategory(id: string, request: ServiceCategoryUpsertRequest): Promise<AdminServiceCategoryResponse> {
  const { data } = await apiClient.put<AdminServiceCategoryResponse>(`/api/admin/service-categories/${encodeURIComponent(id)}`, request);
  return data;
}

export async function updateCategoryActive(id: string, request: ActivePatchRequest): Promise<AdminServiceCategoryResponse> {
  const { data } = await apiClient.patch<AdminServiceCategoryResponse>(`/api/admin/service-categories/${encodeURIComponent(id)}/active`, request);
  return data;
}

export async function deleteCategory(id: string): Promise<DeleteCategoryResult> {
  const response = await apiClient.delete<{ deleted: false; active: false; message: string }>(`/api/admin/service-categories/${encodeURIComponent(id)}`);
  if (response.status === 204) return { deleted: true, active: false, message: 'Danh mục đã được xóa thành công.' };
  return response.data;
}
