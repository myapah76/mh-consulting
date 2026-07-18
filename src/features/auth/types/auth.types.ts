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
