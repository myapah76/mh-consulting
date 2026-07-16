import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentAdmin, loginAdmin, logoutAdmin, prepareCsrf } from '../services/authService';
import type { AdminUser } from '../types';

export const authKeys = {
  current: ['auth', 'current-admin'] as const,
};

export function useCurrentAdmin() {
  return useQuery({
    queryKey: authKeys.current,
    queryFn: getCurrentAdmin,
    retry: false,
    staleTime: 60_000,
  });
}

export function useLoginAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      await prepareCsrf();
      return loginAdmin(credentials);
    },
    retry: false,
    onSuccess: (admin) => queryClient.setQueryData<AdminUser>(authKeys.current, admin),
  });
}

export function useLogoutAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutAdmin,
    retry: false,
    onSuccess: () => queryClient.setQueryData(authKeys.current, null),
  });
}
