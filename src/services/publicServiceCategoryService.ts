import apiClient from '../api/client';
import type { PublicServiceCategory } from '../types';

export async function getPublicServiceCategories(): Promise<PublicServiceCategory[]> {
  const { data } = await apiClient.get<PublicServiceCategory[]>(
    '/api/public/service-categories',
  );

  return data;
}
