"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";

// ==================== TYPES ====================
type OrderStatus = "pending" | "confirmed" | "shipping" | "delivered" | "cancelled";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
}

// ==================== MOCK DATA ====================
const mockOrders: Order[] = [
  {
    id: "TD1743832104ABC",
    date: "2026-04-05T14:30:00",
    status: "pending",
    items: [
      { id: "1", name: "Laptop Gaming ASUS ROG Strix G16", price: 44990000, quantity: 1, image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=200&h=150&fit=crop" },
    ],
    subtotal: 44990000,
    shipping: 30000,
    discount: 0,
    total: 45020000,
    shippingAddress: "123 Nguyễn Văn A, Quận 1, TP.HCM",
    paymentMethod: "Thanh toán khi nhận hàng (COD)",
  },
  {
    id: "TD1743721000XYZ",
    date: "2026-04-04T09:15:00",
    status: "shipping",
    items: [
      { id: "2", name: "MSI Katana 15 B13VFK", price: 32990000, quantity: 1, image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=150&fit=crop" },
      { id: "rec-1", name: "Chuột Logitech G Pro X", price: 2490000, quantity: 1, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200&h=150&fit=crop" },
    ],
    subtotal: 35480000,
    shipping: 0,
    discount: 500000,
    total: 34980000,
    shippingAddress: "456 Lê Văn B, Quận 3, TP.HCM",
    paymentMethod: "Ví MoMo",
    trackingNumber: "VN123456789",
  },
  {
    id: "TD1743612345DEF",
    date: "2026-04-02T16:45:00",
    status: "delivered",
    items: [
      { id: "3", name: "Acer Nitro 5 AN515-58", price: 24990000, quantity: 2, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=150&fit=crop" },
    ],
    subtotal: 49980000,
    shipping: 0,
    discount: 2000000,
    total: 47980000,
    shippingAddress: "789 Trần Thị C, Quận 7, TP.HCM",
    paymentMethod: "Chuyển khoản ngân hàng",
    trackingNumber: "VN987654321",
  },
  {
    id: "TD1743500000GHI",
    date: "2026-03-28T11:20:00",
    status: "cancelled",
    items: [
      { id: "4", name: "Lenovo Legion 5 15IAH7H", price: 28990000, quantity: 1, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=150&fit=crop" },
    ],
    subtotal: 28990000,
    shipping: 30000,
    discount: 0,
    total: 29020000,
    shippingAddress: "321 Phạm Văn D, Quận Bình Thạnh, TP.HCM",
    paymentMethod: "Thanh toán khi nhận hàng (COD)",
  },
  {
    id: "TD1743400000JKL",
    date: "2026-03-25T08:00:00",
    status: "confirmed",
    items: [
      { id: "5", name: "HP Omen 16-wf0004tx", price: 31990000, quantity: 1, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&h=150&fit=crop" },
      { id: "rec-2", name: "Bàn phím Keychron K2", price: 1890000, quantity: 1, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=200&h=150&fit=crop" },
      { id: "rec-3", name: "Tai nghe HyperX Cloud II", price: 1590000, quantity: 1, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=150&fit=crop" },
    ],
    subtotal: 35470000,
    shipping: 0,
    discount: 1000000,
    total: 34470000,
    shippingAddress: "654 Nguyễn Thị E, Quận 2, TP.HCM",
    paymentMethod: "VNPay",
  },
];

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
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getStatusConfig = (status: OrderStatus) => {
  const configs: Record<OrderStatus, { label: string; color: string; bgColor: string; icon: string }> = {
    pending: {
      label: "Chờ xác nhận",
      color: "text-yellow-700",
      bgColor: "bg-yellow-100",
      icon: "⏳",
    },
    confirmed: {
      label: "Đã xác nhận",
      color: "text-blue-700",
      bgColor: "bg-blue-100",
      icon: "✅",
    },
    shipping: {
      label: "Đang giao",
      color: "text-purple-700",
      bgColor: "bg-purple-100",
      icon: "🚚",
    },
    delivered: {
      label: "Đã giao",
      color: "text-green-700",
      bgColor: "bg-green-100",
      icon: "📦",
    },
    cancelled: {
      label: "Đã hủy",
      color: "text-red-700",
      bgColor: "bg-red-100",
      icon: "❌",
    },
  };
  return configs[status];
};

// ==================== COMPONENTS ====================

// Breadcrumb
const Breadcrumb = () => (
  <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
    <Link href="/" className="hover:text-[#e30019] transition-colors">Trang chủ</Link>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
    <span className="text-gray-900 font-medium">Đơn hàng của tôi</span>
  </nav>
);

// Status Tabs
const StatusTabs = ({
  activeStatus,
  onChange,
  counts,
}: {
  activeStatus: OrderStatus | "all";
  onChange: (status: OrderStatus | "all") => void;
  counts: Record<OrderStatus | "all", number>;
}) => {
  const tabs: { id: OrderStatus | "all"; label: string }[] = [
    { id: "all", label: "Tất cả" },
    { id: "pending", label: "Chờ xác nhận" },
    { id: "confirmed", label: "Đã xác nhận" },
    { id: "shipping", label: "Đang giao" },
    { id: "delivered", label: "Đã giao" },
    { id: "cancelled", label: "Đã hủy" },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
            activeStatus === tab.id
              ? "bg-[#e30019] text-white"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          {tab.label}
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
            activeStatus === tab.id ? "bg-white/20" : "bg-gray-100"
          }`}>
            {counts[tab.id]}
          </span>
        </button>
      ))}
    </div>
  );
};

// Order Timeline
const OrderTimeline = ({ status }: { status: OrderStatus }) => {
  const steps = [
    { key: "pending", label: "Đặt hàng", icon: "📝" },
    { key: "confirmed", label: "Xác nhận", icon: "✅" },
    { key: "shipping", label: "Vận chuyển", icon: "🚚" },
    { key: "delivered", label: "Đã giao", icon: "📦" },
  ];

  const statusIndex = steps.findIndex((s) => s.key === status);
  const isCancelled = status === "cancelled";

  if (isCancelled) {
    return (
      <div className="flex items-center gap-2 p-4 bg-red-50 rounded-lg">
        <span className="text-2xl">❌</span>
        <span className="font-medium text-red-700">Đơn hàng đã bị hủy</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isCompleted = index <= statusIndex;
        const isCurrent = index === statusIndex;

        return (
          <div key={step.key} className="flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mb-2 ${
                isCompleted
                  ? isCurrent
                    ? "bg-[#e30019] text-white ring-4 ring-red-100"
                    : "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {isCompleted ? (index < statusIndex ? "✓" : step.icon) : step.icon}
            </div>
            <span
              className={`text-xs font-medium ${
                isCompleted ? (isCurrent ? "text-[#e30019]" : "text-green-600") : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`absolute h-0.5 w-full top-5 left-1/2 -z-10 ${
                  index < statusIndex ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Order Card
const OrderCard = ({
  order,
  onViewDetail,
  onReorder,
}: {
  order: Order;
  onViewDetail: (order: Order) => void;
  onReorder: (order: Order) => void;
}) => {
  const status = getStatusConfig(order.status);
  const firstItem = order.items[0];
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-bold text-gray-900">{order.id}</span>
          <span className="text-sm text-gray-500">{formatDate(order.date)}</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${status.bgColor} ${status.color}`}>
          <span>{status.icon}</span>
          {status.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={firstItem.image}
              alt={firstItem.name}
              fill
              className="object-cover"
              sizes="80px"
            />
            {order.items.length > 1 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-medium">
                +{order.items.length - 1}
              </div>
            )}
          </div>

          {/* Order Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 line-clamp-1">{firstItem.name}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {itemCount} sản phẩm · {order.items.length} loại
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-bold text-lg text-[#e30019]">{formatPrice(order.total)}</span>
              {order.discount > 0 && (
                <span className="text-sm text-gray-400 line-through">{formatPrice(order.subtotal)}</span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => onViewDetail(order)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Xem chi tiết
            </button>
            {order.status === "delivered" && (
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Mua lại
              </button>
            )}
          </div>

          {order.status === "shipping" && order.trackingNumber && (
            <Link
              href={`/tracking/${order.trackingNumber}`}
              className="text-[#e30019] hover:underline text-sm font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.447-.894L15 7m0 13V7" />
              </svg>
              Theo dõi đơn hàng
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// Order Detail Modal
const OrderDetailModal = ({
  order,
  onClose,
  onReorder,
}: {
  order: Order;
  onClose: () => void;
  onReorder: (order: Order) => void;
}) => {
  const status = getStatusConfig(order.status);
  const { addItem } = useCart();

  const handleReorder = () => {
    order.items.forEach((item) => {
      addItem(
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          maxQuantity: 99,
        },
        item.quantity
      );
    });
    onClose();
    window.location.href = "/cart";
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Chi tiết đơn hàng</h2>
            <p className="text-sm text-gray-500">{order.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${status.bgColor} ${status.color}`}>
                <span>{status.icon}</span>
                {status.label}
              </span>
              <span className="text-sm text-gray-500">{formatDate(order.date)}</span>
            </div>
            <OrderTimeline status={order.status} />
          </div>

          {/* Items */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Sản phẩm ({order.items.length})</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                    <p className="font-medium text-[#e30019]">{formatPrice(item.price)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Info */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-bold text-gray-900 mb-4">Thông tin giao hàng</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Địa chỉ:</span>
                <span className="text-gray-900 text-right">{order.shippingAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phương thức thanh toán:</span>
                <span className="text-gray-900">{order.paymentMethod}</span>
              </div>
              {order.trackingNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Mã vận đơn:</span>
                  <span className="text-gray-900 font-medium">{order.trackingNumber}</span>
                </div>
              )}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-bold text-gray-900 mb-4">Tóm tắt thanh toán</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển</span>
                <span className={order.shipping === 0 ? "text-green-600" : ""}>
                  {order.shipping === 0 ? "Miễn phí" : formatPrice(order.shipping)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-bold text-gray-900">Tổng cộng</span>
                <span className="font-bold text-xl text-[#e30019]">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
          {order.status === "delivered" && (
            <button
              onClick={handleReorder}
              className="flex-1 bg-[#e30019] hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Mua lại
            </button>
          )}
          {order.status === "pending" && (
            <button className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold py-3 rounded-xl transition-colors">
              Hủy đơn hàng
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN ORDERS PAGE ====================
export default function OrdersPage() {
  const [activeStatus, setActiveStatus] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Calculate counts
  const counts = useMemo(() => {
    const result: Record<OrderStatus | "all", number> = {
      all: mockOrders.length,
      pending: 0,
      confirmed: 0,
      shipping: 0,
      delivered: 0,
      cancelled: 0,
    };
    mockOrders.forEach((order) => {
      result[order.status]++;
    });
    return result;
  }, []);

  // Filter orders
  const filteredOrders = useMemo(() => {
    if (activeStatus === "all") return mockOrders;
    return mockOrders.filter((order) => order.status === activeStatus);
  }, [activeStatus]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Đơn hàng của tôi</h1>

        {/* Status Tabs */}
        <div className="mb-6">
          <StatusTabs activeStatus={activeStatus} onChange={setActiveStatus} counts={counts} />
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetail={setSelectedOrder}
                onReorder={(order) => {
                  // Handle reorder
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Chưa có đơn hàng nào</h2>
            <p className="text-gray-500 mb-4">Bạn chưa có đơn hàng nào ở trạng thái này</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#e30019] hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onReorder={(order) => {
            // Handle reorder
          }}
        />
      )}
    </div>
  );
}
