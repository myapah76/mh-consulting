import { Route, useOutletContext } from 'react-router-dom';
import PublicLayout, { type PublicOutletContext } from '../components/layout/PublicLayout';
import News from '../features/news/pages/News';
import NewsDetail from '../features/news/pages/NewsDetail';
import ServiceDetail from '../features/services/pages/ServiceDetail';
import Services from '../features/services/pages/Services';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Home from '../pages/Home';

function HomeRoute() {
  const { openConsultation } = useOutletContext<PublicOutletContext>();
  return <Home onOpenConsultation={openConsultation} />;
}

function AboutRoute() {
  const { openConsultation } = useOutletContext<PublicOutletContext>();
  return <About onOpenConsultation={openConsultation} />;
}

function ServicesRoute() {
  const { openConsultation } = useOutletContext<PublicOutletContext>();
  return <Services onOpenConsultation={openConsultation} />;
}

export default function publicRoutes() {
  return (
    <Route element={<PublicLayout />}>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/gioi-thieu" element={<AboutRoute />} />
      <Route path="/dich-vu" element={<ServicesRoute />} />
      <Route path="/dich-vu/:slug" element={<ServiceDetail />} />
      <Route path="/tin-tuc" element={<News />} />
      <Route path="/tin-tuc/:slug" element={<NewsDetail />} />
      <Route path="/lien-he" element={<Contact />} />
    </Route>
  );
}
