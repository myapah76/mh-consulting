import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAdminConsultation,
  getAdminConsultations,
  updateAdminConsultationStatus,
} from '../services/adminConsultationService';
import type { AdminConsultationListParams, ConsultationStatusRequest } from '../types';

export const adminConsultationKeys = {
  all: ['admin-consultations'] as const,
  lists: () => [...adminConsultationKeys.all, 'list'] as const,
  list: (params: AdminConsultationListParams) => [...adminConsultationKeys.lists(), params] as const,
  details: () => [...adminConsultationKeys.all, 'detail'] as const,
  detail: (id: string) => [...adminConsultationKeys.details(), id] as const,
};

export function useAdminConsultations(params: AdminConsultationListParams) {
  return useQuery({
    queryKey: adminConsultationKeys.list(params),
    queryFn: () => getAdminConsultations(params),
  });
}

export function useAdminConsultation(id?: string) {
  const normalizedId = id?.trim() ?? '';
  return useQuery({
    queryKey: adminConsultationKeys.detail(normalizedId),
    queryFn: () => getAdminConsultation(normalizedId),
    enabled: normalizedId.length > 0,
    retry: false,
  });
}

export function useUpdateConsultationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: ConsultationStatusRequest }) =>
      updateAdminConsultationStatus(id, request),
    retry: false,
    onSuccess: (updated) => {
      queryClient.setQueryData(adminConsultationKeys.detail(updated.id), updated);
      void queryClient.invalidateQueries({ queryKey: adminConsultationKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: adminConsultationKeys.detail(updated.id) });
    },
  });
}
