'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Article } from '../../../news/types';
import {
  ReadingProgress,
  ShareButtons,
  Sidebar,
  ArticleCard,
  SidebarSkeleton,
  ArticleContentSkeleton
} from '../../../news/components';
import {
  useRelatedArticles,
  useTrendingArticles
} from '../../../news/hooks';
import { categories, tags } from '../../../news/services/mockData';
import { Suspense } from 'react';

interface ArticleDetailProps {
  article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const { articles: relatedArticles, isLoading: isRelatedLoading } = useRelatedArticles(article.slug, 3);
  const { articles: trendingArticles, isLoading: isTrendingLoading } = useTrendingArticles(5);
  
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const updatedDate = article.updatedAt
    ? new Date(article.updatedAt).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;
  
  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage.url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: article.author.social?.twitter
    },
    publisher: {
      '@type': 'Organization',
      name: 'TechNews',
      logo: {
        '@type': 'ImageObject',
        url: 'https://example.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://example.com/news/${article.slug}`
    }
  };
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Reading Progress */}
      <ReadingProgress />
      
      <article className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/news" className="hover:text-blue-600">Tin tức</Link>
          <span>/</span>
          <Link
            href={`/news?category=${article.category.slug}`}
            className="hover:text-blue-600"
            style={{ color: article.category.color }}
          >
            {article.category.name}
          </Link>
          <span>/</span>
          <span className="text-gray-900 truncate max-w-[200px]">{article.title}</span>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm font-bold text-white mb-4"
              style={{ backgroundColor: article.category.color }}
            >
              {article.category.name}
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {article.title}
            </h1>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900">{article.author.name}</p>
                  <p className="text-sm text-gray-500">{article.author.role}</p>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-300 hidden sm:block" />
              <div className="text-sm text-gray-500">
                <p>{formattedDate}</p>
                {updatedDate && (
                  <p className="text-xs">Cập nhật: {updatedDate}</p>
                )}
              </div>
              <div className="h-8 w-px bg-gray-300 hidden sm:block" />
              <div className="text-sm text-gray-500">
                {article.readTime} phút đọc
              </div>
            </div>
            
            {/* Featured Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
              <Image
                src={article.featuredImage.url}
                alt={article.featuredImage.alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
              {article.featuredImage.caption && (
                <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-3">
                  {article.featuredImage.caption}
                </p>
              )}
            </div>
            
            {/* Article Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded">
              <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
            </div>
            
            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/news?tag=${tag.slug}`}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Share Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <ShareButtons
                title={article.title}
                url={typeof window !== 'undefined' ? window.location.href : `https://example.com/news/${article.slug}`}
              />
            </div>
            
            {/* Author Bio */}
            {article.author.bio && (
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-4">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{article.author.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{article.author.bio}</p>
                    {article.author.social?.twitter && (
                      <a
                        href={article.author.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                      >
                        Theo dõi trên Twitter →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết liên quan</h2>
                {isRelatedLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-[200px] bg-gray-200 rounded-xl animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedArticles.map((related) => (
                      <ArticleCard
                        key={related.id}
                        article={related}
                        showCategory={false}
                        showExcerpt={false}
                      />
                    ))}
                  </div>
                )}
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
      </article>
    </>
  );
}
