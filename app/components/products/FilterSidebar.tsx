"use client";

import { useState } from "react";

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
  brands: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableCategories: { id: string; name: string; count: number }[];
  availableBrands: { name: string; count: number }[];
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  availableCategories,
  availableBrands,
}: FilterSidebarProps) {
  const [isExpanded, setIsExpanded] = useState({
    category: true,
    price: true,
    rating: true,
    brand: true,
  });

  const priceRanges = [
    { label: "Dưới 5 triệu", min: 0, max: 5000000 },
    { label: "5 - 10 triệu", min: 5000000, max: 10000000 },
    { label: "10 - 20 triệu", min: 10000000, max: 20000000 },
    { label: "20 - 50 triệu", min: 20000000, max: 50000000 },
    { label: "Trên 50 triệu", min: 50000000, max: Infinity },
  ];

  const ratings = [4, 3, 2, 1];

  const toggleCategory = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((c) => c !== categoryId)
      : [...filters.categories, categoryId];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const toggleBrand = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: newBrands });
  };

  const setPriceRange = (range: [number, number]) => {
    onFilterChange({ ...filters, priceRange: range });
  };

  const setMinRating = (rating: number) => {
    onFilterChange({ ...filters, minRating: filters.minRating === rating ? 0 : rating });
  };

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      priceRange: [0, Infinity],
      minRating: 0,
      brands: [],
    });
  };

  const activeFiltersCount =
    filters.categories.length +
    (filters.priceRange[1] !== Infinity ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    filters.brands.length;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Bộ lọc
        </h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-[#e30019] hover:underline"
          >
            Xóa ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="border-t pt-4">
        <button
          onClick={() => setIsExpanded({ ...isExpanded, category: !isExpanded.category })}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-semibold text-sm">Danh mục</span>
          <svg
            className={`w-4 h-4 transition-transform ${isExpanded.category ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded.category && (
          <div className="space-y-2">
            {availableCategories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                  className="w-4 h-4 text-[#e30019] rounded border-gray-300 focus:ring-[#e30019]"
                />
                <span className="text-sm text-gray-700 flex-1">{cat.name}</span>
                <span className="text-xs text-gray-400">({cat.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-t pt-4 mt-4">
        <button
          onClick={() => setIsExpanded({ ...isExpanded, price: !isExpanded.price })}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-semibold text-sm">Khoảng giá</span>
          <svg
            className={`w-4 h-4 transition-transform ${isExpanded.price ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded.price && (
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.label} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                  type="radio"
                  name="price"
                  checked={
                    filters.priceRange[0] === range.min &&
                    (range.max === Infinity ? filters.priceRange[1] === Infinity : filters.priceRange[1] === range.max)
                  }
                  onChange={() => setPriceRange([range.min, range.max])}
                  className="w-4 h-4 text-[#e30019] border-gray-300 focus:ring-[#e30019]"
                />
                <span className="text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="border-t pt-4 mt-4">
        <button
          onClick={() => setIsExpanded({ ...isExpanded, rating: !isExpanded.rating })}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-semibold text-sm">Đánh giá</span>
          <svg
            className={`w-4 h-4 transition-transform ${isExpanded.rating ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded.rating && (
          <div className="space-y-2">
            {ratings.map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === rating}
                  onChange={() => setMinRating(rating)}
                  className="w-4 h-4 text-[#e30019] border-gray-300 focus:ring-[#e30019]"
                />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-600 ml-1">trở lên</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="border-t pt-4 mt-4">
        <button
          onClick={() => setIsExpanded({ ...isExpanded, brand: !isExpanded.brand })}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-semibold text-sm">Thương hiệu</span>
          <svg
            className={`w-4 h-4 transition-transform ${isExpanded.brand ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded.brand && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableBrands.map((brand) => (
              <label key={brand.name} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand.name)}
                  onChange={() => toggleBrand(brand.name)}
                  className="w-4 h-4 text-[#e30019] rounded border-gray-300 focus:ring-[#e30019]"
                />
                <span className="text-sm text-gray-700 flex-1">{brand.name}</span>
                <span className="text-xs text-gray-400">({brand.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
