"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAdmin } from "@/hooks/useAdmin";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { products, updateProduct } = useAdmin();
  const productId = params.id as string;

  const product = products.find((p: { id: string }) => p.id === productId);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    originalPrice: "",
    stock: "",
    category: "",
    description: "",
    image: "",
    status: "active" as "active" | "inactive" | "out_of_stock",
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        brand: product.brand,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || product.price.toString(),
        stock: product.stock.toString(),
        category: product.category,
        description: product.description || "",
        image: product.image || "",
        status: product.status || "active",
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Không tìm thấy sản phẩm</p>
        <Link
          href="/admin/products"
          className="mt-4 inline-block text-[#e30019] hover:underline"
        >
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    updateProduct(productId, {
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

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSaving(false);
    router.push("/admin/products");
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/products"
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-white">Chỉnh sửa sản phẩm</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl border border-gray-700 p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Tên sản phẩm <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
              placeholder="Nhập tên sản phẩm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Thương hiệu <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
              placeholder="VD: ASUS, MSI..."
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Giá bán <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
              placeholder="45000000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Giá gốc</label>
            <input
              type="number"
              min="0"
              value={formData.originalPrice}
              onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
              placeholder="50000000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Tồn kho <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
              placeholder="10"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Danh mục <span className="text-red-400">*</span>
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
            >
              <option value="">Chọn danh mục</option>
              <option value="Laptop Gaming">Laptop Gaming</option>
              <option value="Laptop Văn Phòng">Laptop Văn Phòng</option>
              <option value="PC Gaming">PC Gaming</option>
              <option value="Linh kiện PC">Linh kiện PC</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Trạng thái</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as typeof formData.status })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
            >
              <option value="active">Đang bán</option>
              <option value="inactive">Ngừng bán</option>
              <option value="out_of_stock">Hết hàng</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">URL ảnh sản phẩm</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Mô tả</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#e30019] focus:border-transparent"
            placeholder="Nhập mô tả sản phẩm..."
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
          <Link
            href="/admin/products"
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Hủy
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 bg-[#e30019] text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Đang lưu...
              </>
            ) : (
              "Lưu thay đổi"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
