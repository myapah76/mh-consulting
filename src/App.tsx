import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

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

// Scroll to top of page on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant' as any // Fast reset
    });
  }, [pathname]);

  return null;
}

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const openConsultation = () => setIsConsultationOpen(true);
  const closeConsultation = () => setIsConsultationOpen(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      
      <div className="flex flex-col min-h-screen bg-white text-gray-900 selection:bg-[#d40000] selection:text-white">
        
        {/* Header Navigation */}
        <Header onOpenConsultation={openConsultation} />

        {/* Main Content Viewport */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home onOpenConsultation={openConsultation} />} />
            <Route path="/gioi-thieu" element={<GioiThieu onOpenConsultation={openConsultation} />} />
            <Route path="/dich-vu" element={<DichVu onOpenConsultation={openConsultation} />} />
            <Route path="/dich-vu/:slug" element={<DichVuDetail />} />
            <Route path="/tin-tuc" element={<TinTuc />} />
            <Route path="/tin-tuc/:slug" element={<TinTucDetail />} />
            <Route path="/lien-he" element={<LienHe />} />
            
            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Persistent Floating Quick Widgets (Zalo / Hotline / Back-to-Top) */}
        <FloatingContactButtons />

        {/* Global Consultation Application Modal Overlay */}
        <ConsultationModal isOpen={isConsultationOpen} onClose={closeConsultation} />

      </div>
    </BrowserRouter>
  );
}
