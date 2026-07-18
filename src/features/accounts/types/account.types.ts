export interface CreateAdminAccountRequest {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

export interface AdminAccountResponse {
  id: string;
  email: string;
  fullName: string;
  role: 'ADMIN';
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
