import apiClient, { clearCsrfToken, ensureCsrfToken } from '../api/client';
import type { AdminUser, LoginRequest } from '../types';

export function prepareCsrf() {
  return ensureCsrfToken();
}

export async function loginAdmin(request: LoginRequest): Promise<AdminUser> {
  const { data } = await apiClient.post<AdminUser>('/api/auth/login', request);
  return data;
}

export async function getCurrentAdmin(): Promise<AdminUser> {
  const { data } = await apiClient.get<AdminUser>('/api/auth/me');
  return data;
}

export async function logoutAdmin(): Promise<void> {
  await apiClient.post('/api/auth/logout');
  clearCsrfToken();
}
