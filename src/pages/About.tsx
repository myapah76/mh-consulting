import LucideIcon from '../components/common/LucideIcon';

interface AboutProps {
  onOpenConsultation: () => void;
}

export default function About({ onOpenConsultation }: AboutProps) {
  const commitments = [
    {
      title: 'STRATEGIC',
      desc: 'MH CONSULTING xây dựng giải pháp chiến lược dựa trên nhu cầu và mục tiêu dài hạn của từng doanh nghiệp.',
      icon: 'ShieldAlert',
    },
    {
      title: 'TRUSTED',
      desc: 'Đội ngũ chuyên viên cam kết bảo mật tuyệt đối số liệu tài chính và đồng hành đáng tin cậy cùng doanh nghiệp.',
      icon: 'HeartHandshake',
    },
    {
      title: 'GROWTH',
      desc: 'Giải pháp kế toán, thuế và pháp lý vững chắc giúp khách hàng tập trung phát triển doanh nghiệp bền vững.',
      icon: 'Percent',
    },
  ];

  const milestones = [
    { year: '2016', title: 'Thành lập văn phòng tư vấn', desc: 'Khởi điểm từ một nhóm chuyên gia thuế thực hiện rà soát sổ sách kế toán cho các công ty FDI.' },
    { year: '2021', title: 'Chính thức thành lập Công ty', desc: 'Thành lập MH CONSULTING, được Cục Thuế TP.HCM cấp giấy phép đại lý thuế chính thức.' },
    { year: '2024', title: 'Đạt mốc 500+ Khách hàng', desc: 'Trở thành một trong những đơn vị kế toán uy tín hàng đầu khu vực Bình Thạnh, Phú Nhuận, Quận 1.' },
    { year: '2026', title: 'Phát triển giải pháp kế toán AI', desc: 'Số hóa quy trình nhận, quét hóa đơn điện tử tự động giúp độ chính xác của sổ sách đạt 100%.' },
  ];

  return (
    <div className="font-sans text-[#222222] bg-white">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-gray-900 to-[#202020] text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#d40000]/10" />
        <div className="max-w-[1200px] mx-auto px-4 relative z-10 space-y-3">
          <span className="text-xs font-bold text-[#d40000] tracking-widest uppercase block">
            Về chúng tôi
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            CÂU CHUYỆN MH CONSULTING
          </h1>
          <p className="text-gray-400 text-xs md:text-sm max-w-xl mx-auto font-medium">
            Điểm tựa pháp lý vững vàng - Nâng tầm thành công cho doanh nghiệp Việt hoạt động minh bạch và bền vững.
          </p>
        </div>
      </section>

      {/* 2. Core Narrative */}
      <section className="py-16 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-tight">
              Chúng Tôi Là Ai?
            </h2>
            <div className="h-1.5 w-16 bg-[#d40000] rounded" />
            <p className="text-sm text-gray-600 leading-relaxed font-semibold">
              MH CONSULTING được cấp phép hoạt động bởi Sở Kế hoạch và Đầu tư TP.HCM và Cục Thuế TP.HCM chuyên trách tư vấn thuế, làm sổ sách kế toán, và làm đại diện pháp lý cho các doanh nghiệp vừa và nhỏ trong nước cũng như các doanh nghiệp có vốn đầu tư nước ngoài (FDI).
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Trải qua gần 10 năm đồng hành cùng cộng đồng doanh nghiệp Việt, chúng tôi thấu hiểu sâu sắc những lo lắng, khó khăn của các chủ doanh nghiệp khi phải đối mặt với các thủ tục hành chính phức tạp và rủi ro phạt thuế nặng nề. Do đó, MH CONSULTING ra đời với một sứ mệnh duy nhất: <strong>Đưa ra những tư vấn chuẩn xác, minh bạch để doanh nghiệp của bạn hoạt động hoàn toàn yên tâm đúng pháp luật.</strong>
            </p>
            <div className="bg-[#eef8ff]/60 p-5 rounded-xl border-l-4 border-[#d40000] text-xs font-medium text-gray-700 leading-relaxed">
              📌 <strong>Lưu ý quan trọng từ Ban giám đốc:</strong> Theo quy định hiện hành, kế toán viên không có giấy chứng nhận hành nghề sẽ không được ký trên Báo cáo tài chính và sổ sách kế toán của bạn. MH CONSULTING sở hữu đầy đủ Chứng chỉ hành nghề đại lý thuế và Chứng chỉ kiểm toán viên (CPA) hợp pháp.
            </div>
          </div>

          <div className="lg:col-span-6">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=700&h=500&fit=crop&q=80"
              alt="Hội nghị bàn tròn MH CONSULTING"
              loading="lazy"
              className="w-full h-[350px] object-cover rounded-xl shadow-xl border border-gray-100"
            />
          </div>

        </div>
      </section>

      {/* 3. Core Values */}
      <section className="bg-gray-50 py-16 border-t border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              Hệ Thống Giá Trị Cốt Lõi
            </h2>
            <p className="text-gray-500 text-xs font-semibold">
              STRATEGIC • TRUSTED • GROWTH
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commitments.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all text-center space-y-4">
                <div className="h-12 w-12 bg-[#d40000]/5 text-[#d40000] rounded-full flex items-center justify-center mx-auto mb-2">
                  <LucideIcon name={item.icon} size={22} />
                </div>
                <h3 className="text-base font-black text-gray-900 uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Timeline Milestones */}
      <section className="py-16 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
            Hành Trình Phát Triển
          </h2>
          <p className="text-gray-500 text-xs font-semibold">
            Những dấu mốc đáng nhớ khẳng định sự lớn mạnh bền bỉ
          </p>
        </div>

        <div className="relative border-l-2 border-[#d40000]/20 max-w-3xl mx-auto pl-6 sm:pl-12 space-y-12">
          {milestones.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Pulsing point */}
              <div className="absolute left-[-31px] sm:left-[-55px] top-1.5 h-4 w-4 bg-[#d40000] border-4 border-white rounded-full shadow group-hover:scale-125 transition-transform" />
              
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <span className="inline-block px-3 py-0.5 bg-[#d40000]/10 text-[#d40000] text-xs font-black rounded-full mb-2">
                  {item.year}
                </span>
                <h3 className="font-bold text-gray-900 text-base mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed font-semibold">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Team Commitment / Call to action */}
      <section className="bg-gradient-to-r from-gray-900 to-[#202020] text-white py-16 text-center border-t border-gray-850">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Bạn Muốn Hợp Tác Với Một Đối Tác Kế Toán Chuyên Nghiệp?
          </h2>
          <p className="text-white/80 text-sm leading-relaxed max-w-xl mx-auto">
            Hãy liên hệ ngay hôm nay để nhận được báo giá chi tiết và lộ trình làm việc an toàn, bền vững tối ưu cho doanh nghiệp của bạn.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="px-8 py-3 bg-[#d40000] hover:bg-white hover:text-gray-900 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all cursor-pointer"
            >
              Đặt lịch làm việc ngay
            </button>
            <a
              href="tel:0903024116"
              className="px-8 py-3 bg-transparent text-white border-2 border-white/60 hover:bg-white hover:text-gray-900 font-bold text-xs uppercase tracking-widest rounded-full transition-all"
            >
              Gọi 0903.024.116
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
