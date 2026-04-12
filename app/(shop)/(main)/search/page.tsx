"use client";

import { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/features/cart";
import { products, brands as productBrands, formatPrice, searchProducts, type Product } from "@/data/products";

// ==================== TYPES ====================
interface FilterState {
  priceRange: [number, number];
  brands: string[];
  categories: string[];
  rating: number | null;
  inStock: boolean;
  specs: Record<string, string[]>;
}

// ==================== MOCK DATA ====================
const searchBrands = ["ASUS", "MSI", "Acer", "Lenovo", "Dell", "HP"];
const searchCategories = ["Laptop Gaming", "Laptop Văn Phòng", "PC Gaming", "Linh Kiện"];
const priceRanges = [
  { label: "Dưới 10 triệu", min: 0, max: 10000000 },
  { label: "10 - 20 triệu", min: 10000000, max: 20000000 },
  { label: "20 - 30 triệu", min: 20000000, max: 30000000 },
  { label: "30 - 50 triệu", min: 30000000, max: 50000000 },
  { label: "Trên 50 triệu", min: 50000000, max: 200000000 },
];

// ==================== UTILITY FUNCTIONS ====================

// ==================== COMPONENTS ====================

// Star Rating Component
const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount: number }) => (
  <div className="flex items-center gap-1">
    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
    <span className="text-sm font-medium text-gray-700">{rating}</span>
    <span className="text-sm text-gray-500">({reviewCount})</span>
  </div>
);

// Product Card
const ProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product) => void }) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      <Link href={`/product/${product.id}`} className="block relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <Image
          src={product.image || "/placeholder-product.png"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-[#e30019] text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium">Hết hàng</span>
          </div>
        )}
      </Link>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{product.brand}</span>
          <span className="text-xs text-gray-400">{product.category}</span>
        </div>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-[#e30019] transition-colors">
            {product.name}
          </h3>
        </Link>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-[#e30019]">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className={`mt-3 w-full py-2 rounded-lg font-medium text-sm transition-all ${
            product.inStock
              ? "bg-[#e30019] hover:bg-red-700 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {product.inStock ? "Thêm vào giỏ" : "Hết hàng"}
        </button>
      </div>
    </div>
  );
};

