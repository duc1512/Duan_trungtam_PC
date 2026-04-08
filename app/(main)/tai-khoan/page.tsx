"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../../hooks/useAuth";

export default function UserAccount() {
  const { isLoggedIn, userProfile, logout, isAdmin, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState([
    {
      id: "DH001",
      date: "01/04/2026",
      status: "Đang xử lý",
      total: 15490000,
      items: 3
    },
    {
      id: "DH002", 
      date: "25/03/2026",
      status: "Đã giao hàng",
      total: 8990000,
      items: 2
    },
    {
      id: "DH003",
      date: "15/03/2026", 
      status: "Đã hủy",
      total: 5490000,
      items: 1
    }
  ]);

  // Redirect if not logged in or is admin (only after loading is complete)
  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        window.location.href = "/dang-nhap";
      } else if (isAdmin) {
        window.location.href = "/admin/dashboard";
      }
    }
  }, [isLoggedIn, isAdmin, isLoading]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Đang xử lý": return "text-yellow-600 bg-yellow-100";
      case "Đã giao hàng": return "text-green-600 bg-green-100";
      case "Đã hủy": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  // Return early if loading or not logged in or is admin
  if (isLoading || !isLoggedIn || isAdmin || !userProfile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#e30019] rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src={userProfile.avatar} 
                  alt={userProfile.name}
                  className="w-full h-full object-cover"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const target = e.currentTarget;
                    target.src = `https://ui-avatars.com/api/?name=${userProfile.name}&background=e30019&color=fff&size=64`;
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
                <p className="text-gray-600">{userProfile.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "profile"
                    ? "border-[#e30019] text-[#e30019]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Thông tin cá nhân
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "orders"
                    ? "border-[#e30019] text-[#e30019]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Đơn hàng của tôi
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "favorites"
                    ? "border-[#e30019] text-[#e30019]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Sản phẩm yêu thích
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "settings"
                    ? "border-[#e30019] text-[#e30019]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Cài đặt
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Thông tin cá nhân</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                    <input
                      type="text"
                      value={userProfile.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e30019]"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={userProfile.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e30019]"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e30019]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                    <input
                      type="text"
                      placeholder="Nhập địa chỉ"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e30019]"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="bg-[#e30019] text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    Cập nhật thông tin
                  </button>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Đơn hàng của tôi</h2>
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">Đơn hàng #{order.id}</h3>
                        <p className="text-sm text-gray-600">Ngày đặt: {order.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <span>{order.items} sản phẩm</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}
                        </p>
                        <button className="text-[#e30019] text-sm hover:underline">
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "favorites" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Sản phẩm yêu thích</h2>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">❤️</div>
                  <p className="text-gray-600 mb-4">Bạn chưa có sản phẩm yêu thích nào</p>
                  <Link href="/" className="bg-[#e30019] text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors inline-block">
                    Khám phá sản phẩm
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Cài đặt tài khoản</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="font-medium text-gray-900">Thông báo email</h3>
                      <p className="text-sm text-gray-600">Nhận thông báo về đơn hàng và khuyến mãi</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e30019]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="font-medium text-gray-900">Hiển thị thông tin công khai</h3>
                      <p className="text-sm text-gray-600">Cho phép người khác xem hồ sơ của bạn</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e30019]"></div>
                    </label>
                  </div>
                  <div className="pt-4">
                    <button className="text-red-600 hover:text-red-700 font-medium">
                      Xóa tài khoản
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
