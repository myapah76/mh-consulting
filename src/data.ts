import type { NavItem, Testimonial } from './types/common.types';

export const navigationItems: NavItem[] = [
  { label: 'TRANG CHỦ', path: '/' },
  { label: 'GIỚI THIỆU', path: '/gioi-thieu' },
  { label: 'DỊCH VỤ', path: '/dich-vu' },
  { label: 'TIN TỨC', path: '/tin-tuc' },
  { label: 'LIÊN HỆ', path: '/lien-he' },
];

export const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Nguyễn Văn Hải',
    role: 'Giám Đốc Điều Hành',
    company: 'Công Ty TNHH Xuất Nhập Khẩu Thăng Long',
    comment: 'Tôi cực kỳ hài lòng với dịch vụ kế toán trọn gói của MH CONSULTING. Các bạn làm việc rất chuyên nghiệp, cẩn thận trong việc đối soát hóa đơn và luôn cảnh báo sớm các rủi ro về thuế. Nhờ có các bạn, tôi hoàn toàn yên tâm tập trung vào hoạt động kinh doanh chính.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80'
  },
  {
    id: '3',
    name: 'Phạm Minh Tuấn',
    role: 'Sáng Lập',
    company: 'Chuỗi Coffee & Bakery Urban Sài Gòn',
    comment: 'Thủ tục thành lập doanh nghiệp mới và xin giấy phép vệ sinh an toàn thực phẩm của chúng tôi được MH CONSULTING xử lý chỉ trong vòng đúng 3 ngày làm việc. Chi phí dịch vụ rất hợp lý, nhân viên hỗ trợ nhiệt tình, tư vấn tận tâm và giao nhận hồ sơ tại nhà rất tiện lợi.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80'
  }
];

export const footerLinks = {
  column2: {
    title: 'Dịch vụ thành lập',
    links: [
      { label: 'Thành lập doanh nghiệp trọn gói', path: '/dich-vu/thanh-lap-doanh-nghiep-tron-goi' },
      { label: 'Thay đổi giấy phép kinh doanh', path: '/dich-vu/thay-doi-giay-phep-kinh-doanh' },
      { label: 'Thành lập hộ kinh doanh cá thể', path: '/dich-vu/thanh-lap-ho-kinh-doanh-ca-the' },
      { label: 'Tạm ngừng kinh doanh', path: '/dich-vu/tam-ngung-va-giai-the-doanh-nghiep' },
      { label: 'Giải thể doanh nghiệp trọn gói', path: '/dich-vu/tam-ngung-va-giai-the-doanh-nghiep' },
    ]
  },
  column3: {
    title: 'Dịch vụ Kế toán & Thuế',
    links: [
      { label: 'Dịch vụ kế toán trọn gói', path: '/dich-vu/dich-vu-ke-toan-tron-goi' },
      { label: 'Làm sổ sách & dọn dẹp kế toán', path: '/dich-vu/lam-so-sach-ke-toan-va-don-dep' },
      { label: 'Báo cáo thuế định kỳ hàng tháng/quý', path: '/dich-vu/bao-cao-thue-dinh-ky-hang-thang-quy' },
      { label: 'Dịch vụ bảo hiểm xã hội lao động', path: '/dich-vu/dich-vu-bao-hiem-xa-hoi-lao-dong' },
    ]
  },
  column4: {
    title: 'Tin tức nổi bật',
    links: [
      { label: 'Quy định mới về hóa đơn điện tử 2026', path: '/tin-tuc/quy-dinh-moi-ve-hoa-don-dien-tu-nam-2026' },
      { label: 'Hướng dẫn tự quyết toán thuế TNCN', path: '/tin-tuc/huong-dan-quyet-toan-thue-tncn-cho-nguoi-lao-dong' },
      { label: 'Quy trình thành lập công ty từ A-Z', path: '/tin-tuc/quy-trinh-thanh-lap-doanh-nghiep-moi-nhat-tu-a-z' },
      { label: 'Kinh nghiệm dọn dẹp sổ sách quyết toán', path: '/tin-tuc/kinh-nghiem-don-dep-so-sach-chuan-bi-quyet-toan-thue' },
    ]
  }
};
