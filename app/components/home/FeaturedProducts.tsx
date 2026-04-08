"use client";

import Link from "next/link";
import { useState } from "react";

export default function FeaturedProducts() {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const products = [
    { id: "laptop-001", name: "Laptop Gaming ASUS ROG Strix G16", price: "44.990.000đ", oldPrice: "49.990.000đ", badge: "-10%", badgeColor: "bg-red-500" },
    { id: "laptop-002", name: "MacBook Pro M3 Max 14-inch", price: "65.990.000đ", badge: "HOT", badgeColor: "bg-orange-500" },
    { id: "pc-001", name: "PC Gaming RTX 4070 Ti", price: "38.990.000đ", oldPrice: "42.990.000đ", badge: "NEW", badgeColor: "bg-green-500" },
    { id: "cpu-001", name: "Intel Core i9-14900K", price: "15.490.000đ", badge: "BEST", badgeColor: "bg-purple-500" },
  ];

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
        : product.id === "pc-001"
        ? "1587202372775-4abc9295e321"
        : "1555680202-c86f0e12f086";
    return `https://images.unsplash.com/photo-${photoId}?w=200&h=200&fit=crop`;
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
          <span className="text-xl">⭐</span> Sản phẩm nổi bật
        </h3>
        <Link href="/products" className="text-sm text-[#e30019] font-semibold hover:underline">
          Xem tất cả →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
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
    </div>
  );
}
