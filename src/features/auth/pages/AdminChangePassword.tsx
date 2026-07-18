import { useState, type FormEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../../components/common/PasswordInput';
import { useToast } from '../../../components/common/ToastProvider';
import { useChangeAdminPassword } from '../../accounts';
import { authKeys, useClearAdminSession, useCurrentAdmin } from '../hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { ADMIN_PASSWORD_MAX_LENGTH, validateAdminPassword } from '../../../utils/adminAccountValidation';
import { getApiError, getApiStatus, getVietnameseApiError } from '../../../utils/apiError';

interface FormValues { currentPassword: string; newPassword: string; confirmPassword: string }
const initialValues: FormValues = { currentPassword: '', newPassword: '', confirmPassword: '' };

export default function AdminChangePassword() {
  const [values, setValues] = useState(initialValues);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string>();
  const changePassword = useChangeAdminPassword();
  const currentAdmin = useCurrentAdmin();
  const clearSession = useClearAdminSession();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const errors = { ...serverErrors, ...clientErrors };
  const setField = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setClientErrors((current) => { const next = { ...current }; delete next[field]; return next; });
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (changePassword.isPending) return;
    setServerErrors({});
    setFormError(undefined);
    const next: Record<string, string> = {};
    if (!values.currentPassword) next.currentPassword = 'Vui lòng nhập mật khẩu hiện tại.';
    const passwordError = validateAdminPassword(values.newPassword);
    if (passwordError) next.newPassword = passwordError.replace('Vui lòng nhập mật khẩu.', 'Vui lòng nhập mật khẩu mới.');
    if (!values.confirmPassword) next.confirmPassword = 'Vui lòng xác nhận mật khẩu mới.';
    else if (values.newPassword !== values.confirmPassword) next.confirmPassword = 'Mật khẩu xác nhận không khớp.';
    setClientErrors(next);
    if (Object.keys(next).length) return;
    changePassword.mutate(values, {
      onSuccess: async () => {
        setValues(initialValues);
        setClientErrors({});
        showToast('Đổi mật khẩu thành công.');
        const sessionResult = await currentAdmin.refetch();
        if (getApiStatus(sessionResult.error) === 401 || getApiStatus(sessionResult.error) === 404) {
          clearSession();
          queryClient.removeQueries({ queryKey: authKeys.current });
          navigate('/admin/login', { replace: true });
        }
        changePassword.reset();
      },
      onError: (error) => {
        setServerErrors(getApiError(error)?.fieldErrors ?? {});
        setFormError(getVietnameseApiError(error, 'Không thể đổi mật khẩu. Vui lòng thử lại.'));
        changePassword.reset();
      },
    });
  };
  return (
    <section className="mx-auto max-w-2xl"><div className="mb-6"><p className="text-xs font-black uppercase tracking-widest text-[#d40000]">Quản lý tài khoản</p><h1 className="mt-1 text-2xl font-black">Đổi Mật Khẩu</h1></div>
      <form onSubmit={submit} noValidate className="space-y-6">
        {formError && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{formError}</div>}
        <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <Field label="Mật khẩu hiện tại" id="currentPassword" error={errors.currentPassword}><PasswordInput id="currentPassword" value={values.currentPassword} onChange={(value) => setField('currentPassword', value)} autoComplete="current-password" maxLength={ADMIN_PASSWORD_MAX_LENGTH} disabled={changePassword.isPending} /></Field>
          <Field label="Mật khẩu mới" id="newPassword" error={errors.newPassword}><PasswordInput id="newPassword" value={values.newPassword} onChange={(value) => setField('newPassword', value)} autoComplete="new-password" maxLength={ADMIN_PASSWORD_MAX_LENGTH} disabled={changePassword.isPending} /></Field>
          <Field label="Xác nhận mật khẩu mới" id="confirmPassword" error={errors.confirmPassword}><PasswordInput id="confirmPassword" value={values.confirmPassword} onChange={(value) => setField('confirmPassword', value)} autoComplete="new-password" maxLength={ADMIN_PASSWORD_MAX_LENGTH} disabled={changePassword.isPending} /></Field>
          <p className="text-xs leading-5 text-gray-500">Mật khẩu mới phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.</p>
        </div>
        <div className="flex justify-end"><button type="submit" disabled={changePassword.isPending} className="rounded-lg bg-[#d40000] px-6 py-3 text-sm font-black text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50">{changePassword.isPending ? 'Đang cập nhật...' : 'Đổi mật khẩu'}</button></div>
      </form>
    </section>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: ReactNode }) { return <div><label htmlFor={id} className="mb-1.5 block text-sm font-bold text-gray-700">{label} <span className="text-[#d40000]">*</span></label>{children}{error && <p className="mt-1.5 text-xs font-semibold text-red-600">{error}</p>}</div>; }
