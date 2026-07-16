import { useEffect, useState, type FormEvent } from 'react';
import { useCreateConsultation } from '../../hooks/useConsultations';
import type { PublicServiceSummary } from '../../types';
import {
  CONSULTATION_SUCCESS_MESSAGE,
  getConsultationErrorMessage,
  toConsultationRequest,
  validateConsultation,
  type ConsultationFormValues,
  type ConsultationValidationErrors,
} from '../../utils/consultation';
import LucideIcon from '../common/LucideIcon';
import ServiceSelectionFields from './ServiceSelectionFields';

interface ConsultationFormProps {
  layout?: 'inline' | 'full';
  buttonText?: string;
  onSuccess?: () => void;
  currentService?: Pick<PublicServiceSummary, 'id' | 'title' | 'category'>;
  stackServiceFields?: boolean;
}

function createInitialValues(
  currentService?: Pick<PublicServiceSummary, 'id' | 'title' | 'category'>,
): ConsultationFormValues {
  return {
    customerName: '',
    phone: '',
    email: '',
    categorySlug: currentService?.category ?? '',
    serviceId: currentService?.id ?? '',
    message: '',
  };
}

export default function ConsultationForm({
  layout = 'inline',
  buttonText = 'Yêu cầu tư vấn',
  onSuccess,
  currentService,
  stackServiceFields = false,
}: ConsultationFormProps) {
  const [formData, setFormData] = useState<ConsultationFormValues>(() =>
    createInitialValues(currentService),
  );
  const [errors, setErrors] = useState<ConsultationValidationErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(false);
  const createConsultation = useCreateConsultation();

  useEffect(() => {
    if (!currentService) return;
    setFormData((current) => ({
      ...current,
      categorySlug: currentService.category,
      serviceId: currentService.id,
    }));
  }, [currentService?.category, currentService?.id]);

  const updateField = (field: keyof ConsultationFormValues, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleCategoryChange = (categorySlug: string) => {
    setFormData((current) => ({ ...current, categorySlug, serviceId: '' }));
    setErrors((current) => ({
      ...current,
      categorySlug: undefined,
      serviceId: undefined,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (createConsultation.isPending) return;

    setSubmitError('');
    const validationErrors = validateConsultation(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    createConsultation.mutate(toConsultationRequest(formData), {
      onSuccess: () => {
        setSuccess(true);
        setFormData(createInitialValues(currentService));
        setErrors({});
        onSuccess?.();
      },
      onError: (mutationError) => {
        setSubmitError(getConsultationErrorMessage(mutationError));
      },
    });
  };

  if (success) {
    return (
      <div className="bg-white/95 text-gray-900 border border-green-200 p-6 rounded-xl shadow-lg text-center animate-in fade-in duration-300">
        <div className="h-12 w-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-200">
          <LucideIcon name="Check" size={24} />
        </div>
        <h4 className="font-bold text-lg text-gray-900">Gửi Yêu Cầu Thành Công!</h4>
        <p className="text-sm text-gray-600 mt-1 max-w-sm mx-auto">
          {CONSULTATION_SUCCESS_MESSAGE}
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-4 px-4 py-1.5 bg-[#d40000] hover:bg-gray-900 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  const inputClassName =
    layout === 'inline'
      ? 'w-full h-12 px-4 bg-white text-gray-900 placeholder-gray-400 rounded-lg border border-gray-200 focus:outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/10 transition-all text-sm font-medium disabled:opacity-60'
      : 'w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/20 transition-all text-sm disabled:opacity-60';
  const labelClassName = 'block text-sm font-semibold text-gray-700 mb-1';
  const fieldError = (message?: string) =>
    message ? <p className="text-[#d40000] text-xs mt-1">⚠️ {message}</p> : null;

  return (
    <form
      onSubmit={handleSubmit}
      className={
        layout === 'inline'
          ? 'w-full max-w-3xl space-y-3'
          : 'w-full max-w-3xl space-y-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-xl'
      }
    >
      <div>
        <label className={labelClassName}>
          Họ và Tên <span className="text-[#d40000]">*</span>
        </label>
        <input
          type="text"
          placeholder="Nguyễn Văn A"
          value={formData.customerName}
          onChange={(event) => updateField('customerName', event.target.value)}
          disabled={createConsultation.isPending}
          className={inputClassName}
        />
        {fieldError(errors.customerName)}
      </div>

      <div>
        <label className={labelClassName}>
          Số Điện Thoại <span className="text-[#d40000]">*</span>
        </label>
        <input
          type="tel"
          placeholder="0912345678"
          value={formData.phone}
          onChange={(event) => updateField('phone', event.target.value)}
          disabled={createConsultation.isPending}
          className={inputClassName}
        />
        {fieldError(errors.phone)}
      </div>

      <div>
        <label className={labelClassName}>Địa Chỉ Email (Không bắt buộc)</label>
        <input
          type="email"
          placeholder="email@example.com"
          value={formData.email}
          onChange={(event) => updateField('email', event.target.value)}
          disabled={createConsultation.isPending}
          className={inputClassName}
        />
        {fieldError(errors.email)}
      </div>

      <ServiceSelectionFields
        categorySlug={formData.categorySlug}
        serviceId={formData.serviceId}
        onCategoryChange={handleCategoryChange}
        onServiceChange={(serviceId) => updateField('serviceId', serviceId)}
        disabled={createConsultation.isPending}
        categoryError={errors.categorySlug}
        serviceError={errors.serviceId}
        currentService={currentService}
        stacked={stackServiceFields}
      />

      <div>
        <label className={labelClassName}>Nội Dung Cần Tư Vấn</label>
        <textarea
          rows={layout === 'inline' ? 3 : 4}
          placeholder="Tôi muốn đăng ký làm sổ sách kế toán trọn gói..."
          value={formData.message}
          onChange={(event) => updateField('message', event.target.value)}
          disabled={createConsultation.isPending}
          className={`${inputClassName} h-auto resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={createConsultation.isPending}
        className="w-full py-3 bg-[#d40000] hover:bg-gray-900 text-white font-bold rounded-lg tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#d40000]/10 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LucideIcon name="MessageCircle" size={16} />
        {createConsultation.isPending ? 'Đang gửi...' : buttonText}
      </button>

      {submitError && (
        <p className="text-[#d40000] text-xs font-semibold animate-shake mt-2 flex items-center gap-1">
          <span>⚠️</span> {submitError}
        </p>
      )}
    </form>
  );
}
