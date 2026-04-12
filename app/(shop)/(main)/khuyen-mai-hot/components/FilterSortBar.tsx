"use client";

import { useState } from "react";

type SortOption = "discount" | "price-asc" | "price-desc" | "sold";
type DiscountFilter = "all" | "30" | "50" | "70";
type CategoryFilter = "all" | "laptop" | "pc" | "monitor" | "accessory";

interface FilterSortBarProps {
  onSortChange: (sort: SortOption) => void;
  onDiscountFilterChange: (filter: DiscountFilter) => void;
  onCategoryFilterChange: (filter: CategoryFilter) => void;
  totalProducts: number;
}

export default function FilterSortBar({
  onSortChange,
  onDiscountFilterChange,
  onCategoryFilterChange,
  totalProducts,
}: FilterSortBarProps) {
  const [activeSort, setActiveSort] = useState<SortOption>("discount");
  const [activeDiscount, setActiveDiscount] = useState<DiscountFilter>("all");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const handleSortChange = (sort: SortOption) => {
    setActiveSort(sort);
    onSortChange(sort);
  };

  const handleDiscountChange = (filter: DiscountFilter) => {
    setActiveDiscount(filter);
    onDiscountFilterChange(filter);
  };

  const handleCategoryChange = (filter: CategoryFilter) => {
    setActiveCategory(filter);
    onCategoryFilterChange(filter);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      {/* Header with count */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Tất cả Flash Sale
          <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
            {totalProducts}
          </span>
        </h2>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          className="md:hidden flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Lọc
        </button>
      </div>

      {/* Filters */}
      <div className={`${showMobileFilter ? "block" : "hidden"} md:block space-y-4`}>
        {/* Discount Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500 font-medium mr-2">Giảm giá:</span>
          {[
            { value: "all", label: "Tất cả" },
            { value: "30", label: "30% trở lên" },
            { value: "50", label: "50% trở lên" },
            { value: "70", label: "70% trở lên" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleDiscountChange(option.value as DiscountFilter)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeDiscount === option.value
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500 font-medium mr-2">Danh mục:</span>
          {[
            { value: "all", label: "Tất cả" },
            { value: "laptop", label: "Laptop" },
            { value: "pc", label: "PC Gaming" },
            { value: "monitor", label: "Màn hình" },
            { value: "accessory", label: "Phụ kiện" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleCategoryChange(option.value as CategoryFilter)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeCategory === option.value
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-500 font-medium mr-2">Sắp xếp:</span>
          {[
            { value: "discount", label: "Giảm giá cao", icon: "%" },
            { value: "price-asc", label: "Giá thấp → cao", icon: "↑" },
            { value: "price-desc", label: "Giá cao → thấp", icon: "↓" },
            { value: "sold", label: "Bán chạy", icon: "🔥" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value as SortOption)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                activeSort === option.value
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span>{option.icon}</span>
              <span className="hidden sm:inline">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
