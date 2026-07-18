import apiClient from '../../../lib/axios';
import type {
  ConsultationCreatedResponse,
  ConsultationCreateRequest,
} from '../types/consultation.types';

export async function createConsultation(
  request: ConsultationCreateRequest,
): Promise<ConsultationCreatedResponse> {
  const { data } = await apiClient.post<ConsultationCreatedResponse>(
    '/api/public/consultations',
    request,
  );

  return data;
}
