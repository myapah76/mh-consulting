import { Link } from 'react-router-dom';
import LucideIcon from '../components/LucideIcon';
import ConsultationForm from '../components/ConsultationForm';
import TestimonialCarousel from '../components/TestimonialCarousel';
import KnowledgeCarousel from '../components/KnowledgeCarousel';

interface HomeProps {
  onOpenConsultation: () => void;
}

export default function Home({ onOpenConsultation }: HomeProps) {
  // Extract one key service from each category for the services overview cards
  const overviewServices = [
    {
      categoryName: 'THÀNH LẬP',
      title: 'Thành Lập Doanh Nghiệp',
      shortDesc: 'Khởi nghiệp nhanh chóng và đúng luật với dịch vụ thành lập công ty trọn gói, đại diện nộp hồ sơ Sở KH&ĐT chỉ trong 3 ngày.',
      icon: 'Briefcase',
      slug: 'thanh-lap-doanh-nghiep-tron-goi',
      colorClass: 'border-t-2 border-gray-100 group-hover:border-[#d40000]',
    },
    {
      categoryName: 'KẾ TOÁN',
      title: 'Kế Toán Trọn Gói',
      shortDesc: 'Giải pháp phòng kế toán chuyên nghiệp cho doanh nghiệp: xử lý hóa đơn chứng từ, lập báo cáo tài chính và sổ sách định kỳ.',
      icon: 'Calculator',
      slug: 'dich-vu-ke-toan-tron-goi',
      colorClass: 'border-t-2 border-gray-100 group-hover:border-[#d40000]',
    },
    {
      categoryName: 'THUẾ',
      title: 'Báo Cáo Thuế Định Kỳ',
      shortDesc: 'Đại diện rà soát hồ sơ khai báo thuế GTGT, TNCN, lập báo cáo tài chính cuối năm và đại diện giải trình thanh tra thuế.',
      icon: 'BarChart2',
      slug: 'bao-cao-thue-dinh-ky-hang-thang-quy',
      colorClass: 'border-t-2 border-gray-100 group-hover:border-[#d40000]',
    },
    {
      categoryName: 'DỊCH VỤ KHÁC',
      title: 'BHXH & Lao Động',
      shortDesc: 'Đăng ký BHXH lần đầu, khai báo lao động tăng/giảm định kỳ và giải quyết nhanh chóng các chế độ thai sản, ốm đau.',
      icon: 'HeartHandshake',
      slug: 'dich-vu-bao-hiem-xa-hoi-lao-dong',
      colorClass: 'border-t-2 border-gray-100 group-hover:border-[#d40000]',
    },
  ];

  return (
    <div className="font-sans text-[#222222] bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-r from-[#eef8ff] to-white py-16 lg:py-24 overflow-hidden border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline and Inline Consultation Form */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-block px-3 py-1 bg-[#d40000]/10 text-[#d40000] rounded-full text-xs font-black tracking-widest uppercase">
                Giải Pháp Thuế & Kế Toán Chuyên Nghiệp
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.15] tracking-tight">
                An Tâm Kinh Doanh <br className="hidden sm:inline" />
                Cùng <span className="text-[#d40000]">MH CONSULTING</span>
              </h1>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                Chúng tôi cung cấp dịch vụ <strong className="text-[#d40000]">Thành lập doanh nghiệp</strong>, <strong className="text-gray-900">Kế toán trọn gói</strong> và <strong className="text-gray-900">Báo cáo thuế định kỳ</strong> chuẩn mực, giúp tiết kiệm đến <strong className="text-[#d40000]">90% thời gian</strong> và <strong className="text-gray-900">tối ưu hóa chi phí hợp pháp</strong> cho doanh nghiệp của bạn hoạt động an toàn.
              </p>
              
              <div className="pt-4 max-w-xl mx-auto lg:mx-0">
                <div className="bg-white/80 backdrop-blur p-4 rounded-xl shadow-lg border border-white">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-1.5 justify-center lg:justify-start">
                    <span className="h-2 w-2 rounded-full bg-[#d40000] animate-pulse" />
                    Đăng ký nhận cuộc gọi tư vấn miễn phí ngay
                  </p>
                  <ConsultationForm layout="inline" buttonText="Gửi yêu cầu" />
                </div>
              </div>

              {/* Badges/Phrases */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200/50 text-left">
                <div>
                  <h4 className="text-xl font-extrabold text-[#d40000]">100%</h4>
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">Trách nhiệm pháp lý</p>
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-gray-900">3 Ngày</h4>
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">Xử lý hồ sơ thành lập</p>
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-gray-900">500+</h4>
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">Doanh nghiệp tin dùng</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Image with faded bottom */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Decorative financial background shape */}
              <div className="absolute inset-0 bg-[#d40000]/5 rounded-full filter blur-3xl -z-10" />
              
              <div className="relative w-full max-w-md lg:max-w-none">
                {/* Image element with subtle bottom gradient overlay */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80">
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=700&fit=crop&q=80"
                    alt="Đội ngũ MH CONSULTING chuyên nghiệp"
                    loading="lazy"
                    className="w-full h-[400px] lg:h-[450px] object-cover object-top"
                  />
                  {/* Faded bottom mask overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-900/40 to-transparent" />
                </div>

                {/* Overlaid Floating Achievement Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                    <LucideIcon name="ShieldAlert" size={20} />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-gray-900 uppercase tracking-wider">Cố vấn Thuế cấp cao</h5>
                    <p className="text-[10px] text-gray-500 font-semibold mt-0.5">Bảo vệ quyền lợi doanh nghiệp</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="bg-gray-50 py-16 md:py-20 border-b border-gray-100 font-sans">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Beautiful supporting image layout */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#d40000]/10 rounded-lg -z-10" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-lg -z-10" />
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=450&fit=crop&q=80"
                alt="Văn phòng làm việc MH CONSULTING"
                loading="lazy"
                className="w-full h-[320px] md:h-[380px] object-cover rounded-xl shadow-xl border border-white"
              />
            </div>

            {/* Right: Text with quotations and vertical red line */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div>
                <span className="text-xs font-extrabold text-[#d40000] tracking-widest uppercase block mb-1">
                  Về chúng tôi
                </span>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                  MH CONSULTING - STRATEGIC • TRUSTED • GROWTH
                </h2>
              </div>

              {/* Two Column quotation style with borders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 relative">
                {/* Decorative absolute quotation icon */}
                <div className="absolute top-[-30px] left-[45%] text-[#d40000]/5 hidden md:block select-none">
                  <LucideIcon name="Quote" size={100} />
                </div>

                <div className="pl-4 border-l-4 border-[#d40000] italic text-gray-700 text-sm font-medium leading-relaxed">
                  "Sứ mệnh của MH CONSULTING là trở thành điểm tựa pháp lý vững chắc cho mọi startup và doanh nghiệp tại Việt Nam. Chúng tôi cam kết mang lại sự minh bạch, an toàn tuyệt đối về thuế."
                </div>
                <div className="italic text-gray-700 text-sm font-medium leading-relaxed pt-2 md:pt-0">
                  "Chúng tôi không chỉ là đơn vị làm sổ sách, mà là người đồng hành cố vấn chiến lược tài chính giúp chủ doanh nghiệp tối ưu chi phí thuế một cách hợp pháp và khoa học."
                </div>
              </div>

              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  Được thành lập bởi đội ngũ Kiểm toán viên, Kế toán trưởng và Chuyên viên pháp lý có hơn 10 năm kinh nghiệm giải trình thuế trực tiếp, <strong>MH CONSULTING</strong> tự hào cung cấp những giải pháp pháp lý toàn diện, đáng tin cậy nhất cho hơn 500 khách hàng hoạt động đa dạng trong các ngành thương mại, sản xuất, xây dựng, xuất nhập khẩu.
                </p>
                <p>
                  Phương châm <strong>“STRATEGIC • TRUSTED • GROWTH”</strong> định hướng cho mọi hành động của chúng tôi. MH CONSULTING luôn sẵn sàng chịu trách nhiệm pháp lý trọn đời cho mọi số liệu kế toán đã thực hiện, giúp quý doanh nghiệp an tâm mở rộng sản xuất kinh doanh bền vững.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4 justify-start">
                <Link
                  to="/gioi-thieu"
                  className="px-6 py-3 bg-[#d40000] hover:bg-gray-900 text-white font-bold text-xs tracking-wider uppercase rounded-full transition-all duration-300 shadow-md shadow-[#d40000]/10 flex items-center gap-2"
                >
                  <LucideIcon name="Briefcase" size={14} />
                  Tìm hiểu chi tiết
                </Link>
                <button
                  onClick={onOpenConsultation}
                  className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 font-bold text-xs tracking-wider uppercase rounded-full transition-all duration-300 cursor-pointer"
                >
                  Yêu cầu gọi lại tư vấn
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SERVICES OVERVIEW SECTION */}
      <section className="bg-white py-16 md:py-20 border-b border-gray-100 font-sans">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          {/* Section title */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold text-[#d40000] tracking-widest uppercase block">
              Danh mục dịch vụ
            </span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
              DỊCH VỤ MH CONSULTING
            </h2>
            <p className="text-gray-500 text-sm font-medium">
              Tìm hiểu các gói dịch vụ trọn gói pháp lý, kế toán thuế chuyên nghiệp được thiết kế tối ưu hóa theo quy mô hoạt động của doanh nghiệp bạn.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewServices.map((service, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col p-6 group hover:-translate-y-1.5 ${service.colorClass}`}
              >
                {/* Category label */}
                <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block mb-3">
                  {service.categoryName}
                </span>

                {/* Icon block */}
                <div className="h-12 w-12 bg-[#d40000]/5 text-[#d40000] rounded-lg flex items-center justify-center mb-5 group-hover:bg-[#d40000] group-hover:text-white transition-colors duration-300">
                  <LucideIcon name={service.icon} size={22} />
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#d40000] transition-colors mb-2.5">
                  <Link to="/dich-vu">{service.title}</Link>
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-xs font-medium leading-relaxed flex-1">
                  {service.shortDesc}
                </p>

                {/* Arrow Action */}
                <div className="pt-6 border-t border-gray-50 mt-5">
                  <Link
                    to={`/dich-vu/${service.slug}`}
                    className="text-xs font-bold text-[#d40000] hover:text-gray-900 transition-colors flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    Xem chi tiết
                    <LucideIcon name="ArrowRight" size={12} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom quick notes */}
          <div className="mt-12 text-center bg-gray-50 rounded-xl p-5 border border-gray-100 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-semibold text-gray-600 flex items-center gap-1.5 justify-center">
              💡 Bạn cần tư vấn một trường hợp pháp lý hoặc ngành đặc thù ngoài danh mục trên?
            </p>
            <button
              onClick={onOpenConsultation}
              className="px-5 py-2 bg-gray-900 hover:bg-[#d40000] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Liên hệ chuyên viên ngay
            </button>
          </div>

        </div>
      </section>

      {/* 4. TESTIMONIALS SECTION */}
      <section className="bg-gray-50 py-16 md:py-20 border-b border-gray-100 font-sans">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-extrabold text-[#d40000] tracking-widest uppercase block">
              Khách hàng đánh giá
            </span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Khách Hàng Nói Về MH CONSULTING
            </h2>
            <p className="text-gray-500 text-xs font-medium">
              Đọc những chia sẻ chân thực từ các chủ doanh nghiệp lớn nhỏ đã và đang đồng hành cùng MH CONSULTING trên chặng đường phát triển.
            </p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* 5. KNOWLEDGE / TIMELINE SECTION */}
      <KnowledgeCarousel />

      {/* 6. CALL TO ACTION STRIP */}
      <section className="bg-[#d40000] py-16 text-white font-sans text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
            Khởi Tạo Doanh Nghiệp Của Bạn Ngay Hôm Nay
          </h2>
          <p className="text-white/85 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Nhận ngay ưu đãi miễn phí nộp tờ khai môn bài và hỗ trợ thiết lập hóa đơn điện tử cho 10 khách hàng đăng ký sớm nhất trong ngày.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenConsultation}
              className="px-8 py-3.5 bg-white text-[#d40000] hover:bg-gray-900 hover:text-white font-black text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl cursor-pointer"
            >
              Đăng ký tư vấn miễn phí
            </button>
            <a
              href="tel:0903024116"
              className="px-8 py-3.5 bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#d40000] font-black text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center gap-2"
            >
              <LucideIcon name="Phone" size={14} />
              Hotline: 0903.024.116
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
