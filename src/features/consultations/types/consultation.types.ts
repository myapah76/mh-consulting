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

export type ConsultationStatus = 'NEW' | 'CONTACTED' | 'COMPLETED' | 'CANCELLED';

export interface ConsultationResponse {
  id: string;
  customerName: string;
  phone: string;
  email: string | null;
  serviceId: string | null;
  serviceTitleSnapshot: string | null;
  message: string | null;
  status: ConsultationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AdminConsultationListParams {
  status?: ConsultationStatus;
  serviceId?: string;
  phone?: string;
  email?: string;
  createdFrom?: string;
  createdTo?: string;
  page?: number;
  size?: number;
}

export interface ConsultationStatusRequest {
  status: ConsultationStatus;
}
