import apiClient from '../api/client';
import type { AdminAccountResponse, ChangePasswordRequest, CreateAdminAccountRequest, MessageResponse } from '../types';

export async function createAdminAccount(request: CreateAdminAccountRequest): Promise<AdminAccountResponse> {
  const { data } = await apiClient.post<AdminAccountResponse>('/api/admin/accounts', request);
  return data;
}

export async function changeCurrentAdminPassword(request: ChangePasswordRequest): Promise<MessageResponse> {
  const { data } = await apiClient.put<MessageResponse>('/api/admin/accounts/me/password', request);
  return data;
}
