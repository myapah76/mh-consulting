import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import LucideIcon from '../common/LucideIcon';
import { useCurrentAdmin, useLogoutAdmin } from '../../hooks/useAuth';
import { useToast } from '../common/ToastProvider';
import { getVietnameseApiError } from '../../utils/apiError';

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: admin } = useCurrentAdmin();
  const logout = useLogoutAdmin();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => navigate('/admin/login', { replace: true }),
      onError: (error) => showToast(getVietnameseApiError(error, 'Không thể đăng xuất. Vui lòng thử lại.'), 'error'),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button type="button" className="rounded-lg p-2 text-gray-600 lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Mở menu">
              <LucideIcon name={menuOpen ? 'X' : 'Menu'} size={22} />
            </button>
            <NavLink to="/admin/services" className="flex items-center gap-3">
              <img src="/icon.jpg" alt="MH Consulting" className="h-9 w-9 rounded-lg object-cover" />
              <div><strong className="block text-sm font-black">MH CONSULTING</strong><span className="block text-[10px] font-bold uppercase tracking-widest text-[#d40000]">Quản trị</span></div>
            </NavLink>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block"><p className="text-xs font-bold text-gray-900">{admin?.fullName}</p><p className="text-[11px] text-gray-500">{admin?.email}</p></div>
            <button type="button" disabled={logout.isPending} onClick={handleLogout} className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 transition hover:border-[#d40000] hover:text-[#d40000] disabled:opacity-50">
              {logout.isPending ? 'Đang thoát...' : 'Đăng xuất'}
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-[1440px]">
        <aside className={`${menuOpen ? 'block' : 'hidden'} fixed inset-x-0 top-16 z-30 border-b border-gray-200 bg-white p-4 shadow-lg lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-4rem)] lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r lg:shadow-none`}>
          <nav>
            <NavLink to="/admin/services" onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${isActive ? 'bg-[#d40000] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <LucideIcon name="Briefcase" size={18} /> Quản lý dịch vụ
            </NavLink>
          </nav>
        </aside>
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
