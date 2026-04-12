// Types for Tech News System
// Professional CMS-like structure for scalability

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  role: 'journalist' | 'editor' | 'contributor';
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  articleCount: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Author;
  category: Category;
  tags: Tag[];
  featuredImage: {
    url: string;
    alt: string;
    caption?: string;
  };
  gallery?: {
    url: string;
    alt: string;
  }[];
  publishedAt: string;
  updatedAt?: string;
  readTime: number; // minutes
  featured: boolean;
  trending: boolean;
  viewCount: number;
  likeCount: number;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    canonicalUrl?: string;
  };
}

export interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: Author;
  category: Category;
  featuredImage: {
    url: string;
    alt: string;
  };
  publishedAt: string;
  readTime: number;
  viewCount: number;
  featured: boolean;
}

export interface NewsFilter {
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
  sortBy: 'newest' | 'popular' | 'trending';
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface NewsletterSubscription {
  email: string;
  preferences?: {
    daily?: boolean;
    weekly?: boolean;
    categories?: string[];
  };
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
