import apiClient from '../api/client';
import type {
  ConsultationCreatedResponse,
  ConsultationCreateRequest,
} from '../types';

export async function createConsultation(
  request: ConsultationCreateRequest,
): Promise<ConsultationCreatedResponse> {
  const { data } = await apiClient.post<ConsultationCreatedResponse>(
    '/api/public/consultations',
    request,
  );

  return data;
}
