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
  smtpUsername: string;
  smtpPasswordConfigured: boolean;
}

export interface EmailSettingsUpdateRequest {
  enabled: boolean;
  fromEmail: string;
  fromName: string;
  consultationRecipientEmail: string;
  smtpUsername: string;
  smtpPassword: string | null;
}

export interface TestEmailRequest {
  recipientEmail: string;
}
