import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AdminAccountCreate from '../features/accounts/pages/AdminAccountCreate';
import AdminChangePassword from '../features/auth/pages/AdminChangePassword';
import AdminForgotPassword from '../features/auth/pages/AdminForgotPassword';
import AdminLogin from '../features/auth/pages/AdminLogin';
import AdminResetPassword from '../features/auth/pages/AdminResetPassword';
import AdminCategories from '../features/categories/pages/AdminCategories';
import AdminCategoryCreate from '../features/categories/pages/AdminCategoryCreate';
import AdminCategoryEdit from '../features/categories/pages/AdminCategoryEdit';
import AdminConsultations from '../features/consultations/pages/AdminConsultations';
import AdminDashboard from '../features/dashboard/pages/AdminDashboard';
import AdminServiceCreate from '../features/services/pages/AdminServiceCreate';
import AdminServiceEdit from '../features/services/pages/AdminServiceEdit';
import AdminServices from '../features/services/pages/AdminServices';
import AdminContactSettings from '../features/settings/pages/AdminContactSettings';
import AdminEmailSettings from '../features/settings/pages/AdminEmailSettings';
import AdminRoute from '../routes/AdminRoute';
import publicRoutes from '../routes/PublicRoutes';
import AdminLayout from '../components/layout/AdminLayout';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

export default function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {publicRoutes()}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="services/new" element={<AdminServiceCreate />} />
            <Route path="services/:id/edit" element={<AdminServiceEdit />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="categories/new" element={<AdminCategoryCreate />} />
            <Route path="categories/:id/edit" element={<AdminCategoryEdit />} />
            <Route path="consultations" element={<AdminConsultations />} />
            <Route path="contact-settings" element={<AdminContactSettings />} />
            <Route path="email-settings" element={<AdminEmailSettings />} />
            <Route path="accounts/new" element={<AdminAccountCreate />} />
            <Route path="change-password" element={<AdminChangePassword />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
