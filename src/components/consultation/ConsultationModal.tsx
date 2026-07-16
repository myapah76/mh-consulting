import { useEffect, useState, type FormEvent } from 'react';
import { useCreateConsultation } from '../../hooks/useConsultations';
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

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormData: ConsultationFormValues = {
  customerName: '',
  phone: '',
  email: '',
  categorySlug: '',
  serviceId: '',
  message: '',
};

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState<ConsultationFormValues>(initialFormData);
  const [errors, setErrors] = useState<ConsultationValidationErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const createConsultation = useCreateConsultation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !createConsultation.isPending) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [createConsultation.isPending, isOpen, onClose]);

  if (!isOpen) return null;

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
        setIsSubmitted(true);
        setFormData(initialFormData);
        setErrors({});
      },
      onError: (mutationError) => {
        setSubmitError(getConsultationErrorMessage(mutationError));
      },
    });
  };

  const inputClassName = (hasError: boolean) =>
    `w-full px-4 py-2.5 rounded-lg border text-gray-900 focus:outline-none focus:ring-2 transition-all disabled:opacity-60 ${
      hasError
        ? 'border-[#d40000] focus:ring-[#d40000]/20'
        : 'border-gray-300 focus:border-[#d40000] focus:ring-[#d40000]/20'
    }`;

  const errorMessage = (message?: string) =>
    message ? (
      <p className="text-[#d40000] text-xs mt-1 flex items-center gap-1">
        <span>⚠️</span> {message}
      </p>
    ) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={createConsultation.isPending ? undefined : onClose}
      />

      <div className="relative z-10 flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl transform transition-all animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#d40000] text-white p-6 relative shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={createConsultation.isPending}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Đóng"
          >
            <LucideIcon name="X" size={18} />
          </button>
          <h3 className="text-xl font-bold font-sans">Đăng Ký Tư Vấn Miễn Phí</h3>
          <p className="text-white/80 text-sm mt-1">MH CONSULTING luôn sẵn sàng đồng hành cùng sự phát triển của bạn</p>
        </div>

        <div className="overflow-y-auto p-6 md:p-8">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                <LucideIcon name="Check" size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Đăng Ký Thành Công!</h4>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto">{CONSULTATION_SUCCESS_MESSAGE}</p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Đóng cửa sổ
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Họ và Tên <span className="text-[#d40000]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={formData.customerName}
                  onChange={(event) => updateField('customerName', event.target.value)}
                  disabled={createConsultation.isPending}
                  className={inputClassName(Boolean(errors.customerName))}
                />
                {errorMessage(errors.customerName)}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Số Điện Thoại <span className="text-[#d40000]">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="0912345678"
                  value={formData.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  disabled={createConsultation.isPending}
                  className={inputClassName(Boolean(errors.phone))}
                />
                {errorMessage(errors.phone)}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Địa Chỉ Email (Không bắt buộc)
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  disabled={createConsultation.isPending}
                  className={inputClassName(Boolean(errors.email))}
                />
                {errorMessage(errors.email)}
              </div>

              <ServiceSelectionFields
                categorySlug={formData.categorySlug}
                serviceId={formData.serviceId}
                onCategoryChange={handleCategoryChange}
                onServiceChange={(serviceId) => updateField('serviceId', serviceId)}
                disabled={createConsultation.isPending}
                categoryError={errors.categorySlug}
                serviceError={errors.serviceId}
              />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Nội Dung Cần Tư Vấn
                </label>
                <textarea
                  rows={3}
                  placeholder="Ví dụ: Tôi muốn thành lập công ty TNHH 2 thành viên ngành thương mại..."
                  value={formData.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  disabled={createConsultation.isPending}
                  className={`${inputClassName(Boolean(errors.message))} resize-none`}
                />
              </div>

              {submitError && (
                <p className="text-[#d40000] text-xs font-semibold flex items-center gap-1">
                  <span>⚠️</span> {submitError}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={createConsultation.isPending}
                  className="w-full py-3 bg-[#d40000] hover:bg-[#b80000] text-white font-bold rounded-lg transition-colors shadow-lg shadow-[#d40000]/10 flex items-center justify-center gap-2 text-base cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <LucideIcon name="MessageCircle" size={18} />
                  {createConsultation.isPending ? 'Đang gửi...' : 'Gửi Thông Tin Yêu Cầu'}
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  Thông tin của bạn được bảo mật tuyệt đối theo Quy định Bảo mật MH CONSULTING.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
