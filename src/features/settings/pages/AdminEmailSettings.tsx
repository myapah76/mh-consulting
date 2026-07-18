import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { useToast } from '../../../components/common/ToastProvider';
import { getApiError, getVietnameseApiError } from '../../../utils/apiError';
import {
  useAdminEmailSettings,
  useSendTestEmail,
  useUpdateAdminEmailSettings,
} from '../hooks/useAdminEmailSettings';
import type { EmailSettingsResponse, EmailSettingsUpdateRequest } from '../types/settings.types';

interface FormValues {
  enabled: boolean;
  fromEmail: string;
  fromName: string;
  consultationRecipientEmail: string;
}

const emptyValues: FormValues = {
  enabled: false,
  fromEmail: '',
  fromName: '',
  consultationRecipientEmail: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toFormValues(settings: EmailSettingsResponse): FormValues {
  return {
    enabled: settings.enabled,
    fromEmail: settings.fromEmail,
    fromName: settings.fromName,
    consultationRecipientEmail: settings.consultationRecipientEmail,
  };
}

function isFormDirty(values: FormValues, saved?: EmailSettingsResponse): boolean {
  if (!saved) return false;
  return values.enabled !== saved.enabled
    || values.fromEmail !== saved.fromEmail
    || values.fromName !== saved.fromName
    || values.consultationRecipientEmail !== saved.consultationRecipientEmail;
}

function removeFieldError(errors: Record<string, string>, field: string): Record<string, string> {
  if (!(field in errors)) return errors;
  const next = { ...errors };
  delete next[field];
  return next;
}

function getTestEmailErrorMessage(error: unknown): string {
  const code = getApiError(error)?.code;
  const safeMessages: Record<string, string> = {
    EMAIL_PROVIDER_NOT_CONFIGURED: 'Máy chủ chưa được cấu hình thông tin kết nối email.',
    PROVIDER_NOT_CONFIGURED: 'Máy chủ chưa được cấu hình thông tin kết nối email.',
    EMAIL_NOTIFICATIONS_DISABLED: 'Tính năng gửi email đang tắt. Vui lòng bật và lưu cấu hình trước.',
    EMAIL_DELIVERY_DISABLED: 'Tính năng gửi email đang tắt. Vui lòng bật và lưu cấu hình trước.',
    EMAIL_DELIVERY_FAILED: 'Không thể gửi email kiểm tra. Vui lòng kiểm tra cấu hình máy chủ hoặc thử lại sau.',
  };

  return (code && safeMessages[code])
    || 'Không thể gửi email kiểm tra. Vui lòng kiểm tra cấu hình máy chủ hoặc thử lại sau.';
}

export default function AdminEmailSettings() {
  const settingsQuery = useAdminEmailSettings();
  const updateSettings = useUpdateAdminEmailSettings();
  const sendTest = useSendTestEmail();
  const { showToast } = useToast();
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string>();
  const [testRecipient, setTestRecipient] = useState('');
  const [testError, setTestError] = useState<string>();
  const [testFieldError, setTestFieldError] = useState<string>();

  useEffect(() => {
    if (!settingsQuery.data) return;
    setValues(toFormValues(settingsQuery.data));
    setTestRecipient((current) => current || settingsQuery.data.consultationRecipientEmail);
  }, [settingsQuery.data]);

  const errors = { ...serverErrors, ...clientErrors };
  const dirty = isFormDirty(values, settingsQuery.data);
  const inputClass = 'w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/10 disabled:bg-gray-100 disabled:text-gray-500';

  const setField = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setClientErrors((current) => removeFieldError(current, field));
    setServerErrors((current) => removeFieldError(current, field));
    setFormError(undefined);
  };

  const fieldA11y = (field: keyof FormValues) => ({
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  });

  const validateSettings = (): boolean => {
    const next: Record<string, string> = {};
    const fromEmail = values.fromEmail.trim();
    const fromName = values.fromName.trim();
    const recipientEmail = values.consultationRecipientEmail.trim();

    if (!fromEmail) next.fromEmail = 'Vui lòng nhập email người gửi.';
    else if (fromEmail.length > 320 || !emailPattern.test(fromEmail)) next.fromEmail = 'Email người gửi không hợp lệ.';

    if (!fromName) next.fromName = 'Vui lòng nhập tên người gửi.';
    else if (fromName.length > 200) next.fromName = 'Tên người gửi không được vượt quá 200 ký tự.';

    if (!recipientEmail) next.consultationRecipientEmail = 'Vui lòng nhập email nhận thông báo.';
    else if (recipientEmail.length > 320 || !emailPattern.test(recipientEmail)) next.consultationRecipientEmail = 'Email nhận thông báo không hợp lệ.';

    setClientErrors(next);
    return Object.keys(next).length === 0;
  };

  const submitSettings = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (updateSettings.isPending || !settingsQuery.data || !validateSettings()) return;

    setServerErrors({});
    setFormError(undefined);
    const request: EmailSettingsUpdateRequest = {
      enabled: values.enabled,
      fromEmail: values.fromEmail.trim(),
      fromName: values.fromName.trim(),
      consultationRecipientEmail: values.consultationRecipientEmail.trim(),
    };

    updateSettings.mutate(request, {
      onSuccess: (updated) => {
        setValues(toFormValues(updated));
        setClientErrors({});
        setServerErrors({});
        setFormError(undefined);
        showToast('Cập nhật cấu hình email thành công.');
      },
      onError: (error) => {
        setServerErrors(getApiError(error)?.fieldErrors ?? {});
        setFormError(getVietnameseApiError(error, 'Không thể cập nhật cấu hình email. Vui lòng thử lại.'));
      },
    });
  };

  const submitTestEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sendTest.isPending || !settingsQuery.data?.providerConfigured || !settingsQuery.data.enabled) return;

    const recipientEmail = testRecipient.trim();
    setTestError(undefined);
    setTestFieldError(undefined);
    if (!recipientEmail || recipientEmail.length > 320 || !emailPattern.test(recipientEmail)) {
      setTestFieldError(!recipientEmail ? 'Vui lòng nhập email nhận thử.' : 'Email nhận thử không hợp lệ.');
      return;
    }

    sendTest.mutate({ recipientEmail }, {
      onSuccess: () => {
        setTestRecipient(recipientEmail);
        setTestError(undefined);
        setTestFieldError(undefined);
        showToast('Email kiểm tra đã được gửi thành công.');
      },
      onError: (error) => {
        setTestFieldError(getApiError(error)?.fieldErrors?.recipientEmail);
        setTestError(getTestEmailErrorMessage(error));
      },
    });
  };

  if (settingsQuery.isPending) return <EmailSettingsLoading />;

  if (settingsQuery.isError || !settingsQuery.data) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-white px-6 py-16 text-center">
        <h1 className="text-lg font-black text-gray-900">Không thể tải cấu hình email</h1>
        <p className="mt-2 text-sm text-red-600">{getVietnameseApiError(settingsQuery.error, 'Vui lòng thử lại sau.')}</p>
        <button type="button" onClick={() => void settingsQuery.refetch()} className="mt-5 rounded-lg bg-[#d40000] px-4 py-2 text-sm font-bold text-white">Thử lại</button>
      </div>
    );
  }

  const settings = settingsQuery.data;
  const testDisabled = sendTest.isPending || !settings.providerConfigured || !settings.enabled;

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-[#d40000]">Cấu hình hệ thống</p>
        <h1 className="mt-1 text-2xl font-black">Cấu hình email</h1>
        <p className="mt-1 text-sm text-gray-500">Thiết lập địa chỉ gửi và nhận thông báo yêu cầu tư vấn.</p>
      </div>

      <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-900">
        Thông tin máy chủ và mật khẩu email được cấu hình an toàn trên hệ thống và không hiển thị tại đây.
      </div>

      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-base font-black">Trạng thái nhà cung cấp</h2>
            <p className="mt-1 text-sm font-semibold text-gray-700">Nhà cung cấp: {settings.deliveryProvider || 'SMTP'}</p>
          </div>
          <span className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-bold ${settings.providerConfigured ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
            {settings.providerConfigured ? 'Đã cấu hình thông tin kết nối' : 'Chưa cấu hình thông tin kết nối trên máy chủ'}
          </span>
        </div>
        <p className="mt-4 text-xs leading-5 text-gray-500">Trạng thái “Đã cấu hình” chỉ cho biết máy chủ đã có thông tin kết nối. Hãy gửi email kiểm tra để xác nhận dịch vụ hoạt động.</p>
      </div>

      <form onSubmit={submitSettings} noValidate className="space-y-6">
        {formError && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{formError}</div>}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-black">Thiết lập gửi và nhận</h2>
          <div className="mt-5 space-y-5">
            <div className="rounded-xl bg-gray-50 p-4">
              <label htmlFor="enabled" className="flex cursor-pointer items-start gap-3">
                <input id="enabled" type="checkbox" role="switch" checked={values.enabled} onChange={(event) => setField('enabled', event.target.checked)} disabled={updateSettings.isPending} className="mt-1 h-4 w-4 accent-[#d40000]" />
                <span><strong className="block text-sm text-gray-900">Bật gửi email thông báo</strong><span className="mt-1 block text-xs leading-5 text-gray-500">Khi tắt, yêu cầu tư vấn vẫn được lưu nhưng hệ thống sẽ không gửi email thông báo.</span></span>
              </label>
            </div>

            <Field id="fromEmail" label="Email người gửi" required error={errors.fromEmail}>
              <input id="fromEmail" type="email" value={values.fromEmail} onChange={(event) => setField('fromEmail', event.target.value)} maxLength={320} disabled={updateSettings.isPending} className={inputClass} placeholder="info@mhconsulting.vn" {...fieldA11y('fromEmail')} />
            </Field>
            <Field id="fromName" label="Tên người gửi" required error={errors.fromName}>
              <input id="fromName" value={values.fromName} onChange={(event) => setField('fromName', event.target.value)} maxLength={200} disabled={updateSettings.isPending} className={inputClass} placeholder="MH Consulting" {...fieldA11y('fromName')} />
            </Field>
            <Field id="consultationRecipientEmail" label="Email nhận yêu cầu tư vấn" required error={errors.consultationRecipientEmail} description="Yêu cầu tư vấn mới sẽ được gửi đến địa chỉ này.">
              <input id="consultationRecipientEmail" type="email" value={values.consultationRecipientEmail} onChange={(event) => setField('consultationRecipientEmail', event.target.value)} maxLength={320} disabled={updateSettings.isPending} className={inputClass} placeholder="admin@example.com" {...fieldA11y('consultationRecipientEmail')} />
            </Field>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={updateSettings.isPending} className="rounded-lg bg-[#d40000] px-6 py-3 text-sm font-black text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50">{updateSettings.isPending ? 'Đang lưu...' : 'Lưu cấu hình'}</button>
        </div>
      </form>

      <form onSubmit={submitTestEmail} noValidate className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-black">Gửi email kiểm tra</h2>
        <p className="mt-1 text-sm text-gray-500">Gửi một email thử để kiểm tra cấu hình hiện tại.</p>

        {dirty && <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs font-semibold text-amber-800">Email kiểm tra sử dụng cấu hình đã được lưu gần nhất.</p>}
        {!settings.providerConfigured && <p className="mt-4 text-sm font-semibold text-amber-700">Chưa thể gửi thử vì máy chủ chưa có thông tin kết nối email.</p>}
        {settings.providerConfigured && !settings.enabled && <p className="mt-4 text-sm font-semibold text-amber-700">Tính năng gửi email đang tắt. Vui lòng bật và lưu cấu hình trước khi gửi thử.</p>}
        {testError && <div role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{testError}</div>}

        <div className="mt-5">
          <Field id="testRecipient" label="Email nhận thử" required error={testFieldError}>
            <input id="testRecipient" type="email" value={testRecipient} onChange={(event) => { setTestRecipient(event.target.value); setTestFieldError(undefined); setTestError(undefined); }} maxLength={320} disabled={testDisabled} className={inputClass} placeholder="admin@example.com" aria-invalid={Boolean(testFieldError)} aria-describedby={testFieldError ? 'testRecipient-error' : undefined} />
          </Field>
          <button type="submit" disabled={testDisabled} className="mt-4 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-black text-white hover:bg-[#d40000] disabled:cursor-not-allowed disabled:opacity-50">{sendTest.isPending ? 'Đang gửi email kiểm tra...' : 'Gửi email kiểm tra'}</button>
        </div>

        <p className="mt-5 text-xs leading-5 text-gray-500">Một số nền tảng triển khai miễn phí có thể giới hạn kết nối SMTP. Nếu gửi thử thất bại dù cấu hình chính xác, vui lòng kiểm tra giới hạn của máy chủ triển khai.</p>
      </form>
    </section>
  );
}

function Field({ id, label, required = false, error, description, children }: { id: string; label: string; required?: boolean; error?: string; description?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-gray-700">{label}{required && <span className="text-[#d40000]"> *</span>}</label>
      {description && <p className="mb-2 text-xs leading-5 text-gray-500">{description}</p>}
      {children}
      {error && <p id={`${id}-error`} className="mt-1.5 text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
}

function EmailSettingsLoading() {
  return (
    <div className="mx-auto max-w-3xl space-y-6" aria-label="Đang tải cấu hình email">
      <div className="h-16 animate-pulse rounded-xl bg-gray-200" />
      <div className="h-36 animate-pulse rounded-2xl border border-gray-200 bg-white" />
      <div className="h-80 animate-pulse rounded-2xl border border-gray-200 bg-white" />
    </div>
  );
}
