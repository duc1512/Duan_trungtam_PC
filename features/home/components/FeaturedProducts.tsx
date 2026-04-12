"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { products, type Product } from "@/data/products";
import { ProductCard } from "@/features/products";

export default function FeaturedProducts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Lấy 8 sản phẩm đầu tiên làm nổi bật (hoặc có thể lọc theo tiêu chí khác)
  const featuredProducts = products.slice(0, 8);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(featuredProducts.length / itemsPerPage);

  // Auto slide every 5 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [totalPages]);

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg md:text-xl text-gray-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          Sản phẩm nổi bật
        </h3>
        <Link 
          href="/san-pham-noi-bat" 
          className="text-sm text-red-600 font-semibold hover:text-red-700 transition-colors flex items-center gap-1 group"
        >
          Xem tất cả
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Products Grid Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {[0, 1].map((pageIndex) => (
              <div 
                key={pageIndex} 
                className="w-full flex-shrink-0 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
              >
                {featuredProducts
                  .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                  .map((product, idx) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={pageIndex * itemsPerPage + idx}
                      showRank={false}
                      showBadges={true}
                      onQuickView={handleQuickView}
                      variant="compact"
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white shadow-lg border border-gray-100 text-gray-600 w-10 h-10 rounded-full flex items-center justify-center hover:text-red-600 hover:shadow-xl transition-all z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
        )}

        {currentPage < totalPages - 1 && (
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-white shadow-lg border border-gray-100 text-gray-600 w-10 h-10 rounded-full flex items-center justify-center hover:text-red-600 hover:shadow-xl transition-all z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        )}
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`transition-all cursor-pointer rounded-full ${
                currentPage === i
                  ? "w-6 h-2 bg-red-600"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setQuickViewProduct(null)} 
          />
          <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden relative">
                <img
                  src={quickViewProduct.image || "/placeholder-product.png"}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">{quickViewProduct.brand}</span>
                <h2 className="text-xl font-bold text-gray-900 mt-1">{quickViewProduct.name}</h2>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-red-600">
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="ml-2 text-lg text-gray-400 line-through">
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(quickViewProduct.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">{quickViewProduct.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
