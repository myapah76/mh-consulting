import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import LucideIcon from '../common/LucideIcon';
import { useCurrentAdmin, useLogoutAdmin } from '../../features/auth';
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
            <NavLink to="/admin/dashboard" className="flex items-center gap-3">
              <img src="/icon.jpg" alt="MH Consulting" className="h-9 w-9 rounded-lg object-cover" />
              <div><strong className="block text-sm font-black">MH CONSULTING</strong><span className="block text-[10px] font-bold uppercase tracking-widest text-[#d40000]">Quản trị</span></div>
            </NavLink>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block"><p className="text-xs font-bold text-gray-900">{admin?.fullName}</p><p className="text-[11px] text-gray-500">{admin?.email}</p></div>
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-[1440px]">
        <aside className={`${menuOpen ? 'flex' : 'hidden'} fixed inset-x-0 bottom-0 top-16 z-30 flex-col overflow-y-auto border-b border-gray-200 bg-white shadow-lg lg:sticky lg:bottom-auto lg:flex lg:h-[calc(100vh-4rem)] lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r lg:shadow-none`}>
          <nav className="flex-1 space-y-1 p-4">
            <NavLink to="/admin/dashboard" onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${isActive ? 'bg-[#d40000] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <LucideIcon name="BarChart2" size={18} /> Tổng quan
            </NavLink>
            <NavLink to="/admin/services" onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${isActive ? 'bg-[#d40000] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <LucideIcon name="Briefcase" size={18} /> Quản lý dịch vụ
            </NavLink>
            <NavLink to="/admin/categories" onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${isActive ? 'bg-[#d40000] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <LucideIcon name="FolderTree" size={18} /> Quản lý danh mục
            </NavLink>
            <NavLink to="/admin/consultations" onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${isActive ? 'bg-[#d40000] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <LucideIcon name="MessagesSquare" size={18} /> Yêu cầu tư vấn
            </NavLink>
            <NavLink to="/admin/contact-settings" onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${isActive ? 'bg-[#d40000] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <LucideIcon name="Contact" size={18} /> Thông tin liên hệ
            </NavLink>
            <NavLink to="/admin/email-settings" onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${isActive ? 'bg-[#d40000] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <LucideIcon name="Mail" size={18} /> Cấu hình email
            </NavLink>
            <p className="px-4 pb-1 pt-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Quản lý tài khoản</p>
            <NavLink to="/admin/accounts/new" onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${isActive ? 'bg-[#d40000] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <LucideIcon name="UserPlus" size={18} /> Tạo tài khoản quản trị
            </NavLink>
            <NavLink to="/admin/change-password" onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${isActive ? 'bg-[#d40000] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <LucideIcon name="KeyRound" size={18} /> Đổi mật khẩu
            </NavLink>
          </nav>
          <div className="mt-auto border-t border-gray-200 p-4">
            <button type="button" onClick={handleLogout} disabled={logout.isPending} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-bold text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60">
              <LucideIcon name="LogOut" size={18} />
              <span>{logout.isPending ? 'Đang đăng xuất...' : 'Đăng xuất'}</span>
            </button>
          </div>
        </aside>
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
