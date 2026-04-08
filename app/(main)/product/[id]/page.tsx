"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { getProductById, formatPrice, products, type Product } from "@/data/products";

// Types (extended from data/products)
interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

interface ProductSpec {
  label: string;
  value: string;
}

// Star Rating Component
const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < fullStars
                ? "text-yellow-400"
                : i === fullStars && hasHalfStar
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-gray-600">
        {rating} ({reviewCount} đánh giá)
      </span>
    </div>
  );
};

// Image Gallery Component
const ImageGallery = ({ images, productName }: { images: ProductImage[]; productName: string }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden group">
        <Image
          src={images[selectedImage].url}
          alt={images[selectedImage].alt}
          fill
          className={`object-cover transition-transform duration-300 ${isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"}`}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div
          className="absolute inset-0 bg-transparent"
          onClick={() => setIsZoomed(!isZoomed)}
        />
        {/* Zoom Icon */}
        <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isZoomed ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            )}
          </svg>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => {
              setSelectedImage(index);
              setIsZoomed(false);
            }}
            className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === index ? "border-[#e30019]" : "border-transparent hover:border-gray-300"
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

// Quantity Selector Component
const QuantitySelector = ({
  quantity,
  maxQuantity,
  onChange,
}: {
  quantity: number;
  maxQuantity: number;
  onChange: (value: number) => void;
}) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg">
      <button
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
        className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Giảm số lượng"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
      <button
        onClick={() => onChange(Math.min(maxQuantity, quantity + 1))}
        disabled={quantity >= maxQuantity}
        className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Tăng số lượng"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

// Product Info Component
const ProductInfo = ({
  product,
  quantity,
  setQuantity,
}: {
  product: Product;
  quantity: number;
  setQuantity: (value: number) => void;
}) => {
  const { addItem, isInCart } = useCart();
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0].url,
        maxQuantity: product.stock,
      },
      quantity
    );
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Brand & SKU */}
      <div className="flex items-center gap-3 text-sm">
        <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">{product.brand}</span>
        <span className="text-gray-500">SKU: {product.sku}</span>
      </div>

      {/* Product Name */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
        {product.name}
      </h1>

      {/* Rating */}
      <StarRating rating={product.rating} reviewCount={product.reviewCount} />

      {/* Price */}
      <div className="flex items-baseline gap-4">
        <span className="text-3xl md:text-4xl font-bold text-[#e30019]">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-xl text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              -{discount}%
            </span>
          </>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
        <span className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
          {product.stock > 0 ? `Còn hàng (${product.stock} sản phẩm)` : "Hết hàng"}
        </span>
      </div>

      {/* Warranty */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>Bảo hành: {product.warranty}</span>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-700">Số lượng:</span>
          <QuantitySelector quantity={quantity} maxQuantity={product.stock} onChange={setQuantity} />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${
              product.stock === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : isInCart(product.id)
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-[#e30019] hover:bg-red-700 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {isInCart(product.id) ? "Đã thêm vào giỏ" : "Thêm vào giỏ hàng"}
            </span>
          </button>

          <button className="p-4 border-2 border-gray-300 rounded-xl hover:border-[#e30019] hover:text-[#e30019] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Added to Cart Message */}
        {showAddedMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center justify-between animate-pulse">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Đã thêm {quantity} sản phẩm vào giỏ hàng!
            </span>
            <Link href="/cart" className="text-green-800 font-medium hover:underline">
              Xem giỏ hàng →
            </Link>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <h3 className="font-semibold text-gray-900">Điểm nổi bật</h3>
        <ul className="space-y-2">
          {(product.features ?? []).map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Product Tabs Component
const ProductTabs = ({ product }: { product: Product }) => {
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");

  return (
    <div className="mt-12">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        {[
          { id: "description" as const, label: "Mô tả sản phẩm" },
          { id: "specs" as const, label: "Thông số kỹ thuật" },
          { id: "reviews" as const, label: `Đánh giá (${product.reviewCount})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium text-sm transition-colors relative ${
              activeTab === tab.id
                ? "text-[#e30019]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e30019]" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === "description" && (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6">
                <h4 className="font-bold text-[#e30019] mb-3">🎮 Gaming Performance</h4>
                <p className="text-sm text-gray-700">Trải nghiệm gaming mượt mà với RTX 4060, xử lý tốt mọi tựa game AAA ở độ phân giải cao.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                <h4 className="font-bold text-blue-600 mb-3">💼 Productivity</h4>
                <p className="text-sm text-gray-700">Làm việc hiệu quả với CPU 24 nhân, render video, chỉnh sửa ảnh chuyên nghiệp.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <tbody>
                {(product.specifications ?? []).map((spec, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-6 py-4 font-medium text-gray-700 w-1/3">{spec.label}</td>
                    <td className="px-6 py-4 text-gray-900">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-xl">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900">{product.rating}</div>
                <div className="flex items-center justify-center gap-1 text-yellow-400 my-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-sm text-gray-600">{product.reviewCount} đánh giá</div>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-8">{star} sao</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-right">
                      {star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Reviews */}
            <div className="space-y-4">
              {[
                { name: "Nguyễn Văn A", rating: 5, date: "15/03/2026", content: "Laptop rất mượt, chơi game ổn định ở 165Hz. Tản nhiệt tốt, không quá ồn." },
                { name: "Trần Thị B", rating: 5, date: "10/03/2026", content: "Thiết kế đẹp, màn hình sắc nét. Giao hàng nhanh, đóng gói cẩn thận." },
                { name: "Lê Văn C", rating: 4, date: "05/03/2026", content: "Hiệu năng tốt, nhưng pin hơi nhanh hết khi chơi game không cắm sạc." },
              ].map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{review.name}</div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex text-yellow-400">
                          {[...Array(review.rating)].map((_, i) => (
                            <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 pl-13">{review.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Related Products Component
const RelatedProducts = () => {
  const relatedProducts = [
    { id: "laptop-002", name: "MSI Katana 15 B13VFK-676VN", price: 32990000, image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=300&fit=crop" },
    { id: "laptop-003", name: "Acer Nitro 5 AN515-58-773Y", price: 24990000, image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop" },
    { id: "laptop-004", name: "Lenovo Legion 5 15IAH7H", price: 28990000, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop" },
    { id: "laptop-005", name: "HP Omen 16-wf0004tx", price: 31990000, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop" },
  ];

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sản phẩm tương tự</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-[#e30019] transition-colors">
                {product.name}
              </h3>
              <p className="text-lg font-bold text-[#e30019]">{formatPrice(product.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Breadcrumb Component
const Breadcrumb = ({ product }: { product: Product }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
      <Link href="/" className="hover:text-[#e30019]">Trang chủ</Link>
      <span>/</span>
      <Link href="/laptop-gaming" className="hover:text-[#e30019]">Laptop Gaming</Link>
      <span>/</span>
      <span className="text-gray-900 font-medium">{product.name}</span>
    </nav>
  );
};

// Main Product Detail Page
export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const productId = (params?.id as string) || "laptop-001";
  const product = getProductById(productId) || products[0];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb product={product} />

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <ImageGallery images={product.images} productName={product.name} />

          {/* Right: Product Info */}
          <ProductInfo product={product} quantity={quantity} setQuantity={setQuantity} />
        </div>

        {/* Product Tabs */}
        <ProductTabs product={product} />

        {/* Related Products */}
        <RelatedProducts />
      </div>
    </div>
  );
}
