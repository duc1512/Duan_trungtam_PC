'use client';

import { ArticleSummary } from '../types';
import { ArticleCard } from './ArticleCard';

interface HeroArticleProps {
  articles: ArticleSummary[];
  isLoading?: boolean;
}

export function HeroArticle({ articles, isLoading }: HeroArticleProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2 h-[400px] bg-gray-200 rounded-2xl animate-pulse" />
        <div className="space-y-4">
          <div className="h-[190px] bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-[190px] bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }
  
  if (!articles.length) return null;
  
  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 3);
  
  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Featured Article */}
        <div className="lg:col-span-2">
          <ArticleCard article={mainArticle} variant="featured" />
        </div>
        
        {/* Side Articles */}
        <div className="space-y-4">
          {sideArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant="horizontal"
              showCategory={false}
              showExcerpt={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
