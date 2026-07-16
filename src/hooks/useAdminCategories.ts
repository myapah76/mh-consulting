import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createCategory,
  deleteCategory,
  getAdminCategories,
  getAdminCategoryById,
  updateCategory,
  updateCategoryActive,
} from '../services/adminCategoryService';
import type { ActivePatchRequest, AdminCategoryQueryParams, ServiceCategoryUpsertRequest } from '../types';
import { adminServiceKeys } from './useAdminServices';
import { publicServiceCategoryKeys } from './usePublicServiceCategories';
import { publicServiceKeys } from './usePublicServices';

export const adminCategoryKeys = {
  all: ['admin-service-categories'] as const,
  lists: () => [...adminCategoryKeys.all, 'list'] as const,
  list: (params: AdminCategoryQueryParams) => [...adminCategoryKeys.lists(), params] as const,
  details: () => [...adminCategoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...adminCategoryKeys.details(), id] as const,
};

export function useAdminCategories(params: AdminCategoryQueryParams) {
  return useQuery({ queryKey: adminCategoryKeys.list(params), queryFn: () => getAdminCategories(params) });
}

export function useAdminCategory(id?: string) {
  const normalizedId = id?.trim() ?? '';
  return useQuery({
    queryKey: adminCategoryKeys.detail(normalizedId),
    queryFn: () => getAdminCategoryById(normalizedId),
    enabled: normalizedId.length > 0,
    retry: false,
  });
}

function useInvalidateCategories() {
  const queryClient = useQueryClient();
  return (id?: string) => Promise.all([
    queryClient.invalidateQueries({ queryKey: adminCategoryKeys.lists() }),
    ...(id ? [queryClient.invalidateQueries({ queryKey: adminCategoryKeys.detail(id) })] : []),
    queryClient.invalidateQueries({ queryKey: publicServiceCategoryKeys.all }),
    queryClient.invalidateQueries({ queryKey: adminServiceKeys.all }),
    queryClient.invalidateQueries({ queryKey: publicServiceKeys.all }),
  ]);
}

export function useCreateCategory() {
  const invalidate = useInvalidateCategories();
  return useMutation({ mutationFn: createCategory, retry: false, onSuccess: () => invalidate() });
}

export function useUpdateCategory() {
  const invalidate = useInvalidateCategories();
  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: ServiceCategoryUpsertRequest }) => updateCategory(id, request),
    retry: false,
    onSuccess: (_, variables) => invalidate(variables.id),
  });
}

export function useUpdateCategoryActive() {
  const invalidate = useInvalidateCategories();
  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: ActivePatchRequest }) => updateCategoryActive(id, request),
    retry: false,
    onSuccess: (_, variables) => invalidate(variables.id),
  });
}

export function useDeleteCategory() {
  const invalidate = useInvalidateCategories();
  return useMutation({ mutationFn: deleteCategory, retry: false, onSuccess: (_, id) => invalidate(id) });
}
