'use client';

import { useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useProductFilter, useComponentSelection, useProductModal } from '../hooks';
import { usePCBuilderStore } from '../store';
import { categoryConfigs } from '../data';
import { getSuggestions } from '../services';
import type { PCComponent, ComponentCategory } from '../types';

// Format price to VND
const formatPrice = (price: number) => 
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

export default function ProductModal() {
  const { isOpen, activeCategory, closeModal } = useProductModal();
  const { handleSelect } = useComponentSelection();
  const { selectedParts } = usePCBuilderStore();
  const {
    products,
    brands,
    priceRange,
    searchQuery,
    filters,
    setSearchQuery,
    toggleBrand,
    clearFilters,
  } = useProductFilter();

  const config = useMemo(() => 
    categoryConfigs.find((c) => c.id === activeCategory),
    [activeCategory]
  );

  const suggestions = useMemo(() => {
    if (!activeCategory) return [];
    return getSuggestions(activeCategory, selectedParts);
  }, [activeCategory, selectedParts]);

  const handleSelectProduct = useCallback((product: PCComponent) => {
    if (activeCategory) {
      handleSelect(activeCategory, product);
      closeModal();
    }
  }, [activeCategory, handleSelect, closeModal]);

  if (!isOpen || !activeCategory || !config) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeModal}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Chọn {config.name}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {products.length} sản phẩm
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Suggestions Banner */}
        {suggestions.length > 0 && (
          <div className="px-6 py-3 bg-blue-50 border-b border-blue-100">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-blue-900">Gợi ý:</p>
                <ul className="text-sm text-blue-700 mt-1 space-y-0.5">
                  {suggestions.map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="px-6 py-4 border-b border-gray-200 space-y-4">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Tìm kiếm ${config.name.toLowerCase()}...`}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
            />
          </div>

          {/* Brand Filter */}
          {brands.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700">Thương hiệu:</span>
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => toggleBrand(brand)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.brand.includes(brand)
                      ? 'bg-[#e30019] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {brand}
                </button>
              ))}
              {(filters.brand.length > 0 || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-[#e30019] underline"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
          )}
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-6">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-500">Không tìm thấy sản phẩm phù hợp</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-[#e30019] font-medium hover:underline"
              >
                Xóa bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={handleSelectProduct}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Hiển thị {products.length} sản phẩm
          </p>
          <button
            onClick={closeModal}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

// Product Card Component
interface ProductCardProps {
  product: PCComponent;
  onSelect: (product: PCComponent) => void;
}

function ProductCard({ product, onSelect }: ProductCardProps) {
  // Get key specs based on category
  const getKeySpecs = (product: PCComponent): string[] => {
    const specs: string[] = [];
    
    switch (product.category) {
      case 'cpu':
        specs.push(`${product.specs.cores}C/${product.specs.threads}T`);
        specs.push(`TDP ${product.specs.tdp}W`);
        specs.push(product.specs.socket);
        break;
      case 'mainboard':
        specs.push(product.specs.chipset);
        specs.push(product.specs.memoryType);
        specs.push(`${product.specs.memorySlots} khe RAM`);
        break;
      case 'ram':
        specs.push(`${product.specs.capacity * product.specs.sticks}GB`);
        specs.push(`${product.specs.speed}MHz`);
        specs.push(product.specs.type);
        break;
      case 'vga':
        specs.push(product.specs.chipset);
        specs.push(`${product.specs.memory}GB ${product.specs.memoryType}`);
        specs.push(`${product.specs.tdp}W`);
        break;
      case 'ssd':
        specs.push(`${product.specs.capacity >= 1000 ? product.specs.capacity / 1000 + 'TB' : product.specs.capacity + 'GB'}`);
        specs.push(product.specs.interface);
        specs.push(`${product.specs.readSpeed}MB/s`);
        break;
      case 'psu':
        specs.push(`${product.specs.wattage}W`);
        specs.push(product.specs.efficiency);
        specs.push(product.specs.modular);
        break;
      case 'case':
        specs.push(product.specs.formFactor);
        specs.push(`GPU max ${product.specs.maxGpuLength}mm`);
        if (product.specs.temperedGlass) specs.push('Kính cường lực');
        break;
      case 'cooler':
        specs.push(product.specs.type);
        specs.push(`${product.specs.tdp}W TDP`);
        if (product.specs.radiatorSize) specs.push(product.specs.radiatorSize);
        break;
      default:
        specs.push((product as PCComponent).brand);
    }
    
    return specs.slice(0, 3);
  };

  return (
    <div 
      onClick={() => onSelect(product)}
      className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#e30019] hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="flex gap-4">
        {/* Image */}
        <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center p-2 shrink-0">
          <Image
            src={product.image || '/placeholder-product.png'}
            alt={product.name}
            width={80}
            height={80}
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 font-medium">{product.brand}</p>
          <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-[#e30019] transition-colors">
            {product.name}
          </h3>
          
          {/* Specs */}
          <div className="flex flex-wrap gap-1 mt-2">
            {getKeySpecs(product).map((spec, i) => (
              <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                {spec}
              </span>
            ))}
          </div>

          {/* Price & Stock */}
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="font-bold text-[#e30019]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through ml-2">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {product.inStock ? (
              <span className="text-xs text-green-600 font-medium">Còn hàng</span>
            ) : (
              <span className="text-xs text-red-500 font-medium">Hết hàng</span>
            )}
          </div>
        </div>
      </div>

      {/* Select Button */}
      <button className="w-full mt-3 py-2 bg-gray-100 hover:bg-[#e30019] text-gray-700 hover:text-white rounded-lg font-medium text-sm transition-colors">
        Chọn sản phẩm
      </button>
    </div>
  );
}
