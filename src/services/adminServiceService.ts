import apiClient from '../api/client';
import type {
  ActivePatchRequest,
  AdminService,
  AdminServiceQueryParams,
  AdminServiceSummary,
  DeleteServiceResult,
  PageResponse,
  ServiceUpsertRequest,
} from '../types';

export async function getAdminServices(params: AdminServiceQueryParams): Promise<PageResponse<AdminServiceSummary>> {
  const { data } = await apiClient.get<PageResponse<AdminServiceSummary>>('/api/admin/services', { params });
  return data;
}

export async function getAdminServiceById(id: string): Promise<AdminService> {
  const { data } = await apiClient.get<AdminService>(`/api/admin/services/${encodeURIComponent(id)}`);
  return data;
}

export async function createService(request: ServiceUpsertRequest): Promise<AdminService> {
  const { data } = await apiClient.post<AdminService>('/api/admin/services', request);
  return data;
}

export async function updateService(id: string, request: ServiceUpsertRequest): Promise<AdminService> {
  const { data } = await apiClient.put<AdminService>(`/api/admin/services/${encodeURIComponent(id)}`, request);
  return data;
}

export async function updateServiceActive(id: string, request: ActivePatchRequest): Promise<AdminService> {
  const { data } = await apiClient.patch<AdminService>(`/api/admin/services/${encodeURIComponent(id)}/active`, request);
  return data;
}

export async function deleteService(id: string): Promise<DeleteServiceResult> {
  const response = await apiClient.delete<{ deleted: false; active: false; message: string }>(
    `/api/admin/services/${encodeURIComponent(id)}`,
  );
  if (response.status === 204) {
    return { deleted: true, active: false, message: 'Dịch vụ đã được xóa thành công.' };
  }
  return response.data;
}
