import apiClient from '../api/client';
import type { DashboardResponse } from '../types';

export interface DashboardParams {
  from?: string;
  to?: string;
}

export async function getAdminDashboard(
  params: DashboardParams = {},
): Promise<DashboardResponse> {
  const from = params.from?.trim();
  const to = params.to?.trim();
  const { data } = await apiClient.get<DashboardResponse>('/api/admin/dashboard', {
    params: {
      from: from || undefined,
      to: to || undefined,
    },
  });
  return data;
}
