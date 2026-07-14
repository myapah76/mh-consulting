import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import LucideIcon from './LucideIcon';
import { navigationItems } from '../data';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export default function Header({ onOpenConsultation }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-28 flex items-center justify-between">

        {/* Left: Logo */}
        <Link to="/" className="flex items-center group h-full">
          <img
            src="public/logo.jpg"
            alt="MH CONSULTING - STRATEGIC - TRUSTED - GROWTH"
            className="h-28 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-bold tracking-wide transition-colors duration-200 py-2 relative group ${isActive
                  ? 'text-[#d40000]'
                  : 'text-gray-700 hover:text-[#d40000]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {/* Subtle slide-in underline */}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#d40000] transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right: CTA & Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenConsultation}
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-[#d40000] hover:bg-gray-900 text-white font-bold text-xs tracking-wider uppercase rounded-full transition-all duration-300 shadow-md shadow-[#d40000]/10 cursor-pointer"
          >
            <LucideIcon name="MessageCircle" size={14} />
            Đăng ký tư vấn
          </button>

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden text-gray-700 hover:text-[#d40000] p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            <LucideIcon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      <div
        className={`md:hidden absolute top-28 left-0 w-full bg-white border-b border-gray-200 shadow-xl transition-all duration-300 ease-in-out transform origin-top ${isMobileMenuOpen
          ? 'opacity-100 scale-y-100 pointer-events-auto'
          : 'opacity-0 scale-y-0 pointer-events-none'
          }`}
      >
        <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-7rem)] overflow-y-auto">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-base font-bold tracking-wide transition-colors ${isActive
                  ? 'bg-[#d40000]/5 text-[#d40000]'
                  : 'text-gray-800 hover:bg-gray-50 hover:text-[#d40000]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-4 border-t border-gray-100 px-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 bg-[#d40000] hover:bg-gray-900 text-white font-bold rounded-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <LucideIcon name="MessageCircle" size={16} />
              Đăng Ký Tư Vấn
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
