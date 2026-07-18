import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAdminEmailSettings,
  sendTestEmail,
  updateAdminEmailSettings,
} from '../api/emailSettingsService';
import type { EmailSettingsResponse } from '../types/settings.types';

export const adminEmailSettingsKeys = {
  all: ['admin-email-settings'] as const,
};

export function useAdminEmailSettings() {
  return useQuery({
    queryKey: adminEmailSettingsKeys.all,
    queryFn: getAdminEmailSettings,
    retry: false,
  });
}

export function useUpdateAdminEmailSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAdminEmailSettings,
    retry: false,
    gcTime: 0,
    onSuccess: (updated) => {
      queryClient.setQueryData<EmailSettingsResponse>(adminEmailSettingsKeys.all, updated);
      void queryClient.invalidateQueries({ queryKey: adminEmailSettingsKeys.all });
    },
  });
}

export function useSendTestEmail() {
  return useMutation({
    mutationFn: sendTestEmail,
    retry: false,
  });
}
