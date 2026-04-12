"use client";

import { useState, useMemo, useEffect } from "react";
import FlashSaleBanner from "./components/FlashSaleBanner";
import FilterSortBar from "./components/FilterSortBar";
import FlashProductCard from "./components/FlashProductCard";
import { flashSaleProducts } from "./data/flashSaleProducts";

type SortOption = "discount" | "price-asc" | "price-desc" | "sold";
type DiscountFilter = "all" | "30" | "50" | "70";
type CategoryFilter = "all" | "laptop" | "pc" | "monitor" | "accessory";

export default function FlashSalePage() {
  const [sortBy, setSortBy] = useState<SortOption>("discount");
  const [discountFilter, setDiscountFilter] = useState<DiscountFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [flashEndTime] = useState(() => {
    const end = new Date();
    end.setHours(end.getHours() + 24);
    return end.toISOString();
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...flashSaleProducts];

    // Apply discount filter
    if (discountFilter !== "all") {
      const minDiscount = parseInt(discountFilter);
      result = result.filter((p) => p.discount >= minDiscount);
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((p) => {
        if (categoryFilter === "laptop") return p.category.includes("laptop");
        if (categoryFilter === "pc") return p.category.includes("pc");
        if (categoryFilter === "monitor") return p.category.includes("man-hinh");
        if (categoryFilter === "accessory") return p.category.includes("phu-kien") || p.category.includes("linh-kien");
        return true;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "discount":
          return b.discount - a.discount;
        case "price-asc":
          return a.flashSalePrice - b.flashSalePrice;
        case "price-desc":
          return b.flashSalePrice - a.flashSalePrice;
        case "sold":
          return (b.sold / b.total) - (a.sold / a.total);
        default:
          return 0;
      }
    });

    return result;
  }, [sortBy, discountFilter, categoryFilter]);

  // Skeleton loading component
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-8 bg-gray-200 rounded" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Flash Sale Banner */}
      <FlashSaleBanner 
        endTime={flashEndTime}
        title="FLASH SALE"
        subtitle="Săn deal cực sốc - Chỉ trong 24 giờ"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Filter & Sort Bar */}
        <FilterSortBar
          onSortChange={setSortBy}
          onDiscountFilterChange={setDiscountFilter}
          onCategoryFilterChange={setCategoryFilter}
          totalProducts={filteredProducts.length}
        />

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <FlashProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image || product.images[0]?.url}
                price={product.flashSalePrice}
                originalPrice={product.originalPrice}
                sold={product.sold}
                total={product.total}
                rating={product.rating}
                reviewCount={product.reviewCount}
                badge={product.badge}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Không tìm thấy sản phẩm
            </h3>
            <p className="text-gray-500">
              Thử thay đổi bộ lọc để tìm sản phẩm phù hợp
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        {!isLoading && filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all active:scale-95">
              Xem thêm sản phẩm 🔥
            </button>
          </div>
        )}
      </div>

      {/* FOMO Elements - Floating notification */}
      <div className="fixed bottom-4 left-4 z-40 hidden md:block">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-3 max-w-xs animate-bounce">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-600">
              <strong className="text-gray-900">Nguyễn Văn A</strong> vừa mua
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1 truncate">
            Laptop Gaming ASUS ROG...
          </p>
          <p className="text-xs text-green-600">2 phút trước</p>
        </div>
      </div>
    </div>
  );
}
