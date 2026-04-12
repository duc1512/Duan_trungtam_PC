// News API Service
// Can be replaced with real API calls later

import {
  Article,
  ArticleSummary,
  Category,
  Tag,
  NewsFilter,
  PaginatedResponse
} from '../types';
import {
  articles,
  categories,
  tags,
  getArticleBySlug,
  getArticlesByCategory,
  getArticlesByTag,
  getFeaturedArticles,
  getTrendingArticles,
  getLatestArticles,
  getRelatedArticles,
  searchArticles,
  getPopularTags,
  toArticleSummary
} from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class NewsApi {
  // Get all articles with pagination and filters
  static async getArticles(filter: NewsFilter): Promise<PaginatedResponse<ArticleSummary>> {
    await delay(300); // Simulate network delay
    
    let filteredArticles = [...articles];
    
    // Apply category filter
    if (filter.category) {
      filteredArticles = filteredArticles.filter(
        article => article.category.slug === filter.category
      );
    }
    
    // Apply tag filter
    if (filter.tag) {
      filteredArticles = filteredArticles.filter(
        article => article.tags.some(tag => tag.slug === filter.tag)
      );
    }
    
    // Apply search filter
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filteredArticles = filteredArticles.filter(
        article =>
          article.title.toLowerCase().includes(searchLower) ||
          article.excerpt.toLowerCase().includes(searchLower) ||
          article.content.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    switch (filter.sortBy) {
      case 'newest':
        filteredArticles.sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
        break;
      case 'popular':
        filteredArticles.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case 'trending':
        filteredArticles.sort((a, b) => b.likeCount - a.likeCount);
        break;
    }
    
    const totalItems = filteredArticles.length;
    const totalPages = Math.ceil(totalItems / filter.limit);
    const startIndex = (filter.page - 1) * filter.limit;
    const endIndex = startIndex + filter.limit;
    const paginatedData = filteredArticles.slice(startIndex, endIndex);
    
    return {
      data: paginatedData.map(toArticleSummary),
      meta: {
        currentPage: filter.page,
        totalPages,
        totalItems,
        itemsPerPage: filter.limit,
        hasNextPage: filter.page < totalPages,
        hasPrevPage: filter.page > 1
      }
    };
  }
  
  // Get single article by slug
  static async getArticle(slug: string): Promise<Article | null> {
    await delay(200);
    return getArticleBySlug(slug) || null;
  }
  
  // Get all categories
  static async getCategories(): Promise<Category[]> {
    await delay(100);
    return categories;
  }
  
  // Get single category
  static async getCategory(slug: string): Promise<Category | null> {
    await delay(100);
    return categories.find(cat => cat.slug === slug) || null;
  }
  
  // Get all tags
  static async getTags(): Promise<Tag[]> {
    await delay(100);
    return tags;
  }
  
  // Get popular tags
  static async getPopularTags(limit: number = 10): Promise<Tag[]> {
    await delay(100);
    return getPopularTags(limit);
  }
  
  // Get featured articles
  static async getFeaturedArticles(limit: number = 3): Promise<ArticleSummary[]> {
    await delay(200);
    return getFeaturedArticles()
      .slice(0, limit)
      .map(toArticleSummary);
  }
  
  // Get trending articles
  static async getTrendingArticles(limit: number = 5): Promise<ArticleSummary[]> {
    await delay(200);
    return getTrendingArticles()
      .slice(0, limit)
      .map(toArticleSummary);
  }
  
  // Get latest articles
  static async getLatestArticles(limit: number = 6): Promise<ArticleSummary[]> {
    await delay(200);
    return getLatestArticles(limit).map(toArticleSummary);
  }
  
  // Get related articles
  static async getRelatedArticles(articleSlug: string, limit: number = 3): Promise<ArticleSummary[]> {
    await delay(300);
    const article = getArticleBySlug(articleSlug);
    if (!article) return [];
    return getRelatedArticles(article, limit).map(toArticleSummary);
  }
  
  // Search articles
  static async searchArticles(query: string, limit: number = 10): Promise<ArticleSummary[]> {
    await delay(400); // Search takes longer
    return searchArticles(query)
      .slice(0, limit)
      .map(toArticleSummary);
  }
  
  // Increment view count (for analytics)
  static async incrementViewCount(slug: string): Promise<void> {
    await delay(100);
    const article = getArticleBySlug(slug);
    if (article) {
      article.viewCount++;
    }
  }
  
  // Subscribe to newsletter
  static async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    await delay(500);
    
    // Simulate validation
    if (!email.includes('@')) {
      return { success: false, message: 'Email không hợp lệ' };
    }
    
    // Simulate duplicate check
    if (email === 'test@example.com') {
      return { success: false, message: 'Email đã đăng ký' };
    }
    
    return { success: true, message: 'Đăng ký thành công!' };
  }
}

// Export singleton instance
export const newsApi = new NewsApi();
