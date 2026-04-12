'use client';

import Link from 'next/link';
import { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory?: string;
}

export function CategoryTabs({ categories, activeCategory }: CategoryTabsProps) {
  return (
    <div className="sticky top-16 z-40 bg-white border-b border-gray-200 -mx-4 px-4 py-3 mb-8">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        <Link
          href="/news"
          className={`
            px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
            ${!activeCategory 
              ? 'bg-gray-900 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
          `}
        >
          Tất cả
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/news?category=${category.slug}`}
            className={`
              px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
              ${activeCategory === category.slug
                ? 'text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
            style={
              activeCategory === category.slug
                ? { backgroundColor: category.color }
                : undefined
            }
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
