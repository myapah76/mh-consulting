import axios from 'axios';
import type { ApiError } from '../types/common.types';

export function getApiError(error: unknown): ApiError | undefined {
  if (!axios.isAxiosError<ApiError>(error)) return undefined;
  return error.response?.data;
}

export function getApiStatus(error: unknown): number | undefined {
  return axios.isAxiosError(error) ? error.response?.status : undefined;
}

export function getVietnameseApiError(error: unknown, fallback: string): string {
  const apiError = getApiError(error);
  if (!apiError) return fallback;
  const messages: Record<string, string> = {
    AUTHENTICATION_FAILED: 'Email hoặc mật khẩu không chính xác.',
    AUTHENTICATION_REQUIRED: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
    ACCESS_DENIED: 'Bạn không có quyền thực hiện thao tác này.',
    DUPLICATE_SLUG: 'Slug này đã được sử dụng. Vui lòng chọn slug khác.',
    DATA_CONFLICT: 'Dữ liệu đã thay đổi hoặc đang được sử dụng. Vui lòng tải lại và thử lại.',
    RESOURCE_NOT_FOUND: 'Không tìm thấy dữ liệu được yêu cầu.',
    VALIDATION_ERROR: 'Vui lòng kiểm tra lại các trường thông tin.',
    INVALID_REQUEST: 'Dữ liệu gửi lên không hợp lệ.',
    INVALID_PARAMETER: 'Tham số yêu cầu không hợp lệ.',
    DUPLICATE_EMAIL: 'Email này đã được sử dụng.',
    EMAIL_ALREADY_EXISTS: 'Email này đã được sử dụng.',
    INVALID_CURRENT_PASSWORD: 'Mật khẩu hiện tại không chính xác.',
  };
  return messages[apiError.code] ?? apiError.message ?? fallback;
}
