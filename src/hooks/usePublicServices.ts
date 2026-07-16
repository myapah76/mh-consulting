import { useQuery } from '@tanstack/react-query';
import {
  getPublicServiceBySlug,
  getPublicServices,
} from '../services/publicServiceService';
import type { PublicServiceQueryParams } from '../types';

export const defaultPublicServiceParams: PublicServiceQueryParams = {
  active: true,
  page: 0,
  size: 20,
};

export const publicServiceKeys = {
  all: ['public-services'] as const,
  lists: () => [...publicServiceKeys.all, 'list'] as const,
  list: (params: PublicServiceQueryParams) =>
    [...publicServiceKeys.lists(), params] as const,
  details: () => [...publicServiceKeys.all, 'detail'] as const,
  detail: (slug: string) => [...publicServiceKeys.details(), slug] as const,
};

export function usePublicServices(
  params?: PublicServiceQueryParams,
  enabled = true,
) {
  const resolvedParams = {
    ...defaultPublicServiceParams,
    ...params,
  };

  return useQuery({
    queryKey: publicServiceKeys.list(resolvedParams),
    queryFn: () => getPublicServices(resolvedParams),
    enabled,
  });
}

export function usePublicServiceBySlug(slug?: string) {
  const normalizedSlug = slug?.trim() ?? '';

  return useQuery({
    queryKey: publicServiceKeys.detail(normalizedSlug),
    queryFn: () => getPublicServiceBySlug(normalizedSlug),
    enabled: normalizedSlug.length > 0,
  });
}
