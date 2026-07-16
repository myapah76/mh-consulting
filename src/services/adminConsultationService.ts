import apiClient from '../api/client';
import type {
  AdminConsultationListParams,
  ConsultationResponse,
  ConsultationStatusRequest,
  PageResponse,
} from '../types';

export async function getAdminConsultations(
  params: AdminConsultationListParams,
): Promise<PageResponse<ConsultationResponse>> {
  const { data } = await apiClient.get<PageResponse<ConsultationResponse>>(
    '/api/admin/consultations',
    { params },
  );
  return data;
}

export async function getAdminConsultation(id: string): Promise<ConsultationResponse> {
  const { data } = await apiClient.get<ConsultationResponse>(
    `/api/admin/consultations/${encodeURIComponent(id)}`,
  );
  return data;
}

export async function updateAdminConsultationStatus(
  id: string,
  request: ConsultationStatusRequest,
): Promise<ConsultationResponse> {
  const { data } = await apiClient.patch<ConsultationResponse>(
    `/api/admin/consultations/${encodeURIComponent(id)}/status`,
    request,
  );
  return data;
}
