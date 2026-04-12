"use client";

import { useState, useMemo } from "react";
import { products, formatPrice } from "@/data/products-data";
import { ProductCard, FilterSidebar } from "@/features/products";
import { useCart } from "@/features/cart";

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
  brands: string[];
}

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "sales";

const ITEMS_PER_PAGE = 12;

export default function FeaturedProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, Infinity],
    minRating: 0,
    brands: [],
  });
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [currentPage, setCurrentPage] = useState(1);
  const { totalItems, totalPrice } = useCart();
  const [cartNotification, setCartNotification] = useState<{show: boolean; productName: string}>({show: false, productName: ''});

  // Get featured products (active, in stock)
  const featuredProducts = useMemo(() => {
    return products.filter((p) => p.status === "active" && p.inStock);
  }, []);

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let result = [...featuredProducts];

    // Filter by category
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.categoryId || ""));
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filter by rating
    if (filters.minRating > 0) {
      result = result.filter((p) => (p.rating || 0) >= filters.minRating);
    }

    // Filter by brand
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "sales":
        result.sort((a, b) => (b.sales || 0) - (a.sales || 0));
        break;
      default:
        // Default: featured (sales + rating)
        result.sort((a, b) => {
          const scoreA = (a.sales || 0) * 0.6 + (a.rating || 0) * 100 * 0.4;
          const scoreB = (b.sales || 0) * 0.6 + (b.rating || 0) * 100 * 0.4;
          return scoreB - scoreA;
        });
    }

    return result;
  }, [featuredProducts, filters, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset to page 1 when filters or sort change
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  // Calculate stats for filters
  const availableCategories = useMemo(() => {
    const cats = new Map<string, { name: string; count: number }>();
    featuredProducts.forEach((p) => {
      if (p.categoryId && p.category) {
        const existing = cats.get(p.categoryId);
        if (existing) {
          existing.count++;
        } else {
          cats.set(p.categoryId, { name: p.category, count: 1 });
        }
      }
    });
    return Array.from(cats.entries()).map(([id, data]) => ({ id, ...data }));
  }, [featuredProducts]);

  const availableBrands = useMemo(() => {
    const brands = new Map<string, number>();
    featuredProducts.forEach((p) => {
      brands.set(p.brand, (brands.get(p.brand) || 0) + 1);
    });
    return Array.from(brands.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [featuredProducts]);

  const handleCartSuccess = (productName: string) => {
    setCartNotification({show: true, productName});
    setTimeout(() => setCartNotification({show: false, productName: ''}), 2000);
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, Infinity],
      minRating: 0,
      brands: [],
    });
    setSortBy("default");
  };

  const activeFiltersCount =
    filters.categories.length +
    (filters.priceRange[1] !== Infinity ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    filters.brands.length +
    (sortBy !== "default" ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cart Success Notification */}
      {cartNotification.show && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-bounce flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <div className="font-semibold">Đã thêm vào giỏ!</div>
            <div className="text-sm opacity-90 line-clamp-1">{cartNotification.productName}</div>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#e30019] via-red-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1200')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto px-4 py-12 relative">
          <div className="flex items-center gap-2 text-sm mb-2 opacity-90">
            <span>Trang chủ</span>
            <span>/</span>
            <span className="font-semibold">Sản phẩm nổi bật</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">⭐ Sản phẩm nổi bật</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Khám phá những sản phẩm công nghệ được yêu thích nhất. 
            Từ laptop gaming đỉnh cao đến linh kiện PC hiệu năng cao.
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full">
              <span className="text-2xl font-bold">{filteredProducts.length}</span>
              <span className="text-sm opacity-90">Sản phẩm</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full">
              <span className="text-2xl font-bold">4.8★</span>
              <span className="text-sm opacity-90">Đánh giá TB</span>
            </div>
            <a href="/cart" className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full hover:bg-white/30 transition-colors">
              <span className="text-2xl font-bold">{totalItems}</span>
              <span className="text-sm opacity-90">Giỏ hàng</span>
              {totalItems > 0 && (
                <span className="text-xs bg-yellow-400 text-gray-800 px-2 py-0.5 rounded-full">
                  {formatPrice(totalPrice)}
                </span>
              )}
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#e30019] focus:border-transparent bg-white"
            >
              <option value="default">Nổi bật</option>
              <option value="price-asc">Giá thấp → cao</option>
              <option value="price-desc">Giá cao → thấp</option>
              <option value="rating">Đánh giá cao nhất</option>
              <option value="sales">Bán chạy nhất</option>
            </select>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Đang lọc:</span>
              {filters.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-1 bg-[#e30019] text-white text-xs rounded-full flex items-center gap-1"
                >
                  {availableCategories.find((c) => c.id === cat)?.name}
                  <button
                    onClick={() =>
                      setFilters({
                        ...filters,
                        categories: filters.categories.filter((c) => c !== cat),
                      })
                    }
                    className="hover:bg-red-700 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
              {filters.brands.map((brand) => (
                <span
                  key={brand}
                  className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full flex items-center gap-1"
                >
                  {brand}
                  <button
                    onClick={() =>
                      setFilters({
                        ...filters,
                        brands: filters.brands.filter((b) => b !== brand),
                      })
                    }
                    className="hover:bg-purple-700 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-sm text-[#e30019] hover:underline ml-2"
              >
                Xóa tất cả
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filter */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              availableCategories={availableCategories}
              availableBrands={availableBrands}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    {/* Prev Button */}
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#e30019] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                      </svg>
                    </button>

                    {/* Page Numbers */}
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                            currentPage === pageNum
                              ? "bg-[#e30019] text-white"
                              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#e30019]"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#e30019] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                )}

                {/* Page Info */}
                <div className="text-center mt-4">
                  <p className="text-gray-500 text-sm">
                    Trang {currentPage}/{totalPages} • Hiển thị {paginatedProducts.length} / {filteredProducts.length} sản phẩm
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-gray-600 mb-4">
                  Thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-[#e30019] text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
