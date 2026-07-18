import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAdminContactSettings,
  getPublicContactSettings,
  updateAdminContactSettings,
} from '../api/contactSettingsService';

export const contactSettingsKeys = {
  all: ['contact-settings'] as const,
  public: () => [...contactSettingsKeys.all, 'public'] as const,
  admin: () => [...contactSettingsKeys.all, 'admin'] as const,
};

export function usePublicContactSettings() {
  return useQuery({
    queryKey: contactSettingsKeys.public(),
    queryFn: getPublicContactSettings,
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
}

export function useAdminContactSettings() {
  return useQuery({
    queryKey: contactSettingsKeys.admin(),
    queryFn: getAdminContactSettings,
    retry: false,
  });
}

export function useUpdateContactSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAdminContactSettings,
    retry: false,
    onSuccess: (updated) => {
      queryClient.setQueryData(contactSettingsKeys.admin(), updated);
      queryClient.setQueryData(contactSettingsKeys.public(), updated);
      void queryClient.invalidateQueries({ queryKey: contactSettingsKeys.admin() });
      void queryClient.invalidateQueries({ queryKey: contactSettingsKeys.public() });
    },
  });
}
