import { useQuery } from '@tanstack/react-query';
import { getPublicServiceCategories } from '../services/publicServiceCategoryService';

export const publicServiceCategoryKeys = {
  all: ['public-service-categories'] as const,
};

export function usePublicServiceCategories() {
  return useQuery({
    queryKey: publicServiceCategoryKeys.all,
    queryFn: getPublicServiceCategories,
    refetchInterval: 30_000,
  });
}
