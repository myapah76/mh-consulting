import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ConsultationModal } from '../../features/consultations';
import FloatingContactButtons from './FloatingContactButtons';
import Footer from './Footer';
import Header from './Header';

export interface PublicOutletContext {
  openConsultation: () => void;
}

export default function PublicLayout() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const openConsultation = () => setIsConsultationOpen(true);
  const closeConsultation = () => setIsConsultationOpen(false);

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 selection:bg-[#d40000] selection:text-white">
      <Header onOpenConsultation={openConsultation} />
      <main className="flex-1"><Outlet context={{ openConsultation }} /></main>
      <Footer />
      <FloatingContactButtons />
      <ConsultationModal isOpen={isConsultationOpen} onClose={closeConsultation} />
    </div>
  );
}
