import apiClient from '../../../lib/axios';
import type { DashboardParams, DashboardResponse } from '../types/dashboard.types';

export type { DashboardParams } from '../types/dashboard.types';

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
