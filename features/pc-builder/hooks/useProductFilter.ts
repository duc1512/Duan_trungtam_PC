/**
 * useProductFilter Hook
 * Filters and searches products in PC Builder
 */

import { useMemo } from 'react';
import { usePCBuilderStore } from '../store';
import { allComponents } from '../data';
import type { PCComponent, ComponentCategory } from '../types';

export function useProductFilter() {
  const store = usePCBuilderStore();
  const { searchQuery, filters, setSearchQuery, setFilters, activeCategory } = store;

  const availableProducts = useMemo<PCComponent[]>(() => {
    if (!activeCategory) return [];
    return (allComponents as Record<ComponentCategory, PCComponent[]>)[activeCategory as ComponentCategory] || [];
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    let products = [...availableProducts];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      );
    }

    // Apply brand filter
    if (filters.brand.length > 0) {
      products = products.filter((p: PCComponent) => filters.brand.includes(p.brand));
    }

    // Apply price filters
    if (filters.priceMin > 0) {
      products = products.filter((p: PCComponent) => p.price >= filters.priceMin);
    }
    if (filters.priceMax < 100000000) {
      products = products.filter((p: PCComponent) => p.price <= filters.priceMax);
    }

    return products;
  }, [availableProducts, searchQuery, filters]);

  const availableBrands = useMemo(() => {
    const brands = new Set(availableProducts.map((p: PCComponent) => p.brand));
    return Array.from(brands).sort();
  }, [availableProducts]);

  const priceRange = useMemo(() => {
    if (availableProducts.length === 0) return { min: 0, max: 0 };
    const prices = availableProducts.map((p) => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [availableProducts]);

  const toggleBrand = (brand: string) => {
    const current = filters.brand;
    const newBrands = current.includes(brand)
      ? current.filter((b) => b !== brand)
      : [...current, brand];
    setFilters({ brand: newBrands });
  };

  const clearFilters = () => {
    setFilters({ brand: [], priceMin: 0, priceMax: 100000000 });
    setSearchQuery('');
  };

  return {
    products: filteredProducts,
    allProducts: availableProducts,
    brands: availableBrands,
    priceRange,
    searchQuery,
    filters,
    setSearchQuery,
    setFilters,
    toggleBrand,
    clearFilters,
  };
}
