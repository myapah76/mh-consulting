import apiClient from '../../../lib/axios';
import type { MessageResponse } from '../../../types/common.types';
import type {
  EmailSettingsResponse,
  EmailSettingsUpdateRequest,
  TestEmailRequest,
} from '../types/settings.types';

export async function getAdminEmailSettings(): Promise<EmailSettingsResponse> {
  const { data } = await apiClient.get<EmailSettingsResponse>('/api/admin/email-settings');
  return data;
}

export async function updateAdminEmailSettings(
  request: EmailSettingsUpdateRequest,
): Promise<EmailSettingsResponse> {
  const { data } = await apiClient.put<EmailSettingsResponse>('/api/admin/email-settings', request);
  return data;
}

export async function sendTestEmail(request: TestEmailRequest): Promise<MessageResponse> {
  const { data } = await apiClient.post<MessageResponse>('/api/admin/email-settings/test', request);
  return data;
}
