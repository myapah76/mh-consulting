import { useState, type FormEvent, type ReactNode } from 'react';
import PasswordInput from '../../../components/common/PasswordInput';
import { useToast } from '../../../components/common/ToastProvider';
import { ADMIN_PASSWORD_MAX_LENGTH, validateAdminPassword } from '../../../utils/adminAccountValidation';
import { getApiError, getVietnameseApiError } from '../../../utils/apiError';
import { useCreateAdminAccount } from '../hooks/useAdminAccounts';

interface FormValues { fullName: string; email: string; password: string; confirmPassword: string }
const initialValues: FormValues = { fullName: '', email: '', password: '', confirmPassword: '' };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AdminAccountCreate() {
  const [values, setValues] = useState(initialValues);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string>();
  const create = useCreateAdminAccount();
  const { showToast } = useToast();
  const errors = { ...serverErrors, ...clientErrors };
  const setField = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setClientErrors((current) => { const next = { ...current }; delete next[field]; return next; });
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (create.isPending) return;
    setServerErrors({});
    setFormError(undefined);
    const next: Record<string, string> = {};
    const fullName = values.fullName.trim();
    const email = values.email.trim();
    if (!fullName) next.fullName = 'Vui lòng nhập họ và tên.';
    else if (fullName.length > 200) next.fullName = 'Họ và tên không được vượt quá 200 ký tự.';
    else if (/<[^>]+>/.test(fullName)) next.fullName = 'Họ và tên không được chứa thẻ HTML.';
    if (!email) next.email = 'Vui lòng nhập email.';
    else if (email.length > 320 || !emailPattern.test(email)) next.email = 'Email không hợp lệ.';
    const passwordError = validateAdminPassword(values.password);
    if (passwordError) next.password = passwordError;
    if (!values.confirmPassword) next.confirmPassword = 'Vui lòng xác nhận mật khẩu.';
    else if (values.password !== values.confirmPassword) next.confirmPassword = 'Mật khẩu xác nhận không khớp.';
    setClientErrors(next);
    if (Object.keys(next).length) return;
    create.mutate({ fullName, email, password: values.password, confirmPassword: values.confirmPassword }, {
      onSuccess: () => {
        setValues((current) => ({ ...current, password: '', confirmPassword: '' }));
        setClientErrors({});
        showToast('Tạo tài khoản quản trị thành công.');
        create.reset();
      },
      onError: (error) => {
        setServerErrors(getApiError(error)?.fieldErrors ?? {});
        setFormError(getVietnameseApiError(error, 'Không thể tạo tài khoản quản trị. Vui lòng thử lại.'));
        create.reset();
      },
    });
  };
  const inputClass = 'w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/10 disabled:bg-gray-100';
  return (
    <section className="mx-auto max-w-3xl"><div className="mb-6"><p className="text-xs font-black uppercase tracking-widest text-[#d40000]">Quản lý tài khoản</p><h1 className="mt-1 text-2xl font-black">Tạo Tài Khoản Quản Trị</h1></div>
      <form onSubmit={submit} noValidate className="space-y-6">
        {formError && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{formError}</div>}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"><div className="grid gap-5 md:grid-cols-2">
          <Field label="Họ và tên" id="fullName" error={errors.fullName}><input id="fullName" value={values.fullName} onChange={(event) => setField('fullName', event.target.value)} maxLength={200} disabled={create.isPending} autoComplete="off" className={inputClass} /></Field>
          <Field label="Email" id="email" error={errors.email}><input id="email" type="email" value={values.email} onChange={(event) => setField('email', event.target.value)} maxLength={320} disabled={create.isPending} autoComplete="off" className={inputClass} /></Field>
          <Field label="Mật khẩu" id="password" error={errors.password}><PasswordInput id="password" value={values.password} onChange={(value) => setField('password', value)} autoComplete="new-password" maxLength={ADMIN_PASSWORD_MAX_LENGTH} disabled={create.isPending} /></Field>
          <Field label="Xác nhận mật khẩu" id="confirmPassword" error={errors.confirmPassword}><PasswordInput id="confirmPassword" value={values.confirmPassword} onChange={(value) => setField('confirmPassword', value)} autoComplete="new-password" maxLength={ADMIN_PASSWORD_MAX_LENGTH} disabled={create.isPending} /></Field>
          <p className="md:col-span-2 text-xs leading-5 text-gray-500">Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.</p>
        </div></div>
        <div className="flex justify-end"><button type="submit" disabled={create.isPending} className="rounded-lg bg-[#d40000] px-6 py-3 text-sm font-black text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50">{create.isPending ? 'Đang tạo...' : 'Tạo tài khoản quản trị'}</button></div>
      </form>
    </section>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: ReactNode }) { return <div><label htmlFor={id} className="mb-1.5 block text-sm font-bold text-gray-700">{label} <span className="text-[#d40000]">*</span></label>{children}{error && <p className="mt-1.5 text-xs font-semibold text-red-600">{error}</p>}</div>; }
