import { useState, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getApiError } from '../../../utils/apiError';
import { useRequestAdminPasswordReset } from '../hooks/useAuth';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const successMessage = 'Nếu email tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu đã được gửi.';

export default function AdminForgotPassword() {
  const location = useLocation();
  const initialEmail = typeof location.state === 'object'
    && location.state
    && 'email' in location.state
    && typeof location.state.email === 'string'
    ? location.state.email
    : '';
  const [email, setEmail] = useState(initialEmail);
  const [emailError, setEmailError] = useState<string>();
  const [formError, setFormError] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  const requestReset = useRequestAdminPasswordReset();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (requestReset.isPending) return;

    const normalizedEmail = email.trim().toLowerCase();
    setEmailError(undefined);
    setFormError(undefined);
    if (!normalizedEmail) {
      setEmailError('Vui lòng nhập email.');
      return;
    }
    if (normalizedEmail.length > 320 || !emailPattern.test(normalizedEmail)) {
      setEmailError('Email không hợp lệ.');
      return;
    }

    requestReset.mutate({ email: normalizedEmail }, {
      onSuccess: () => {
        setEmail(normalizedEmail);
        setSubmitted(true);
        setEmailError(undefined);
        setFormError(undefined);
        requestReset.reset();
      },
      onError: (error) => {
        setEmailError(getApiError(error)?.fieldErrors?.email);
        setFormError('Không thể gửi yêu cầu. Vui lòng thử lại sau.');
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-[#4b0000] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl sm:p-9">
        <div className="mb-8 flex items-center gap-4">
          <img src="/icon.jpg" alt="MH Consulting" className="h-14 w-14 rounded-xl object-cover" />
          <div><h1 className="text-xl font-black">Quên mật khẩu</h1><p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#d40000]">MH Consulting</p></div>
        </div>

        <p className="mb-6 text-sm leading-6 text-gray-600">Nhập email quản trị để nhận hướng dẫn đặt lại mật khẩu.</p>

        {submitted ? (
          <div role="status" aria-live="polite">
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold leading-6 text-green-800">{successMessage}</div>
            <p className="mt-4 text-xs leading-5 text-gray-500">Vui lòng kiểm tra hộp thư đến và thư rác. Email có thể mất vài phút để được gửi.</p>
            <Link to="/admin/login" className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-sm font-black text-white hover:bg-[#d40000]">Quay lại đăng nhập</Link>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            {formError && <div role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{formError}</div>}
            <label htmlFor="email" className="block text-sm font-bold">Email</label>
            <input id="email" type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setEmailError(undefined); setFormError(undefined); }} maxLength={320} disabled={requestReset.isPending} aria-invalid={Boolean(emailError)} aria-describedby={emailError ? 'email-error' : undefined} className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/10 disabled:bg-gray-100" />
            {emailError && <p id="email-error" className="mt-1.5 text-xs font-semibold text-red-600">{emailError}</p>}
            <button type="submit" disabled={requestReset.isPending} className="mt-5 w-full rounded-lg bg-[#d40000] px-4 py-3 text-sm font-black text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60">{requestReset.isPending ? 'Đang gửi...' : 'Gửi hướng dẫn'}</button>
            <Link to="/admin/login" className="mt-5 block text-center text-sm font-bold text-gray-600 hover:text-[#d40000]">Quay lại đăng nhập</Link>
          </form>
        )}
      </div>
    </div>
  );
}
