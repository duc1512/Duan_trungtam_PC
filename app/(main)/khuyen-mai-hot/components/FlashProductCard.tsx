"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/data/products";
import ProgressBar from "./ProgressBar";

// Cart Toast Component
const CartToast = ({ show, productName, onClose }: { show: boolean; productName: string; onClose: () => void }) => {
  if (!show) return null;
  return (
    <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-bounce flex items-center gap-3">
      <div className="bg-white/20 rounded-full p-1">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <div className="font-semibold">Đã thêm vào giỏ!</div>
        <div className="text-sm opacity-90 line-clamp-1">{productName}</div>
      </div>
      <Link href="/cart" className="ml-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm">
        Xem giỏ →
      </Link>
    </div>
  );
};

interface FlashProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  sold: number;
  total: number;
  rating: number;
  reviewCount: number;
  endTime?: string;
  badge?: string;
}

export default function FlashProductCard({
  id,
  name,
  image,
  price,
  originalPrice,
  sold,
  total,
  rating,
  reviewCount,
  badge,
}: FlashProductCardProps) {
  const { addItem, isInCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  const inCart = isInCart(id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inCart || isAdding) return;

    setIsAdding(true);
    
    const success = addItem(
      {
        id,
        name,
        price,
        image,
        maxQuantity: total - sold,
      },
      1
    );

    if (success) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }

    // Show adding animation
    setTimeout(() => setIsAdding(false), 1000);
  };

  // Determine stock status
  const percentage = (sold / total) * 100;
  let stockStatus = "Còn hàng";
  let statusColor = "text-green-600";
  
  if (percentage >= 95) {
    stockStatus = "Sắp hết";
    statusColor = "text-red-600";
  } else if (percentage >= 80) {
    stockStatus = "Bán chạy";
    statusColor = "text-orange-600";
  } else if (total - sold <= 0) {
    stockStatus = "Hết hàng";
    statusColor = "text-gray-500";
  }

  return (
    <>
      {/* Cart Toast */}
      <CartToast 
        show={showToast} 
        productName={name} 
        onClose={() => setShowToast(false)} 
      />
      
      <div
        className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Discount Badge */}
      <div className="absolute top-3 left-3 z-10">
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-sm px-3 py-1.5 rounded-lg shadow-lg">
          -{discount}%
        </div>
      </div>

      {/* Special Badge */}
      {badge && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
            {badge}
          </div>
        </div>
      )}

      {/* Image Container */}
      <Link href={`/product/${id}`} className="block relative aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={imageError ? "https://via.placeholder.com/400x400?text=No+Image" : image}
          alt={name}
          fill
          className={`object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onError={() => setImageError(true)}
        />

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-black/0 transition-all duration-300 ${
            isHovered ? "bg-black/5" : ""
          }`}
        />

        {/* Quick view button on hover */}
        <div
          className={`absolute inset-x-4 bottom-4 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-sm text-center py-2 rounded-lg shadow-lg text-sm font-medium text-gray-800">
            Xem chi tiết →
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Name */}
        <Link href={`/product/${id}`}>
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors min-h-[48px]">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-current" : "text-gray-300"}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">({reviewCount})</span>
          <span className={`text-xs font-medium ml-auto ${statusColor}`}>{stockStatus}</span>
        </div>

        {/* Prices */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-red-600">
              {formatPrice(price)}
            </span>
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <ProgressBar sold={sold} total={total} className="mb-3" />

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={inCart || isAdding || total - sold <= 0}
          className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            inCart
              ? "bg-green-500 text-white cursor-default"
              : isAdding
              ? "bg-orange-500 text-white"
              : total - sold <= 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-red-600 to-orange-500 text-white hover:from-red-700 hover:to-orange-600 shadow-md hover:shadow-lg active:scale-95"
          }`}
        >
          {inCart ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Đã thêm
            </>
          ) : isAdding ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Đang thêm...
            </>
          ) : total - sold <= 0 ? (
            "Hết hàng"
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Mua ngay
            </>
          )}
        </button>
      </div>
    </div>
    </>
  );
}
