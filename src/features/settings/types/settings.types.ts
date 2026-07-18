export interface ContactSettings {
  address: string;
  primaryPhone: string;
  primaryPhoneLabel: string | null;
  secondaryPhone: string | null;
  secondaryPhoneLabel: string | null;
  email: string;
  workingHours: string;
  facebookUrl: string | null;
  zaloUrl: string | null;
  youtubeUrl: string | null;
}

export interface EmailSettingsResponse {
  enabled: boolean;
  fromEmail: string;
  fromName: string;
  consultationRecipientEmail: string;
  deliveryProvider: 'SMTP' | string;
  providerConfigured: boolean;
}

export interface EmailSettingsUpdateRequest {
  enabled: boolean;
  fromEmail: string;
  fromName: string;
  consultationRecipientEmail: string;
}

export interface TestEmailRequest {
  recipientEmail: string;
}
