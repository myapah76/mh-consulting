import apiClient from '../../../lib/axios';
import type { PageResponse } from '../../../types/common.types';
import type {
  AdminConsultationListParams,
  ConsultationResponse,
  ConsultationStatus,
  ConsultationStatusRequest,
} from '../types/consultation.types';

const consultationStatuses = new Set<ConsultationStatus>([
  'NEW',
  'CONTACTED',
  'COMPLETED',
  'CANCELLED',
]);

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isoInstantPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

function isValidIsoInstant(value: string): boolean {
  return isoInstantPattern.test(value) && !Number.isNaN(Date.parse(value));
}

export function createAdminConsultationListParams(
  params: AdminConsultationListParams,
): AdminConsultationListParams {
  const serviceId = params.serviceId?.trim();
  const phone = params.phone?.trim();
  const email = params.email?.trim();
  const createdFrom = params.createdFrom?.trim();
  const createdTo = params.createdTo?.trim();

  return {
    ...(params.status && consultationStatuses.has(params.status) ? { status: params.status } : {}),
    ...(serviceId && uuidPattern.test(serviceId) ? { serviceId } : {}),
    ...(phone ? { phone } : {}),
    ...(email ? { email } : {}),
    ...(createdFrom && isValidIsoInstant(createdFrom) ? { createdFrom } : {}),
    ...(createdTo && isValidIsoInstant(createdTo) ? { createdTo } : {}),
    ...(params.page !== undefined ? { page: params.page } : {}),
    ...(params.size !== undefined ? { size: params.size } : {}),
  };
}

export async function getAdminConsultations(
  params: AdminConsultationListParams,
): Promise<PageResponse<ConsultationResponse>> {
  const requestParams = createAdminConsultationListParams(params);
  const { data } = await apiClient.get<PageResponse<ConsultationResponse>>(
    '/api/admin/consultations',
    { params: requestParams },
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
