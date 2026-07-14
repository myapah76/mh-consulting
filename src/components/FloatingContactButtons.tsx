import { useState, useEffect } from 'react';
import LucideIcon from './LucideIcon';

export default function FloatingContactButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Floating Left: Zalo & Phone */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
        {/* Phone Button */}
        <a
          href="tel:0903024116"
          className="flex items-center group bg-green-600 text-white rounded-full p-3 md:pr-5 shadow-lg hover:bg-green-700 transition-all duration-300 w-fit"
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing ring */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <div className="relative bg-green-600 rounded-full p-1">
              <LucideIcon name="Phone" size={20} className="text-white animate-bounce" />
            </div>
          </div>
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs md:max-w-xs md:ml-2 text-sm font-bold transition-all duration-300">
            0903.024.116
          </span>
        </a>

        {/* Zalo Button */}
        <a
          href="https://zalo.me/0903024116"
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noopener noreferrer"
          className="flex items-center group bg-[#0068ff] text-white rounded-full p-3 md:pr-5 shadow-lg hover:bg-[#0051c7] transition-all duration-300 w-fit"
        >
          <div className="relative bg-white text-[#0068ff] rounded-full p-1.5 font-sans font-black text-xs h-7 w-7 flex items-center justify-center">
            Zalo
          </div>
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs md:max-w-xs md:ml-2 text-sm font-bold transition-all duration-300">
            Trò chuyện Zalo
          </span>
        </a>
      </div>

      {/* Floating Right: Back to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 bg-[#d40000] hover:bg-gray-900 text-white p-3 rounded-full shadow-xl cursor-pointer transition-all duration-300 transform ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
        }`}
        aria-label="Lên đầu trang"
      >
        <LucideIcon name="ArrowUp" size={22} />
      </button>
    </>
  );
}
