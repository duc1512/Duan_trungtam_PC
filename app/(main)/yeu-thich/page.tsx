"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { useFavorites, type FavoriteItem } from "@/hooks/useFavorites";

// WishlistItem is now FavoriteItem from useFavorites
interface WishlistItem extends FavoriteItem {}

// ==================== UTILITY FUNCTIONS ====================
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

// ==================== COMPONENTS ====================

// Breadcrumb
const Breadcrumb = () => (
  <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
    <Link href="/" className="hover:text-[#e30019] transition-colors">
      Trang chủ
    </Link>
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
    <span className="text-gray-900 font-medium">Sản phẩm yêu thích</span>
  </nav>
);

// Star Rating
const StarRating = ({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) => (
  <div className="flex items-center gap-1">
    <svg
      className="w-4 h-4 text-yellow-400"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
    <span className="text-sm font-medium text-gray-700">{rating}</span>
    <span className="text-sm text-gray-500">({reviewCount})</span>
  </div>
);

// Wishlist Item Card
const WishlistItemCard = ({
  item,
  onRemove,
  onAddToCart,
}: {
  item: WishlistItem;
  onRemove: (id: string) => void;
  onAddToCart: (item: WishlistItem) => void;
}) => {
  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <Link
        href={`/product/${item.id}`}
        className="block relative aspect-[4/3] bg-gray-100 overflow-hidden"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-[#e30019] text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
        {!item.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium">
              Hết hàng
            </span>
          </div>
        )}

        {/* Remove Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onRemove(item.id);
          }}
          className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all"
          title="Xóa khỏi yêu thích"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{item.brand}</div>
        <Link href={`/product/${item.id}`}>
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-[#e30019] transition-colors min-h-[3rem]">
            {item.name}
          </h3>
        </Link>

        <StarRating rating={item.rating} reviewCount={item.reviewCount} />

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-[#e30019]">
            {formatPrice(item.price)}
          </span>
          {item.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(item.originalPrice)}
            </span>
          )}
        </div>

        {/* Added Date */}
        <div className="mt-2 text-xs text-gray-400">
          Đã thêm: {formatDate(item.addedAt)}
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onAddToCart(item)}
            disabled={!item.inStock}
            className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
              item.inStock
                ? "bg-[#e30019] hover:bg-red-700 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <svg
              className="w-4 h-4"
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
            {item.inStock ? "Thêm vào giỏ" : "Hết hàng"}
          </button>

          <button
            onClick={() => onRemove(item.id)}
            className="p-2.5 border border-gray-300 hover:border-red-300 hover:text-red-500 rounded-lg transition-colors"
            title="Xóa"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Empty Wishlist
const EmptyWishlist = () => (
  <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
    <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
      <svg
        className="w-16 h-16 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </div>
    <h2 className="text-xl font-bold text-gray-900 mb-2">
      Danh sách yêu thích trống
    </h2>
    <p className="text-gray-600 mb-6">
      Bạn chưa có sản phẩm nào trong danh sách yêu thích
    </p>
    <Link
      href="/"
      className="inline-flex items-center gap-2 bg-[#e30019] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
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
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      Tiếp tục mua sắm
    </Link>
  </div>
);

// Similar Products
const SimilarProducts = () => {
  const products = [
    {
      id: "sim-1",
      name: "Laptop Dell XPS 15 9520",
      price: 45990000,
      image:
        "https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=300&h=200&fit=crop",
    },
    {
      id: "sim-2",
      name: "MacBook Pro 14 M3 Pro",
      price: 52990000,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop",
    },
    {
      id: "sim-3",
      name: "Acer Predator Helios 300",
      price: 38990000,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
    },
    {
      id: "sim-4",
      name: "Razer Blade 14",
      price: 55990000,
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop",
    },
  ];

  const { addItem } = useCart();

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Có thể bạn cũng thích
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative aspect-[3/2]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </Link>
            <div className="p-4">
              <Link href={`/product/${product.id}`}>
                <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2 hover:text-[#e30019] transition-colors">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#e30019]">
                  {formatPrice(product.price)}
                </span>
                <button
                  onClick={() =>
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      maxQuantity: 10,
                    })
                  }
                  className="p-2 bg-gray-100 hover:bg-[#e30019] hover:text-white rounded-lg transition-colors"
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== MAIN WISHLIST PAGE ====================
export default function WishlistPage() {
  const {
    items: wishlistItems,
    removeFromFavorites,
    clearFavorites,
  } = useFavorites();
  const { addItem } = useCart();
  const [showToast, setShowToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Remove from wishlist
  const handleRemove = (id: string) => {
    removeFromFavorites(id);
    showToastMessage("Đã xóa khỏi danh sách yêu thích", "success");
  };

  // Add to cart
  const handleAddToCart = (item: WishlistItem) => {
    if (!item.inStock) {
      showToastMessage("Sản phẩm đã hết hàng", "error");
      return;
    }

    addItem(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        maxQuantity: 10,
      },
      1,
    );
    showToastMessage("Đã thêm vào giỏ hàng", "success");
  };

  // Add all to cart
  const handleAddAllToCart = () => {
    let addedCount = 0;
    wishlistItems.forEach((item) => {
      if (item.inStock) {
        addItem(
          {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            maxQuantity: 10,
          },
          1,
        );
        addedCount++;
      }
    });
    if (addedCount > 0) {
      showToastMessage(
        `Đã thêm ${addedCount} sản phẩm vào giỏ hàng`,
        "success",
      );
    } else {
      showToastMessage("Không có sản phẩm nào có thể thêm", "error");
    }
  };

  // Clear all favorites
  const handleClearAll = () => {
    clearFavorites();
    showToastMessage("Đã xóa tất cả sản phẩm yêu thích", "success");
  };

  // Show toast
  const showToastMessage = (message: string, type: "success" | "error") => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Sản phẩm yêu thích
            </h1>
            <p className="text-gray-600 mt-1">
              {wishlistItems.length} sản phẩm trong danh sách
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={handleAddAllToCart}
                className="px-4 py-2 bg-[#e30019] hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
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
                Thêm tất cả vào giỏ
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 border border-gray-300 hover:border-red-300 hover:text-red-500 text-gray-700 font-medium rounded-lg transition-colors"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Grid */}
        {wishlistItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {wishlistItems.map((item) => (
                <WishlistItemCard
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {/* Similar Products */}
            <SimilarProducts />
          </>
        ) : (
          <EmptyWishlist />
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in ${
            showToast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {showToast.message}
        </div>
      )}
    </div>
  );
}
