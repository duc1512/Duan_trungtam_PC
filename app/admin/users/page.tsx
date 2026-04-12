"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useAdmin, type AdminUser } from "../../../hooks/useAdmin";

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user";
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
};

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    active: "bg-green-500",
    inactive: "bg-gray-500",
    banned: "bg-red-500",
  };
  return colors[status] || "bg-gray-500";
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    active: "Hoạt động",
    inactive: "Không hoạt động",
    banned: "Bị cấm",
  };
  return labels[status] || status;
};

export default function UsersPage() {
  const { users, addUser, deleteUser, banUser, unbanUser, updateUser } = useAdmin();
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
    role: "user",
  });
  const itemsPerPage = 10;

  const filteredUsers = useMemo(() => {
    return users.filter((user: AdminUser) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search);
      const matchesRole = filterRole === "all" || user.role === filterRole;
      const matchesStatus = filterStatus === "all" || user.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [search, filterRole, filterStatus, users]);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const stats = {
    total: users.length,
    admins: users.filter((u: AdminUser) => u.role === "admin").length,
    users: users.filter((u: AdminUser) => u.role === "user").length,
    active: users.filter((u: AdminUser) => u.status === "active").length,
    banned: users.filter((u: AdminUser) => u.status === "banned").length,
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map((u: AdminUser) => u.id));
    }
  };

  const toggleSelectUser = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((uid) => uid !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      status: "active",
    });
    setIsAddModalOpen(false);
    setFormData({ name: "", email: "", phone: "", role: "user" });
  };

  const handleDeleteClick = (user: AdminUser) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const handleBanToggle = (user: AdminUser) => {
    if (user.status === "banned") {
      unbanUser(user.id);
    } else {
      banUser(user.id);
    }
  };

  const handleBulkMakeAdmin = () => {
    selectedUsers.forEach((id) => updateUser(id, { role: "admin" }));
    setSelectedUsers([]);
  };

  const handleBulkBan = () => {
    selectedUsers.forEach((id) => banUser(id));
    setSelectedUsers([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Quản lý người dùng</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-[#e30019] hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Thêm người dùng
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Tổng người dùng", value: stats.total },
          { label: "Admin", value: stats.admins },
          { label: "Người dùng", value: stats.users },
          { label: "Đang hoạt động", value: stats.active },
          { label: "Bị cấm", value: stats.banned },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 pl-11 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e30019]"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#e30019]"
        >
          <option value="all">Tất cả vai trò</option>
          <option value="admin">Admin</option>
          <option value="user">Người dùng</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#e30019]"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Không hoạt động</option>
          <option value="banned">Bị cấm</option>
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg">
          <span className="text-gray-300">Đã chọn {selectedUsers.length} người dùng</span>
          <button
            onClick={handleBulkMakeAdmin}
            className="px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white rounded text-sm transition-colors"
          >
            Chuyển thành admin
          </button>
          <button
            onClick={handleBulkBan}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
          >
            Cấm tài khoản
          </button>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-600 text-[#e30019] focus:ring-[#e30019]"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Người dùng</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Vai trò</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Trạng thái</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Đơn hàng</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Chi tiêu</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Ngày tham gia</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {paginatedUsers.map((user: AdminUser) => (
                <tr key={user.id} className="hover:bg-gray-700/30">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelectUser(user.id)}
                      className="rounded border-gray-600 text-[#e30019] focus:ring-[#e30019]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                        <p className="text-gray-500 text-xs">{user.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"
                    }`}>
                      {user.role === "admin" ? "Admin" : "Người dùng"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(user.status)}`}>
                      {getStatusLabel(user.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white">{user.orders}</td>
                  <td className="px-4 py-3 text-white">{formatPrice(user.totalSpent)}</td>
                  <td className="px-4 py-3 text-gray-300">{user.joinDate}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                        title="Chi tiết"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleBanToggle(user)}
                        className={`p-2 transition-colors ${
                          user.status === "banned"
                            ? "text-green-400 hover:text-green-300"
                            : "text-gray-400 hover:text-red-400"
                        }`}
                        title={user.status === "banned" ? "Bỏ cấm" : "Cấm"}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user)}
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
          <div className="px-4 py-3 border-t border-gray-700 flex items-center justify-between">
            <span className="text-gray-400 text-sm">
              Hiển thị {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredUsers.length)} / {filteredUsers.length} người dùng
            </span>
            <div className="flex gap-2">
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
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setIsAddModalOpen(false)}
          />
          <div className="relative bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-bold text-white">Thêm người dùng mới</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Họ tên *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
                  placeholder="Nhập họ tên"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Số điện thoại *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
                  placeholder="0901234567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Vai trò</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as "admin" | "user" })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
                >
                  <option value="user">Người dùng</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#e30019] text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Thêm người dùng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && userToDelete && (
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
              Bạn có chắc chắn muốn xóa người dùng <span className="text-white font-medium">{userToDelete.name}</span>?
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
                Xóa người dùng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
