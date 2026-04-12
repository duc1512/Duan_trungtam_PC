'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import {
  useArticles,
  useFeaturedArticles,
  useTrendingArticles
} from '../../news/hooks';
import { NewsApi } from '../../news/services/api';
import {
  ArticleCard,
  HeroArticle,
  Sidebar,
  CategoryTabs,
  ArticleGridSkeleton,
  SidebarSkeleton
} from '../../news/components';
import { categories, tags } from '../../news/services/mockData';

function NewsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || undefined;
  const tag = searchParams.get('tag') || undefined;
  const search = searchParams.get('search') || undefined;
  
  const {
    articles,
    meta,
    isLoading,
    error,
    setPage,
    setSortBy
  } = useArticles({
    category,
    tag,
    search,
    limit: 9
  });
  
  const { articles: featuredArticles, isLoading: isFeaturedLoading } = useFeaturedArticles(3);
  const { articles: trendingArticles, isLoading: isTrendingLoading } = useTrendingArticles(5);
  
  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Thử lại
        </button>
      </div>
    );
  }
  
  const isInitialLoading = isLoading && articles.length === 0;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Tin Tức Công Nghệ
        </h1>
        <p className="text-gray-600">
          Cập nhật tin tức, đánh giá và xu hướng công nghệ mới nhất
        </p>
      </div>
      
      {/* Category Tabs */}
      <CategoryTabs categories={categories} activeCategory={category} />
      
      {/* Hero Section - Only show on first page without filters */}
      {!category && !tag && !search && (
        <HeroArticle
          articles={featuredArticles}
          isLoading={isFeaturedLoading}
        />
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Sort & Filter Info */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {category
                ? categories.find(c => c.slug === category)?.name || 'Danh mục'
                : tag
                  ? `#${tags.find(t => t.slug === tag)?.name || tag}`
                  : search
                    ? `Kết quả: "${search}"`
                    : 'Bài viết mới'}
            </h2>
            <select
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Mới nhất</option>
              <option value="popular">Phổ biến nhất</option>
              <option value="trending">Xu hướng</option>
            </select>
          </div>
          
          {/* Results Count */}
          {meta && (
            <p className="text-sm text-gray-500 mb-4">
              Hiển thị {articles.length} / {meta.totalItems} bài viết
            </p>
          )}
          
          {/* Articles Grid */}
          {isInitialLoading ? (
            <ArticleGridSkeleton count={9} />
          ) : articles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    showCategory={!category}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              {meta && meta.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <button
                    onClick={() => setPage(meta.currentPage - 1)}
                    disabled={!meta.hasPrevPage}
                    className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Trước
                  </button>
                  
                  {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        page === meta.currentPage
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setPage(meta.currentPage + 1)}
                    disabled={!meta.hasNextPage}
                    className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Sau
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy bài viết
              </h3>
              <p className="text-gray-500">
                Thử tìm kiếm với từ khóa khác hoặc xem tất cả bài viết
              </p>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {isTrendingLoading ? (
            <SidebarSkeleton />
          ) : (
            <Sidebar
              trendingArticles={trendingArticles}
              popularTags={tags.slice(0, 10)}
              categories={categories}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function NewsList() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
        <div className="h-[400px] bg-gray-200 rounded-2xl mb-12 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ArticleGridSkeleton count={9} />
          </div>
          <SidebarSkeleton />
        </div>
      </div>
    }>
      <NewsContent />
    </Suspense>
  );
}
