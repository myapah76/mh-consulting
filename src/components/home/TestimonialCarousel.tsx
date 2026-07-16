import { useState, useEffect, useRef } from 'react';
import LucideIcon from '../common/LucideIcon';
import { testimonialsData } from '../../data';

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const length = testimonialsData.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000); // 5 seconds autoplay
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  return (
    <div 
      className="relative max-w-4xl mx-auto px-4 md:px-12 py-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative quotes background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-gray-100 -z-10 select-none">
        <LucideIcon name="Quote" size={160} className="opacity-40 text-gray-100" />
      </div>

      {/* Main Review Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 md:p-12 text-center relative overflow-hidden">
        
        {/* Quote graphic */}
        <div className="inline-flex items-center justify-center h-12 w-12 bg-[#d40000]/10 text-[#d40000] rounded-full mb-6">
          <LucideIcon name="Quote" size={22} />
        </div>

        {/* Comment block with simple fade keyframe or class-based transitions */}
        <div className="min-h-[140px] md:min-h-[120px] flex items-center justify-center transition-all duration-500">
          <p className="text-gray-700 text-base md:text-lg italic font-medium leading-relaxed">
            "{testimonialsData[currentIndex].comment}"
          </p>
        </div>

        {/* Profile Details */}
        <div className="mt-8 flex flex-col items-center">
          {testimonialsData[currentIndex].avatar && (
            <img 
              src={testimonialsData[currentIndex].avatar} 
              alt={testimonialsData[currentIndex].name}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-cover border-2 border-[#d40000] mb-3 shadow-md"
            />
          )}
          <h4 className="font-extrabold text-gray-900 text-base tracking-wide uppercase">
            {testimonialsData[currentIndex].name}
          </h4>
          <p className="text-xs font-bold text-[#d40000] uppercase tracking-wider mt-0.5">
            {testimonialsData[currentIndex].role}
          </p>
          <p className="text-xs text-gray-500 mt-1 font-semibold">
            {testimonialsData[currentIndex].company}
          </p>
        </div>
      </div>

      {/* Arrow Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 bg-white hover:bg-[#d40000] text-[#d40000] hover:text-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center transition-all duration-300 z-10 cursor-pointer"
        aria-label="Đánh giá trước"
      >
        <LucideIcon name="ChevronLeft" size={20} />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 bg-white hover:bg-[#d40000] text-[#d40000] hover:text-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center transition-all duration-300 z-10 cursor-pointer"
        aria-label="Đánh giá tiếp theo"
      >
        <LucideIcon name="ChevronRight" size={20} />
      </button>

      {/* Indicator Bullet Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {testimonialsData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-6 bg-[#d40000]' 
                : 'w-2.5 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
