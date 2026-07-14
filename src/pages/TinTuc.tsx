import { useState } from 'react';
import { Link } from 'react-router-dom';
import LucideIcon from '../components/LucideIcon';
import { articlesData } from '../data';

export default function TinTuc() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Luật Thuế' | 'Kế Toán' | 'BHXH' | 'Thành Lập'>('all');

  const categories = [
    { id: 'all', name: 'TẤT CẢ TIN TỨC' },
    { id: 'Luật Thuế', name: 'LUẬT THUẾ MỚI' },
    { id: 'Kế Toán', name: 'KẾ TOÁN' },
    { id: 'BHXH', name: 'BẢO HIỂM - LAO ĐỘNG' },
    { id: 'Thành Lập', name: 'THÀNH LẬP DOANH NGHIỆP' },
  ];

  // Filtering logic
  const filteredArticles = articlesData.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Highlight first article as Featured
  const featuredArticle = articlesData[0];
  const regularArticles = filteredArticles.filter(art => art.slug !== featuredArticle.slug || searchQuery || selectedCategory !== 'all');

  // Format date: YYYY-MM-DD -> DD/MM/YYYY
  const formatDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  return (
    <div className="font-sans text-[#222222] bg-white">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-gray-900 to-[#202020] text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#d40000]/10" />
        <div className="max-w-[1200px] mx-auto px-4 relative z-10 space-y-3">
          <span className="text-xs font-bold text-[#d40000] tracking-widest uppercase block">
            Kênh thông tin chính thức
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            TIN TỨC & KIẾN THỨC LUẬT THUẾ
          </h1>
          <p className="text-gray-400 text-xs md:text-sm max-w-xl mx-auto font-medium">
            Cập nhật thường xuyên các thông tư, nghị định và cẩm nang quản trị thuế, giúp kế toán và doanh nghiệp tránh các rủi ro pháp lý.
          </p>
        </div>
      </section>

      {/* 2. Live Search & Category Pills bar */}
      <section className="bg-gray-50 border-b border-gray-200 py-6 sticky top-20 z-20 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Live Search bar */}
            <div className="relative w-full md:max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                <LucideIcon name="Edit3" size={16} />
              </span>
              <input
                type="text"
                placeholder="Tìm kiếm bài viết theo từ khóa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/15 text-sm font-semibold shadow-inner"
              />
            </div>

            {/* Total Articles Indicator */}
            <p className="text-xs text-gray-500 font-extrabold uppercase tracking-wider">
              {filteredArticles.length} bài viết được tìm thấy
            </p>
          </div>

          {/* Category selection */}
          <div className="flex space-x-2 overflow-x-auto py-1 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#d40000] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Main Articles List */}
      <section className="py-12 md:py-16 max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Featured Article Box - only visible on standard listing with no active query */}
        {!searchQuery && selectedCategory === 'all' && (
          <div className="mb-16">
            <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#d40000]" />
              BÀI VIẾT NỔI BẬT NHẤT
            </h2>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 h-64 sm:h-96 overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#d40000] text-white text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider">
                      {featuredArticle.category}
                    </span>
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                      {formatDate(featuredArticle.date)}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 group-hover:text-[#d40000] transition-colors leading-tight">
                    <Link to={`/tin-tuc/${featuredArticle.slug}`}>{featuredArticle.title}</Link>
                  </h3>

                  <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed line-clamp-4">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between">
                  <Link
                    to={`/tin-tuc/${featuredArticle.slug}`}
                    className="text-xs font-black text-[#d40000] uppercase tracking-widest flex items-center gap-1.5 hover:text-gray-900 transition-colors"
                  >
                    Đọc toàn bộ bài viết
                    <LucideIcon name="ArrowRight" size={12} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="space-y-8">
          <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#d40000]" />
            DANH SÁCH BÀI VIẾT MỚI
          </h2>

          {filteredArticles.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 text-center py-16 rounded-xl">
              <div className="h-12 w-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <LucideIcon name="Briefcase" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Không tìm thấy bài viết!</h3>
              <p className="text-xs text-gray-500 font-medium mt-1">Vui lòng thử tìm kiếm bằng các từ khóa khác.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-4 px-4 py-2 bg-gray-900 text-white font-bold text-xs rounded-lg hover:bg-[#d40000] cursor-pointer"
              >
                Nhập lại mặc định
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* If there is a filter, show all articles in the grid */}
              {(searchQuery || selectedCategory !== 'all' ? filteredArticles : regularArticles).map((article) => (
                <div
                  key={article.slug}
                  className="bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur text-white text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div className="space-y-2.5">
                      <span className="text-gray-400 text-[10px] font-black uppercase tracking-wider block">
                        {formatDate(article.date)}
                      </span>
                      <h3 className="font-extrabold text-gray-900 text-base leading-snug line-clamp-2 group-hover:text-[#d40000] transition-colors">
                        <Link to={`/tin-tuc/${article.slug}`}>{article.title}</Link>
                      </h3>
                      <p className="text-gray-500 text-xs font-semibold leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-50 mt-5">
                      <Link
                        to={`/tin-tuc/${article.slug}`}
                        className="text-xs font-bold text-[#d40000] group-hover:text-gray-900 transition-colors flex items-center gap-1.5 uppercase tracking-wider"
                      >
                        Đọc chi tiết
                        <LucideIcon name="ArrowRight" size={12} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </section>

    </div>
  );
}
