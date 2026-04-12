'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArticleSummary } from '../types';

interface ArticleCardProps {
  article: ArticleSummary;
  variant?: 'default' | 'featured' | 'compact' | 'horizontal';
  showCategory?: boolean;
  showExcerpt?: boolean;
}

export function ArticleCard({
  article,
  variant = 'default',
  showCategory = true,
  showExcerpt = true
}: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  // Variant: Featured (Hero style)
  if (variant === 'featured') {
    return (
      <Link
        href={`/news/${article.slug}`}
        className="group block relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            src={article.featuredImage.url}
            alt={article.featuredImage.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Category Badge */}
          {showCategory && (
            <div
              className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: article.category.color }}
            >
              {article.category.name}
            </div>
          )}
          
          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-blue-200 transition-colors">
              {article.title}
            </h2>
            {showExcerpt && (
              <p className="text-gray-200 text-sm md:text-base mb-4 line-clamp-2">
                {article.excerpt}
              </p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
                <span>{article.author.name}</span>
              </div>
              <span>•</span>
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{article.readTime} phút đọc</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  // Variant: Horizontal
  if (variant === 'horizontal') {
    return (
      <Link
        href={`/news/${article.slug}`}
        className="group flex gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="relative w-32 h-24 md:w-40 md:h-28 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={article.featuredImage.url}
            alt={article.featuredImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="160px"
          />
        </div>
        <div className="flex-1 min-w-0">
          {showCategory && (
            <span
              className="inline-block px-2 py-0.5 rounded text-xs font-medium text-white mb-2"
              style={{ backgroundColor: article.category.color }}
            >
              {article.category.name}
            </span>
          )}
          <h3 className="font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{article.author.name}</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </Link>
    );
  }
  
  // Variant: Compact (Sidebar style)
  if (variant === 'compact') {
    return (
      <Link
        href={`/news/${article.slug}`}
        className="group flex items-start gap-3 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
      >
        <span className="text-2xl font-bold text-gray-300 group-hover:text-blue-500 transition-colors">
          {String(article.viewCount).padStart(2, '0')}
        </span>
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm">
            {article.title}
          </h4>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
      </Link>
    );
  }
  
  // Default: Vertical Card
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        <Image
          src={article.featuredImage.url}
          alt={article.featuredImage.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        {showCategory && (
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: article.category.color }}
          >
            {article.category.name}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        {showExcerpt && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="truncate max-w-[100px]">{article.author.name}</span>
          </div>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}
