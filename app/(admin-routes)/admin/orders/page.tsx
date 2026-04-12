"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useAdmin, type AdminOrder } from "@/hooks/useAdmin";

export default function OrdersPage() {
  const { orders, updateOrderStatus, deleteOrder } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const itemsPerPage = 10;

  const filteredOrders = useMemo(() => {
    let result = [...orders];
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (o: AdminOrder) =>
          o.id.toLowerCase().includes(lower) ||
          o.customerName.toLowerCase().includes(lower) ||
          o.customerEmail.toLowerCase().includes(lower)
      );
    }
    if (statusFilter !== "all") {
      result = result.filter((o: AdminOrder) => o.status === statusFilter);
    }
    return result;
  }, [searchTerm, statusFilter, orders]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "shipped":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "delivered":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "processing":
        return "Đang xử lý";
      case "shipped":
        return "Đang giao";
      case "delivered":
        return "Đã giao";
      case "cancelled":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  const stats = [
    { label: "Tổng đơn", value: orders.length, color: "text-white" },
    { label: "Chờ xác nhận", value: orders.filter((o: AdminOrder) => o.status === "pending").length, color: "text-yellow-400" },
    { label: "Đang giao", value: orders.filter((o: AdminOrder) => o.status === "shipped").length, color: "text-purple-400" },
    { label: "Đã giao", value: orders.filter((o: AdminOrder) => o.status === "delivered").length, color: "text-green-400" },
  ];

  const handleStatusClick = (order: AdminOrder) => {
    setSelectedOrder(order);
    setIsStatusModalOpen(true);
  };

  const handleDeleteClick = (order: AdminOrder) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };

  const handleStatusChange = (newStatus: AdminOrder["status"]) => {
    if (selectedOrder) {
      updateOrderStatus(selectedOrder.id, newStatus);
      setIsStatusModalOpen(false);
      setSelectedOrder(null);
    }
  };

  const confirmDelete = () => {
    if (selectedOrder) {
      deleteOrder(selectedOrder.id);
      setIsDeleteModalOpen(false);
      setSelectedOrder(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Quản lý đơn hàng</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ xác nhận</option>
          <option value="processing">Đang xử lý</option>
          <option value="shipped">Đang giao</option>
          <option value="delivered">Đã giao</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr className="text-left text-gray-400 text-sm">
              <th className="px-4 py-3 font-medium">Mã đơn</th>
              <th className="px-4 py-3 font-medium">Khách hàng</th>
              <th className="px-4 py-3 font-medium">Ngày đặt</th>
              <th className="px-4 py-3 font-medium">Tổng tiền</th>
              <th className="px-4 py-3 font-medium">Trạng thái</th>
              <th className="px-4 py-3 font-medium text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {paginatedOrders.map((order: AdminOrder) => (
              <tr key={order.id} className="hover:bg-gray-700/50">
                <td className="px-4 py-4">
                  <span className="text-white font-medium">{order.id}</span>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-white font-medium">{order.customerName}</p>
                    <p className="text-gray-500 text-sm">{order.customerEmail}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-gray-300">{order.date}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-[#e30019] font-medium">{formatPrice(order.total)}</span>
                  <p className="text-gray-500 text-sm">{order.items} sản phẩm</p>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}
                  >
                    {getStatusLabel(order.status)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleStatusClick(order)}
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                      title="Cập nhật trạng thái"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                      title="Chi tiết"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(order)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      title="Xóa"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-600 rounded text-gray-300 hover:border-[#e30019] hover:text-[#e30019] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trước
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-[#e30019] text-white"
                  : "border border-gray-600 text-gray-300 hover:border-[#e30019] hover:text-[#e30019]"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-600 rounded text-gray-300 hover:border-[#e30019] hover:text-[#e30019] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau
          </button>
        </div>
      )}

      {/* Status Update Modal */}
      {isStatusModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setIsStatusModalOpen(false)}
          />
          <div className="relative bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-white mb-4">
              Cập nhật trạng thái đơn {selectedOrder.id}
            </h2>
            <div className="space-y-2">
              {[
                { value: "pending", label: "Chờ xác nhận", color: "bg-yellow-500" },
                { value: "processing", label: "Đang xử lý", color: "bg-blue-500" },
                { value: "shipped", label: "Đang giao", color: "bg-purple-500" },
                { value: "delivered", label: "Đã giao", color: "bg-green-500" },
                { value: "cancelled", label: "Đã hủy", color: "bg-red-500" },
              ].map((status) => (
                <button
                  key={status.value}
                  onClick={() => handleStatusChange(status.value as AdminOrder["status"])}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    selectedOrder.status === status.value
                      ? "bg-gray-700 border border-[#e30019]"
                      : "bg-gray-700/50 hover:bg-gray-700"
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${status.color}`} />
                  <span className="text-white">{status.label}</span>
                  {selectedOrder.status === status.value && (
                    <svg className="w-5 h-5 text-[#e30019] ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsStatusModalOpen(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setIsDeleteModalOpen(false)}
          />
          <div className="relative bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Xác nhận xóa</h2>
                <p className="text-gray-400 text-sm">Hành động này không thể hoàn tác</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Bạn có chắc chắn muốn xóa đơn hàng <span className="text-white font-medium">{selectedOrder.id}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Xóa đơn hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
