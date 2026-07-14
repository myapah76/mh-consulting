import React, { useState } from 'react';
import LucideIcon from './LucideIcon';

interface ConsultationFormProps {
  layout?: 'inline' | 'full';
  buttonText?: string;
  onSuccess?: () => void;
}

export default function ConsultationForm({ 
  layout = 'inline', 
  buttonText = 'Yêu cầu tư vấn',
  onSuccess 
}: ConsultationFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!phone.trim()) {
      setError('Vui lòng nhập số điện thoại.');
      return;
    }
    if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(phone.trim())) {
      setError('Số điện thoại không hợp lệ (VD: 0912345678).');
      return;
    }

    setSuccess(true);
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
    
    if (onSuccess) {
      onSuccess();
    }
  };

  if (success) {
    return (
      <div className="bg-white/95 text-gray-900 border border-green-200 p-6 rounded-xl shadow-lg text-center animate-in fade-in duration-300">
        <div className="h-12 w-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-200">
          <LucideIcon name="Check" size={24} />
        </div>
        <h4 className="font-bold text-lg text-gray-900">Gửi Yêu Cầu Thành Công!</h4>
        <p className="text-sm text-gray-600 mt-1 max-w-xs mx-auto">
          Chuyên viên MH CONSULTING sẽ liên hệ trực tiếp hỗ trợ bạn trong vòng 15 phút.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 px-4 py-1.5 bg-[#d40000] hover:bg-gray-900 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={layout === 'inline' ? 'space-y-3' : 'space-y-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-xl'}>
      {layout === 'inline' ? (
        // Inline layout for Hero
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Họ và Tên *"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-12 pl-4 pr-4 bg-white text-gray-900 placeholder-gray-400 rounded-lg border border-gray-200 focus:outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/10 transition-all text-sm font-medium"
            />
          </div>
          <div className="relative flex-1">
            <input
              type="tel"
              placeholder="Số Điện Thoại *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-12 pl-4 pr-4 bg-white text-gray-900 placeholder-gray-400 rounded-lg border border-gray-200 focus:outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/10 transition-all text-sm font-medium"
            />
          </div>
          <button
            type="submit"
            className="h-12 px-6 bg-[#d40000] hover:bg-gray-900 text-white font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap shadow-md shadow-[#d40000]/10 shrink-0 cursor-pointer"
          >
            <LucideIcon name="MessageCircle" size={16} />
            {buttonText}
          </button>
        </div>
      ) : (
        // Full form layout for Contact Page
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Họ và Tên <span className="text-[#d40000]">*</span></label>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/20 transition-all text-sm"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Số Điện Thoại <span className="text-[#d40000]">*</span></label>
              <input
                type="tel"
                placeholder="0912345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/20 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Địa Chỉ Email</label>
              <input
                type="email"
                placeholder="info@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/20 transition-all text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Lời Nhắn / Yêu Cầu Chi Tiết</label>
            <textarea
              rows={4}
              placeholder="Tôi muốn đăng ký làm sổ sách kế toán trọn gói..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-[#d40000] focus:ring-2 focus:ring-[#d40000]/20 transition-all text-sm resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#d40000] hover:bg-gray-900 text-white font-bold rounded-lg tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#d40000]/10 cursor-pointer"
          >
            <LucideIcon name="MessageCircle" size={16} />
            {buttonText}
          </button>
        </div>
      )}

      {error && (
        <p className="text-[#d40000] text-xs font-semibold animate-shake mt-2 flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}
    </form>
  );
}
