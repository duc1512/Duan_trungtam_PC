"use client";

import { useState, useMemo, useCallback, memo } from "react";
import { products, formatPrice, type Product } from "@/data/products";
import ProductCard from "@/app/components/product/ProductCard";

// ==================== TYPES ====================
type SortOption = "bestseller" | "price-asc" | "price-desc" | "newest";
type CategoryFilter = "all" | "cpu" | "mainboard" | "vga" | "ram" | "storage" | "psu" | "case" | "cooler";

// ==================== UTILITY FUNCTIONS ====================
const getCategoryFromProduct = (product: Product): CategoryFilter => {
  const name = product.name.toLowerCase();
  if (name.includes("cpu") || name.includes("intel") || name.includes("amd") || name.includes("processor")) return "cpu";
  if (name.includes("mainboard") || name.includes("motherboard")) return "mainboard";
  if (name.includes("vga") || name.includes("gpu") || name.includes("rtx") || name.includes("gtx")) return "vga";
  if (name.includes("ram") || name.includes("ddr")) return "ram";
  if (name.includes("ssd") || name.includes("nvme") || name.includes("hdd")) return "storage";
  if (name.includes("psu") || name.includes("nguồn") || name.includes("power")) return "psu";
  if (name.includes("case") || name.includes("vỏ")) return "case";
  if (name.includes("cooler") || name.includes("tản nhiệt")) return "cooler";
  return "all";
};

const getMockSoldCount = (productId: string): number => {
  const hash = productId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return 500 + (hash % 9500);
};

// ==================== SKELETON LOADER ====================
const ProductSkeleton = memo(() => (
  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
    <div className="aspect-square bg-gray-200" />
    <div className="p-3 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-6 bg-gray-200 rounded w-2/3 mt-2" />
    </div>
  </div>
));
ProductSkeleton.displayName = "ProductSkeleton";

// ==================== QUICK VIEW MODAL ====================
const QuickViewModal = memo(({ product, onClose }: { product: Product | null; onClose: () => void }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden relative">
            <img
              src={product.image || "/placeholder-product.png"}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">{product.brand}</span>
            <h2 className="text-xl font-bold text-gray-900 mt-1">{product.name}</h2>
            <div className="mt-4">
              <span className="text-2xl font-bold text-red-600">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="ml-2 text-lg text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
});
QuickViewModal.displayName = "QuickViewModal";

// ==================== MAIN BESTSELLERS COMPONENT ====================
export default function BestSellers() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("bestseller");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: "all", label: "Tất cả" },
    { value: "cpu", label: "CPU" },
    { value: "mainboard", label: "Mainboard" },
    { value: "vga", label: "VGA" },
    { value: "ram", label: "RAM" },
    { value: "storage", label: "SSD/HDD" },
    { value: "psu", label: "Nguồn" },
    { value: "case", label: "Case" },
    { value: "cooler", label: "Tản nhiệt" },
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "bestseller", label: "Bán chạy" },
    { value: "price-asc", label: "Giá thấp → cao" },
    { value: "price-desc", label: "Giá cao → thấp" },
    { value: "newest", label: "Mới nhất" },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== "all") {
      result = result.filter(p => getCategoryFromProduct(p) === activeCategory);
    }

    // Sort
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "bestseller":
        result.sort((a, b) => getMockSoldCount(b.id) - getMockSoldCount(a.id));
        break;
      case "newest":
        // Assuming higher ID = newer (in real app, use date field)
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }

    return result;
  }, [activeCategory, sortOption]);

  const visibleProducts = useMemo(() => 
    filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = useCallback(() => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 10, filteredProducts.length));
      setIsLoading(false);
    }, 300);
  }, [filteredProducts.length]);

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">Sản Phẩm Bán Chạy</h2>
                <p className="text-sm text-gray-500">Top sản phẩm được yêu thích nhất</p>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <svg className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-4 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-2 w-max">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => {
                    setActiveCategory(cat.value);
                    setVisibleCount(10);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat.value
                      ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="p-4 md:p-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-500">Không có sản phẩm nào</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {visibleProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  showRank={true}
                  showBadges={true}
                  onQuickView={handleQuickView}
                />
              ))}
              {isLoading && [...Array(5)].map((_, i) => <ProductSkeleton key={`skeleton-${i}`} />)}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                >
                  {isLoading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Đang tải...
                    </>
                  ) : (
                    <>
                      Xem thêm sản phẩm
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-400 mt-2">
                  Hiển thị {visibleProducts.length} / {filteredProducts.length} sản phẩm
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
        />
      )}
    </section>
  );
}