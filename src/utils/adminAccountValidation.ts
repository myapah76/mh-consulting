export const ADMIN_PASSWORD_MIN_LENGTH = 8;
export const ADMIN_PASSWORD_MAX_LENGTH = 200;

export function validateAdminPassword(password: string): string | undefined {
  if (!password) return 'Vui lòng nhập mật khẩu.';
  if (password.length < ADMIN_PASSWORD_MIN_LENGTH) return `Mật khẩu phải có ít nhất ${ADMIN_PASSWORD_MIN_LENGTH} ký tự.`;
  if (password.length > ADMIN_PASSWORD_MAX_LENGTH) return `Mật khẩu không được vượt quá ${ADMIN_PASSWORD_MAX_LENGTH} ký tự.`;
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
    return 'Mật khẩu phải có chữ hoa, chữ thường, số và ký tự đặc biệt.';
  }
  return undefined;
}
