"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Icons
const Icons = {
  users: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  package: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  cart: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  money: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  trendUp: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  arrowRight: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
  plus: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(price);
};

// Mock data
const stats = [
  { id: "users", label: "Tổng người dùng", value: "1,234", change: "+12%", icon: Icons.users, color: "from-blue-500 to-blue-600", trend: "up" },
  { id: "products", label: "Tổng sản phẩm", value: "567", change: "+5%", icon: Icons.package, color: "from-emerald-500 to-emerald-600", trend: "up" },
  { id: "orders", label: "Đơn hàng hôm nay", value: "89", change: "+23%", icon: Icons.cart, color: "from-orange-500 to-orange-600", trend: "up" },
  { id: "revenue", label: "Doanh thu tháng", value: "245.6M", change: "+18%", icon: Icons.money, color: "from-purple-500 to-purple-600", trend: "up" },
];

const recentOrders = [
  { id: "ORD-2024-001", customer: "Nguyễn Văn A", total: 12500000, status: "completed", time: "2 phút trước" },
  { id: "ORD-2024-002", customer: "Trần Thị B", total: 8900000, status: "pending", time: "15 phút trước" },
  { id: "ORD-2024-003", customer: "Lê Văn C", total: 24500000, status: "processing", time: "1 giờ trước" },
  { id: "ORD-2024-004", customer: "Phạm Thị D", total: 5600000, status: "completed", time: "2 giờ trước" },
  { id: "ORD-2024-005", customer: "Hoàng Văn E", total: 18900000, status: "cancelled", time: "3 giờ trước" },
];

const topProducts = [
  { name: "Laptop Gaming ASUS ROG", sales: 156, revenue: 780000000, growth: "+24%" },
  { name: "MSI RTX 4070 Ti", sales: 89, revenue: 445000000, growth: "+18%" },
  { name: "Intel Core i9-13900K", sales: 234, revenue: 312000000, growth: "+45%" },
  { name: "RAM Corsair 32GB", sales: 412, revenue: 268000000, growth: "+12%" },
];

const quickActions = [
  { label: "Thêm sản phẩm", href: "/admin/products/new", color: "bg-emerald-600 hover:bg-emerald-700", icon: Icons.plus },
  { label: "Xem đơn hàng", href: "/admin/orders", color: "bg-blue-600 hover:bg-blue-700", icon: Icons.cart },
  { label: "Quản lý users", href: "/admin/users", color: "bg-purple-600 hover:bg-purple-700", icon: Icons.users },
  { label: "Thống kê", href: "/admin/analytics", color: "bg-orange-600 hover:bg-orange-700", icon: Icons.money },
];

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  return colors[status] || "bg-gray-500/20 text-gray-400";
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    completed: "Hoàn thành",
    pending: "Chờ xử lý",
    processing: "Đang xử lý",
    cancelled: "Đã hủy",
  };
  return labels[status] || status;
};

// Simple Sparkline Chart
const Sparkline = ({ data, color = "#10b981" }: { data: number[]; color?: string }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 100}`).join(" ");
  return (
    <svg viewBox="0 0 100 100" className="w-24 h-12" preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth="3" points={points} />
    </svg>
  );
};

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Chào mừng trở lại! Đây là tổng quan hệ thống hôm nay.</p>
        </div>
        <div className="flex gap-2">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={`${action.color} text-white px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 hover:shadow-lg hover:shadow-white/10`}
            >
              {action.icon}
              <span className="hidden sm:inline">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className={`relative overflow-hidden bg-gray-800/50 backdrop-blur rounded-xl p-5 border border-gray-700/50 hover:border-gray-600/50 transition-all group ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`} />
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                {stat.icon}
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
                {Icons.trendUp}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
            <Sparkline data={[30, 45, 35, 50, 40, 60, 55]} color={stat.id === "revenue" ? "#a855f7" : stat.id === "orders" ? "#f97316" : stat.id === "products" ? "#10b981" : "#3b82f6"} />
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-5 border-b border-gray-700/50 flex items-center justify-between">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Đơn hàng gần đây
            </h3>
            <Link href="/admin/orders" className="text-sm text-[#e30019] hover:text-red-400 flex items-center gap-1 transition-colors">
              Xem tất cả
              {Icons.arrowRight}
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/30">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Mã đơn</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Khách hàng</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tổng tiền</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-5 py-3">
                      <span className="font-mono text-sm text-gray-300">{order.id}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white text-sm font-medium">
                          {order.customer.charAt(0)}
                        </div>
                        <span className="text-white text-sm">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-white font-medium">{formatPrice(order.total)}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-gray-400 text-sm">{order.time}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-gray-800/50 backdrop-blur rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-5 border-b border-gray-700/50">
            <h3 className="font-semibold text-white">Sản phẩm bán chạy</h3>
            <p className="text-gray-400 text-sm mt-1">Top sản phẩm theo doanh thu</p>
          </div>
          <div className="p-5 space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-orange-600" : "bg-gray-600"
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{product.name}</p>
                  <p className="text-gray-400 text-xs">{product.sales} đã bán</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-medium">{formatPrice(product.revenue)}</p>
                  <p className="text-emerald-400 text-xs">{product.growth}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-5 border-t border-gray-700/50">
            <Link href="/admin/analytics" className="w-full py-2.5 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg font-medium text-sm text-center block transition-colors">
              Xem thống kê chi tiết
            </Link>
          </div>
        </div>
      </div>

      {/* Activity & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <div className="bg-gray-800/50 backdrop-blur rounded-xl border border-gray-700/50 p-5">
          <h3 className="font-semibold text-white mb-4">Trạng thái hệ thống</h3>
          <div className="space-y-3">
            {[
              { label: "API Server", status: "operational", color: "bg-emerald-500" },
              { label: "Database", status: "operational", color: "bg-emerald-500" },
              { label: "Payment Gateway", status: "operational", color: "bg-emerald-500" },
              { label: "Email Service", status: "degraded", color: "bg-yellow-500" },
            ].map((service) => (
              <div key={service.label} className="flex items-center justify-between py-2">
                <span className="text-gray-300 text-sm">{service.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${service.color}`} />
                  <span className="text-gray-400 text-sm capitalize">{service.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-gradient-to-br from-[#e30019]/10 to-purple-900/10 rounded-xl border border-[#e30019]/20 p-5">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#e30019]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Mẹo nhanh
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-[#e30019] mt-0.5">•</span>
              Sử dụng phím tắt <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">Ctrl + K</kbd> để tìm kiếm nhanh
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#e30019] mt-0.5">•</span>
              Export báo cáo hàng ngày để theo dõi doanh thu
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#e30019] mt-0.5">•</span>
              Kiểm tra đơn hàng chờ xử lý mỗi 2 giờ
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
