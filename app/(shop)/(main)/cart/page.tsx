"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/features/cart";

// ==================== UTILITY FUNCTIONS ====================
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
};

// ==================== COMPONENTS ====================

// Breadcrumb
const Breadcrumb = () => (
  <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
    <Link href="/" className="hover:text-[#e30019] transition-colors">Trang chủ</Link>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
    <span className="text-gray-900 font-medium">Giỏ hàng</span>
  </nav>
);

// Quantity Selector
const QuantitySelector = ({
  quantity,
  maxQuantity,
  onIncrease,
  onDecrease,
  onChange,
}: {
  quantity: number;
  maxQuantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChange: (value: number) => void;
}) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Giảm số lượng"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <input
        type="number"
        min={1}
        max={maxQuantity}
        value={quantity}
        onChange={(e) => {
          const value = parseInt(e.target.value) || 1;
          onChange(Math.min(Math.max(value, 1), maxQuantity));
        }}
        className="w-12 text-center font-medium text-gray-900 border-x border-gray-300 py-2 focus:outline-none"
      />
      <button
        onClick={onIncrease}
        disabled={quantity >= maxQuantity}
        className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Tăng số lượng"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

// Cart Item Component
const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: ReturnType<typeof useCart>["items"][0];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) => {
  const itemTotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-0">
      {/* Product Image */}
      <Link href={`/product/${item.id}`} className="flex-shrink-0">
        <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <Link href={`/product/${item.id}`} className="block">
          <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-[#e30019] transition-colors">
            {item.name}
          </h3>
        </Link>
        
        <div className="mt-1 text-sm text-gray-500">
          Mã: {item.id}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          {/* Quantity Selector */}
          <QuantitySelector
            quantity={item.quantity}
            maxQuantity={item.maxQuantity || 99}
            onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
            onDecrease={() => onUpdateQuantity(item.id, item.quantity - 1)}
            onChange={(value) => onUpdateQuantity(item.id, value)}
          />

          {/* Price */}
          <div className="text-right flex-1">
            <div className="font-bold text-[#e30019] text-lg">{formatPrice(itemTotal)}</div>
            <div className="text-sm text-gray-500">{formatPrice(item.price)} / sản phẩm</div>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(item.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Xóa sản phẩm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Cart Summary Component
const CartSummary = ({
  subtotal,
  shipping,
  discount,
  total,
  onCheckout,
  itemCount,
}: {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  onCheckout: () => void;
  itemCount: number;
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    setIsApplying(true);
    // Simulate API call
    setTimeout(() => {
      setAppliedCoupon(couponCode);
      setIsApplying(false);
    }, 500);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Tóm tắt đơn hàng</h2>

      {/* Coupon Code */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Mã giảm giá</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Nhập mã giảm giá"
            disabled={!!appliedCoupon}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#e30019] focus:border-transparent uppercase disabled:bg-gray-100"
          />
          <button
            onClick={appliedCoupon ? () => setAppliedCoupon(null) : handleApplyCoupon}
            disabled={!couponCode.trim() || isApplying}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              appliedCoupon
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-300"
            }`}
          >
            {isApplying ? "..." : appliedCoupon ? "Hủy" : "Áp dụng"}
          </button>
        </div>
        {appliedCoupon && (
          <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Đã áp dụng mã: {appliedCoupon}
          </p>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 text-sm border-t border-gray-200 pt-4">
        <div className="flex justify-between text-gray-600">
          <span>Tạm tính ({itemCount} sản phẩm)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Phí vận chuyển</span>
          <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
            {shipping === 0 ? "Miễn phí" : formatPrice(shipping)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Giảm giá</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="border-t border-gray-200 mt-4 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-base font-medium text-gray-900">Tổng cộng</span>
          <span className="text-2xl font-bold text-[#e30019]">{formatPrice(total)}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">(Đã bao gồm VAT)</p>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="w-full mt-6 bg-[#e30019] hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        <span>Tiến hành thanh toán</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>

      {/* Payment Methods */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-3 text-center">Phương thức thanh toán</p>
        <div className="flex justify-center gap-4 opacity-60">
          {/* COD */}
          <div className="w-10 h-6 bg-gray-200 rounded" title="COD"></div>
          {/* Visa */}
          <div className="w-10 h-6 bg-blue-100 rounded" title="Visa"></div>
          {/* Mastercard */}
          <div className="w-10 h-6 bg-red-100 rounded" title="Mastercard"></div>
          {/* Momo */}
          <div className="w-10 h-6 bg-pink-100 rounded" title="Momo"></div>
        </div>
      </div>

      {/* Secure Badge */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span>Thanh toán an toàn & bảo mật</span>
      </div>
    </div>
  );
};

// Empty Cart Component
const EmptyCart = () => (
  <div className="text-center py-16">
    <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </div>
    <h2 className="text-xl font-bold text-gray-900 mb-2">Giỏ hàng của bạn đang trống</h2>
    <p className="text-gray-600 mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
    <Link
      href="/"
      className="inline-flex items-center gap-2 bg-[#e30019] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      Tiếp tục mua sắm
    </Link>
  </div>
);

// Recommended Products
const RecommendedProducts = () => {
  const products = [
    { id: "rec-1", name: "Chuột Logitech G Pro X", price: 2490000, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&h=200&fit=crop" },
    { id: "rec-2", name: "Bàn phím Keychron K2", price: 1890000, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=300&h=200&fit=crop" },
    { id: "rec-3", name: "Tai nghe HyperX Cloud II", price: 1590000, image: "https://images.unsplash.com/photo-1612444530582-fc87183c41a2?w=300&h=200&fit=crop" },
    { id: "rec-4", name: "Pad chuột SteelSeries", price: 450000, image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=300&h=200&fit=crop" },
  ];

  const { addItem } = useCart();

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Có thể bạn cũng thích</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
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
                <span className="font-bold text-[#e30019]">{formatPrice(product.price)}</span>
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
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

// ==================== MAIN CART PAGE ====================
export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Calculate values
  const subtotal = totalPrice;
  const shipping = subtotal > 50000000 ? 0 : 30000;
  const discount = 0; // Would be calculated based on coupons
  const total = subtotal + shipping - discount;

  const handleCheckout = () => {
    setIsLoading(true);
    // Navigate to checkout
    router.push("/checkout");
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Giỏ hàng của bạn
          {totalItems > 0 && <span className="text-lg font-normal text-gray-500 ml-2">({totalItems} sản phẩm)</span>}
        </h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Sản phẩm</h2>
                  <Link
                    href="/"
                    className="text-[#e30019] hover:underline text-sm font-medium"
                  >
                    Tiếp tục mua sắm
                  </Link>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>

                {/* Clear Cart Button */}
                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <button
                    onClick={() => {
                      if (confirm("Bạn có chắc muốn xóa tất cả sản phẩm khỏi giỏ hàng?")) {
                        items.forEach((item) => removeItem(item.id));
                      }
                    }}
                    className="text-gray-500 hover:text-red-500 text-sm flex items-center gap-1 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Xóa tất cả
                  </button>
                  
                  <div className="text-right">
                    <span className="text-gray-600">Tạm tính: </span>
                    <span className="font-bold text-lg text-gray-900">{formatPrice(subtotal)}</span>
                  </div>
                </div>
              </div>

              {/* Recommended Products */}
              <RecommendedProducts />
            </div>

            {/* Cart Summary - Sticky Sidebar */}
            <div className="lg:col-span-1">
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                discount={discount}
                total={total}
                onCheckout={handleCheckout}
                itemCount={totalItems}
              />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <EmptyCart />
          </div>
        )}
      </div>
    </div>
  );
}
