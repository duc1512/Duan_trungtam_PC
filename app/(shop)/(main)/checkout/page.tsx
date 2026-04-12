"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/features/cart";

// ==================== TYPES ====================
type ShippingMethod = "standard" | "express" | "same-day";
type PaymentMethod = "cod" | "bank-transfer" | "momo" | "vnpay" | "credit-card";

interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  note: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  province?: string;
  district?: string;
}

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
const Breadcrumb = ({ step }: { step: number }) => {
  const steps = [
    { name: "Giỏ hàng", href: "/cart" },
    { name: "Thông tin", href: "#" },
    { name: "Thanh toán", href: "#" },
  ];

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
      {steps.map((s, index) => (
        <span key={s.name} className="flex items-center gap-2">
          {index > 0 && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>}
          {index < step ? (
            <Link href={s.href} className="hover:text-[#e30019] transition-colors">
              {s.name}
            </Link>
          ) : (
            <span className={index === step ? "text-gray-900 font-medium" : "text-gray-400"}>
              {s.name}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
};

// Form Input Component
const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#e30019] focus:border-transparent transition-all ${
        error ? "border-red-500 bg-red-50" : "border-gray-300"
      }`}
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

// Shipping Method Selection
const ShippingMethodSelector = ({
  selected,
  onChange,
}: {
  selected: ShippingMethod;
  onChange: (method: ShippingMethod) => void;
}) => {
  const methods = [
    {
      id: "standard" as ShippingMethod,
      name: "Giao hàng tiêu chuẩn",
      description: "Nhận hàng trong 2-3 ngày",
      price: 30000,
      icon: "🚚",
    },
    {
      id: "express" as ShippingMethod,
      name: "Giao hàng nhanh",
      description: "Nhận hàng trong 1-2 ngày",
      price: 50000,
      icon: "⚡",
    },
    {
      id: "same-day" as ShippingMethod,
      name: "Giao trong ngày",
      description: "Nhận hàng trong vòng 4 giờ",
      price: 100000,
      icon: "🚀",
    },
  ];

  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <label
          key={method.id}
          className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
            selected === method.id
              ? "border-[#e30019] bg-red-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="shipping"
            value={method.id}
            checked={selected === method.id}
            onChange={() => onChange(method.id)}
            className="w-4 h-4 text-[#e30019]"
          />
          <span className="text-2xl">{method.icon}</span>
          <div className="flex-1">
            <div className="font-medium text-gray-900">{method.name}</div>
            <div className="text-sm text-gray-500">{method.description}</div>
          </div>
          <div className="font-bold text-[#e30019]">
            {method.price === 0 ? "Miễn phí" : formatPrice(method.price)}
          </div>
        </label>
      ))}
    </div>
  );
};

// Payment Method Selection
const PaymentMethodSelector = ({
  selected,
  onChange,
}: {
  selected: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}) => {
  const methods = [
    {
      id: "cod" as PaymentMethod,
      name: "Thanh toán khi nhận hàng (COD)",
      description: "Thanh toán bằng tiền mặt khi nhận hàng",
      icon: "💵",
    },
    {
      id: "momo" as PaymentMethod,
      name: "Ví MoMo",
      description: "Thanh toán qua ví điện tử MoMo",
      icon: "📱",
    },
    {
      id: "vnpay" as PaymentMethod,
      name: "VNPay",
      description: "Thanh toán qua cổng VNPay",
      icon: "💳",
    },
    {
      id: "bank-transfer" as PaymentMethod,
      name: "Chuyển khoản ngân hàng",
      description: "Chuyển khoản qua tài khoản ngân hàng",
      icon: "🏦",
    },
    {
      id: "credit-card" as PaymentMethod,
      name: "Thẻ tín dụng / Ghi nợ",
      description: "Visa, Mastercard, JCB, Amex",
      icon: "💎",
    },
  ];

  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <label
          key={method.id}
          className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
            selected === method.id
              ? "border-[#e30019] bg-red-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value={method.id}
            checked={selected === method.id}
            onChange={() => onChange(method.id)}
            className="w-4 h-4 text-[#e30019]"
          />
          <span className="text-2xl">{method.icon}</span>
          <div className="flex-1">
            <div className="font-medium text-gray-900">{method.name}</div>
            <div className="text-sm text-gray-500">{method.description}</div>
          </div>
        </label>
      ))}
    </div>
  );
};

// Order Summary Component
const OrderSummary = ({
  items,
  shippingCost,
  subtotal,
  total,
}: {
  items: ReturnType<typeof useCart>["items"];
  shippingCost: number;
  subtotal: number;
  total: number;
}) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
      <h3 className="font-bold text-lg text-gray-900">Đơn hàng của bạn</h3>

      {/* Cart Items */}
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="64px"
              />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#e30019] text-white text-xs rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</p>
              <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
            </div>
            <div className="text-sm font-medium text-gray-900">
              {formatPrice(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tạm tính</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Phí vận chuyển</span>
          <span className={shippingCost === 0 ? "text-green-600 font-medium" : "font-medium"}>
            {shippingCost === 0 ? "Miễn phí" : formatPrice(shippingCost)}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-900">Tổng cộng</span>
          <span className="text-2xl font-bold text-[#e30019]">{formatPrice(total)}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">(Đã bao gồm VAT)</p>
      </div>

      {/* Edit Cart Link */}
      <Link
        href="/cart"
        className="block text-center text-[#e30019] hover:underline text-sm font-medium"
      >
        ← Quay lại giỏ hàng
      </Link>
    </div>
  );
};

// Success Modal
const SuccessModal = ({ orderId, onClose }: { orderId: string; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center animate-scale-in">
        <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Đặt hàng thành công!</h2>
        <p className="text-gray-600 mb-4">
          Cảm ơn bạn đã mua hàng. Mã đơn hàng của bạn là:
        </p>
        <div className="bg-gray-100 rounded-lg py-3 px-4 mb-6">
          <span className="font-bold text-lg text-[#e30019]">{orderId}</span>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Chúng tôi sẽ gửi email xác nhận đơn hàng cho bạn trong vòng 5 phút.
        </p>
        <div className="flex gap-3">
          <Link
            href="/"
            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Về trang chủ
          </Link>
          <Link
            href="/don-hang"
            className="flex-1 py-3 bg-[#e30019] text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
          >
            Xem đơn hàng
          </Link>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN CHECKOUT PAGE ====================
export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !showSuccess) {
      router.push("/cart");
    }
  }, [items, router, showSuccess]);

  // Customer Info State
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    note: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  // Calculate totals
  const subtotal = totalPrice;
  const shippingCost = subtotal > 50000000 ? 0 : shippingMethod === "express" ? 50000 : shippingMethod === "same-day" ? 100000 : 30000;
  const total = subtotal + shippingCost;

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!customerInfo.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10}$/.test(customerInfo.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }

    if (!customerInfo.province) {
      newErrors.province = "Vui lòng chọn tỉnh/thành";
    }

    if (!customerInfo.district) {
      newErrors.district = "Vui lòng chọn quận/huyện";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle place order
  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector("[data-error='true']") as HTMLElement;
      firstErrorField?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate order ID
    const newOrderId = `TD${Date.now().toString(36).toUpperCase()}`;
    setOrderId(newOrderId);
    setShowSuccess(true);
    clearCart();
    setIsSubmitting(false);
  };

  if (items.length === 0 && !showSuccess) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb step={1} />

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Thanh toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#e30019] text-white rounded-full flex items-center justify-center text-sm">1</span>
                Thông tin giao hàng
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2" data-error={!!errors.fullName}>
                  <FormInput
                    label="Họ và tên"
                    name="fullName"
                    value={customerInfo.fullName}
                    onChange={handleInputChange}
                    error={errors.fullName}
                    required
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  required
                  placeholder="example@email.com"
                />

                <FormInput
                  label="Số điện thoại"
                  name="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                  required
                  placeholder="0912345678"
                />

                <div className="md:col-span-2" data-error={!!errors.address}>
                  <FormInput
                    label="Địa chỉ"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    error={errors.address}
                    required
                    placeholder="Số nhà, đường, phố..."
                  />
                </div>

                <div data-error={!!errors.province}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tỉnh/Thành phố <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="province"
                    value={customerInfo.province}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#e30019] focus:border-transparent ${
                      errors.province ? "border-red-500 bg-red-50" : "border-gray-300"
                    }`}
                  >
                    <option value="">Chọn tỉnh/thành</option>
                    <option value="hcm">Hồ Chí Minh</option>
                    <option value="hn">Hà Nội</option>
                    <option value="dn">Đà Nẵng</option>
                    <option value="other">Khác</option>
                  </select>
                  {errors.province && <p className="text-sm text-red-500 mt-1">{errors.province}</p>}
                </div>

                <div data-error={!!errors.district}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quận/Huyện <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="district"
                    value={customerInfo.district}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#e30019] focus:border-transparent ${
                      errors.district ? "border-red-500 bg-red-50" : "border-gray-300"
                    }`}
                  >
                    <option value="">Chọn quận/huyện</option>
                    <option value="q1">Quận 1</option>
                    <option value="q2">Quận 2</option>
                    <option value="q3">Quận 3</option>
                    <option value="other">Khác</option>
                  </select>
                  {errors.district && <p className="text-sm text-red-500 mt-1">{errors.district}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ghi chú (tùy chọn)
                  </label>
                  <textarea
                    name="note"
                    value={customerInfo.note}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Ghi chú về đơn hàng, thời gian giao hàng..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e30019] focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Method */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#e30019] text-white rounded-full flex items-center justify-center text-sm">2</span>
                Phương thức vận chuyển
              </h2>
              <ShippingMethodSelector
                selected={shippingMethod}
                onChange={setShippingMethod}
              />
            </section>

            {/* Payment Method */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#e30019] text-white rounded-full flex items-center justify-center text-sm">3</span>
                Phương thức thanh toán
              </h2>
              <PaymentMethodSelector
                selected={paymentMethod}
                onChange={setPaymentMethod}
              />
            </section>

            {/* Place Order Button (Mobile) */}
            <div className="lg:hidden">
              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full bg-[#e30019] hover:bg-red-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    Đặt hàng - {formatPrice(total)}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <OrderSummary
                items={items}
                shippingCost={shippingCost}
                subtotal={subtotal}
                total={total}
              />

              {/* Place Order Button (Desktop) */}
              <div className="hidden lg:block">
                <button
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="w-full bg-[#e30019] hover:bg-red-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      Đặt hàng ngay
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Thanh toán an toàn & bảo mật</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && <SuccessModal orderId={orderId} onClose={() => setShowSuccess(false)} />}
    </div>
  );
}
