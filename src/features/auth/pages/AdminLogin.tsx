import { useEffect, useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getApiError, getVietnameseApiError } from '../../../utils/apiError';
import { prepareCsrf } from '../api/authService';
import { useCurrentAdmin, useLoginAdmin } from '../hooks/useAuth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const login = useLoginAdmin();
  const { data: admin, isPending: checkingSession } = useCurrentAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const from = typeof location.state === 'object' && location.state && 'from' in location.state
    ? String(location.state.from)
    : '/admin/services';

  useEffect(() => { void prepareCsrf().catch(() => undefined); }, []);

  if (admin) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!email.trim()) nextErrors.email = 'Vui lòng nhập email.';
    else if (email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Email không hợp lệ.';
    if (!password) nextErrors.password = 'Vui lòng nhập mật khẩu.';
    else if (password.length > 200) nextErrors.password = 'Mật khẩu không được vượt quá 200 ký tự.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    login.mutate({ email: email.trim(), password }, {
      onSuccess: () => navigate(from.startsWith('/admin/') ? from : '/admin/services', { replace: true }),
      onError: (error) => setErrors({ ...getApiError(error)?.fieldErrors, form: getVietnameseApiError(error, 'Không thể đăng nhập. Vui lòng thử lại.') }),
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-[#4b0000] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl sm:p-9">
        <div className="mb-8 flex items-center gap-4"><img src="/icon.jpg" alt="MH Consulting" className="h-14 w-14 rounded-xl object-cover" /><div><h1 className="text-xl font-black">Đăng nhập quản trị</h1><p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#d40000]">MH Consulting</p></div></div>
        {errors.form && <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{errors.form}</div>}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <label className="block"><span className="mb-2 block text-sm font-bold">Email</span><input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={320} disabled={login.isPending || checkingSession} className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/10" />{errors.email && <span className="mt-1 block text-xs font-semibold text-red-600">{errors.email}</span>}</label>
          <label className="block"><span className="mb-2 block text-sm font-bold">Mật khẩu</span><input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} maxLength={200} disabled={login.isPending || checkingSession} className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/10" />{errors.password && <span className="mt-1 block text-xs font-semibold text-red-600">{errors.password}</span>}</label>
          <button type="submit" disabled={login.isPending || checkingSession} className="w-full rounded-lg bg-[#d40000] px-4 py-3 text-sm font-black text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60">{login.isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
        </form>
      </div>
    </div>
  );
}