// Filter Sidebar
const FilterSidebar = ({
  filters,
  onFilterChange,
  isOpen,
  onClose,
}: {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const toggleBrand = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: newBrands });
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const setPriceRange = (min: number, max: number) => {
    onFilterChange({ ...filters, priceRange: [min, max] });
  };

  const clearFilters = () => {
    onFilterChange({
      priceRange: [0, 200000000],
      brands: [],
      categories: [],
      rating: null,
      inStock: false,
      specs: {},
    });
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Khoảng giá</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                checked={
                  filters.priceRange[0] === range.min && filters.priceRange[1] === range.max
                }
                onChange={() => setPriceRange(range.min, range.max)}
                className="text-[#e30019] focus:ring-[#e30019]"
              />
              <span className="text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Thương hiệu</h4>
        <div className="space-y-2">
          {searchBrands.map((brand: string) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="rounded text-[#e30019] focus:ring-[#e30019]"
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Danh mục</h4>
        <div className="space-y-2">
          {searchCategories.map((category: string) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="rounded text-[#e30019] focus:ring-[#e30019]"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Đánh giá</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => onFilterChange({ ...filters, rating })}
                className="text-[#e30019] focus:ring-[#e30019]"
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-600">trở lên</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => onFilterChange({ ...filters, inStock: e.target.checked })}
            className="rounded text-[#e30019] focus:ring-[#e30019]"
          />
          <span className="text-sm text-gray-700">Chỉ hiện còn hàng</span>
        </label>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full py-2 border border-gray-300 hover:border-[#e30019] hover:text-[#e30019] rounded-lg text-sm font-medium transition-colors"
      >
        Xóa bộ lọc
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-4">
          <h3 className="font-bold text-gray-900 mb-4">Bộ lọc</h3>
          {filterContent}
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
          <aside className="fixed left-0 top-0 h-full w-80 bg-white z-50 overflow-y-auto p-5 lg:hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Bộ lọc</h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {filterContent}
          </aside>
        </>
      )}
    </>
  );
};

// ==================== MAIN SEARCH PAGE ====================
function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [showToast, setShowToast] = useState<string | null>(null);

  const query = searchParams.get("q") || "";
  
  // State for search input - sync with URL query
  const [searchInput, setSearchInput] = useState(query);
  
  // Update search input when URL query changes
  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 200000000],
    brands: [],
    categories: [],
    rating: null,
    inStock: false,
    specs: {},
  });

  const [sortBy, setSortBy] = useState<"relevance" | "price-asc" | "price-desc" | "rating" | "newest">(
    "relevance"
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product: Product) => {
      // Search query filter
      const searchMatch =
        !query ||
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase());

      // Price filter
      const priceMatch =
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];

      // Brand filter
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand);

      // Category filter
      const categoryMatch =
        filters.categories.length === 0 || filters.categories.includes(product.category);

      // Rating filter
      const ratingMatch = !filters.rating || product.rating >= filters.rating;

      // In stock filter
      const stockMatch = !filters.inStock || product.inStock;

      return searchMatch && priceMatch && brandMatch && categoryMatch && ratingMatch && stockMatch;
    });

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }

    return result;
  }, [query, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) return;
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || product.images[0]?.url || "/placeholder-product.png",
        maxQuantity: 10,
      },
      1
    );
    setShowToast(`Đã thêm ${product.name} vào giỏ hàng`);
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb & Search Info */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Link href="/" className="hover:text-[#e30019] transition-colors">Trang chủ</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">Tìm kiếm</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">
            {query ? `Kết quả tìm kiếm: "${query}"` : "Tất cả sản phẩm"}
          </h1>
          <p className="text-gray-600 mt-1">{filteredProducts.length} sản phẩm được tìm thấy</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchInput.trim()) {
                router.push(`/search?q=${encodeURIComponent(searchInput)}`);
              }
            }}
            className="flex gap-2 max-w-2xl"
          >
            <div className="flex-1 relative">
              <input
                type="text"
                name="q"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:outline-none focus:border-[#e30019] focus:ring-2 focus:ring-[#e30019]/20"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#e30019] hover:bg-red-700 text-white font-medium rounded-xl transition-colors"
            >
              Tìm kiếm
            </button>
          </form>
        </div>

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            isOpen={mobileFilterOpen}
            onClose={() => setMobileFilterOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-[#e30019] hover:text-[#e30019] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Bộ lọc
                </button>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#e30019]"
                >
                  <option value="relevance">Liên quan nhất</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                  <option value="rating">Đánh giá cao nhất</option>
                  <option value="newest">Mới nhất</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-[#e30019] text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-[#e30019] text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Product Grid */}
            {paginatedProducts.length > 0 ? (
              <div
                className={`grid gap-4 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h2>
                <p className="text-gray-600 mb-4">Vui lòng thử lại với từ khóa khác hoặc điều chỉnh bộ lọc</p>
                <button
                  onClick={() => {
                    setFilters({
                      priceRange: [0, 200000000],
                      brands: [],
                      categories: [],
                      rating: null,
                      inStock: false,
                      specs: {},
                    });
                    router.push("/search");
                  }}
                  className="px-6 py-2 bg-[#e30019] hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:border-[#e30019] hover:text-[#e30019] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Trước
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === i + 1
                        ? "bg-[#e30019] text-white"
                        : "border border-gray-300 hover:border-[#e30019] hover:text-[#e30019]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:border-[#e30019] hover:text-[#e30019] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Sau
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg flex items-center gap-2 animate-slide-in z-50">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {showToast}
        </div>
      )}
    </div>
  );
}

// Loading fallback component
function SearchPageLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-12 bg-gray-200 rounded max-w-2xl"></div>
          <div className="flex gap-6 mt-6">
            <div className="hidden lg:block w-64 h-96 bg-gray-200 rounded-xl"></div>
            <div className="flex-1 space-y-4">
              <div className="h-16 bg-gray-200 rounded-xl"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main export with Suspense wrapper
export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageLoading />}>
      <SearchPageContent />
    </Suspense>
  );
}
