"use client";

import Link from "next/link";
import Image from "next/image";
import { memo, useState } from "react";
import { Category } from "./types";

interface CategoryCardProps {
  category: Category;
  index: number;
  isActive?: boolean;
}

export const CategoryCard = memo(({ category, index, isActive = false }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/category/${category.slug}`}
      className={`
        group relative flex-shrink-0 w-[160px] h-[160px] md:w-[200px] md:h-[200px]
        transition-all duration-500 ease-out
        ${isHovered ? "scale-105 z-10" : "scale-100"}
      `}
      style={{ animationDelay: `${index * 50}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl p-4 md:p-5 h-full
          flex flex-col items-center justify-center
          bg-gradient-to-br ${category.gradient}
          border-2 transition-all duration-300
          ${isHovered 
            ? "border-blue-500 shadow-2xl shadow-blue-500/20 bg-white" 
            : "border-transparent shadow-lg shadow-gray-200/50 bg-white/80 backdrop-blur-sm"
          }
          ${isActive ? "ring-2 ring-blue-500 ring-offset-2" : ""}
        `}
      >
        {/* Background Image */}
        {category.image && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Glow Effect */}
        <div className={`
          absolute inset-0 rounded-2xl transition-opacity duration-500
          bg-gradient-to-br ${category.gradient}
          ${isHovered ? "opacity-30" : "opacity-0"}
        `} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Icon */}
          <div className={`
            relative mb-2 p-3 md:p-4 rounded-xl
            bg-gradient-to-br ${category.gradient}
            transition-all duration-300
            ${isHovered ? "scale-110 -translate-y-1" : "scale-100"}
          `}>
            <div className={`
              text-gray-700 transition-colors duration-300
              ${isHovered ? "text-blue-600" : ""}
            `}>
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                {category.icon}
              </div>
            </div>
            
            {/* Shine */}
            <div className={`absolute inset-0 rounded-xl overflow-hidden ${isHovered ? "" : "opacity-0"}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shine" />
            </div>
          </div>

          {/* Name */}
          <h3 className={`
            font-semibold text-sm md:text-base mb-1
            transition-colors duration-300
            ${isHovered ? "text-blue-600" : "text-gray-800"}
          `}>
            {category.name}
          </h3>

          {/* Count */}
          <p className="text-xs text-gray-500 font-medium">
            {category.productCount.toLocaleString("vi-VN")}+ sản phẩm
          </p>

          {/* Arrow */}
          <div className={`
            mt-2 transition-all duration-300
            ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
          `}>
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* HOT Badge */}
        {category.productCount > 200 && (
          <div className={`
            absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold
            bg-gradient-to-r from-orange-500 to-red-500 text-white
            transition-all duration-300
            ${isHovered ? "scale-110" : "scale-100"}
          `}>
            HOT
          </div>
        )}
      </div>
    </Link>
  );
});

CategoryCard.displayName = "CategoryCard";
