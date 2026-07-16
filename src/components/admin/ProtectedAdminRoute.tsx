import axios from 'axios';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useCurrentAdmin } from '../../hooks/useAuth';

export default function ProtectedAdminRoute() {
  const location = useLocation();
  const { data: admin, error, isPending, refetch } = useCurrentAdmin();

  if (isPending) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-50 text-sm font-bold text-gray-500">Đang kiểm tra phiên đăng nhập...</div>;
  }

  if (!admin) {
    if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 404)) {
      return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
    }
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
        <h1 className="text-lg font-black text-gray-900">Không thể xác minh phiên đăng nhập</h1>
        <p className="text-sm text-gray-500">Vui lòng kiểm tra kết nối và thử lại.</p>
        <button type="button" onClick={() => void refetch()} className="rounded-lg bg-[#d40000] px-5 py-2.5 text-sm font-bold text-white">Thử lại</button>
      </div>
    );
  }

  return <Outlet />;
}
