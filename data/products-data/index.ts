export * from "./types";
export { laptop001 } from "./laptop-001";
export { laptop002 } from "./laptop-002";
export { laptop003 } from "./laptop-003";
export { gpu001 } from "./gpu-001";
export { ssd001 } from "./ssd-001";
export { ssd002 } from "./ssd-002";
export { cpu001 } from "./cpu-001";
export { monitor001 } from "./monitor-001";
export { mouse001 } from "./mouse-001";
export { keyboard001 } from "./keyboard-001";
export { headset001 } from "./headset-001";

import { laptop001 } from "./laptop-001";
import { laptop002 } from "./laptop-002";
import { laptop003 } from "./laptop-003";
import { gpu001 } from "./gpu-001";
import { ssd001 } from "./ssd-001";
import { ssd002 } from "./ssd-002";
import { cpu001 } from "./cpu-001";
import { monitor001 } from "./monitor-001";
import { mouse001 } from "./mouse-001";
import { keyboard001 } from "./keyboard-001";
import { headset001 } from "./headset-001";
import { Product } from "./types";

// Combine all products
export const products: Product[] = [
  laptop001,
  laptop002,
  laptop003,
  monitor001,
  mouse001,
  keyboard001,
  headset001,
  gpu001,
  ssd001,
  ssd002,
  cpu001,
  // Add other products from old file here
];

export const categories: Record<string, { name: string; description: string }> = {
  "laptop-gaming": { name: "Laptop Gaming", description: "Laptop gaming cao cấp từ các thương hiệu hàng đầu thế giới" },
  "laptop-van-phong": { name: "Laptop Văn Phòng", description: "Laptop mỏng nhẹ, hiệu năng ổn định cho công việc" },
  "pc-gaming": { name: "PC Gaming", description: "PC gaming được build sẵn với cấu hình mạnh mẽ" },
  "linh-kien-pc": { name: "Linh kiện PC", description: "CPU, GPU, RAM, SSD và các linh kiện máy tính" },
  "khuyen-mai-hot": { name: "Khuyến mãi Hot", description: "Sản phẩm đang giảm giá sốc, cơ hội vàng săn deal" },
};

export const brands = ["ASUS", "MSI", "Acer", "Lenovo", "HP", "Dell", "Gigabyte", "Razer", "Apple", "Intel", "NVIDIA", "Samsung"];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((p) => p.categoryId === categoryId);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
};
