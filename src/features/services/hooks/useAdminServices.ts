import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createService,
  deleteService,
  getAdminServiceById,
  getAdminServices,
  updateService,
  updateServiceActive,
} from '../api/adminServiceApi';
import type { ActivePatchRequest } from '../../../types/common.types';
import type { AdminServiceQueryParams, ServiceUpsertRequest } from '../types/service.types';
import { publicServiceKeys } from './usePublicServices';

export const adminServiceKeys = {
  all: ['admin-services'] as const,
  lists: () => [...adminServiceKeys.all, 'list'] as const,
  list: (params: AdminServiceQueryParams) => [...adminServiceKeys.lists(), params] as const,
  details: () => [...adminServiceKeys.all, 'detail'] as const,
  detail: (id: string) => [...adminServiceKeys.details(), id] as const,
};

export function useAdminServices(params: AdminServiceQueryParams) {
  return useQuery({ queryKey: adminServiceKeys.list(params), queryFn: () => getAdminServices(params) });
}

export function useAdminService(id?: string) {
  const normalizedId = id?.trim() ?? '';
  return useQuery({
    queryKey: adminServiceKeys.detail(normalizedId),
    queryFn: () => getAdminServiceById(normalizedId),
    enabled: normalizedId.length > 0,
    retry: false,
  });
}

function useInvalidateServices() {
  const queryClient = useQueryClient();
  return (id?: string) => Promise.all([
    queryClient.invalidateQueries({ queryKey: adminServiceKeys.lists() }),
    ...(id ? [queryClient.invalidateQueries({ queryKey: adminServiceKeys.detail(id) })] : []),
    queryClient.invalidateQueries({ queryKey: publicServiceKeys.all }),
  ]);
}

export function useCreateService() {
  const invalidate = useInvalidateServices();
  return useMutation({ mutationFn: createService, retry: false, onSuccess: () => invalidate() });
}

export function useUpdateService() {
  const invalidate = useInvalidateServices();
  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: ServiceUpsertRequest }) => updateService(id, request),
    retry: false,
    onSuccess: (_, variables) => invalidate(variables.id),
  });
}

export function useUpdateServiceActive() {
  const invalidate = useInvalidateServices();
  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: ActivePatchRequest }) => updateServiceActive(id, request),
    retry: false,
    onSuccess: (_, variables) => invalidate(variables.id),
  });
}

export function useDeleteService() {
  const invalidate = useInvalidateServices();
  return useMutation({
    mutationFn: deleteService,
    retry: false,
    onSuccess: (_, id) => invalidate(id),
  });
}
