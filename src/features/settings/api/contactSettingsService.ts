import apiClient from '../../../lib/axios';
import type { ContactSettings } from '../types/settings.types';

export async function getPublicContactSettings(): Promise<ContactSettings> {
  const { data } = await apiClient.get<ContactSettings>('/api/public/contact-settings');
  return data;
}

export async function getAdminContactSettings(): Promise<ContactSettings> {
  const { data } = await apiClient.get<ContactSettings>('/api/admin/contact-settings');
  return data;
}

export async function updateAdminContactSettings(request: ContactSettings): Promise<ContactSettings> {
  const { data } = await apiClient.put<ContactSettings>('/api/admin/contact-settings', request);
  return data;
}
