import { useQuery } from '@tanstack/react-query';
import { getAdminDashboard, type DashboardParams } from '../api/adminDashboardService';

export function useAdminDashboard(params: DashboardParams, enabled = true) {
  const from = params.from?.trim() || undefined;
  const to = params.to?.trim() || undefined;
  const normalizedParams = { from, to };

  return useQuery({
    queryKey: ['admin-dashboard', normalizedParams],
    queryFn: () => getAdminDashboard(normalizedParams),
    enabled,
  });
}
