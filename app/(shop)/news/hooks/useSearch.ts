'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ArticleSummary } from '../types';
import { NewsApi } from '../services/api';

interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: ArticleSummary[];
  isSearching: boolean;
  hasSearched: boolean;
}

export function useSearch(debounceMs: number = 300): UseSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ArticleSummary[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    
    setIsSearching(true);
    setHasSearched(true);
    
    try {
      const data = await NewsApi.searchArticles(searchQuery, 10);
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);
  
  // Debounce search
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (query.trim()) {
      timeoutRef.current = setTimeout(() => {
        performSearch(query);
      }, debounceMs);
    } else {
      setResults([]);
      setHasSearched(false);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, debounceMs, performSearch]);
  
  return {
    query,
    setQuery,
    results,
    isSearching,
    hasSearched
  };
}
