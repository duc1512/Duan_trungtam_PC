"use client";

import Link from "next/link";
import { useState } from "react";

export default function FeaturedProducts() {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(0);

  const products = [
    { id: "laptop-001", name: "Laptop Gaming ASUS ROG Strix G16", price: "44.990.000đ", oldPrice: "49.990.000đ", badge: "-10%", badgeColor: "bg-red-500" },
    { id: "laptop-002", name: "MacBook Pro M3 Max 14-inch", price: "65.990.000đ", badge: "HOT", badgeColor: "bg-orange-500" },
    { id: "monitor-001", name: "Màn hình ASUS ROG 27\" 2K 170Hz", price: "8.990.000đ", oldPrice: "10.990.000đ", badge: "NEW", badgeColor: "bg-green-500" },
    { id: "cpu-001", name: "Intel Core i9-14900K", price: "15.490.000đ", badge: "BEST", badgeColor: "bg-purple-500" },
    { id: "mouse-001", name: "Logitech G Pro X Superlight", price: "2.490.000đ", oldPrice: "2.990.000đ", badge: "-17%", badgeColor: "bg-green-500" },
    { id: "keyboard-001", name: "AKKO 3098B Tokyo Keyboard", price: "1.890.000đ", oldPrice: "2.290.000đ", badge: "-17%", badgeColor: "bg-pink-500" },
    { id: "headset-001", name: "Razer Kraken V3 Pro", price: "3.490.000đ", oldPrice: "4.290.000đ", badge: "-19%", badgeColor: "bg-emerald-500" },
  ];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleImgError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const getImageUrl = (product: (typeof products)[0]) => {
    if (imgErrors[product.id]) return "/placeholder-product.png";
    const photoId =
      product.id === "laptop-001"
        ? "1611186871348-b1ce696e52c9"
        : product.id === "laptop-002"
        ? "1517336714731-489689fd1ca8"
        : product.id === "monitor-001"
        ? "1527443224154-c4a3942d3acf"
        : product.id === "mouse-001"
        ? "1527864550417-7fd91fc51a46"
        : product.id === "keyboard-001"
        ? "1595225476474-87563907a212"
        : "1555680202-c86f0e12f086";
    return `https://images.unsplash.com/photo-${photoId}?w=200&h=200&fit=crop`;
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
          <span className="text-xl">⭐</span> Sản phẩm nổi bật
        </h3>
        <Link href="/san-pham-noi-bat" className="text-sm text-[#e30019] font-semibold hover:underline">
          Xem tất cả →
        </Link>
      </div>
      <div className="relative">
        {/* Slider Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {[0, 1].map((pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0 grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-2 aspect-square">
              <img
                src={getImageUrl(product)}
                alt={product.name}
                onError={() => handleImgError(product.id)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <span className={`absolute top-2 left-2 ${product.badgeColor} text-white text-xs px-2 py-1 rounded font-bold`}>
                {product.badge}
              </span>
            </div>
            <h4 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-[#e30019]">
              {product.name}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-bold text-[#e30019]">{product.price}</span>
              {product.oldPrice && (
                <span className="text-xs text-gray-400 line-through">{product.oldPrice}</span>
              )}
            </div>
          </Link>
            ))}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white/90 backdrop-blur shadow-md text-gray-600 w-10 h-10 rounded-full flex items-center justify-center hover:text-[#e30019] hover:shadow-lg transition-all z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-white/90 backdrop-blur shadow-md text-gray-600 w-10 h-10 rounded-full flex items-center justify-center hover:text-[#e30019] hover:shadow-lg transition-all z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`${
                currentPage === i
                  ? "w-6 h-2 bg-[#e30019] rounded-full"
                  : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
              } transition-all cursor-pointer`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
