import { useState } from 'react';
import { Link } from 'react-router-dom';
import LucideIcon from './LucideIcon';
import { articlesData } from '../data';

export default function KnowledgeCarousel() {
  const [startIndex, setStartIndex] = useState(0);

  const length = articlesData.length;
  // Responsive cards count
  const itemsToShow = 3; // On desktop, we'll show 3 cards. If there are fewer or we scroll, limit it.

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + length) % length);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % length);
  };

  // Format date helper: YYYY-MM-DD -> DD/MM/YYYY
  const formatDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  // Get active items to show in the carousel
  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < itemsToShow; i++) {
      items.push(articlesData[(startIndex + i) % length]);
    }
    return items;
  };

  const visibleItems = getVisibleItems();

  return (
    <section className="bg-[#eef8ff]/40 py-16 md:py-20 font-sans overflow-hidden border-t border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-extrabold text-[#d40000] tracking-widest uppercase block mb-1">
              Thông tin bổ ích
            </span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight font-sans">
              Kiến Thức & Luật Thuế Mới
            </h2>
            <p className="text-gray-600 text-sm mt-2 max-w-xl font-medium">
              Cập nhật liên tục những thông tư, nghị định và hướng dẫn thuế, kế toán mới nhất từ Tổng cục Thuế Việt Nam giúp doanh nghiệp chủ động vận hành.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/tin-tuc" 
              className="group flex items-center gap-1.5 text-sm font-bold text-[#d40000] hover:text-gray-900 transition-colors"
            >
              Xem thêm bài viết
              <LucideIcon name="ArrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Navigation buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="h-9 w-9 bg-white hover:bg-[#d40000] text-[#d40000] hover:text-white border border-gray-100 rounded-full flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer"
                aria-label="Bài viết trước"
              >
                <LucideIcon name="ChevronLeft" size={18} />
              </button>
              <button
                onClick={handleNext}
                className="h-9 w-9 bg-white hover:bg-[#d40000] text-[#d40000] hover:text-white border border-gray-100 rounded-full flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer"
                aria-label="Bài viết sau"
              >
                <LucideIcon name="ChevronRight" size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Grid (3 items desktop, 1 item mobile) */}
        <div className="relative mt-8">
          
          {/* Connecting Red Timeline Thread */}
          <div className="absolute top-[48px] left-0 right-0 h-0.5 bg-[#d40000]/20 hidden md:block z-0" />

          {/* Desktop Timeline Grid */}
          <div className="hidden md:grid grid-cols-3 gap-8 relative z-10">
            {visibleItems.map((article, idx) => (
              <div key={`${article.slug}-${idx}`} className="flex flex-col group animate-in fade-in duration-300">
                {/* Date above the card */}
                <div className="text-center mb-6 relative">
                  <span className="inline-block px-3 py-1 bg-white border border-[#d40000]/10 rounded-full text-xs font-extrabold text-[#d40000] tracking-wider mb-2 relative z-10 shadow-sm">
                    {formatDate(article.date)}
                  </span>
                  
                  {/* Timeline bullet node */}
                  <div className="w-4 h-4 bg-[#d40000] border-4 border-white rounded-full mx-auto shadow-md absolute bottom-[-16px] left-1/2 -translate-x-1/2 z-20 group-hover:scale-125 transition-transform" />
                </div>

                {/* Card Container */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 flex flex-col h-full mt-4">
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#d40000] text-white text-[10px] font-extrabold tracking-wider uppercase px-2 py-1 rounded">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 text-base line-clamp-2 leading-snug group-hover:text-[#d40000] transition-colors mb-2.5">
                      <Link to={`/tin-tuc/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p className="text-gray-500 text-xs font-medium line-clamp-3 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-50">
                      <Link
                        to={`/tin-tuc/${article.slug}`}
                        className="text-xs font-bold text-[#d40000] group-hover:text-gray-900 transition-colors flex items-center gap-1.5 uppercase tracking-wider"
                      >
                        Chi tiết bài viết
                        <LucideIcon name="ArrowRight" size={12} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Layout (Only 1 active card) */}
          <div className="block md:hidden">
            <div className="flex flex-col group">
              {/* Date above the card */}
              <div className="text-center mb-4 relative">
                <span className="inline-block px-3 py-1 bg-white border border-[#d40000]/10 rounded-full text-xs font-extrabold text-[#d40000] tracking-wider relative z-10 shadow-sm">
                  {formatDate(articlesData[startIndex % length].date)}
                </span>
              </div>

              {/* Card Container */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-md overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={articlesData[startIndex % length].image}
                    alt={articlesData[startIndex % length].title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#d40000] text-white text-[10px] font-extrabold tracking-wider uppercase px-2 py-1 rounded">
                    {articlesData[startIndex % length].category}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-base leading-snug mb-2">
                    <Link to={`/tin-tuc/${articlesData[startIndex % length].slug}`}>
                      {articlesData[startIndex % length].title}
                    </Link>
                  </h3>
                  <p className="text-gray-500 text-xs font-medium leading-relaxed mb-4 line-clamp-3">
                    {articlesData[startIndex % length].excerpt}
                  </p>
                  <div className="pt-4 border-t border-gray-50 mt-auto">
                    <Link
                      to={`/tin-tuc/${articlesData[startIndex % length].slug}`}
                      className="text-xs font-bold text-[#d40000] flex items-center gap-1.5 uppercase tracking-wider"
                    >
                      Chi tiết bài viết
                      <LucideIcon name="ArrowRight" size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
