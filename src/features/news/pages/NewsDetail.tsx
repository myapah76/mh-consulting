import { useParams, Link, Navigate } from 'react-router-dom';
import LucideIcon from '../../../components/common/LucideIcon';
import { articlesData } from '../data/articles';

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();

  // Look up current article
  const article = articlesData.find((art) => art.slug === slug);

  // Redirect to news hub if slug is incorrect
  if (!article) {
    return <Navigate to="/tin-tuc" replace />;
  }

  // Related articles (excluding current)
  const popularArticles = articlesData
    .filter((art) => art.slug !== article.slug)
    .slice(0, 4);

  // Format date helper: YYYY-MM-DD -> DD/MM/YYYY
  const formatDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  return (
    <div className="font-sans text-[#222222] bg-white">
      
      {/* 1. Breadcrumb navigation */}
      <section className="bg-gray-50 py-4 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-wrap items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
          <Link to="/" className="hover:text-[#d40000]">Trang chủ</Link>
          <span className="text-gray-300">/</span>
          <Link to="/tin-tuc" className="hover:text-[#d40000]">Tin tức</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-600 line-clamp-1">{article.title}</span>
        </div>
      </section>

      {/* 2. Content Layout Grid */}
      <section className="py-12 md:py-16 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Article body (8 cols on desktop) */}
          <article className="lg:col-span-8 space-y-6">
            
            {/* Meta details */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
              <span className="bg-[#d40000] text-white px-2.5 py-1 rounded uppercase tracking-wider">
                {article.category}
              </span>
              <span className="text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <LucideIcon name="Calendar" size={14} className="text-gray-400" />
                {formatDate(article.date)}
              </span>
              <span className="text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <LucideIcon name="UserCheck" size={14} className="text-gray-400" />
                Tác giả: MH CONSULTING
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
              {article.title}
            </h1>

            {/* Intro paragraph */}
            <p className="text-sm md:text-base font-bold text-gray-700 leading-relaxed italic bg-gray-50 p-5 rounded-xl border-l-4 border-red-500">
              {article.excerpt}
            </p>

            {/* Main Image */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-[320px] md:h-[420px] object-cover"
              />
            </div>

            {/* Rich text body (simulated for professional editorial feel) */}
            <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed">
              <h2 className="text-lg md:text-xl font-black text-gray-900 pt-4 uppercase tracking-tight">
                1. Tính Pháp Lý & Điểm Mới Quan Trọng
              </h2>
              <p>
                Theo thông tin hướng dẫn mới nhất ban hành trong quý này, Tổng cục Thuế Việt Nam đã cập nhật hệ thống nộp hồ sơ quyết toán trực tuyến, giảm thiểu 50% hồ sơ giấy tờ nộp tay. Điều này thúc đẩy mạnh mẽ quá trình chuyển đổi số của các doanh nghiệp tư nhân vừa và nhỏ (SMEs).
              </p>
              <p>
                MH CONSULTING khuyến cáo bộ phận kế toán cần kiểm tra kỹ số dư đầu kỳ trên phần mềm kế toán (như MISA, FAST) đối chiếu với biên bản quyết toán hoặc hóa đơn giá trị gia tăng điện tử của những kỳ tính thuế trước để tránh lỗi lệch số liệu khi khai báo trực tuyến.
              </p>

              <h2 className="text-lg md:text-xl font-black text-gray-900 pt-4 uppercase tracking-tight">
                2. Các Rủi Ro Doanh Nghiệp Thường Gặp
              </h2>
              <ul className="space-y-3 pl-5 list-disc font-semibold">
                <li>Sai lệch trong tờ khai thuế GTGT hàng tháng so với dữ liệu hóa đơn điện tử mua vào bán ra thực tế trên cổng thông tin Tổng cục Thuế.</li>
                <li>Không thực hiện trích lập quỹ dự phòng tiền lương hoặc hạch toán sai các khoản phụ cấp của người lao động vượt khung quy định.</li>
                <li>Không chuẩn bị đủ tài liệu giải trình nguồn gốc nguyên vật liệu xuất kho trong kỳ thanh kiểm tra của Đoàn thanh tra Cục Thuế.</li>
              </ul>

              <h2 className="text-lg md:text-xl font-black text-gray-900 pt-4 uppercase tracking-tight">
                3. Giải Pháp Tối Ưu Từ MH CONSULTING
              </h2>
              <p>
                Để loại bỏ hoàn toàn các rủi ro trên, giải pháp tốt nhất cho doanh nghiệp là sử dụng <strong>Gói Kế toán thuế trọn gói</strong> chuyên nghiệp. Chúng tôi sẽ đại diện chịu trách nhiệm toàn bộ quá trình:
              </p>
              <p>
                Nhận chứng từ gốc, phân loại, kiểm tra hóa đơn rác, nhập liệu lên sổ sách, thực hiện lập tờ khai, nộp thuế đúng hạn, giải trình chi tiết số liệu khi có đoàn kiểm tra thanh tra thuế. MH CONSULTING cam kết bảo mật thông tin và chịu 100% trách nhiệm bồi thường chi phí tài chính nếu xảy ra lỗi hạch toán kế toán từ phía chúng tôi.
              </p>
            </div>

            {/* Back action */}
            <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
              <Link
                to="/tin-tuc"
                className="flex items-center gap-1.5 text-xs font-bold text-[#d40000] uppercase tracking-wider hover:text-gray-900 transition-colors"
              >
                <LucideIcon name="ChevronLeft" size={14} />
                Quay lại danh sách bài viết
              </Link>
              
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Chia sẻ: Facebook | Zalo
              </span>
            </div>

          </article>

          {/* Right: Sidebar (4 cols on desktop) */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Quick Slogan Card */}
            <div className="bg-[#eef8ff] p-6 rounded-2xl border border-blue-50 space-y-4">
              <h3 className="font-extrabold text-blue-900 text-sm uppercase tracking-wide">
                CỐ VẤN THUẾ MH CONSULTING
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Chúng tôi sở hữu đội ngũ Đại lý thuế được Tổng cục Thuế công nhận hành nghề, đại diện doanh nghiệp làm việc trực tiếp với các Chi cục Thuế Quận/Huyện tại TP.HCM.
              </p>
              <div className="h-px bg-blue-100" />
              <Link
                to="/lien-he"
                className="block text-center py-2.5 bg-[#d40000] hover:bg-gray-900 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                Gửi yêu cầu hỗ trợ ngay
              </Link>
            </div>

            {/* Popular Articles */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-md space-y-4">
              <h3 className="font-extrabold text-gray-900 text-base border-b border-gray-100 pb-3">
                Bài Viết Được Quan Tâm
              </h3>
              <ul className="space-y-4">
                {popularArticles.map((art) => (
                  <li key={art.slug} className="group">
                    <Link to={`/tin-tuc/${art.slug}`} className="flex gap-3 items-start">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-16 h-16 rounded object-cover border border-gray-100 group-hover:opacity-80 shrink-0"
                      />
                      <div className="space-y-1">
                        <span className="text-gray-400 text-[9px] font-black uppercase tracking-wider block">
                          {formatDate(art.date)}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-gray-800 line-clamp-2 leading-tight group-hover:text-[#d40000] transition-colors">
                          {art.title}
                        </h4>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </aside>

        </div>
      </section>

    </div>
  );
}
