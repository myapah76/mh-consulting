import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet, useOutletContext } from 'react-router-dom';

// Import Global Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingContactButtons from './components/layout/FloatingContactButtons';
import ConsultationModal from './components/consultation/ConsultationModal';

// Import Pages
import Home from './pages/Home';
import GioiThieu from './pages/GioiThieu';
import DichVu from './pages/DichVu';
import DichVuDetail from './pages/DichVuDetail';
import TinTuc from './pages/TinTuc';
import TinTucDetail from './pages/TinTucDetail';
import LienHe from './pages/LienHe';
import AdminLogin from './pages/admin/AdminLogin';
import AdminServices from './pages/admin/AdminServices';
import AdminServiceCreate from './pages/admin/AdminServiceCreate';
import AdminServiceEdit from './pages/admin/AdminServiceEdit';
import AdminCategories from './pages/admin/AdminCategories';
import AdminCategoryCreate from './pages/admin/AdminCategoryCreate';
import AdminCategoryEdit from './pages/admin/AdminCategoryEdit';
import AdminAccountCreate from './pages/admin/AdminAccountCreate';
import AdminChangePassword from './pages/admin/AdminChangePassword';
import AdminConsultations from './pages/admin/AdminConsultations';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import AdminLayout from './components/admin/AdminLayout';

// Scroll to top of page on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  }, [pathname]);

  return null;
}

function PublicLayout() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const openConsultation = () => setIsConsultationOpen(true);
  const closeConsultation = () => setIsConsultationOpen(false);

  return (
      <div className="flex min-h-screen flex-col bg-white text-gray-900 selection:bg-[#d40000] selection:text-white">
        
        {/* Header Navigation */}
        <Header onOpenConsultation={openConsultation} />

        {/* Main Content Viewport */}
        <main className="flex-1"><Outlet context={{ openConsultation }} /></main>

        {/* Global Footer */}
        <Footer />

        {/* Persistent Floating Quick Widgets (Zalo / Hotline / Back-to-Top) */}
        <FloatingContactButtons />

        {/* Global Consultation Application Modal Overlay */}
        <ConsultationModal isOpen={isConsultationOpen} onClose={closeConsultation} />

      </div>
  );
}

interface PublicOutletContext { openConsultation: () => void }
function HomeRoute() { const { openConsultation } = useOutletContext<PublicOutletContext>(); return <Home onOpenConsultation={openConsultation} />; }
function AboutRoute() { const { openConsultation } = useOutletContext<PublicOutletContext>(); return <GioiThieu onOpenConsultation={openConsultation} />; }
function ServicesRoute() { const { openConsultation } = useOutletContext<PublicOutletContext>(); return <DichVu onOpenConsultation={openConsultation} />; }

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/gioi-thieu" element={<AboutRoute />} />
          <Route path="/dich-vu" element={<ServicesRoute />} />
          <Route path="/dich-vu/:slug" element={<DichVuDetail />} />
          <Route path="/tin-tuc" element={<TinTuc />} />
          <Route path="/tin-tuc/:slug" element={<TinTucDetail />} />
          <Route path="/lien-he" element={<LienHe />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="services" replace />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="services/new" element={<AdminServiceCreate />} />
            <Route path="services/:id/edit" element={<AdminServiceEdit />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="categories/new" element={<AdminCategoryCreate />} />
            <Route path="categories/:id/edit" element={<AdminCategoryEdit />} />
            <Route path="consultations" element={<AdminConsultations />} />
            <Route path="accounts/new" element={<AdminAccountCreate />} />
            <Route path="change-password" element={<AdminChangePassword />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
