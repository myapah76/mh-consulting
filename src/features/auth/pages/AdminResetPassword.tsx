import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PasswordInput from '../../../components/common/PasswordInput';
import { ADMIN_PASSWORD_MAX_LENGTH, validateAdminPassword } from '../../../utils/adminAccountValidation';
import { getApiError } from '../../../utils/apiError';
import { useResetAdminPassword, useValidateAdminPasswordResetToken } from '../hooks/useAuth';

function formatExpiry(value: string): string | undefined {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

export default function AdminResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get('token')?.trim() ?? '';
  const tokenFormatValid = token.length > 0 && token.length <= 500;
  const validation = useValidateAdminPasswordResetToken(tokenFormatValid ? token : '');
  const resetPassword = useResetAdminPassword();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string>();
  const [tokenRejected, setTokenRejected] = useState(false);
  const [success, setSuccess] = useState(false);
  const errors = { ...serverErrors, ...clientErrors };

  const setPasswordField = (field: 'newPassword' | 'confirmPassword', value: string) => {
    field === 'newPassword' ? setNewPassword(value) : setConfirmPassword(value);
    setClientErrors((current) => { const next = { ...current }; delete next[field]; return next; });
    setServerErrors((current) => { const next = { ...current }; delete next[field]; return next; });
    setFormError(undefined);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (resetPassword.isPending || !validation.data?.valid) return;

    const next: Record<string, string> = {};
    const passwordError = validateAdminPassword(newPassword);
    if (passwordError) next.newPassword = passwordError.replace('Vui lòng nhập mật khẩu.', 'Vui lòng nhập mật khẩu mới.');
    if (!confirmPassword) next.confirmPassword = 'Vui lòng xác nhận mật khẩu mới.';
    else if (newPassword !== confirmPassword) next.confirmPassword = 'Mật khẩu xác nhận không khớp.';
    setClientErrors(next);
    if (Object.keys(next).length) return;

    setServerErrors({});
    setFormError(undefined);
    resetPassword.mutate({ token, newPassword, confirmPassword }, {
      onSuccess: () => {
        setNewPassword('');
        setConfirmPassword('');
        setClientErrors({});
        setServerErrors({});
        setFormError(undefined);
        setSuccess(true);
        resetPassword.reset();
        navigate('/admin/reset-password', { replace: true });
      },
      onError: (error) => {
        const apiError = getApiError(error);
        const fieldErrors = apiError?.fieldErrors ?? {};
        setNewPassword('');
        setConfirmPassword('');
        setServerErrors(fieldErrors);
        if (apiError?.code === 'INVALID_REQUEST' && Object.keys(fieldErrors).length === 0) {
          setTokenRejected(true);
          setFormError(undefined);
        } else {
          setFormError('Không thể đặt lại mật khẩu. Vui lòng yêu cầu một liên kết mới.');
        }
        resetPassword.reset();
      },
    });
  };

  let content;
  if (success) {
    content = (
      <div role="status" aria-live="polite" className="text-center">
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800">Đặt lại mật khẩu thành công.</div>
        <button type="button" onClick={() => navigate('/admin/login', { replace: true })} className="mt-6 w-full rounded-lg bg-[#d40000] px-4 py-3 text-sm font-black text-white hover:bg-gray-900">Đăng nhập</button>
      </div>
    );
  } else if (!tokenFormatValid) {
    content = <InvalidLink message="Liên kết đặt lại mật khẩu không hợp lệ." />;
  } else if (validation.isPending) {
    content = <p role="status" className="py-8 text-center text-sm font-bold text-gray-500">Đang kiểm tra liên kết đặt lại mật khẩu...</p>;
  } else if (validation.isError || !validation.data?.valid || tokenRejected) {
    content = <InvalidLink message="Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn." />;
  } else {
    const expiry = validation.data.expiresAt ? formatExpiry(validation.data.expiresAt) : undefined;
    content = (
      <form onSubmit={submit} noValidate>
        {expiry && <p className="mb-5 rounded-lg bg-blue-50 px-4 py-3 text-xs font-semibold text-blue-800">Liên kết có hiệu lực đến: {expiry}</p>}
        {formError && <div role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{formError}</div>}
        <div>
          <label htmlFor="newPassword" className="mb-2 block text-sm font-bold">Mật khẩu mới</label>
          <PasswordInput id="newPassword" value={newPassword} onChange={(value) => setPasswordField('newPassword', value)} autoComplete="new-password" maxLength={ADMIN_PASSWORD_MAX_LENGTH} disabled={resetPassword.isPending} invalid={Boolean(errors.newPassword)} ariaDescribedBy={errors.newPassword ? 'newPassword-error' : undefined} />
          {errors.newPassword && <p id="newPassword-error" className="mt-1.5 text-xs font-semibold text-red-600">{errors.newPassword}</p>}
        </div>
        <div className="mt-5">
          <label htmlFor="confirmPassword" className="mb-2 block text-sm font-bold">Xác nhận mật khẩu mới</label>
          <PasswordInput id="confirmPassword" value={confirmPassword} onChange={(value) => setPasswordField('confirmPassword', value)} autoComplete="new-password" maxLength={ADMIN_PASSWORD_MAX_LENGTH} disabled={resetPassword.isPending} invalid={Boolean(errors.confirmPassword)} ariaDescribedBy={errors.confirmPassword ? 'confirmPassword-error' : undefined} />
          {errors.confirmPassword && <p id="confirmPassword-error" className="mt-1.5 text-xs font-semibold text-red-600">{errors.confirmPassword}</p>}
        </div>
        <p className="mt-4 text-xs leading-5 text-gray-500">Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.</p>
        <button type="submit" disabled={resetPassword.isPending} className="mt-6 w-full rounded-lg bg-[#d40000] px-4 py-3 text-sm font-black text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60">{resetPassword.isPending ? 'Đang cập nhật...' : 'Đặt lại mật khẩu'}</button>
      </form>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-[#4b0000] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl sm:p-9">
        <div className="mb-8 flex items-center gap-4">
          <img src="/icon.jpg" alt="MH Consulting" className="h-14 w-14 rounded-xl object-cover" />
          <div><h1 className="text-xl font-black">Đặt lại mật khẩu</h1><p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#d40000]">MH Consulting</p></div>
        </div>
        {content}
      </div>
    </div>
  );
}

function InvalidLink({ message }: { message: string }) {
  return (
    <div role="alert" className="text-center">
      <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-800">{message}</p>
      <Link to="/admin/forgot-password" className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-sm font-black text-white hover:bg-[#d40000]">Yêu cầu liên kết mới</Link>
    </div>
  );
}
