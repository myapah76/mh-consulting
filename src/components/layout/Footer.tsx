import { Link } from 'react-router-dom';
import LucideIcon from '../common/LucideIcon';
import { footerLinks } from '../../data';
import { usePublicContactSettings, type ContactSettings } from '../../features/settings';

const DEFAULT_CONTACT_SETTINGS: ContactSettings = {
  address: '133/15 Đ. Ngô Đức Kế, Phường 12, Quận Bình Thạnh, TP. Hồ Chí Minh',
  primaryPhone: '0903.024.116',
  primaryPhoneLabel: 'Ms. Thảo',
  secondaryPhone: '0938.835.633',
  secondaryPhoneLabel: 'Mr. Trí',
  email: 'info@mhconsulting.vn',
  workingHours: 'Thứ 2 - Thứ 7: 08:00 - 17:30',
  facebookUrl: null,
  zaloUrl: 'https://zalo.me/0903024116',
  youtubeUrl: null,
};

function toPhoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export default function Footer() {
  const { data } = usePublicContactSettings();
  const settings = data ?? DEFAULT_CONTACT_SETTINGS;

  return (
    <footer className="bg-[#202020] text-gray-300 font-sans border-t border-gray-800">
      {/* Upper Footer: Branding & Grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-6">
            <Link
              to="/"
              className="inline-flex h-20 w-64 items-center overflow-hidden"
            >
              <img
                src="/logo.jpg"
                alt="MH Consulting - Strategic, Trusted, Growth"
                className="w-full scale-100 object-contain"
              />
            </Link>

            <p className="text-xs font-bold text-gray-100 uppercase tracking-wide">
              MH CONSULTING
            </p>

            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <LucideIcon name="MapPin" className="text-[#d40000] shrink-0 mt-0.5" size={16} />
                <span className="min-w-0 break-words">Trụ sở chính: {settings.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <LucideIcon name="Phone" className="text-[#d40000] shrink-0 mt-0.5" size={16} />
                <div className="flex min-w-0 flex-col gap-1">
                  <a href={toPhoneHref(settings.primaryPhone)} className="break-words hover:text-[#d40000] transition-colors">
                    {settings.primaryPhone}{settings.primaryPhoneLabel ? ` (${settings.primaryPhoneLabel})` : ''}
                  </a>
                  {settings.secondaryPhone && (
                    <a href={toPhoneHref(settings.secondaryPhone)} className="break-words hover:text-[#d40000] transition-colors">
                      {settings.secondaryPhone}{settings.secondaryPhoneLabel ? ` (${settings.secondaryPhoneLabel})` : ''}
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <LucideIcon name="Mail" className="text-[#d40000] shrink-0" size={16} />
                <a href={`mailto:${settings.email}`} className="min-w-0 break-all hover:text-[#d40000] transition-colors">{settings.email}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <LucideIcon name="Clock" className="mt-0.5 shrink-0 text-[#d40000]" size={16} />
                <span className="min-w-0 break-words">{settings.workingHours}</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="h-8 w-8 bg-gray-800 hover:bg-[#d40000] text-white rounded-full flex items-center justify-center transition-colors" aria-label="Mở trang Facebook của MH Consulting">
                  <span className="font-bold text-xs">FB</span>
                </a>
              )}
              {settings.zaloUrl && (
                <a href={settings.zaloUrl} target="_blank" rel="noopener noreferrer" className="h-8 w-8 bg-gray-800 hover:bg-[#0068ff] text-white rounded-full flex items-center justify-center font-bold text-xs transition-colors" aria-label="Mở trang Zalo của MH Consulting">
                  ZL
                </a>
              )}
              {settings.youtubeUrl && (
                <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="h-8 w-8 bg-gray-800 hover:bg-[#d40000] text-white rounded-full flex items-center justify-center transition-colors" aria-label="Mở kênh YouTube của MH Consulting">
                  <span className="font-bold text-xs">YT</span>
                </a>
              )}
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
