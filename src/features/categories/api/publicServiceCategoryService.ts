import apiClient from '../../../lib/axios';
import type { PublicServiceCategory } from '../types/category.types';

export async function getPublicServiceCategories(): Promise<PublicServiceCategory[]> {
  const { data } = await apiClient.get<PublicServiceCategory[]>(
    '/api/public/service-categories',
  );

  return data;
}
