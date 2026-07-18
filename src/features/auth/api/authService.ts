import apiClient, { clearCsrfToken, ensureCsrfToken } from '../../../lib/axios';
import type { MessageResponse } from '../../../types/common.types';
import type {
  AdminUser,
  ForgotPasswordRequest,
  LoginRequest,
  PasswordResetTokenRequest,
  PasswordResetTokenValidationResponse,
  ResetPasswordRequest,
} from '../types/auth.types';

export function prepareCsrf() {
  return ensureCsrfToken();
}

export function clearLocalAuthState() {
  clearCsrfToken();
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

export async function requestAdminPasswordReset(
  request: ForgotPasswordRequest,
): Promise<MessageResponse> {
  const { data } = await apiClient.post<MessageResponse>('/api/auth/forgot-password', request);
  return data;
}

export async function validateAdminPasswordResetToken(
  request: PasswordResetTokenRequest,
): Promise<PasswordResetTokenValidationResponse> {
  const { data } = await apiClient.post<PasswordResetTokenValidationResponse>(
    '/api/auth/reset-password/validate',
    request,
  );
  return data;
}

export async function resetAdminPassword(
  request: ResetPasswordRequest,
): Promise<MessageResponse> {
  const { data } = await apiClient.post<MessageResponse>('/api/auth/reset-password', request);
  return data;
}
