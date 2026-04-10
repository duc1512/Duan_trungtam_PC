"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Product } from "@/data/products-data/types";
import { formatPrice } from "@/data/products-data";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
  onAddSuccess?: (productName: string) => void;
}

export default function ProductCard({ product, onAddSuccess }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showAdded, setShowAdded] = useState(false);
  const { addItem, isInCart } = useCart();

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const alreadyInCart = isInCart(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const success = addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "/placeholder-product.png",
    });
    if (success) {
      setShowAdded(true);
      onAddSuccess?.(product.name);
      setTimeout(() => setShowAdded(false), 1500);
    }
  };

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <Image
            src={imgError || !product.image ? "/placeholder-product.png" : product.image}
            alt={product.name}
            fill
            onError={() => setImgError(true)}
            className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{discount}%
              </span>
            )}
            {product.sales && product.sales > 100 && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                🔥 Bán chạy
              </span>
            )}
            {product.rating && product.rating >= 4.8 && (
              <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                ⭐ Top Rated
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            disabled={showAdded}
            className={`absolute bottom-3 right-3 p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            } ${showAdded ? 'bg-green-500' : alreadyInCart ? 'bg-green-600' : 'bg-[#e30019] hover:bg-red-700'}`}
          >
            {showAdded ? (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : alreadyInCart ? (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            )}
          </button>
        </div>

        {/* Product Info */}
      </Link>
      <div className="p-3">
        {/* Brand */}
        <div className="text-xs text-gray-500 mb-1">{product.brand}</div>

        {/* Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-[#e30019] transition-colors mb-2 min-h-[40px]">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating || 0) ? 'fill-current' : 'text-gray-300'}`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount || 0})</span>
          {product.sales && product.sales > 0 && (
            <span className="text-xs text-gray-400 ml-auto">Đã bán {product.sales}</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#e30019]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
