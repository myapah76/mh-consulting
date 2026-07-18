import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import LucideIcon from '../../../components/common/LucideIcon';
import { ConsultationForm } from '../../consultations';
import ServiceRequestState from '../components/ServiceRequestState';
import {
  usePublicServiceBySlug,
  usePublicServices,
} from '../hooks/usePublicServices';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const {
    data: service,
    error,
    isPending,
    isError,
    refetch,
  } = usePublicServiceBySlug(slug);
  const { data: relatedServicesResponse } = usePublicServices(
    {
      category: service?.category,
      size: 5,
    },
    Boolean(service?.category),
  );
  const relatedServices = (relatedServicesResponse?.content ?? [])
    .filter((relatedService) => relatedService.id !== service?.id)
    .slice(0, 4);

  const notFound = !slug || (
    axios.isAxiosError(error) && error.response?.status === 404
  );

  if (!slug || isPending || isError || !service) {
    return (
      <div className="font-sans text-[#222222] bg-white">
        <section className="bg-gradient-to-r from-gray-900 to-[#202020] py-12 text-white md:py-16">
          <div className="max-w-[1200px] mx-auto px-4">
            <Link to="/dich-vu" className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white">
              Dịch vụ
            </Link>
            <h1 className="mt-3 text-2xl font-black uppercase tracking-tight sm:text-3xl">
              Chi tiết dịch vụ
            </h1>
          </div>
        </section>
        <section className="max-w-[1200px] mx-auto px-4 py-12 sm:px-6 md:py-16">
          <ServiceRequestState
            title={isPending ? 'Đang tải dịch vụ' : notFound ? 'Không tìm thấy dịch vụ' : 'Không thể tải dịch vụ'}
            message={isPending
              ? 'Vui lòng chờ trong giây lát.'
              : notFound
                ? 'Dịch vụ bạn đang tìm không tồn tại hoặc không còn được cung cấp.'
                : 'Kết nối đến hệ thống đang gặp sự cố. Vui lòng thử lại.'}
            loading={isPending}
            onRetry={!isPending && !notFound ? () => void refetch() : undefined}
          />
          {!isPending && notFound && (
            <div className="mt-6 text-center">
              <Link to="/dich-vu" className="text-xs font-black uppercase tracking-wider text-[#d40000] hover:text-gray-900">
                Quay lại danh sách dịch vụ
              </Link>
            </div>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="font-sans text-[#222222] bg-white">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-gray-900 to-[#202020] text-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#d40000] font-bold uppercase tracking-wider mb-3">
            <Link to="/" className="text-gray-400 hover:text-white">Trang chủ</Link>
            <span className="text-gray-600">/</span>
            <Link to="/dich-vu" className="text-gray-400 hover:text-white">Dịch vụ</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">{service.title}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight uppercase">
            {service.title}
          </h1>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="py-12 md:py-16 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Main Details (8 cols on desktop) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Short Intro Card */}
            <div className="bg-[#eef8ff] p-6 rounded-2xl border border-blue-50 flex gap-4 items-start">
              <div className="h-10 w-10 bg-[#d40000] text-white rounded-full flex items-center justify-center shrink-0">
                <LucideIcon name={service.icon} size={20} />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-semibold">
                {service.shortDesc}
              </p>
            </div>

            {/* Full narrative content */}
            {service.fullContent && (
              <div className="space-y-4">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight pb-2 border-b border-gray-100">
                  Tổng Quan Về Gói Dịch Vụ
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  {service.fullContent}
                </p>
              </div>
            )}

            {/* Detailed points */}
            {service.detailedPoints && service.detailedPoints.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight pb-2 border-b border-gray-100">
                  Phạm Vi Công Việc Chúng Tôi Thực Hiện
                </h2>
                <ul className="grid grid-cols-1 gap-3">
                  {service.detailedPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-gray-50 p-3.5 rounded-lg border border-gray-100 text-xs sm:text-sm text-gray-700 font-medium">
                      <div className="h-5 w-5 bg-green-500 text-white rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <LucideIcon name="Check" size={12} />
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight pb-2 border-b border-gray-100">
                  Lợi Ích Khách Hàng Nhận Được
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex gap-3 items-start bg-blue-50/30 p-4 rounded-xl border border-blue-50/50 text-xs sm:text-sm text-gray-700 font-medium">
                      <span className="text-[#d40000] text-xl shrink-0">▪</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Process Steps */}
            {service.processSteps && service.processSteps.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight pb-2 border-b border-gray-100">
                  Quy Trình Giao Nhận & Thực Hiện
                </h2>
                <div className="relative border-l border-gray-200 pl-6 ml-3 space-y-6">
                  {service.processSteps.map((step, idx) => (
                    <div key={idx} className="relative">
                      {/* Step node */}
                      <div className="absolute left-[-33px] top-0 h-6 w-6 bg-[#d40000] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-md">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-700 pt-0.5 pl-1 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right: Sidebar & Registration Form (4 cols on desktop) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Inline Consultation Form Widget */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 shadow-md space-y-4">
              <h3 className="font-extrabold text-gray-900 text-base border-b border-gray-200 pb-3">
                Đăng Ký Gói Dịch Vụ Này
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Nhập thông tin liên lạc của bạn bên dưới. Chuyên viên MH CONSULTING sẽ chuẩn bị sẵn phương án và liên hệ tư vấn trực tiếp ngay.
              </p>
              <ConsultationForm
                layout="full"
                buttonText="Gửi yêu cầu gói này"
                currentService={service}
                stackServiceFields
              />
            </div>

            {/* Related Services List */}
            {relatedServices.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-md space-y-4">
                <h3 className="font-extrabold text-gray-900 text-base border-b border-gray-200 pb-3">
                  Dịch Vụ Cùng Chuyên Mục
                </h3>
                <ul className="space-y-3">
                  {relatedServices.map((rs) => (
                    <li key={rs.id}>
                      <Link
                        to={`/dich-vu/${rs.slug}`}
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 text-xs sm:text-sm font-bold text-gray-700 hover:text-[#d40000] transition-all group"
                      >
                        <div className="h-6 w-6 bg-gray-100 text-[#d40000] rounded flex items-center justify-center group-hover:bg-[#d40000] group-hover:text-white transition-all shrink-0">
                          <LucideIcon name={rs.icon} size={14} />
                        </div>
                        <span className="line-clamp-2 leading-tight">{rs.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Slogan card */}
            <div className="bg-[#d40000] text-white p-6 rounded-2xl text-center space-y-4 shadow-xl shadow-[#d40000]/10">
              <span className="font-bold text-[10px] tracking-wider uppercase block bg-white/20 px-3 py-1 rounded-full w-fit mx-auto">
                MH CONSULTING CAM KẾT
              </span>
              <p className="text-sm font-semibold italic leading-relaxed">
                "Chúng tôi chịu trách nhiệm pháp lý trọn đời đối với số liệu kế toán và tờ khai thuế của khách hàng."
              </p>
              <div className="h-px bg-white/20 my-3" />
              <p className="text-xs font-bold uppercase tracking-wide">
                Hỗ trợ 24/7: 0903.024.116
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
