export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: 'ADMIN';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface PasswordResetTokenRequest {
  token: string;
}

export interface PasswordResetTokenValidationResponse {
  valid: boolean;
  expiresAt: string | null;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
