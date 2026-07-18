import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { useToast } from '../../../components/common/ToastProvider';
import { getApiError, getVietnameseApiError } from '../../../utils/apiError';
import { useAdminContactSettings, useUpdateContactSettings } from '../hooks/useContactSettings';
import type { ContactSettings } from '../types/settings.types';

interface FormValues {
  address: string;
  primaryPhone: string;
  primaryPhoneLabel: string;
  secondaryPhone: string;
  secondaryPhoneLabel: string;
  email: string;
  workingHours: string;
  facebookUrl: string;
  zaloUrl: string;
  youtubeUrl: string;
}

const emptyValues: FormValues = {
  address: '',
  primaryPhone: '',
  primaryPhoneLabel: '',
  secondaryPhone: '',
  secondaryPhoneLabel: '',
  email: '',
  workingHours: '',
  facebookUrl: '',
  zaloUrl: '',
  youtubeUrl: '',
};

const phonePattern = /^(?:\+?84|0)[\s.-]?(?:3|5|7|8|9)(?:[\s.-]?\d){8}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const absoluteHttpUrlPattern = /^https?:\/\/[^\s]+$/;

function toFormValues(settings: ContactSettings): FormValues {
  return {
    address: settings.address,
    primaryPhone: settings.primaryPhone,
    primaryPhoneLabel: settings.primaryPhoneLabel ?? '',
    secondaryPhone: settings.secondaryPhone ?? '',
    secondaryPhoneLabel: settings.secondaryPhoneLabel ?? '',
    email: settings.email,
    workingHours: settings.workingHours,
    facebookUrl: settings.facebookUrl ?? '',
    zaloUrl: settings.zaloUrl ?? '',
    youtubeUrl: settings.youtubeUrl ?? '',
  };
}

function blankToNull(value: string): string | null {
  const normalized = value.trim();
  return normalized || null;
}

