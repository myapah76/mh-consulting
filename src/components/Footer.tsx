import { Link } from 'react-router-dom';
import LucideIcon from './LucideIcon';
import { footerLinks } from '../data';

export default function Footer() {
  return (
    <footer className="bg-[#202020] text-gray-300 font-sans border-t border-gray-800">
      {/* Upper Footer: Branding & Grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center">
              <img
                src="/logo.jpg"
                alt="MH Consulting - Strategic, Trusted, Growth"
                className="h-35 w-auto object-contain"
              />
            </Link>

            <p className="text-xs font-bold text-gray-100 uppercase tracking-wide">
              MH CONSULTING
            </p>

            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <LucideIcon name="MapPin" className="text-[#d40000] shrink-0 mt-0.5" size={16} />
                <span>Trụ sở chính: 133/15 Đ. Ngô Đức Kế, Phường 12, Quận Bình Thạnh, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-start gap-2.5">
                <LucideIcon name="Phone" className="text-[#d40000] shrink-0 mt-0.5" size={16} />
                <div className="flex flex-col gap-1">
                  <a href="tel:0903024116" className="hover:text-[#d40000] transition-colors">0903.024.116 (Ms. Thảo)</a>
                  <a href="tel:0938835633" className="hover:text-[#d40000] transition-colors">0938.835.633 (Mr. Trí)</a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <LucideIcon name="Mail" className="text-[#d40000] shrink-0" size={16} />
                <a href="mailto:info@mhconsulting.vn" className="hover:text-[#d40000] transition-colors">info@mhconsulting.vn</a>
              </li>
              <li className="flex items-center gap-2.5">
                <LucideIcon name="Clock" className="text-[#d40000] shrink-0" size={16} />
                <span>Thứ 2 - Thứ 7: 08:00 - 17:30</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="#" className="h-8 w-8 bg-gray-800 hover:bg-[#d40000] text-white rounded-full flex items-center justify-center transition-colors" aria-label="Facebook">
                <span className="font-bold text-xs">FB</span>
              </a>
              <a href="https://zalo.me/0903024116" target="_blank" rel="noopener noreferrer" className="h-8 w-8 bg-gray-800 hover:bg-[#0068ff] text-white rounded-full flex items-center justify-center font-bold text-xs transition-colors" aria-label="Zalo">
                ZL
              </a>
              <a href="#" className="h-8 w-8 bg-gray-800 hover:bg-[#d40000] text-white rounded-full flex items-center justify-center transition-colors" aria-label="Youtube">
                <span className="font-bold text-xs">YT</span>
              </a>
            </div>
          </div>

          {/* Column 2: Service 1 */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-5 pb-2 border-b border-gray-800 relative">
              {footerLinks.column2.title}
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#d40000]"></span>
            </h4>
            <ul className="space-y-3.5 text-sm text-gray-400">
              {footerLinks.column2.links.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                    <span className="text-[#d40000]">▪</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service 2 */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-5 pb-2 border-b border-gray-800 relative">
              {footerLinks.column3.title}
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#d40000]"></span>
            </h4>
            <ul className="space-y-3.5 text-sm text-gray-400">
              {footerLinks.column3.links.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                    <span className="text-[#d40000]">▪</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: News Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-5 pb-2 border-b border-gray-800 relative">
              {footerLinks.column4.title}
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#d40000]"></span>
            </h4>
            <ul className="space-y-3.5 text-sm text-gray-400">
              {footerLinks.column4.links.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="hover:text-white hover:underline transition-colors flex items-start gap-1.5 line-clamp-2">
                    <span className="text-[#d40000] mt-1 shrink-0">▪</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="bg-[#121212] py-6 text-xs text-gray-500 font-medium border-t border-gray-900">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left space-y-1">
            <p>Mã số doanh nghiệp: 0316859341 do Sở Kế Hoạch & Đầu Tư TP.HCM cấp ngày 12/05/2021.</p>
            <p>© 2026 MH CONSULTING. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Chính sách bảo mật</a>
            <span className="text-gray-800">|</span>
            <a href="#" className="hover:text-gray-300 transition-colors">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
