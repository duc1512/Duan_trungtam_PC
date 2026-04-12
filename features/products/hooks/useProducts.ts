/**
 * useProducts Hook
 * Products data and filtering logic
 */

import { useMemo, useState, useCallback } from 'react';
import { products } from '@/data/products-data';
import type { Product, ProductFilter } from '../types';

export function useProducts() {
  const [filters, setFilters] = useState<ProductFilter>({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    // Apply brand filter
    if (filters.brand && filters.brand.length > 0) {
      result = result.filter((p) => filters.brand?.includes(p.brand));
    }

    // Apply price filters
    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'popular':
          result.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
      }
    }

    return result;
  }, [filters, searchQuery]);

  const updateFilters = useCallback((newFilters: Partial<ProductFilter>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setSearchQuery('');
  }, []);

  return {
    products: filteredProducts,
    allProducts: products,
    filters,
    searchQuery,
    setSearchQuery,
    updateFilters,
    clearFilters,
  };
}
