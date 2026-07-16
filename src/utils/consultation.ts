import axios from 'axios';
import type { ConsultationCreateRequest } from '../types';

export const CONSULTATION_SUCCESS_MESSAGE =
  'Yêu cầu tư vấn đã được gửi thành công. MH Consulting sẽ liên hệ với bạn trong thời gian sớm nhất.';

const VIETNAMESE_PHONE_PATTERN = /^(?:\+?84|0)(?:3|5|7|8|9)\d{8}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export interface ConsultationFormValues {
  customerName: string;
  phone: string;
  email: string;
  categorySlug: string;
  serviceId: string;
  message: string;
}

export type ConsultationValidationErrors = Partial<
  Record<keyof ConsultationFormValues, string>
>;

export function normalizeVietnamesePhone(phone: string): string {
  return phone.trim().replace(/[\s.-]/g, '');
}

export function isValidVietnamesePhone(phone: string): boolean {
  return VIETNAMESE_PHONE_PATTERN.test(normalizeVietnamesePhone(phone));
}

export function normalizeVietnamesePhoneForRequest(phone: string): string {
  const normalizedPhone = normalizeVietnamesePhone(phone);

  if (normalizedPhone.startsWith('+84')) {
    return `0${normalizedPhone.slice(3)}`;
  }

  if (normalizedPhone.startsWith('84') && !normalizedPhone.startsWith('840')) {
    return `0${normalizedPhone.slice(2)}`;
  }

  return normalizedPhone;
}

export function validateConsultation(
  values: ConsultationFormValues,
): ConsultationValidationErrors {
  const errors: ConsultationValidationErrors = {};

  if (!values.customerName.trim()) {
    errors.customerName = 'Họ và tên không được để trống';
  }

  if (!isValidVietnamesePhone(values.phone)) {
    errors.phone = 'Số điện thoại Việt Nam không hợp lệ.';
  }

  const email = values.email.trim();
  if (email && !emailPattern.test(email)) {
    errors.email = 'Email không đúng định dạng';
  }

  if (!values.categorySlug.trim()) {
    errors.categorySlug = 'Vui lòng chọn danh mục dịch vụ.';
  }

  const serviceId = values.serviceId.trim();
  if (!serviceId) {
    errors.serviceId = 'Vui lòng chọn dịch vụ cần tư vấn.';
  } else if (!uuidPattern.test(serviceId)) {
    errors.serviceId = 'Vui lòng chọn dịch vụ cần tư vấn.';
  }

  return errors;
}

export function toConsultationRequest(
  values: ConsultationFormValues,
): ConsultationCreateRequest {
  const email = values.email.trim();
  const message = values.message.trim();

  return {
    customerName: values.customerName.trim(),
    phone: normalizeVietnamesePhoneForRequest(values.phone),
    ...(email ? { email } : {}),
    serviceId: values.serviceId.trim(),
    ...(message ? { message } : {}),
  };
}

export function getConsultationErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return 'Không thể gửi yêu cầu tư vấn. Vui lòng thử lại sau.';
  }

  if (!error.response) {
    return 'Không thể kết nối đến hệ thống. Vui lòng kiểm tra mạng và thử lại.';
  }

  switch (error.response.status) {
    case 400:
      return 'Thông tin chưa hợp lệ. Vui lòng kiểm tra và thử lại.';
    case 403:
      return 'Phiên gửi yêu cầu không hợp lệ. Vui lòng tải lại trang và thử lại.';
    case 404:
      return 'Dịch vụ đã chọn không tồn tại hoặc không còn hoạt động.';
    default:
      return 'Không thể gửi yêu cầu tư vấn. Vui lòng thử lại sau.';
  }
}
