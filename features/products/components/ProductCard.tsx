"use client";

import { useState, useMemo, memo, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useCart } from "@/features/cart";
import { useFavorites } from "@/features/favorites";
import { useAuth } from "@/features/auth";
import { formatPrice, type Product } from "@/data/products";

// ==================== TYPES ====================
interface ProductCardProps {
  product: Product;
  index?: number;
  showRank?: boolean;
  showBadges?: boolean;
  onQuickView?: (product: Product) => void;
  variant?: "default" | "compact" | "flashsale";
}

// ==================== UTILITY FUNCTIONS ====================
const getMockSoldCount = (productId: string): number => {
  const hash = productId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return 500 + (hash % 9500);
};

const getMockRating = (
  productId: string,
): { rating: number; count: number } => {
  const hash = productId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return {
    rating: 4.5 + (hash % 10) / 20,
    count: 100 + (hash % 900),
  };
};

// ==================== COMPONENT ====================
const ProductCard = memo(
  ({
    product,
    index = 0,
    showRank = false,
    showBadges = true,
    onQuickView,
    variant = "default",
  }: ProductCardProps) => {
    const { addItem } = useCart();
    const { addToFavorites, removeFromFavorites, isInFavorites } =
      useFavorites();
    const { isLoggedIn, isAdmin } = useAuth();
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Sync with global favorites state
    const isWishlisted = isInFavorites(product.id);

    const soldCount = useMemo(() => getMockSoldCount(product.id), [product.id]);
    const { rating, count: ratingCount } = useMemo(
      () => getMockRating(product.id),
      [product.id],
    );

    const discount = useMemo(() => {
      if (!product.originalPrice || product.originalPrice <= product.price)
        return 0;
      return Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      );
    }, [product.originalPrice, product.price]);

    const handleAddToCart = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Prevent admin from adding to cart
        if (isAdmin) {
          toast.error("Tài khoản admin không thể mua hàng!", {
            duration: 2000,
            icon: "🚫",
          });
          return;
        }

        const success = addItem(
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image || "/placeholder-product.png",
          },
          1,
        );

        if (success) {
          toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`, {
            description: `Giá: ${formatPrice(product.price)}`,
            duration: 3000,
            icon: "�",
          });
        }
      },
      [addItem, product, isAdmin],
    );

    const handleWishlist = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isLoggedIn) {
          toast.error("Vui lòng đăng nhập để thêm vào yêu thích!", {
            duration: 2000,
            icon: "🔒",
          });
          return;
        }

        if (isWishlisted) {
          removeFromFavorites(product.id);
          toast.info("Đã xóa khỏi yêu thích!", {
            duration: 2000,
            icon: "💔",
          });
        } else {
          const success = addToFavorites({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            originalPrice: product.originalPrice,
            rating: product.rating,
            reviewCount: product.reviewCount,
            image: product.image || "/placeholder-product.png",
            inStock: product.inStock ?? true,
          });

          if (success) {
            toast.success("Đã thêm vào yêu thích!", {
              duration: 2000,
              icon: "❤️",
            });
          }
        }
      },
      [isWishlisted, isLoggedIn, product, addToFavorites, removeFromFavorites],
    );

    const handleQuickView = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onQuickView?.(product);
      },
      [onQuickView, product],
    );

    const formatSoldCount = (count: number): string => {
      if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
      return count.toString();
    };

    const isCompact = variant === "compact";
    const isFlashSale = variant === "flashsale";

    return (
      <Link
        href={`/product/${product.id}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`bg-white border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300 ${
            isFlashSale ? "rounded-xl" : "rounded-xl"
          }`}
        >
          {/* Image Container */}
          <div
            className={`relative bg-gray-50 overflow-hidden ${isCompact ? "aspect-[4/3]" : "aspect-square"}`}
          >
            {/* Loading Skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}

            {/* Discount Badge */}
            {showBadges && discount > 0 && (
              <div className="absolute top-2 left-2 z-10">
                <div
                  className={`bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded shadow-md ${
                    isCompact
                      ? "text-[9px] px-1.5 py-0.5"
                      : "text-[10px] px-2 py-1"
                  }`}
                >
                  -{discount}%
                </div>
              </div>
            )}

            {/* Rank Badge */}
            {showRank && index < 3 && (
              <div
                className={`absolute top-2 right-2 z-10 rounded-full flex items-center justify-center font-bold shadow-md ${
                  index === 0
                    ? "bg-yellow-400 text-yellow-900"
                    : index === 1
                      ? "bg-gray-300 text-gray-700"
                      : "bg-orange-300 text-orange-900"
                } ${isCompact ? "w-6 h-6 text-[10px]" : "w-7 h-7 text-xs"}`}
              >
                #{index + 1}
              </div>
            )}

            {/* Best Seller / Hot Badge */}
            {showBadges && soldCount > 5000 && (
              <div className="absolute bottom-2 left-2 z-10">
                <div
                  className={`bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded flex items-center gap-0.5 ${
                    isCompact
                      ? "text-[8px] px-1.5 py-0.5"
                      : "text-[9px] px-2 py-0.5"
                  }`}
                >
                  <svg
                    className={isCompact ? "w-2 h-2" : "w-3 h-3"}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {isCompact ? "HOT" : "BEST"}
                </div>
              </div>
            )}

            {/* Product Image */}
            <Image
              src={product.image || "/placeholder-product.png"}
              alt={product.name}
              fill
              className={`object-contain transition-all duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              } ${isHovered ? "scale-110" : "scale-100"} ${
                isCompact ? "p-2" : "p-3"
              }`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              onLoad={() => setImageLoaded(true)}
            />

            {/* Hover Actions Overlay */}
            <div
              className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {onQuickView && (
                <button
                  onClick={handleQuickView}
                  className="bg-white text-gray-800 p-2 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors shadow-lg transform hover:scale-110"
                  title="Xem nhanh"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={handleAddToCart}
                className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg transform hover:scale-110"
                title="Thêm vào giỏ"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlist}
              className={`absolute z-10 p-1.5 rounded-full transition-all duration-300 ${
                isWishlisted
                  ? "bg-red-500 text-white"
                  : "bg-white/80 text-gray-400 hover:text-red-500"
              } ${isCompact ? "top-1.5 right-1.5" : "top-2 right-10"}`}
            >
              <svg
                className={isCompact ? "w-3.5 h-3.5" : "w-4 h-4"}
                fill={isWishlisted ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className={isCompact ? "p-2" : "p-3"}>
            {/* Brand */}
            {!isCompact && (
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                {product.brand}
              </span>
            )}

            {/* Product Name */}
            <h3
              className={`text-gray-800 font-medium line-clamp-2 leading-snug group-hover:text-red-600 transition-colors ${
                isCompact ? "text-xs h-8 mt-0.5" : "text-sm h-10 mt-0.5"
              }`}
            >
              {product.name}
            </h3>

            {/* Rating - không hiển thị ở compact mode */}
            {!isCompact && (
              <div className="flex items-center gap-1 mt-1.5">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-200"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[10px] text-gray-400">
                  ({ratingCount})
                </span>
              </div>
            )}

            {/* Price */}
            <div
              className={`flex items-baseline gap-2 ${isCompact ? "mt-1" : "mt-2"}`}
            >
              <span
                className={`text-red-600 font-bold ${isCompact ? "text-sm" : "text-base"}`}
              >
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && !isCompact && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Sold Count + FOMO */}
            <div
              className={`flex items-center justify-between ${isCompact ? "mt-1" : "mt-2"}`}
            >
              <span
                className={`text-gray-500 ${isCompact ? "text-[9px]" : "text-[10px]"}`}
              >
                Đã bán {formatSoldCount(soldCount)}
              </span>
              {soldCount > 8000 && (
                <span
                  className={`text-red-500 font-medium animate-pulse ${isCompact ? "text-[9px]" : "text-[10px]"}`}
                >
                  🔥 Sắp hết
                </span>
              )}
            </div>

            {/* Progress Bar for FOMO */}
            {!isCompact && soldCount > 5000 && (
              <div className="mt-2">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    style={{
                      width: `${Math.min(95, (soldCount / 10000) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  },
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
