'use client';

import { useState, useEffect, useCallback } from 'react';
import { NewsFilter, PaginatedResponse, ArticleSummary } from '../types';
import { NewsApi } from '../services/api';

interface UseArticlesOptions {
  category?: string;
  tag?: string;
  search?: string;
  sortBy?: 'newest' | 'popular' | 'trending';
  page?: number;
  limit?: number;
}

interface UseArticlesReturn {
  articles: ArticleSummary[];
  meta: PaginatedResponse<ArticleSummary>['meta'] | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  setPage: (page: number) => void;
  setSortBy: (sortBy: 'newest' | 'popular' | 'trending') => void;
}

export function useArticles(options: UseArticlesOptions = {}): UseArticlesReturn {
  const {
    category,
    tag,
    search,
    sortBy: initialSortBy = 'newest',
    page: initialPage = 1,
    limit = 9
  } = options;
  
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<ArticleSummary>['meta'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [sortBy, setSortBy] = useState(initialSortBy);
  
  const fetchArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const filter: NewsFilter = {
        category,
        tag,
        search,
        sortBy,
        page,
        limit
      };
      
      const response = await NewsApi.getArticles(filter);
      setArticles(response.data);
      setMeta(response.meta);
    } catch (err) {
      setError('Không thể tải bài viết. Vui lòng thử lại.');
      console.error('Error fetching articles:', err);
    } finally {
      setIsLoading(false);
    }
  }, [category, tag, search, sortBy, page, limit]);
  
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);
  
  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [category, tag, search, sortBy]);
  
  return {
    articles,
    meta,
    isLoading,
    error,
    refetch: fetchArticles,
    setPage,
    setSortBy
  };
}

// Hook for single article
export function useArticle(slug: string) {
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchArticle() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await NewsApi.getArticle(slug);
        if (data) {
          setArticle(data);
          // Increment view count
          await NewsApi.incrementViewCount(slug);
        } else {
          setError('Không tìm thấy bài viết');
        }
      } catch (err) {
        setError('Không thể tải bài viết');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (slug) {
      fetchArticle();
    }
  }, [slug]);
  
  return { article, isLoading, error };
}

// Hook for featured articles
export function useFeaturedArticles(limit: number = 3) {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetch() {
      const data = await NewsApi.getFeaturedArticles(limit);
      setArticles(data);
      setIsLoading(false);
    }
    fetch();
  }, [limit]);
  
  return { articles, isLoading };
}

// Hook for trending articles
export function useTrendingArticles(limit: number = 5) {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetch() {
      const data = await NewsApi.getTrendingArticles(limit);
      setArticles(data);
      setIsLoading(false);
    }
    fetch();
  }, [limit]);
  
  return { articles, isLoading };
}

// Hook for latest articles
export function useLatestArticles(limit: number = 6) {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetch() {
      const data = await NewsApi.getLatestArticles(limit);
      setArticles(data);
      setIsLoading(false);
    }
    fetch();
  }, [limit]);
  
  return { articles, isLoading };
}

// Hook for related articles
export function useRelatedArticles(slug: string, limit: number = 3) {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetch() {
      if (!slug) return;
      const data = await NewsApi.getRelatedArticles(slug, limit);
      setArticles(data);
      setIsLoading(false);
    }
    fetch();
  }, [slug, limit]);
  
  return { articles, isLoading };
}
