// Re-export from products-data folder for backward compatibility
export * from "./products-data";

// Legacy interfaces for backward compatibility
export interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

// Legacy categories and utils (also exported from products-data)
export const categories: Record<string, { name: string; description: string }> = {
  "laptop-gaming": { name: "Laptop Gaming", description: "Laptop gaming cao cấp từ các thương hiệu hàng đầu thế giới" },
  "laptop-van-phong": { name: "Laptop Văn Phòng", description: "Laptop mỏng nhẹ, hiệu năng ổn định cho công việc" },
  "pc-gaming": { name: "PC Gaming", description: "PC gaming được build sẵn với cấu hình mạnh mẽ" },
  "linh-kien-pc": { name: "Linh kiện PC", description: "CPU, GPU, RAM, SSD và các linh kiện máy tính" },
  "khuyen-mai-hot": { name: "Khuyến mãi Hot", description: "Sản phẩm đang giảm giá sốc, cơ hội vàng săn deal" },
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
};
