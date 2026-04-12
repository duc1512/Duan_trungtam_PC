'use client';

import Link from 'next/link';
import Image from 'next/image';
// Icons as inline SVG to avoid extra dependency
const TrendingUp = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);
const Tag = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);
const Mail = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const Loader2 = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={`${className} animate-spin`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);
const CheckCircle = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
import { ArticleSummary, Category, Tag as TagType } from '../types';
import { ArticleCard } from './ArticleCard';
import { useNewsletter } from '../hooks/useNewsletter';

interface SidebarProps {
  trendingArticles: ArticleSummary[];
  popularTags: TagType[];
  categories: Category[];
  isLoading?: boolean;
}

export function Sidebar({
  trendingArticles,
  popularTags,
  categories,
  isLoading
}: SidebarProps) {
  const { email, setEmail, isSubmitting, isSuccess, error, subscribe } = useNewsletter();
  
  if (isLoading) {
    return (
      <aside className="space-y-8">
        <div className="h-[300px] bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-[200px] bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-[250px] bg-gray-200 rounded-xl animate-pulse" />
      </aside>
    );
  }
  
  return (
    <aside className="space-y-8">
      {/* Newsletter Subscription */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-5 h-5" />
          <h3 className="font-bold text-lg">Đăng ký Newsletter</h3>
        </div>
        <p className="text-blue-100 text-sm mb-4">
          Nhận tin tức công nghệ mới nhất và ưu đãi độc quyền.
        </p>
        
        {isSuccess ? (
          <div className="flex items-center gap-2 text-green-300 bg-white/10 rounded-lg p-3">
            <CheckCircle className="w-5 h-5" />
            <span>Đăng ký thành công!</span>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              subscribe();
            }}
            className="space-y-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            {error && (
              <p className="text-red-200 text-sm">{error}</p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Đăng ký ngay
            </button>
          </form>
        )}
      </div>
      
      {/* Trending Articles */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-red-500" />
          <h3 className="font-bold text-lg text-gray-900">Xu hướng</h3>
        </div>
        <div className="space-y-1">
          {trendingArticles.slice(0, 5).map((article, index) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="group flex items-start gap-3 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
            >
              <span className={`
                text-lg font-bold w-6 text-center
                ${index < 3 ? 'text-red-500' : 'text-gray-400'}
              `}>
                {index + 1}
              </span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h4>
                <span className="text-xs text-gray-500">
                  {article.viewCount.toLocaleString('vi-VN')} lượt xem
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Categories */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-lg text-gray-900 mb-4">Danh mục</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/news?category=${category.slug}`}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-md"
              style={{
                backgroundColor: `${category.color}15`,
                color: category.color
              }}
            >
              <span>{category.name}</span>
              <span className="text-xs opacity-70">({category.articleCount})</span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Popular Tags */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-lg text-gray-900">Tags phổ biến</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag.id}
              href={`/news?tag=${tag.slug}`}
              className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
