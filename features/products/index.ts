/**
 * Products Feature - Main Barrel Export
 */

// Components
export { ProductCard, FilterSidebar } from './components';

// Hooks
export { useProducts } from './hooks';

// Data
export { products, formatPrice } from '@/data/products';
export type { Product as ProductType } from '@/data/products';

// Types
export type { Product, ProductFilter } from './types';
