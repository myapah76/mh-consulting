import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import PasswordInput from '../../../components/common/PasswordInput';
import { useToast } from '../../../components/common/ToastProvider';
import { getApiError, getApiStatus, getVietnameseApiError } from '../../../utils/apiError';
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
  smtpUsername: string;
}

const emptyValues: FormValues = {
  enabled: false,
  fromEmail: '',
  fromName: '',
  consultationRecipientEmail: '',
  smtpUsername: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toFormValues(settings: EmailSettingsResponse): FormValues {
  return {
    enabled: settings.enabled,
    fromEmail: settings.fromEmail,
    fromName: settings.fromName,
    consultationRecipientEmail: settings.consultationRecipientEmail,
    smtpUsername: settings.smtpUsername ?? '',
  };
}

function isFormDirty(values: FormValues, smtpPassword: string, saved?: EmailSettingsResponse): boolean {
  if (!saved) return false;
  return values.enabled !== saved.enabled
    || values.fromEmail !== saved.fromEmail
    || values.fromName !== saved.fromName
    || values.consultationRecipientEmail !== saved.consultationRecipientEmail
    || values.smtpUsername !== saved.smtpUsername
    || Boolean(smtpPassword);
}

function removeFieldError(errors: Record<string, string>, field: string): Record<string, string> {
  if (!(field in errors)) return errors;
  const next = { ...errors };
  delete next[field];
  return next;
}

function getTestEmailErrorMessage(error: unknown): string {
  void error;
  return 'Không thể gửi email kiểm tra. Vui lòng kiểm tra tài khoản SMTP, mật khẩu ứng dụng hoặc giới hạn của máy chủ triển khai.';
}

function shouldClearPasswordAfterError(error: unknown): boolean {
  const status = getApiStatus(error);
  const code = getApiError(error)?.code ?? '';
  return status === 401
    || status === 403
    || /AUTH|SMTP|PROVIDER|EMAIL_DELIVERY/.test(code);
}

function getSettingsFieldErrors(error: unknown): Record<string, string> {
  const fieldErrors = getApiError(error)?.fieldErrors ?? {};
  const safeErrors: Record<string, string> = {};

  for (const field of ['fromEmail', 'fromName', 'consultationRecipientEmail', 'smtpUsername']) {
    if (fieldErrors[field]) safeErrors[field] = fieldErrors[field];
  }
  if (fieldErrors.smtpPassword) safeErrors.smtpPassword = 'Vui lòng kiểm tra lại mật khẩu SMTP.';

  return safeErrors;
}

export default function AdminEmailSettings() {
  const settingsQuery = useAdminEmailSettings();
  const updateSettings = useUpdateAdminEmailSettings();
  const sendTest = useSendTestEmail();
  const { showToast } = useToast();
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [smtpPassword, setSmtpPassword] = useState('');
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string>();
  const [testRecipient, setTestRecipient] = useState('');
  const [testError, setTestError] = useState<string>();
  const [testFieldError, setTestFieldError] = useState<string>();
  const [savedNotice, setSavedNotice] = useState(false);
  const savingRef = useRef(false);
  const settings = settingsQuery.data;

  useEffect(() => {
    if (!settings) return;
    setValues(toFormValues(settings));
    setSmtpPassword('');
    setTestRecipient((current) => current || settings.consultationRecipientEmail);
  }, [settings]);

  const errors = { ...serverErrors, ...clientErrors };
  const dirty = isFormDirty(values, smtpPassword, settings);
  const smtpUsernameChanged = Boolean(settings)
    && values.smtpUsername.trim().toLowerCase() !== (settings?.smtpUsername ?? '').trim().toLowerCase();
  const inputClass = 'w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/10 disabled:bg-gray-100 disabled:text-gray-500';

  const setField = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setClientErrors((current) => removeFieldError(current, field));
    setServerErrors((current) => removeFieldError(current, field));
    setFormError(undefined);
    setSavedNotice(false);
  };

  const setPassword = (value: string) => {
    setSmtpPassword(value);
    setClientErrors((current) => removeFieldError(current, 'smtpPassword'));
    setServerErrors((current) => removeFieldError(current, 'smtpPassword'));
    setFormError(undefined);
    setSavedNotice(false);
  };

  const fieldA11y = (field: keyof FormValues) => ({
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  });

  const validateSettings = (): boolean => {
    if (!settings) return false;

    const next: Record<string, string> = {};
    const fromEmail = values.fromEmail.trim();
    const fromName = values.fromName.trim();
    const recipientEmail = values.consultationRecipientEmail.trim();
    const smtpUsername = values.smtpUsername.trim();

    if (!fromEmail) next.fromEmail = 'Vui lòng nhập email người gửi.';
    else if (fromEmail.length > 320 || !emailPattern.test(fromEmail)) next.fromEmail = 'Email người gửi không hợp lệ.';

    if (!fromName) next.fromName = 'Vui lòng nhập tên người gửi.';
    else if (fromName.length > 200) next.fromName = 'Tên người gửi không được vượt quá 200 ký tự.';

    if (!recipientEmail) next.consultationRecipientEmail = 'Vui lòng nhập email nhận thông báo.';
    else if (recipientEmail.length > 320 || !emailPattern.test(recipientEmail)) next.consultationRecipientEmail = 'Email nhận thông báo không hợp lệ.';

    if (!smtpUsername) next.smtpUsername = 'Vui lòng nhập tài khoản SMTP.';
    else if (smtpUsername.length > 320 || !emailPattern.test(smtpUsername)) next.smtpUsername = 'Tài khoản SMTP không hợp lệ.';

    if (smtpPassword.length > 500) next.smtpPassword = 'Mật khẩu SMTP không được vượt quá 500 ký tự.';
    else if (!smtpPassword.trim() && !settings.smtpPasswordConfigured) next.smtpPassword = 'Vui lòng nhập mật khẩu SMTP.';
    else if (!smtpPassword.trim() && smtpUsernameChanged) next.smtpPassword = 'Vui lòng nhập lại mật khẩu khi thay đổi tài khoản SMTP.';

    setClientErrors(next);
    return Object.keys(next).length === 0;
  };

  const submitSettings = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (savingRef.current || updateSettings.isPending || !settings || !validateSettings()) return;

    savingRef.current = true;
    setServerErrors({});
    setFormError(undefined);
    const payload: EmailSettingsUpdateRequest = {
      enabled: values.enabled,
      fromEmail: values.fromEmail.trim().toLowerCase(),
      fromName: values.fromName.trim(),
      consultationRecipientEmail: values.consultationRecipientEmail.trim().toLowerCase(),
      smtpUsername: values.smtpUsername.trim().toLowerCase(),
      smtpPassword: smtpPassword.trim() ? smtpPassword : null,
    };

    updateSettings.mutate(payload, {
      onSuccess: (updated) => {
        savingRef.current = false;
        setValues(toFormValues(updated));
        setSmtpPassword('');
        setClientErrors({});
        setServerErrors({});
        setFormError(undefined);
        setSavedNotice(true);
        showToast('Cập nhật cấu hình email thành công.');
        updateSettings.reset();
      },
      onError: (error) => {
        savingRef.current = false;
        setServerErrors(getSettingsFieldErrors(error));
        setFormError('Không thể cập nhật cấu hình email. Vui lòng thử lại.');
        if (shouldClearPasswordAfterError(error)) setSmtpPassword('');
        updateSettings.reset();
      },
    });
  };

  const resetSettings = () => {
    if (!settings || updateSettings.isPending) return;
    setValues(toFormValues(settings));
    setSmtpPassword('');
    setClientErrors({});
    setServerErrors({});
    setFormError(undefined);
    setSavedNotice(false);
  };

  const submitTestEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sendTest.isPending || !settings || !settings.providerConfigured || !settings.enabled) return;

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

  if (settingsQuery.isPending) {
    return <EmailSettingsLoadingState />;
  }

  if (settingsQuery.isError) {
    return (
      <EmailSettingsErrorState
        message={getVietnameseApiError(settingsQuery.error, 'Vui lòng thử lại sau.')}
        onRetry={() => {
          void settingsQuery.refetch();
        }}
      />
    );
  }

  if (!settings) {
    return (
      <EmailSettingsEmptyState
        onRetry={() => {
          void settingsQuery.refetch();
        }}
      />
    );
  }

  const testDisabled = sendTest.isPending || !settings.providerConfigured || !settings.enabled;

  return (
    <section className="mx-auto max-w-4xl">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-[#d40000]">Cấu hình hệ thống</p>
        <h1 className="mt-1 text-2xl font-black">Cấu hình email</h1>
        <p className="mt-1 text-sm text-gray-500">Thiết lập địa chỉ gửi và nhận thông báo yêu cầu tư vấn.</p>
      </div>

      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-base font-black">Trạng thái gửi email</h2>
            <p className="mt-1 text-sm font-semibold text-gray-700">Nhà cung cấp: {settings.deliveryProvider || 'SMTP'}</p>
          </div>
          <span className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-bold ${settings.providerConfigured ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
            {settings.providerConfigured ? 'Đã cấu hình thông tin kết nối' : 'Chưa cấu hình thông tin kết nối trên máy chủ'}
          </span>
        </div>
        <p className="mt-4 text-xs leading-5 text-gray-500">Trạng thái “Đã cấu hình” chỉ cho biết máy chủ đã có thông tin kết nối. Hãy gửi email kiểm tra để xác nhận dịch vụ hoạt động.</p>
        <div className="mt-4 rounded-xl bg-gray-50 p-4">
          <label htmlFor="enabled" className="flex cursor-pointer items-start gap-3">
            <input id="enabled" type="checkbox" role="switch" checked={values.enabled} onChange={(event) => setField('enabled', event.target.checked)} disabled={updateSettings.isPending} className="mt-1 h-4 w-4 accent-[#d40000]" />
            <span><strong className="block text-sm text-gray-900">Bật gửi email thông báo</strong><span className="mt-1 block text-xs leading-5 text-gray-500">Khi tắt, yêu cầu tư vấn vẫn được lưu nhưng hệ thống sẽ không gửi email thông báo.</span></span>
          </label>
        </div>
      </div>

      <form onSubmit={submitSettings} noValidate className="space-y-6">
        {formError && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{formError}</div>}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-black">Thông tin người gửi và người nhận</h2>
          <div className="mt-5 space-y-5">
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

        <fieldset className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <legend className="px-1 text-base font-black">Thông tin đăng nhập SMTP</legend>
          <div className="mt-4 space-y-5">
            <Field id="smtpUsername" label="Tài khoản SMTP" required error={errors.smtpUsername} description="Tài khoản được sử dụng để đăng nhập vào máy chủ gửi email.">
              <input id="smtpUsername" type="email" autoComplete="username" value={values.smtpUsername} onChange={(event) => setField('smtpUsername', event.target.value)} maxLength={320} disabled={updateSettings.isPending} className={inputClass} placeholder="admin@gmail.com" {...fieldA11y('smtpUsername')} />
            </Field>

            <div className="flex flex-col gap-2 rounded-xl bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-bold text-gray-700">Trạng thái mật khẩu</span>
              <span className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-bold ${settings.smtpPasswordConfigured ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                {settings.smtpPasswordConfigured ? 'Đã lưu mật khẩu SMTP' : 'Chưa có mật khẩu SMTP'}
              </span>
            </div>
            <p className="text-xs leading-5 text-gray-500">Trạng thái mật khẩu chỉ cho biết hệ thống có thông tin xác thực. Trạng thái nhà cung cấp chỉ cho biết backend có đủ cấu hình bắt buộc; cả hai đều không đảm bảo việc gửi email sẽ thành công.</p>

            <Field id="smtpPassword" label="Mật khẩu ứng dụng SMTP" required={!settings.smtpPasswordConfigured || smtpUsernameChanged} error={errors.smtpPassword} description="Mật khẩu hiện tại không được hiển thị vì lý do bảo mật.">
              <PasswordInput id="smtpPassword" value={smtpPassword} onChange={setPassword} autoComplete="new-password" maxLength={500} disabled={updateSettings.isPending} placeholder={settings.smtpPasswordConfigured ? 'Đã có mật khẩu — để trống nếu không thay đổi' : 'Nhập mật khẩu ứng dụng SMTP'} invalid={Boolean(errors.smtpPassword)} ariaDescribedBy={errors.smtpPassword ? 'smtpPassword-error' : undefined} />
            </Field>
            <p className="text-xs leading-5 text-gray-600">Sử dụng App Password của Google, không sử dụng mật khẩu đăng nhập Gmail thông thường.</p>
            <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs font-semibold leading-5 text-amber-900">Không chia sẻ mật khẩu ứng dụng. Hệ thống sẽ mã hóa mật khẩu trước khi lưu và không thể hiển thị lại trên giao diện.</p>
          </div>
        </fieldset>

        <div className="flex flex-col items-end gap-3">
          {savedNotice && <p className="text-sm font-semibold text-green-700">Hãy gửi email kiểm tra để xác nhận thông tin đăng nhập hoạt động.</p>}
          <div className="flex gap-3">
          <button type="button" onClick={resetSettings} disabled={updateSettings.isPending || !dirty} className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-black text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">Khôi phục</button>
          <button type="submit" disabled={updateSettings.isPending} className="rounded-lg bg-[#d40000] px-6 py-3 text-sm font-black text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50">{updateSettings.isPending ? 'Đang lưu...' : 'Lưu cấu hình'}</button>
          </div>
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

function EmailSettingsLoadingState() {
  return (
    <div className="mx-auto max-w-4xl space-y-6" aria-label="Đang tải cấu hình email">
      <div className="h-16 animate-pulse rounded-xl bg-gray-200" />
      <div className="h-36 animate-pulse rounded-2xl border border-gray-200 bg-white" />
      <div className="h-80 animate-pulse rounded-2xl border border-gray-200 bg-white" />
    </div>
  );
}

function EmailSettingsErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-red-200 bg-white px-6 py-16 text-center">
      <h1 className="text-lg font-black text-gray-900">Không thể tải cấu hình email</h1>
      <p className="mt-2 text-sm text-red-600">{message}</p>
      <button type="button" onClick={onRetry} className="mt-5 rounded-lg bg-[#d40000] px-4 py-2 text-sm font-bold text-white">Thử lại</button>
    </div>
  );
}

function EmailSettingsEmptyState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-amber-200 bg-white px-6 py-16 text-center">
      <h1 className="text-lg font-black text-gray-900">Không tìm thấy cấu hình email</h1>
      <p className="mt-2 text-sm text-gray-600">Máy chủ không trả về dữ liệu cấu hình. Vui lòng tải lại.</p>
      <button type="button" onClick={onRetry} className="mt-5 rounded-lg bg-[#d40000] px-4 py-2 text-sm font-bold text-white">Tải lại</button>
    </div>
  );
}
