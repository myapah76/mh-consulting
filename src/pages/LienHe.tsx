import LucideIcon from '../components/LucideIcon';
import ConsultationForm from '../components/ConsultationForm';

export default function LienHe() {
  return (
    <div className="font-sans text-[#222222] bg-white">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-gray-900 to-[#202020] text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#d40000]/10" />
        <div className="max-w-[1200px] mx-auto px-4 relative z-10 space-y-3">
          <span className="text-xs font-bold text-[#d40000] tracking-widest uppercase block">
            Liên hệ nhanh
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            KẾT NỐI VỚI MH CONSULTING
          </h1>
          <p className="text-gray-400 text-xs md:text-sm max-w-xl mx-auto font-medium">
            Chúng tôi luôn lắng nghe và phản hồi mọi yêu cầu trợ giúp pháp lý, báo giá của quý doanh nghiệp trong vòng 15 phút.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="py-16 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact details (5 cols on desktop) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-extrabold text-[#d40000] tracking-widest uppercase block">
                Thông tin pháp lý
              </span>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
                MH CONSULTING
              </h2>
              <div className="h-1 bg-[#d40000] w-12 rounded" />
            </div>

            <ul className="space-y-5 text-sm sm:text-base text-gray-700">
              <li className="flex items-start gap-3.5">
                <div className="h-10 w-10 bg-[#d40000]/10 text-[#d40000] rounded-lg flex items-center justify-center shrink-0">
                  <LucideIcon name="MapPin" size={18} />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 text-xs sm:text-sm uppercase tracking-wide">Trụ sở chính</h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-semibold mt-1 leading-relaxed">
                    133/15 Đ. Ngô Đức Kế, Phường 12, Quận Bình Thạnh, TP. Hồ Chí Minh
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="h-10 w-10 bg-[#d40000]/10 text-[#d40000] rounded-lg flex items-center justify-center shrink-0">
                  <LucideIcon name="Phone" size={18} />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 text-xs sm:text-sm uppercase tracking-wide">Hotline Tư vấn 24/7</h4>
                  <div className="flex flex-col gap-1 mt-1 text-xs sm:text-sm text-gray-600 font-bold">
                    <a href="tel:0903024116" className="hover:text-[#d40000] transition-colors">0903.024.116 (Ms. Thảo)</a>
                    <a href="tel:0938835633" className="hover:text-[#d40000] transition-colors">0938.835.633 (Mr. Trí)</a>
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="h-10 w-10 bg-[#d40000]/10 text-[#d40000] rounded-lg flex items-center justify-center shrink-0">
                  <LucideIcon name="Mail" size={18} />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 text-xs sm:text-sm uppercase tracking-wide">Email hỗ trợ</h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-semibold mt-1">
                    <a href="mailto:info@mhconsulting.vn" className="hover:text-[#d40000] transition-colors">info@mhconsulting.vn</a>
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="h-10 w-10 bg-[#d40000]/10 text-[#d40000] rounded-lg flex items-center justify-center shrink-0">
                  <LucideIcon name="Clock" size={18} />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 text-xs sm:text-sm uppercase tracking-wide">Thời gian làm việc</h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-semibold mt-1">
                    Thứ 2 - Thứ 7: 08:00 - 17:30 (Trừ các ngày Lễ, Tết chính thức)
                  </p>
                </div>
              </li>
            </ul>

            {/* Zalo CTA direct action block */}
            <div className="bg-[#eef8ff] p-6 rounded-2xl border border-blue-50 space-y-3">
              <h4 className="font-extrabold text-blue-950 text-sm uppercase tracking-wide flex items-center gap-1.5">
                <span>💬</span> CHAT TRỰC TIẾP QUA ZALO:
              </h4>
              <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                Để gửi nhanh các file hồ sơ, văn bản, điều lệ, hóa đơn nháp, quý khách vui lòng quét mã Zalo hoặc kết nối với Hotline.
              </p>
              <a
                href="https://zalo.me/0903024116"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0068ff] hover:bg-[#0051c7] text-white font-bold text-xs rounded-lg uppercase tracking-wider shadow"
              >
                Trò chuyện Zalo ngay
              </a>
            </div>
          </div>

          {/* Right Column: Full Consultation Form (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-gray-400 uppercase tracking-widest block">
                Biểu mẫu liên hệ
              </span>
              <h3 className="text-xl font-extrabold text-gray-900 uppercase">
                GỬI THẮC MẮC CỦA BẠN CHO CHÚNG TÔI
              </h3>
              <p className="text-gray-500 text-xs font-medium">
                Vui lòng điền thông tin đầy đủ vào biểu mẫu bên dưới. Chuyên viên sẽ rà soát và gọi điện phản hồi cho bạn đúng trọng tâm yêu cầu.
              </p>
            </div>

            <ConsultationForm layout="full" buttonText="Gửi yêu cầu giải đáp" />
          </div>

        </div>
      </section>

      {/* 3. Map Placeholder layout (Standard Vietnam street marker) */}
      <section className="bg-gray-100 h-96 w-full relative flex items-center justify-center overflow-hidden border-t border-gray-200">
        {/* We use a beautifully designed map mockup overlay */}
        <div className="absolute inset-0 bg-slate-900/10 z-10" />
        <div className="absolute inset-0 bg-cover bg-center filter grayscale opacity-25" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&h=800&fit=crop&q=60')" }} />
        
        <div className="relative z-20 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 max-w-sm text-center space-y-4 mx-4">
          <div className="h-10 w-10 bg-[#d40000]/10 text-[#d40000] rounded-full flex items-center justify-center mx-auto">
            <LucideIcon name="MapPin" size={20} />
          </div>
          <div>
            <h4 className="font-extrabold text-gray-900 text-sm uppercase tracking-wide">VĂN PHÒNG MH CONSULTING</h4>
            <p className="text-xs text-gray-500 font-semibold mt-1 leading-relaxed">
              133/15 Đường Ngô Đức Kế, Phường 12, Quận Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam
            </p>
          </div>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2 bg-[#d40000] hover:bg-gray-900 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
          >
            Chỉ đường trên Google Maps
          </a>
        </div>
      </section>

    </div>
  );
}
