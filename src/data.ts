import { NavItem, Testimonial, Article } from './types';

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

export const articlesData: Article[] = [
  {
    slug: 'quy-dinh-moi-ve-hoa-don-dien-tu-nam-2026',
    title: 'Quy Định Mới Về Hóa Đơn Điện Tử Doanh Nghiệp Cần Lưu Ý Năm 2026',
    category: 'Luật Thuế',
    date: '2026-06-15',
    excerpt: 'Tổng hợp các thay đổi quan trọng nhất về quản lý hóa đơn điện tử, thời hạn xuất hóa đơn và mức xử phạt hành chính đối với các vi phạm thường gặp.',
    content: `Hệ thống pháp luật về hóa đơn điện tử liên tục có những điều chỉnh nhằm thắt chặt quản lý, chống thất thu thuế và gian lận thương mại. Trong năm 2026, cơ quan Thuế áp dụng hàng loạt giải pháp công nghệ AI để tự động đối chiếu hóa đơn đầu vào và đầu ra của doanh nghiệp.

### 1. Thời điểm lập hóa đơn điện tử bắt buộc
Doanh nghiệp cần lưu ý, thời điểm lập hóa đơn điện tử đối với bán hàng hóa là thời điểm chuyển giao quyền sở hữu hoặc quyền sử dụng hàng hóa cho người mua, không phân biệt đã thu được tiền hay chưa thu được tiền. Đối với cung cấp dịch vụ, là thời điểm hoàn thành việc cung cấp dịch vụ hoặc thời điểm lập hóa đơn cung cấp dịch vụ, không phân biệt đã thu được tiền hay chưa.

Nếu doanh nghiệp xuất hóa đơn sai thời điểm, mức phạt có thể dao động từ 4.000.000đ đến 8.000.000đ tùy thuộc vào hành vi có dẫn đến chậm nộp thuế hay không.

### 2. Áp dụng hóa đơn điện tử khởi tạo từ máy tính tiền
Năm 2026 mở rộng triệt để đối tượng áp dụng hóa đơn điện tử khởi tạo từ máy tính tiền có kết nối chuyển dữ liệu điện tử với cơ quan thuế đối với các mô hình kinh doanh ăn uống, bán lẻ thuốc tân dược, trung tâm thương mại, khách sạn, dịch vụ vui chơi giải trí.

### 3. Rủi ro từ việc sử dụng hóa đơn của doanh nghiệp bỏ trốn
Tổng cục Thuế tăng cường quét dữ liệu hóa đơn của các doanh nghiệp "bỏ địa chỉ kinh doanh" (bỏ trốn). Khi doanh nghiệp đầu vào của bạn bị xếp vào danh sách bỏ trốn, toàn bộ số thuế GTGT đầu vào được khấu trừ và chi phí được trừ khi tính thuế TNDN của hóa đơn đó sẽ bị cơ quan thuế loại bỏ và yêu cầu giải trình nghiêm ngặt.

**MH CONSULTING khuyến nghị:** Doanh nghiệp cần thường xuyên tra cứu trạng thái hoạt động của nhà cung cấp trên Cổng thông tin của Tổng cục Thuế trước khi thực hiện giao dịch thanh toán lớn.`,
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&h=400&fit=crop&q=80'
  },
  {
    slug: 'huong-dan-quyet-toan-thue-tncn-cho-nguoi-lao-dong',
    title: 'Hướng Dẫn Chi Tiết Quyết Toán Thuế TNCN Cho Người Lao Động',
    category: 'Cá Nhân',
    date: '2026-03-10',
    excerpt: 'Tìm hiểu điều kiện ủy quyền quyết toán thuế, cách tính giảm trừ gia cảnh mới và quy trình tự quyết toán hoàn thuế trực tuyến dễ dàng.',
    content: `Quyết toán thuế Thu nhập cá nhân (TNCN) luôn là chủ đề nóng vào mỗi dịp quý 1 hàng năm. Việc nắm rõ quyền lợi về giảm trừ gia cảnh và hoàn thuế sẽ giúp người lao động tiết kiệm được khoản tiền đáng kể.

### 1. Ai phải tự quyết toán thuế TNCN?
Người lao động có thu nhập từ tiền lương, tiền công từ hai nơi trở lên trong năm (không đủ điều kiện ủy quyền cho cơ quan chi trả thu nhập quyết toán thay) hoặc có số thuế phải nộp thêm hoặc số thuế nộp thừa đề nghị hoàn hoặc bù trừ vào kỳ khai thuế tiếp theo.

### 2. Các khoản giảm trừ gia cảnh hiện hành
- Giảm trừ đối với người nộp thuế: 11.000.000 đồng/tháng (132 triệu đồng/năm).
- Giảm trừ đối với mỗi người phụ thuộc: 4.400.000 đồng/tháng. Người phụ thuộc phải được đăng ký và cấp mã số thuế người phụ thuộc hợp lệ.

### 3. Thủ tục hoàn thuế TNCN trực tuyến
Hiện nay, người nộp thuế có thể tự thực hiện quyết toán và hoàn thuế cực kỳ dễ dàng thông qua ứng dụng eTax Mobile hoặc cổng thông tin Thuế điện tử cá nhân (canhan.gdt.gov.vn) bằng tài khoản định danh điện tử VNeID cấp độ 2.

**Các bước cơ bản:**
1. Đăng nhập hệ thống bằng tài khoản Thuế hoặc VNeID.
2. Chọn chức năng "Quyết toán thuế" -> "Kê khai trực tuyến".
3. Điền các thông tin thu nhập theo chứng từ khấu trừ thuế TNCN mà doanh nghiệp đã cấp.
4. Nhập thông tin tài khoản ngân hàng chính chủ để nhận tiền hoàn thuế.
5. Ký và gửi tờ khai bằng mã OTP nhận qua điện thoại.

Thông thường, thời gian nhận tiền hoàn thuế dao động từ 6 đến 12 ngày làm việc kể từ ngày cơ quan thuế chấp nhận hồ sơ hợp lệ.`,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop&q=80'
  },
  {
    slug: 'quy-trinh-thanh-lap-doanh-nghiep-moi-nhat-tu-a-z',
    title: 'Quy Trình Thành Lập Doanh Nghiệp Chi Tiết Từ A-Z Cho Nhà Khởi Nghiệp',
    category: 'Khởi Nghiệp',
    date: '2026-02-20',
    excerpt: 'Cẩm nang pháp lý hữu ích giúp bạn hiểu rõ từng bước từ lựa chọn loại hình, đăng ký kinh doanh đến thiết lập hệ thống thuế ban đầu thành công.',
    content: `Khởi nghiệp kinh doanh là một hành trình đầy hứng khởi nhưng cũng kèm theo nhiều thử thách pháp lý ban đầu. Dưới đây là lộ trình chuẩn mực giúp bạn biến ý tưởng thành doanh nghiệp hợp pháp hoạt động suôn sẻ.

### Bước 1: Lựa chọn loại hình doanh nghiệp phù hợp
- **Công ty TNHH 1 thành viên:** Phù hợp với cá nhân làm chủ duy nhất, chịu trách nhiệm hữu hạn trong phạm vi vốn góp.
- **Công ty TNHH 2 thành viên trở lên:** Phù hợp cho nhóm từ 2 - 50 thành viên cùng góp vốn hợp tác.
- **Công ty Cổ phần:** Phù hợp cho quy mô lớn, tối thiểu 3 cổ đông, có khả năng huy động vốn linh hoạt qua thị trường chứng khoán.

### Bước 2: Chuẩn bị thông tin đăng ký giấy phép
- **Tên doanh nghiệp:** Tên tiếng Việt, tên tiếng Anh và tên viết tắt. Không được trùng hoặc gây nhầm lẫn với các doanh nghiệp đã đăng ký trước đó trên toàn quốc.
- **Địa chỉ trụ sở:** Phải có địa chỉ cụ thể, rõ ràng, thuộc quyền sở hữu hoặc sử dụng hợp pháp. Đặc biệt, chung cư nhà ở không được dùng làm trụ sở công ty.
- **Ngành nghề kinh doanh:** Áp mã ngành nghề cấp 4 theo Hệ thống ngành kinh tế Việt Nam.
- **Vốn điều lệ:** Số vốn do các thành viên cam kết góp trong vòng 90 ngày kể từ ngày cấp giấy phép.

### Bước 3: Nộp hồ sơ và khắc dấu
Hồ sơ đăng ký doanh nghiệp nộp trực tuyến qua Cổng thông tin quốc gia về đăng ký doanh nghiệp sử dụng tài khoản đăng ký kinh doanh hoặc chữ ký số công cộng. Sở KH&ĐT sẽ cấp Giấy chứng nhận Đăng ký Doanh nghiệp trong vòng 3 ngày làm việc nếu hồ sơ hợp lệ. Tiếp theo, doanh nghiệp tiến hành khắc con dấu pháp nhân.

### Bước 4: Các thủ tục bắt buộc sau khi có Giấy phép
Đây là bước cực kỳ quan trọng mà rất nhiều doanh nghiệp bỏ quên dẫn đến bị xử phạt hành chính nặng:
1. Treo biển hiệu tại trụ sở công ty.
2. Mua chữ ký số (USB Token hoặc chữ ký số HSM) để khai thuế.
3. Mở tài khoản ngân hàng và thông báo số tài khoản cho cơ quan thuế.
4. Đăng ký tài khoản nộp thuế điện tử liên kết ngân hàng.
5. Nộp lệ phí môn bài (hiện nay doanh nghiệp thành lập mới được miễn lệ phí môn bài năm đầu tiên).
6. Phát hành hóa đơn điện tử và gửi tờ khai đăng ký sử dụng hóa đơn gửi cơ quan thuế duyệt.`,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&q=80'
  },
  {
    slug: 'kinh-nghiem-don-dep-so-sach-chuan-bi-quyet-toan-thue',
    title: 'Kinh Nghiệm Rà Soát Dọn Dẹp Sổ Sách Chuẩn Bị Kỳ Quyết Toán Thuế',
    category: 'Doanh Nghiệp',
    date: '2026-01-05',
    excerpt: 'Tổng hợp bí quyết tự kiểm tra báo cáo tài chính, phát hiện nhanh các rủi ro hóa đơn ảo và tối ưu hóa chi phí doanh nghiệp thông thái.',
    content: `Kỳ quyết toán thuế luôn là bài kiểm tra cân não đối với bất kỳ doanh nghiệp nào. Thanh tra thuế sẽ rà soát kỹ lưỡng hóa đơn chứng từ trong vòng từ 3 đến 5 năm hoạt động của doanh nghiệp. Để chuẩn bị tốt nhất, ban lãnh đạo và kế toán cần tiến hành dọn dẹp hệ thống sổ sách chủ động.

### 1. Đối chiếu doanh thu kê khai và doanh thu thực tế
Kế toán cần kiểm tra tính khớp số giữa tờ khai thuế GTGT hàng tháng/quý so với doanh thu ghi nhận trên Báo cáo tài chính năm. Mọi sự chênh lệch (dù là nhỏ nhất) đều phải tìm ra nguyên nhân cụ thể (ví dụ: doanh thu xuất hóa đơn trước nhưng chưa đủ điều kiện ghi nhận doanh thu kế toán hoặc ngược lại).

### 2. Thẩm định chi phí hợp lý được trừ
Một khoản chi phí chỉ được chấp nhận là chi phí hợp lý hợp lệ khi:
- Thực tế phát sinh liên quan đến hoạt động sản xuất, kinh doanh của doanh nghiệp.
- Có đủ hóa đơn, chứng từ hợp pháp theo quy định của pháp luật.
- Có chứng từ thanh toán không dùng tiền mặt đối với các hóa đơn mua hàng hóa, dịch vụ từng lần có giá trị từ 20 triệu đồng trở lên (đã bao gồm thuế GTGT).

### 3. Rà soát quỹ tiền mặt và tiền gửi ngân hàng
Một lỗi cực kỳ phổ biến của doanh nghiệp vừa và nhỏ là tình trạng quỹ tiền mặt bị âm trên sổ sách nhưng thực tế vẫn có tiền, hoặc số dư quỹ tiền mặt quá lớn (lên tới hàng tỷ đồng) trong khi doanh nghiệp vẫn đi vay ngân hàng chịu lãi suất. Chi phí lãi vay trong trường hợp quỹ tiền mặt tồn lớn hơn số tiền đi vay sẽ bị cơ quan thuế gạt bỏ không chấp nhận là chi phí hợp lý.

**Lời khuyên của MH CONSULTING:** Nếu doanh nghiệp không có nhân sự chuyên trách giàu kinh nghiệm, việc thuê một đơn vị dịch vụ rà soát độc lập như MH CONSULTING sẽ giúp phát hiện đến 99% lỗi sai sót và xử lý hoàn thiện sổ sách nhanh chóng trước khi có quyết định thanh tra chính thức.`,
    image: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=600&h=400&fit=crop&q=80'
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
