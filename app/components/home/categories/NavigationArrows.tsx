"use client";

interface NavigationArrowsProps {
  onPrev: () => void;
  onNext: () => void;
}

export const NavigationArrows = ({ onPrev, onNext }: NavigationArrowsProps) => (
  <>
    {/* Prev */}
    <button
      onClick={onPrev}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-lg border border-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:text-red-600 hover:shadow-xl transition-all"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
      </svg>
    </button>

    {/* Next */}
    <button
      onClick={onNext}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-lg border border-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:text-red-600 hover:shadow-xl transition-all"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
      </svg>
    </button>
  </>
);
