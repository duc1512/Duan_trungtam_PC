"use client";

import Link from "next/link";
import { useState } from "react";

// Category data with icons and gradient backgrounds
const categories = [
  {
    id: "laptop-gaming",
    name: "Laptop Gaming",
    shortName: "Gaming",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
        <path d="M6 12h2v2H6zm4 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2z" opacity="0.6"/>
      </svg>
    ),
    gradient: "from-purple-500 via-pink-500 to-red-500",
    bgImage: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80",
  },
  {
    id: "laptop-van-phong",
    name: "Laptop Văn Phòng",
    shortName: "Văn Phòng",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
        <path d="M7 14h10v-2H7v2zm0-3h10V9H7v2z" opacity="0.6"/>
      </svg>
    ),
    gradient: "from-blue-400 via-blue-500 to-cyan-500",
    bgImage: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
  },
  {
    id: "pc-gaming",
    name: "PC Gaming",
    shortName: "PC Gaming",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M20 8h-2V6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8 6h8v2H8V6z"/>
        <circle cx="12" cy="13" r="2"/>
        <path d="M7 17h10v-1H7v1z" opacity="0.5"/>
      </svg>
    ),
    gradient: "from-green-400 via-emerald-500 to-teal-500",
    bgImage: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80",
  },
  {
    id: "linh-kien-pc",
    name: "Linh kiện PC",
    shortName: "Linh kiện",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M15.9 5c.17 0 .32.09.41.23l.07.15 1.62 4.72h3.93c.26 0 .5.13.64.34l.06.11c.11.23.1.52-.06.74l-.07.1-7.12 8.48c-.2.25-.55.35-.85.24l-.1-.05-.09-.06-3.89-3.88-2.65 2.65-.07.06c-.27.2-.63.2-.9 0l-.07-.06-1.45-1.44-.06-.08c-.2-.26-.18-.62.04-.86l.07-.07 2.66-2.65L5 8.76l-.05-.1c-.1-.25-.04-.54.15-.74l.08-.07L6.6 6.46l.1-.06c.2-.1.43-.1.64-.02l.1.05 2.55 1.55L11.34 5h4.56zm-1.48 2h-2.84l-1.8 3.46L8.5 8.67l-2.28 2.29 2.16 2.16 3.31-3.3.9 1.75-1.3 1.3 6.12 6.13L19.1 11h-3.08l-1.6-4z"/>
      </svg>
    ),
    gradient: "from-orange-400 via-red-500 to-pink-500",
    bgImage: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80",
  },
  {
    id: "man-hinh",
    name: "Màn hình",
    shortName: "Màn hình",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v2h12v-2l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"/>
        <path d="M6 7h12v2H6zm0 3h12v2H6z" opacity="0.5"/>
      </svg>
    ),
    gradient: "from-indigo-400 via-purple-500 to-pink-500",
    bgImage: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80",
  },
  {
    id: "ban-phim",
    name: "Bàn phím",
    shortName: "Bàn phím",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M20 5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 11H7v-2h4v2zm6 0h-4v-2h4v2zm0-3H7v-2h10v2zm0-3H7V8h10v2z"/>
        <circle cx="8" cy="9" r="1"/>
        <circle cx="11" cy="9" r="1"/>
        <circle cx="14" cy="9" r="1"/>
        <circle cx="17" cy="9" r="1"/>
      </svg>
    ),
    gradient: "from-rose-400 via-pink-500 to-purple-500",
    bgImage: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
  },
  {
    id: "chuot",
    name: "Chuột",
    shortName: "Chuột",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M13 3c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V3zm5.15 3.85c-.53-.53-1.3-.69-1.98-.49-.68.2-1.21.73-1.41 1.41-.2.68-.04 1.45.49 1.98l4.24 4.24c1.17 1.17 3.07 1.17 4.24 0 1.17-1.17 1.17-3.07 0-4.24l-4.24-4.24c-.53-.53-1.3-.69-1.98-.49-.68.2-1.21.73-1.41 1.41-.2.68-.04 1.45.49 1.98l4.24 4.24c1.17 1.17 3.07 1.17 4.24 0 1.17-1.17 1.17-3.07 0-4.24l-4.24-4.24z"/>
        <path d="M12 13c-3.31 0-6 2.69-6 6v3h12v-3c0-3.31-2.69-6-6-6z" opacity="0.7"/>
      </svg>
    ),
    gradient: "from-cyan-400 via-blue-500 to-indigo-500",
    bgImage: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80",
  },
  {
    id: "tai-nghe",
    name: "Tai nghe",
    shortName: "Tai nghe",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/>
        <path d="M12 14c1.66 0 3-1.34 3-3V9c0-1.66-1.34-3-3-3s-3 1.34-3 3v2c0 1.66 1.34 3 3 3z" opacity="0.6"/>
      </svg>
    ),
    gradient: "from-amber-400 via-orange-500 to-red-500",
    bgImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  },
];

function CategoryCard({ category }: { category: typeof categories[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/category/${category.id}`}
      className="group relative flex flex-col items-center justify-center p-4 h-36 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient Layer */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90 transition-opacity duration-500`}
      />

      {/* Background Image Layer - Shows on hover */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out ${
          isHovered ? "opacity-40 scale-110" : "opacity-0 scale-100"
        }`}
        style={{ backgroundImage: `url(${category.bgImage})` }}
      />

      {/* Dark Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${
          isHovered ? "opacity-30" : "opacity-0"
        }`}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-2 transition-transform duration-500 group-hover:scale-110">
        {/* Icon Container */}
        <div
          className={`w-12 h-12 text-white transition-all duration-500 ${
            isHovered ? "scale-125 drop-shadow-lg" : ""
          }`}
        >
          {category.icon}
        </div>

        {/* Text */}
        <span className="text-white font-bold text-center text-sm drop-shadow-md">
          {isHovered ? category.name : category.shortName}
        </span>
      </div>

      {/* Shine Effect on Hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000 ${
          isHovered ? "translate-x-full" : ""
        }`}
      />

      {/* Border Glow */}
      <div
        className={`absolute inset-0 rounded-2xl border-2 border-white/30 transition-all duration-500 ${
          isHovered ? "border-white/60 shadow-[0_0_30px_rgba(255,255,255,0.3)]" : ""
        }`}
      />
    </Link>
  );
}

export default function PopularCategories() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Danh mục phổ biến</h2>
        <Link
          href="/products"
          className="text-sm text-[#e30019] font-semibold hover:text-red-700 transition-colors flex items-center gap-1 group"
        >
          Xem tất cả
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}