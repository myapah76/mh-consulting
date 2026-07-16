import apiClient from '../api/client';
import type {
  PageResponse,
  PublicServiceDetail,
  PublicServiceQueryParams,
  PublicServiceSummary,
} from '../types';

export async function getPublicServices(
  params?: PublicServiceQueryParams,
): Promise<PageResponse<PublicServiceSummary>> {
  const category = params?.category?.trim();
  const sort = params?.sort?.trim();
  const requestParams: PublicServiceQueryParams = {
    ...(category ? { category } : {}),
    ...(params?.active !== undefined ? { active: params.active } : {}),
    ...(params?.page !== undefined ? { page: params.page } : {}),
    ...(params?.size !== undefined ? { size: params.size } : {}),
    ...(sort ? { sort } : {}),
  };

  const { data } = await apiClient.get<PageResponse<PublicServiceSummary>>(
    '/api/public/services',
    {
      params: requestParams,
    },
  );

  return data;
}

export async function getPublicServiceBySlug(
  slug: string,
): Promise<PublicServiceDetail> {
  const { data } = await apiClient.get<PublicServiceDetail>(
    `/api/public/services/${encodeURIComponent(slug)}`,
  );

  return data;
}
