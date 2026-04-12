"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAdmin, type AdminProduct } from "../../../hooks/useAdmin";

interface ProductFormData {
  name: string;
  brand: string;
  price: string;
  originalPrice: string;
  stock: string;
  category: string;
  description: string;
  image: string;
  status: "active" | "inactive" | "out_of_stock";
}

export default function ProductsPage() {
  const { products, addProduct, deleteProduct } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<AdminProduct | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    brand: "",
    price: "",
    originalPrice: "",
    stock: "",
    category: "",
    description: "",
    image: "",
    status: "active",
  });
  const itemsPerPage = 10;

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const lower = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower)
    );
  }, [searchTerm, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "inactive":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      case "out_of_stock":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-green-500/20 text-green-400 border-green-500/30";
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "active":
        return "Đang bán";
      case "inactive":
        return "Ngừng bán";
      case "out_of_stock":
        return "Hết hàng";
      default:
        return "Đang bán";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: formData.name,
      brand: formData.brand,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice) || Number(formData.price),
      stock: Number(formData.stock),
      category: formData.category,
      description: formData.description,
      image: formData.image || "/placeholder-product.png",
      status: formData.status,
    });
    setIsModalOpen(false);
    setFormData({
      name: "",
      brand: "",
      price: "",
      originalPrice: "",
      stock: "",
      category: "",
      description: "",
      image: "",
      status: "active",
    });
  };

  const handleDeleteClick = (product: AdminProduct) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Quản lý sản phẩm</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#e30019] text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          + Thêm sản phẩm
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
          />
        </div>
        <span className="text-gray-400">Tổng: {filteredProducts.length} sản phẩm</span>
      </div>

      {/* Products Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr className="text-left text-gray-400 text-sm">
              <th className="px-4 py-3 font-medium">Sản phẩm</th>
              <th className="px-4 py-3 font-medium">Giá</th>
              <th className="px-4 py-3 font-medium">Tồn kho</th>
              <th className="px-4 py-3 font-medium">Trạng thái</th>
              <th className="px-4 py-3 font-medium text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {paginatedProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-700/50">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-700">
                      <Image
                        src={product.image || "/placeholder-product.png"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white font-medium line-clamp-1">{product.name}</p>
                      <p className="text-gray-500 text-sm">{product.brand} · {product.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-[#e30019] font-medium">{formatPrice(product.price)}</span>
                </td>
                <td className="px-4 py-4">
                  <span className={product.stock < 10 ? "text-red-400" : "text-white"}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}
                  >
                    {getStatusLabel(product.status)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(product)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
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

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-gray-800 rounded-xl border border-gray-700 w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-bold text-white">Thêm sản phẩm mới</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Tên sản phẩm *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-1.5 bg-gray-700 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Thương hiệu *</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3 py-1.5 bg-gray-700 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
                    placeholder="VD: ASUS, MSI..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Giá bán *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-1.5 bg-gray-700 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
                    placeholder="45000000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Giá gốc</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full px-3 py-1.5 bg-gray-700 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
                    placeholder="50000000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Tồn kho *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-1.5 bg-gray-700 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
                    placeholder="10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Danh mục *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-1.5 bg-gray-700 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="Laptop Gaming">Laptop Gaming</option>
                    <option value="Laptop Văn Phòng">Laptop Văn Phòng</option>
                    <option value="PC Gaming">PC Gaming</option>
                    <option value="Linh kiện PC">Linh kiện PC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Trạng thái</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ProductFormData["status"] })}
                    className="w-full px-3 py-1.5 bg-gray-700 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
                  >
                    <option value="active">Đang bán</option>
                    <option value="inactive">Ngừng bán</option>
                    <option value="out_of_stock">Hết hàng</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">URL ảnh sản phẩm</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-1.5 bg-gray-700 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Mô tả</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-1.5 bg-gray-700 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
                  placeholder="Nhập mô tả sản phẩm..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-sm bg-[#e30019] text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Thêm sản phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && productToDelete && (
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
              Bạn có chắc chắn muốn xóa sản phẩm <span className="text-white font-medium">{productToDelete.name}</span>?
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
                Xóa sản phẩm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