export default function AdminContactSettings() {
  const settingsQuery = useAdminContactSettings();
  const update = useUpdateContactSettings();
  const { showToast } = useToast();
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string>();

  useEffect(() => {
    if (settingsQuery.data) setValues(toFormValues(settingsQuery.data));
  }, [settingsQuery.data]);

  const errors = { ...serverErrors, ...clientErrors };
  const inputClass = 'w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/10 disabled:bg-gray-100';

  const setField = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setClientErrors((current) => removeFieldError(current, field));
    setServerErrors((current) => removeFieldError(current, field));
    setFormError(undefined);
  };

  const fieldA11y = (field: keyof FormValues) => ({
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  });

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    const address = values.address.trim();
    const primaryPhone = values.primaryPhone.trim();
    const secondaryPhone = values.secondaryPhone.trim();
    const email = values.email.trim();
    const workingHours = values.workingHours.trim();

    if (!address) next.address = 'Vui lòng nhập địa chỉ.';
    else if (address.length > 1000) next.address = 'Địa chỉ không được vượt quá 1.000 ký tự.';

    if (!primaryPhone) next.primaryPhone = 'Vui lòng nhập số điện thoại chính.';
    else if (primaryPhone.length > 50 || !phonePattern.test(primaryPhone)) next.primaryPhone = 'Số điện thoại không hợp lệ.';

    if (values.primaryPhoneLabel.trim().length > 100) next.primaryPhoneLabel = 'Tên người liên hệ không được vượt quá 100 ký tự.';
    if (secondaryPhone && (secondaryPhone.length > 50 || !phonePattern.test(secondaryPhone))) next.secondaryPhone = 'Số điện thoại không hợp lệ.';
    if (values.secondaryPhoneLabel.trim().length > 100) next.secondaryPhoneLabel = 'Tên người liên hệ không được vượt quá 100 ký tự.';

    if (!email) next.email = 'Vui lòng nhập email.';
    else if (email.length > 320 || !emailPattern.test(email)) next.email = 'Email không hợp lệ.';

    if (!workingHours) next.workingHours = 'Vui lòng nhập giờ làm việc.';
    else if (workingHours.length > 255) next.workingHours = 'Giờ làm việc không được vượt quá 255 ký tự.';

    (['facebookUrl', 'zaloUrl', 'youtubeUrl'] as const).forEach((field) => {
      const url = values[field].trim();
      if (url && (url.length > 1000 || !absoluteHttpUrlPattern.test(url))) next[field] = 'Đường dẫn không hợp lệ.';
    });

    setClientErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (update.isPending || !validate()) return;

    setServerErrors({});
    setFormError(undefined);
    const request: ContactSettings = {
      address: values.address.trim(),
      primaryPhone: values.primaryPhone.trim(),
      primaryPhoneLabel: blankToNull(values.primaryPhoneLabel),
      secondaryPhone: blankToNull(values.secondaryPhone),
      secondaryPhoneLabel: blankToNull(values.secondaryPhoneLabel),
      email: values.email.trim(),
      workingHours: values.workingHours.trim(),
      facebookUrl: blankToNull(values.facebookUrl),
      zaloUrl: blankToNull(values.zaloUrl),
      youtubeUrl: blankToNull(values.youtubeUrl),
    };

    update.mutate(request, {
      onSuccess: (updated) => {
        setValues(toFormValues(updated));
        setClientErrors({});
        setServerErrors({});
        setFormError(undefined);
        showToast('Cập nhật thông tin liên hệ thành công.');
      },
      onError: (error) => {
        setServerErrors(getApiError(error)?.fieldErrors ?? {});
        setFormError(getVietnameseApiError(error, 'Không thể cập nhật thông tin liên hệ. Vui lòng thử lại.'));
      },
    });
  };

  const restoreServerValues = () => {
    if (!settingsQuery.data || update.isPending) return;
    setValues(toFormValues(settingsQuery.data));
    setClientErrors({});
    setServerErrors({});
    setFormError(undefined);
  };

  if (settingsQuery.isPending) {
    return <div className="py-20 text-center text-sm font-bold text-gray-500">Đang tải thông tin liên hệ...</div>;
  }

  if (settingsQuery.isError || !settingsQuery.data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white px-6 py-16 text-center">
        <h1 className="text-lg font-black text-gray-900">Không thể tải thông tin liên hệ</h1>
        <p className="mt-2 text-sm text-red-600">{getVietnameseApiError(settingsQuery.error, 'Vui lòng thử lại sau.')}</p>
        <button type="button" onClick={() => void settingsQuery.refetch()} className="mt-5 rounded-lg bg-[#d40000] px-4 py-2 text-sm font-bold text-white">Thử lại</button>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-[#d40000]">Cấu hình website</p>
        <h1 className="mt-1 text-2xl font-black">Thông tin liên hệ</h1>
        <p className="mt-1 text-sm text-gray-500">Cập nhật thông tin được hiển thị tại chân trang của website.</p>
      </div>

      <form onSubmit={submit} noValidate className="space-y-6">
        {formError && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{formError}</div>}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-black">Thông tin hiển thị</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <Field id="address" label="Địa chỉ trụ sở" required error={errors.address}>
                <textarea id="address" value={values.address} onChange={(event) => setField('address', event.target.value)} maxLength={1000} rows={3} disabled={update.isPending} className={inputClass} placeholder="133/15 Đ. Ngô Đức Kế, Phường 12, Quận Bình Thạnh, TP. Hồ Chí Minh" {...fieldA11y('address')} />
              </Field>
            </div>
            <Field id="primaryPhone" label="Số điện thoại chính" required error={errors.primaryPhone}>
              <input id="primaryPhone" type="tel" value={values.primaryPhone} onChange={(event) => setField('primaryPhone', event.target.value)} maxLength={50} disabled={update.isPending} className={inputClass} placeholder="0903.024.116" {...fieldA11y('primaryPhone')} />
            </Field>
            <Field id="primaryPhoneLabel" label="Tên người liên hệ chính" error={errors.primaryPhoneLabel}>
              <input id="primaryPhoneLabel" value={values.primaryPhoneLabel} onChange={(event) => setField('primaryPhoneLabel', event.target.value)} maxLength={100} disabled={update.isPending} className={inputClass} placeholder="Ms. Thảo" {...fieldA11y('primaryPhoneLabel')} />
            </Field>
            <Field id="secondaryPhone" label="Số điện thoại phụ" error={errors.secondaryPhone}>
              <input id="secondaryPhone" type="tel" value={values.secondaryPhone} onChange={(event) => setField('secondaryPhone', event.target.value)} maxLength={50} disabled={update.isPending} className={inputClass} placeholder="0938.835.633" {...fieldA11y('secondaryPhone')} />
            </Field>
            <Field id="secondaryPhoneLabel" label="Tên người liên hệ phụ" error={errors.secondaryPhoneLabel}>
              <input id="secondaryPhoneLabel" value={values.secondaryPhoneLabel} onChange={(event) => setField('secondaryPhoneLabel', event.target.value)} maxLength={100} disabled={update.isPending} className={inputClass} placeholder="Mr. Trí" {...fieldA11y('secondaryPhoneLabel')} />
            </Field>
            <Field id="email" label="Email liên hệ" required error={errors.email}>
              <input id="email" type="email" value={values.email} onChange={(event) => setField('email', event.target.value)} maxLength={320} disabled={update.isPending} className={inputClass} placeholder="info@mhconsulting.vn" {...fieldA11y('email')} />
            </Field>
            <Field id="workingHours" label="Giờ làm việc" required error={errors.workingHours}>
              <input id="workingHours" value={values.workingHours} onChange={(event) => setField('workingHours', event.target.value)} maxLength={255} disabled={update.isPending} className={inputClass} placeholder="Thứ 2 - Thứ 7: 08:00 - 17:30" {...fieldA11y('workingHours')} />
            </Field>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-black">Mạng xã hội</h2>
          <p className="mt-1 text-xs text-gray-500">Để trống những kênh không muốn hiển thị tại chân trang.</p>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <Field id="facebookUrl" label="Đường dẫn Facebook" error={errors.facebookUrl}>
              <input id="facebookUrl" type="url" value={values.facebookUrl} onChange={(event) => setField('facebookUrl', event.target.value)} maxLength={1000} disabled={update.isPending} className={inputClass} placeholder="https://facebook.com/mhconsulting" {...fieldA11y('facebookUrl')} />
            </Field>
            <Field id="zaloUrl" label="Đường dẫn Zalo" error={errors.zaloUrl}>
              <input id="zaloUrl" type="url" value={values.zaloUrl} onChange={(event) => setField('zaloUrl', event.target.value)} maxLength={1000} disabled={update.isPending} className={inputClass} placeholder="https://zalo.me/0903024116" {...fieldA11y('zaloUrl')} />
            </Field>
            <div className="md:col-span-2">
              <Field id="youtubeUrl" label="Đường dẫn YouTube" error={errors.youtubeUrl}>
                <input id="youtubeUrl" type="url" value={values.youtubeUrl} onChange={(event) => setField('youtubeUrl', event.target.value)} maxLength={1000} disabled={update.isPending} className={inputClass} placeholder="https://youtube.com/@mhconsulting" {...fieldA11y('youtubeUrl')} />
              </Field>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 flex flex-col-reverse gap-3 rounded-xl border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:justify-end">
          <button type="button" onClick={restoreServerValues} disabled={update.isPending} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-700 disabled:cursor-not-allowed disabled:opacity-50">Khôi phục dữ liệu chưa lưu</button>
          <button type="submit" disabled={update.isPending} className="rounded-lg bg-[#d40000] px-6 py-2.5 text-sm font-black text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50">{update.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}</button>
        </div>
      </form>
    </section>
  );
}

function removeFieldError(errors: Record<string, string>, field: string): Record<string, string> {
  if (!(field in errors)) return errors;
  const next = { ...errors };
  delete next[field];
  return next;
}

function Field({ id, label, required = false, error, children }: { id: string; label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-gray-700">{label}{required && <span className="text-[#d40000]"> *</span>}</label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1.5 text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
}
