import React, { useState, useEffect } from 'react';
import LucideIcon from './LucideIcon';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      tempErrors.fullName = 'Họ và tên không được để trống';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Số điện thoại không được để trống';
    } else if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(formData.phone.trim())) {
      tempErrors.phone = 'Số điện thoại không đúng định dạng (VD: 0912345678)';
    }
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email không đúng định dạng';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      // Clean form on success
      setFormData({ fullName: '', phone: '', email: '', message: '' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header decoration */}
        <div className="bg-[#d40000] text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            aria-label="Đóng"
          >
            <LucideIcon name="X" size={18} />
          </button>
          <h3 className="text-xl font-bold font-sans">Đăng Ký Tư Vấn Miễn Phí</h3>
          <p className="text-white/80 text-sm mt-1">MH CONSULTING luôn sẵn sàng đồng hành cùng sự phát triển của bạn</p>
        </div>

        <div className="p-6 md:p-8">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                <LucideIcon name="Check" size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Đăng Ký Thành Công!</h4>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                Cảm ơn bạn đã gửi yêu cầu. Đội ngũ chuyên viên thuế và kế toán MH CONSULTING sẽ liên hệ lại trong vòng 15-30 phút làm việc.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Đóng cửa sổ
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Họ và Tên <span className="text-[#d40000]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-lg border text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName 
                      ? 'border-[#d40000] focus:ring-[#d40000]/20' 
                      : 'border-gray-300 focus:border-[#d40000] focus:ring-[#d40000]/20'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[#d40000] text-xs mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Số Điện Thoại <span className="text-[#d40000]">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="0912345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-lg border text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                    errors.phone 
                      ? 'border-[#d40000] focus:ring-[#d40000]/20' 
                      : 'border-gray-300 focus:border-[#d40000] focus:ring-[#d40000]/20'
                  }`}
                />
                {errors.phone && (
                  <p className="text-[#d40000] text-xs mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Địa Chỉ Email (Không bắt buộc)
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-lg border text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                    errors.email 
                      ? 'border-[#d40000] focus:ring-[#d40000]/20' 
                      : 'border-gray-300 focus:border-[#d40000] focus:ring-[#d40000]/20'
                  }`}
                />
                {errors.email && (
                  <p className="text-[#d40000] text-xs mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Nội Dung Cần Tư Vấn (Không bắt buộc)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ví dụ: Tôi muốn thành lập công ty TNHH 2 thành viên ngành thương mại..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/20 transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#d40000] hover:bg-[#b80000] text-white font-bold rounded-lg transition-colors shadow-lg shadow-[#d40000]/10 flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  <LucideIcon name="MessageCircle" size={18} />
                  Gửi Thông Tin Yêu Cầu
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  Thông tin của bạn được bảo mật tuyệt đối theo Quy định Bảo mật MH CONSULTING.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
