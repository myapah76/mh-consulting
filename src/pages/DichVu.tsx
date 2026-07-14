import { useState } from 'react';
import { Link } from 'react-router-dom';
import LucideIcon from '../components/LucideIcon';
import { servicesData } from '../data';

interface DichVuProps {
  onOpenConsultation: () => void;
}

export default function DichVu({ onOpenConsultation }: DichVuProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'thanh-lap' | 'ke-toan' | 'thue' | 'khac'>('all');

  const categories = [
    { id: 'all', name: 'TẤT CẢ DỊCH VỤ', icon: 'Briefcase' },
    { id: 'thanh-lap', name: 'THÀNH LẬP', icon: 'Edit3' },
    { id: 'ke-toan', name: 'KẾ TOÁN', icon: 'Calculator' },
    { id: 'thue', name: 'THUẾ', icon: 'BarChart2' },
    { id: 'khac', name: 'DỊCH VỤ KHÁC', icon: 'HeartHandshake' },
  ];

  // Filter services based on selected tab
  const filteredServices = activeTab === 'all'
    ? servicesData
    : servicesData.filter(service => service.category === activeTab);

  return (
    <div className="font-sans text-[#222222] bg-white">
      
      {/* 1. Introductory Hero Header */}
      <section className="bg-gradient-to-r from-gray-900 to-[#202020] text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#d40000]/10" />
        <div className="max-w-[1200px] mx-auto px-4 relative z-10 space-y-3">
          <span className="text-xs font-bold text-[#d40000] tracking-widest uppercase block">
            Dịch vụ chuyên sâu
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            DANH MỤC DỊCH VỤ PHÁP LÝ & THUẾ
          </h1>
          <p className="text-gray-400 text-xs md:text-sm max-w-xl mx-auto font-medium">
            Cung cấp giải pháp trọn gói, chuẩn nghiệp vụ, chính xác tuyệt đối từ thành lập đến kê khai thuế định kỳ.
          </p>
        </div>
      </section>

      {/* 2. Category Tabs */}
      <section className="bg-gray-50 border-b border-gray-200 sticky top-20 z-20 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 overflow-x-auto">
          <div className="flex space-x-2 md:space-x-4 py-4 min-w-max justify-start md:justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === cat.id
                    ? 'bg-[#d40000] text-white shadow-md shadow-[#d40000]/15'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <LucideIcon name={cat.icon} size={14} />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Services Grid */}
      <section className="py-16 md:py-24 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-extrabold text-[#d40000] tracking-widest uppercase mb-1">
            Kết quả tìm kiếm
          </p>
          <h2 className="text-xl font-bold text-gray-900 uppercase">
            Hiển thị {filteredServices.length} gói dịch vụ phù hợp
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group overflow-hidden"
            >
              <div className="p-6 md:p-8 flex flex-col flex-1">
                {/* Header info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 bg-[#d40000]/5 text-[#d40000] rounded-lg flex items-center justify-center group-hover:bg-[#d40000] group-hover:text-white transition-colors duration-300">
                    <LucideIcon name={service.icon} size={22} />
                  </div>
                  <span className="text-[10px] font-black text-[#d40000] bg-[#d40000]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {service.category === 'thanh-lap' && 'Thành Lập'}
                    {service.category === 'ke-toan' && 'Kế Toán'}
                    {service.category === 'thue' && 'Thuế'}
                    {service.category === 'khac' && 'Dịch vụ khác'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-extrabold text-gray-900 text-lg group-hover:text-[#d40000] transition-colors mb-3 leading-snug">
                  <Link to={`/dich-vu/${service.slug}`}>{service.title}</Link>
                </h3>

                {/* Short Desc */}
                <p className="text-gray-500 text-xs font-semibold leading-relaxed flex-1 line-clamp-3">
                  {service.shortDesc}
                </p>

                {/* Action Link */}
                <div className="pt-6 border-t border-gray-50 mt-6 flex items-center justify-between">
                  <Link
                    to={`/dich-vu/${service.slug}`}
                    className="text-xs font-bold text-[#d40000] group-hover:text-gray-900 transition-colors flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    Xem chi tiết
                    <LucideIcon name="ArrowRight" size={12} className="transition-transform group-hover:translate-x-1" />
                  </Link>

                  <button
                    onClick={onOpenConsultation}
                    className="text-[10px] font-bold text-gray-600 hover:text-[#d40000] hover:underline cursor-pointer uppercase tracking-wider"
                  >
                    Đăng ký nhanh
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Contact banner */}
      <section className="bg-gradient-to-r from-gray-900 to-[#1c1c1c] text-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-black">Bạn Cần Hướng Dẫn Chi Tiết Hơn Cho Doanh Nghiệp?</h2>
          <p className="text-gray-400 text-xs font-medium">
            Chúng tôi luôn sẵn lòng lắng nghe, hỗ trợ phân tích và khảo sát hồ sơ hiện trạng thuế miễn phí cho mọi doanh nghiệp đăng ký.
          </p>
          <div className="pt-4">
            <button
              onClick={onOpenConsultation}
              className="px-8 py-3.5 bg-[#d40000] hover:bg-white hover:text-[#d40000] text-white font-black text-xs uppercase tracking-widest rounded-full transition-colors cursor-pointer"
            >
              Yêu cầu tư vấn ngay
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
