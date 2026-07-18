import type { ConsultationStatus } from '../../consultations';

export interface DashboardParams {
  from?: string;
  to?: string;
}

export interface DashboardResponse {
  period: { from: string; to: string; timezone: string };
  summary: {
    total: number;
    newCount: number;
    contactedCount: number;
    completedCount: number;
    cancelledCount: number;
    completionRate: number;
  };
  dailyConsultations: Array<{ date: string; count: number }>;
  consultationsByService: Array<{ serviceId: string | null; serviceTitle: string | null; count: number }>;
  consultationsByCategory: Array<{ categoryName: string | null; count: number }>;
  recentConsultations: Array<{
    id: string;
    customerName: string;
    phone: string;
    email: string | null;
    serviceId: string | null;
    serviceTitleSnapshot: string | null;
    status: ConsultationStatus;
    createdAt: string;
  }>;
}
