"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { categories } from "./data";
import { CategoryCard } from "./CategoryCard";
import { CategorySkeleton } from "./CategorySkeleton";
import { NavigationArrows } from "./NavigationArrows";

export default function PopularCategories() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, []);

  return (
    <section className="relative py-8 md:py-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/25">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Danh Mục Nổi Bật</h2>
              <p className="text-sm text-gray-500 hidden sm:block">Khám phá các sản phẩm công nghệ hàng đầu</p>
            </div>
          </div>
          
          <Link href="/danh-muc" className="group flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Xem tất cả
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Slider */}
        <div className="relative px-12 md:px-14">
          <NavigationArrows onPrev={() => scroll("left")} onNext={() => scroll("right")} />

          <div 
            ref={scrollRef}
            className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory py-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => <CategorySkeleton key={i} />)
            ) : (
              categories.map((category, index) => (
                <div key={category.id} className="snap-start" onClick={() => setActiveCategory(category.id)}>
                  <CategoryCard category={category} index={index} isActive={activeCategory === category.id} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {categories.slice(0, 5).map((cat) => (
            <div 
              key={cat.id}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeCategory === cat.id ? "w-6 bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @keyframes shine {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
        .animate-shine { animation: shine 0.6s ease-out; }
      `}</style>
    </section>
  );
}
