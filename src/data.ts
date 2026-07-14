import { NavItem, ServiceItem, Testimonial, Article } from './types';

export const navigationItems: NavItem[] = [
  { label: 'TRANG CHỦ', path: '/' },
  { label: 'GIỚI THIỆU', path: '/gioi-thieu' },
  { label: 'DỊCH VỤ', path: '/dich-vu' },
  { label: 'TIN TỨC', path: '/tin-tuc' },
  { label: 'LIÊN HỆ', path: '/lien-he' },
];

export const servicesData: ServiceItem[] = [
  {
    id: 'thanh-lap-tron-goi',
    slug: 'thanh-lap-doanh-nghiep-tron-goi',
    title: 'Thành Lập Doanh Nghiệp Trọn Gói',
    category: 'thanh-lap',
    shortDesc: 'Hỗ trợ trọn gói từ việc tư vấn đặt tên, chuẩn bị hồ sơ đến khi nhận Giấy chứng nhận Đăng ký Doanh nghiệp và con dấu.',
    icon: 'Briefcase',
    fullContent: 'Dịch vụ thành lập doanh nghiệp trọn gói của MH CONSULTING cam kết mang lại sự khởi đầu thuận lợi nhất cho Quý doanh nghiệp. Chúng tôi thay mặt khách hàng xử lý toàn bộ quy trình pháp lý phức tạp với Sở Kế hoạch và Đầu tư, cơ quan thuế, giúp doanh nghiệp tiết kiệm tối đa thời gian và chi phí.',
    detailedPoints: [
      'Tư vấn miễn phí lựa chọn loại hình doanh nghiệp phù hợp (Cổ phần, TNHH 1 thành viên, TNHH 2 thành viên trở lên, Doanh nghiệp tư nhân).',
      'Tư vấn đặt tên công ty tránh trùng lặp, tư vấn mức vốn điều lệ tối ưu và đăng ký ngành nghề kinh doanh phù hợp.',
      'Soạn thảo toàn bộ hồ sơ đăng ký doanh nghiệp theo đúng quy định pháp luật hiện hành.',
      'Đại diện doanh nghiệp nộp hồ sơ và nhận kết quả tại Sở Kế hoạch và Đầu tư.',
      'Khắc con dấu tròn doanh nghiệp chất lượng cao và công bố mẫu dấu lên cổng thông tin quốc gia.',
      'Hỗ trợ mở tài khoản ngân hàng và các thủ tục khai thuế ban đầu.'
    ],
    benefits: [
      'Tiết kiệm đến 90% thời gian đi lại và chờ đợi.',
      'Cam kết không phát sinh bất kỳ chi phí ngoài hợp đồng.',
      'Đội ngũ chuyên viên luật giàu kinh nghiệm xử lý hồ sơ nhanh chóng trong vòng 3 ngày làm việc.',
      'Hỗ trợ tư vấn kế toán, thuế miễn phí trong suốt năm đầu tiên hoạt động.'
    ],
    processSteps: [
      'Tiếp nhận thông tin (Tên dự kiến, Địa chỉ, Vốn, Ngành nghề, CCCD/Hộ chiếu đại diện pháp luật).',
      'Soạn hồ sơ và gửi khách hàng ký tận nơi (trong vòng 24h).',
      'Nộp hồ sơ lên Sở KH&ĐT và theo dõi tiến độ.',
      'Bàn giao Giấy phép kinh doanh, Con dấu và bộ hồ sơ thuế ban đầu tận tay khách hàng.'
    ]
  },
  {
    id: 'thay-doi-giay-phep',
    slug: 'thay-doi-giay-phep-kinh-doanh',
    title: 'Thay Đổi Giấy Phép Kinh Doanh',
    category: 'thanh-lap',
    shortDesc: 'Thay đổi tên công ty, địa chỉ trụ sở, người đại diện pháp luật, tăng/giảm vốn điều lệ, thay đổi thành viên hoặc ngành nghề kinh doanh.',
    icon: 'Edit3',
    fullContent: 'Khi quy mô hoặc định hướng kinh doanh thay đổi, doanh nghiệp cần thực hiện thủ tục thay đổi thông tin trên Giấy phép kinh doanh theo đúng thời hạn luật định. MH CONSULTING cung cấp giải pháp xử lý hồ sơ nhanh, chính xác, tránh các rủi ro phạt hành chính do nộp chậm hồ sơ.',
    detailedPoints: [
      'Tư vấn pháp lý và tác động của việc thay đổi (như đổi trụ sở khác quận/tỉnh, tăng giảm vốn, thay đổi tỷ lệ sở hữu).',
      'Soạn thảo biên bản họp, quyết định, danh sách thành viên/cổ đông và các tờ trình liên quan.',
      'Thực hiện thủ tục chốt thuế quận cũ (nếu thay đổi địa chỉ khác quận/huyện dẫn đến đổi cơ quan quản lý thuế).',
      'Nộp hồ sơ và nhận Giấy phép kinh doanh mới từ Sở Kế hoạch và Đầu tư.'
    ],
    benefits: [
      'Quy trình chuẩn xác, loại bỏ hoàn toàn khả năng hồ sơ bị trả về.',
      'Thời gian giải quyết nhanh chóng, chỉ 3-5 ngày làm việc.',
      'Hỗ trợ cập nhật thông tin chữ ký số, hóa đơn điện tử miễn phí sau khi đổi giấy phép.'
    ],
    processSteps: [
      'Tiếp nhận yêu cầu thay đổi và thông tin pháp lý hiện tại.',
      'Chuyên viên soạn hồ sơ và gửi khách hàng ký duyệt.',
      'Thực hiện thủ tục thuế quận cũ (nếu chuyển quận) và nộp hồ sơ lên Sở KH&ĐT.',
      'Bàn giao giấy phép kinh doanh mới và hỗ trợ đổi con dấu mới (nếu cần).'
    ]
  },
  {
    id: 'ho-kinh-doanh-ca-the',
    slug: 'thanh-lap-ho-kinh-doanh-ca-the',
    title: 'Thành Lập Hộ Kinh Doanh Cá Thể',
    category: 'thanh-lap',
    shortDesc: 'Quy trình đơn giản, nhanh chóng giúp cá nhân, nhóm cá nhân, hoặc hộ gia đình chính thức hoạt động thương mại hợp pháp.',
    icon: 'UserCheck',
    fullContent: 'Hộ kinh doanh cá thể là mô hình lý tưởng cho các cửa hàng bán lẻ, quán ăn, quán cà phê, hoặc cơ sở sản xuất quy mô nhỏ với ưu thế thủ tục đơn giản và mức thuế khoán dễ chịu. MH CONSULTING hỗ trợ đăng ký nhanh giấy chứng nhận đăng ký hộ kinh doanh tại Ủy ban nhân dân quận/huyện quản lý.',
    detailedPoints: [
      'Tư vấn điều kiện thành lập, đặt tên hộ kinh doanh và ngành nghề đăng ký phù hợp quy định địa phương.',
      'Soạn hồ sơ đăng ký kinh doanh và đăng ký mã số thuế hộ cá thể.',
      'Đại diện nộp hồ sơ tại Phòng Tài chính - Kế hoạch thuộc UBND quận/huyện.',
      'Hỗ trợ thủ tục kê khai thuế ban đầu và hướng dẫn cách nộp thuế khoán.'
    ],
    benefits: [
      'Chi phí siêu tiết kiệm phù hợp với mô hình khởi nghiệp quy mô vừa và nhỏ.',
      'Nhận kết quả nhanh chóng trong vòng 3 ngày.',
      'Đội ngũ chuyên viên tận tình hướng dẫn chế độ kế toán đơn giản áp dụng cho hộ kinh doanh.'
    ],
    processSteps: [
      'Tư vấn ngành nghề, quy mô vốn và địa điểm đăng ký kinh doanh.',
      'Chuẩn bị hồ sơ pháp lý, CMND/CCCD photo công chứng.',
      'Nộp hồ sơ lên UBND quận/huyện.',
      'Bàn giao Giấy phép hộ kinh doanh và hỗ trợ đăng ký mã số thuế.'
    ]
  },
  {
    id: 'ke-toan-tron-goi',
    slug: 'dich-vu-ke-toan-tron-goi',
    title: 'Dịch Vụ Kế Toán Trọn Gói',
    category: 'ke-toan',
    shortDesc: 'Xử lý toàn bộ chứng từ phát sinh, hoàn thiện sổ sách kế toán, lập báo cáo tài chính cuối năm và đại diện làm việc với cơ quan thuế.',
    icon: 'Calculator',
    fullContent: 'Dịch vụ kế toán trọn gói của MH CONSULTING là giải pháp toàn diện giúp doanh nghiệp sở hữu một phòng kế toán chuyên nghiệp với chi phí chỉ bằng 1/10 so với thuê kế toán trưởng toàn thời gian. Chúng tôi chịu trách nhiệm pháp lý trọn đời đối với số liệu kế toán đã thực hiện.',
    detailedPoints: [
      'Phân loại, kiểm tra tính hợp pháp, hợp lệ của chứng từ, hóa đơn đầu vào - đầu ra.',
      'Thực hiện ghi sổ kế toán chi tiết, cập nhật nhật ký chung và các sổ phụ liên quan.',
      'Hỗ trợ cân đối chi phí hợp lý hợp lệ, cảnh báo các rủi ro về thuế kịp thời cho chủ doanh nghiệp.',
      'Thiết lập hệ thống báo cáo quản trị định kỳ giúp chủ doanh nghiệp kiểm soát dòng tiền.',
      'Lập báo cáo tài chính, báo cáo quyết toán thuế TNDN, quyết toán thuế TNCN cuối năm.'
    ],
    benefits: [
      'Tiết kiệm chi phí tuyển dụng, quản lý, trang thiết bị văn phòng cho kế toán viên.',
      'Nhân sự có trình độ chuyên môn cao, thường xuyên cập nhật luật thuế mới nhất.',
      'Đền bù 100% thiệt hại phát sinh từ lỗi sai sót nghiệp vụ kế toán của chúng tôi.',
      'Sử dụng phần mềm kế toán bản quyền tiên tiến nhất.'
    ],
    processSteps: [
      'Hàng tháng/quý, nhân viên MH CONSULTING đến tận nơi nhận chứng từ hoặc tiếp nhận bản scan qua email/zalo.',
      'Kiểm tra tính hợp lệ của hóa đơn, nhập liệu phần mềm chuyên dụng.',
      'Cân đối số liệu kế toán và gửi báo cáo sơ bộ cho chủ doanh nghiệp duyệt.',
      'Hoàn thiện sổ sách kế toán, in ấn đóng tập bàn giao doanh nghiệp lưu trữ cuối năm.'
    ]
  },
  {
    id: 'lam-so-sach-ke-toan',
    slug: 'lam-so-sach-ke-toan-va-don-dep',
    title: 'Dịch Vụ Làm Sổ Sách & Dọn Dẹp Kế Toán',
    category: 'ke-toan',
    shortDesc: 'Rà soát lỗi hệ thống kế toán cũ, hoàn thiện sổ sách tồn đọng để chuẩn bị cho kỳ quyết toán thuế đầy thử thách.',
    icon: 'FileText',
    fullContent: 'Nếu doanh nghiệp của bạn đang lo lắng về hệ thống sổ sách kế toán lộn xộn từ những năm trước do nhân sự cũ bàn giao thiếu sót, dịch vụ dọn dẹp và làm lại sổ sách kế toán của MH CONSULTING sẽ nhanh chóng giúp bạn lấy lại sự an tâm tuyệt đối trước khi cơ quan thuế tiến hành thanh tra quyết toán.',
    detailedPoints: [
      'Kiểm tra, đối chiếu toàn bộ chứng từ gốc với tờ khai thuế đã nộp các kỳ trước.',
      'Phát hiện lỗi sai sót, thiếu chứng từ, sai mã số thuế hoặc định khoản không đúng bản chất kế toán.',
      'Thực hiện điều chỉnh tờ khai thuế sai sót, kê khai bổ sung định kỳ theo luật định.',
      'Hoàn thiện và in ấn đầy đủ bộ sổ sách kế toán: Sổ cái, sổ chi tiết, bảng xuất nhập tồn kho, sổ quỹ.'
    ],
    benefits: [
      'Hạn chế tối đa các khoản phạt hành chính lớn từ việc sổ sách sai sót nghiêm trọng.',
      'Doanh nghiệp có cái nhìn minh bạch về tài chính thực tế qua các năm.',
      'Sẵn sàng cung cấp dữ liệu sạch và chuẩn xác khi có quyết định quyết toán thuế đột xuất.'
    ],
    processSteps: [
      'Khảo sát hiện trạng sổ sách, chứng từ kế toán thực tế của doanh nghiệp.',
      'Đưa ra đánh giá sơ bộ về rủi ro sai sót và đề xuất lộ trình xử lý.',
      'Tiến hành dọn dẹp sổ sách, nhập lại chứng từ thiếu hụt, điều chỉnh thuế bổ sung.',
      'Bàn giao hệ thống sổ sách chuẩn mực và tư vấn khắc phục điểm yếu kế toán nội bộ.'
    ]
  },
  {
    id: 'bao-cao-thue-dinh-ky',
    slug: 'bao-cao-thue-dinh-ky-hang-thang-quy',
    title: 'Báo Cáo Thuế Định Kỳ (Tháng/Quý)',
    category: 'thue',
    shortDesc: 'Kê khai thuế GTGT, TNCN, báo cáo tình hình sử dụng hóa đơn chính xác, nộp tờ khai đúng hạn để bảo đảm tuân thủ luật thuế.',
    icon: 'BarChart2',
    fullContent: 'Báo cáo thuế định kỳ là nghĩa vụ pháp lý bắt buộc đối với mọi doanh nghiệp đang hoạt động, ngay cả khi không phát sinh doanh thu. MH CONSULTING hỗ trợ lập tờ khai thuế GTGT, thuế TNCN và tạm tính thuế TNDN chuẩn xác từng con số, đảm bảo nộp tờ khai đúng hạn 100%.',
    detailedPoints: [
      'Phân loại hóa đơn đầu vào, đầu ra để xác định phương pháp kê khai khấu trừ hoặc trực tiếp.',
      'Lập tờ khai thuế giá trị gia tăng (GTGT) hàng tháng hoặc hàng quý.',
      'Lập tờ khai thuế thu nhập cá nhân (TNCN) khấu trừ tại nguồn cho nhân sự hoạt động.',
      'Theo dõi hạn nộp thuế để nhắc nhở doanh nghiệp thanh toán, tránh phát sinh tiền chậm nộp phạt.'
    ],
    benefits: [
      'Không bao giờ lo lắng về lỗi nộp trễ tờ khai thuế bị phạt tiền triệu.',
      'Chuyên viên chịu trách nhiệm kiểm tra tính hợp pháp của hóa đơn nhà cung cấp tránh rủi ro hóa đơn ảo.',
      'Tư vấn cân đối tối ưu số thuế GTGT phải nộp hàng kỳ hợp pháp.'
    ],
    processSteps: [
      'Thu thập thông tin hóa đơn điện tử đầu ra và đầu vào định kỳ ngày 15 hàng tháng hoặc cuối quý.',
      'Xử lý số liệu, đối chiếu tính tương thích giữa hóa đơn và hoạt động sản xuất kinh doanh.',
      'Lập tờ khai thuế chính thức và ký số nộp cơ quan thuế quản lý.',
      'Bàn giao tờ khai đã nộp thành công cho khách hàng lưu giữ.'
    ]
  },
  {
    id: 'bao-hiem-xa-hoi',
    slug: 'dich-vu-bao-hiem-xa-hoi-lao-dong',
    title: 'Bảo Hiểm Xã Hội & Lao Động',
    category: 'khac',
    shortDesc: 'Đăng ký mã đơn vị, báo tăng/giảm lao động, làm hồ sơ thai sản, ốm đau, chốt sổ BHXH nhanh chóng cho nhân viên.',
    icon: 'HeartHandshake',
    fullContent: 'Khai báo lao động và bảo hiểm xã hội bắt buộc là nghĩa vụ pháp lý nhằm đảm bảo quyền lợi cho người lao động và tránh vi phạm pháp luật về sử dụng lao động. MH CONSULTING cung cấp giải pháp trọn gói, tiết kiệm thời gian kê khai phần mềm BHXH điện tử.',
    detailedPoints: [
      'Lập hồ sơ đăng ký mã đơn vị tham gia BHXH lần đầu cho doanh nghiệp.',
      'Khai báo hợp đồng lao động, báo tăng - giảm nhân sự định kỳ hàng tháng.',
      'Giải quyết chế độ ốm đau, thai sản, tai nạn lao động giúp nhân viên nhận quyền lợi nhanh chóng.',
      'Đăng ký cấp thẻ BHYT, thực hiện gộp sổ, chốt sổ bảo hiểm khi người lao động nghỉ việc.'
    ],
    benefits: [
      'Giảm bớt gánh nặng hành chính hành sự cho bộ phận nhân sự của công ty.',
      'Đảm bảo đóng bảo hiểm đúng mức lương đóng và đối tượng quy định.',
      'Xử lý nhanh các vướng mắc hồ sơ bảo hiểm phức tạp ở các quận khó.'
    ],
    processSteps: [
      'Tiếp nhận danh sách nhân sự, thông tin CCCD và hợp đồng lao động tương ứng.',
      'Xác định mã vùng, mức lương cơ sở tối thiểu vùng để áp phí BHXH.',
      'Nộp tờ khai điện tử qua cổng dịch vụ công BHXH Việt Nam.',
      'Nhận kết quả thẻ BHYT vật lý, sổ BHXH và bàn giao cho công ty.'
    ]
  },
  {
    id: 'tam-ngung-giai-the',
    slug: 'tam-ngung-va-giai-the-doanh-nghiep',
    title: 'Tạm Ngừng & Giải Thể Doanh Nghiệp',
    category: 'khac',
    shortDesc: 'Thủ tục tạm ngừng kinh doanh hoặc đóng cửa giải thể doanh nghiệp đúng luật, an toàn, không để lại hậu quả nợ thuế pháp lý.',
    icon: 'UserX',
    fullContent: 'Khi hoạt động kinh doanh không như kỳ vọng, doanh nghiệp cần thực hiện thủ tục tạm ngừng hoặc đóng cửa giải thể để cắt giảm tối đa chi phí quản lý và thuế. MH CONSULTING hỗ trợ các bước chốt sổ bảo hiểm, quyết toán thuế giải thể triệt để, đúng thời hạn.',
    detailedPoints: [
      'Tư vấn lựa chọn tạm ngừng kinh doanh có thời hạn để tái cấu trúc hoặc chấm dứt hoạt động vĩnh viễn (giải thể).',
      'Đại diện thông báo tạm ngừng hoạt động lên Sở KH&ĐT.',
      'Thực hiện quyết toán thuế giải thể, quyết toán hóa đơn và nộp lại con dấu (nếu sử dụng con dấu do CA cấp).',
      'Đăng bố cáo giải thể doanh nghiệp trên cổng thông tin quốc gia.'
    ],
    benefits: [
      'Xử lý triệt để các hồ sơ khó, các doanh nghiệp bị mất sổ sách chứng từ gốc.',
      'Cam kết không để lại nợ đọng thuế, rủi ro phạt thuế cho người đại diện pháp luật trong tương lai.',
      'Thời gian giải quyết tối ưu theo quy định pháp lý.'
    ],
    processSteps: [
      'Kiểm tra hiện trạng nghĩa vụ thuế của doanh nghiệp.',
      'Soạn thảo hồ sơ tạm ngừng hoặc quyết định giải thể.',
      'Làm việc với cơ quan Thuế trực tiếp chốt nghĩa vụ thuế và nộp hồ sơ Sở KH&ĐT.',
      'Bàn giao thông báo giải thể thành công hoặc thông báo tạm ngừng được duyệt.'
    ]
  }
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
