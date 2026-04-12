export * from "./types";
// Laptop exports
export { laptop001 } from "./laptop-001";
export { laptop002 } from "./laptop-002";
export { laptop003 } from "./laptop-003";
// PC Gaming exports
export { pcgaming001 } from "./pcgaming-001";
export { pcgaming002 } from "./pcgaming-002";
export { pcgaming003 } from "./pcgaming-003";
export { pcgaming004 } from "./pcgaming-004";
export { pcgaming005 } from "./pcgaming-005";
// GPU exports
export { gpu001 } from "./gpu-001";
export { gpu002 } from "./gpu-002";
export { gpu003 } from "./gpu-003";
export { gpu004 } from "./gpu-004";
export { gpu005 } from "./gpu-005";
// CPU exports
export { cpu001 } from "./cpu-001";
export { cpu002 } from "./cpu-002";
export { cpu003 } from "./cpu-003";
export { cpu004 } from "./cpu-004";
export { cpu005 } from "./cpu-005";
// Mainboard exports
export { mainboard001 } from "./mainboard-001";
export { mainboard002 } from "./mainboard-002";
export { mainboard003 } from "./mainboard-003";
export { mainboard004 } from "./mainboard-004";
export { mainboard005 } from "./mainboard-005";
// RAM exports
export { ram001 } from "./ram-001";
export { ram002 } from "./ram-002";
export { ram003 } from "./ram-003";
export { ram004 } from "./ram-004";
export { ram005 } from "./ram-005";
// SSD exports
export { ssd001 } from "./ssd-001";
export { ssd002 } from "./ssd-002";
export { ssd003 } from "./ssd-003";
export { ssd004 } from "./ssd-004";
export { ssd005 } from "./ssd-005";
// Monitor exports
export { monitor001 } from "./monitor-001";
export { monitor002 } from "./monitor-002";
export { monitor003 } from "./monitor-003";
export { monitor004 } from "./monitor-004";
export { monitor005 } from "./monitor-005";
// Mouse exports
export { mouse001 } from "./mouse-001";
export { mouse002 } from "./mouse-002";
export { mouse003 } from "./mouse-003";
export { mouse004 } from "./mouse-004";
export { mouse005 } from "./mouse-005";
// Keyboard exports
export { keyboard001 } from "./keyboard-001";
export { keyboard002 } from "./keyboard-002";
export { keyboard003 } from "./keyboard-003";
export { keyboard004 } from "./keyboard-004";
export { keyboard005 } from "./keyboard-005";
// Headset exports
export { headset001 } from "./headset-001";
export { headset002 } from "./headset-002";
export { headset003 } from "./headset-003";
export { headset004 } from "./headset-004";
export { headset005 } from "./headset-005";
// Case exports
export { case001 } from "./case-001";
export { case002 } from "./case-002";
export { case003 } from "./case-003";
export { case004 } from "./case-004";
export { case005 } from "./case-005";
// Flash sale exports
export { flash001 } from "./flash-001";
export { flash002 } from "./flash-002";
export { flash003 } from "./flash-003";
export { flash004 } from "./flash-004";
export { flash005 } from "./flash-005";
export { flash006 } from "./flash-006";

import { laptop001 } from "./laptop-001";
import { laptop002 } from "./laptop-002";
import { laptop003 } from "./laptop-003";
import { pcgaming001 } from "./pcgaming-001";
import { pcgaming002 } from "./pcgaming-002";
import { pcgaming003 } from "./pcgaming-003";
import { pcgaming004 } from "./pcgaming-004";
import { pcgaming005 } from "./pcgaming-005";
import { gpu001 } from "./gpu-001";
import { gpu002 } from "./gpu-002";
import { gpu003 } from "./gpu-003";
import { gpu004 } from "./gpu-004";
import { gpu005 } from "./gpu-005";
import { cpu001 } from "./cpu-001";
import { cpu002 } from "./cpu-002";
import { cpu003 } from "./cpu-003";
import { cpu004 } from "./cpu-004";
import { cpu005 } from "./cpu-005";
import { mainboard001 } from "./mainboard-001";
import { mainboard002 } from "./mainboard-002";
import { mainboard003 } from "./mainboard-003";
import { mainboard004 } from "./mainboard-004";
import { mainboard005 } from "./mainboard-005";
import { ram001 } from "./ram-001";
import { ram002 } from "./ram-002";
import { ram003 } from "./ram-003";
import { ram004 } from "./ram-004";
import { ram005 } from "./ram-005";
import { ssd001 } from "./ssd-001";
import { ssd002 } from "./ssd-002";
import { ssd003 } from "./ssd-003";
import { ssd004 } from "./ssd-004";
import { ssd005 } from "./ssd-005";
import { monitor001 } from "./monitor-001";
import { monitor002 } from "./monitor-002";
import { monitor003 } from "./monitor-003";
import { monitor004 } from "./monitor-004";
import { monitor005 } from "./monitor-005";
import { mouse001 } from "./mouse-001";
import { mouse002 } from "./mouse-002";
import { mouse003 } from "./mouse-003";
import { mouse004 } from "./mouse-004";
import { mouse005 } from "./mouse-005";
import { keyboard001 } from "./keyboard-001";
import { keyboard002 } from "./keyboard-002";
import { keyboard003 } from "./keyboard-003";
import { keyboard004 } from "./keyboard-004";
import { keyboard005 } from "./keyboard-005";
import { headset001 } from "./headset-001";
import { headset002 } from "./headset-002";
import { headset003 } from "./headset-003";
import { headset004 } from "./headset-004";
import { headset005 } from "./headset-005";
import { case001 } from "./case-001";
import { case002 } from "./case-002";
import { case003 } from "./case-003";
import { case004 } from "./case-004";
import { case005 } from "./case-005";
import { flash001 } from "./flash-001";
import { flash002 } from "./flash-002";
import { flash003 } from "./flash-003";
import { flash004 } from "./flash-004";
import { flash005 } from "./flash-005";
import { flash006 } from "./flash-006";
import { Product } from "./types";

// Combine all products
export const products: Product[] = [
  // Laptops
  laptop001,
  laptop002,
  laptop003,
  // PC Gaming
  pcgaming001,
  pcgaming002,
  pcgaming003,
  pcgaming004,
  pcgaming005,
  // GPU
  gpu001,
  gpu002,
  gpu003,
  gpu004,
  gpu005,
  // CPU
  cpu001,
  cpu002,
  cpu003,
  cpu004,
  cpu005,
  // Mainboard
  mainboard001,
  mainboard002,
  mainboard003,
  mainboard004,
  mainboard005,
  // RAM
  ram001,
  ram002,
  ram003,
  ram004,
  ram005,
  // SSD
  ssd001,
  ssd002,
  ssd003,
  ssd004,
  ssd005,
  // Monitor
  monitor001,
  monitor002,
  monitor003,
  monitor004,
  monitor005,
  // Mouse
  mouse001,
  mouse002,
  mouse003,
  mouse004,
  mouse005,
  // Keyboard
  keyboard001,
  keyboard002,
  keyboard003,
  keyboard004,
  keyboard005,
  // Headset
  headset001,
  headset002,
  headset003,
  headset004,
  headset005,
  // Case
  case001,
  case002,
  case003,
  case004,
  case005,
  // Flash Sale
  flash001,
  flash002,
  flash003,
  flash004,
  flash005,
  flash006,
];

export const categories: Record<string, { name: string; description: string }> =
  {
    "laptop-gaming": {
      name: "Laptop Gaming",
      description: "Laptop gaming cao cấp từ các thương hiệu hàng đầu thế giới",
    },
    "laptop-van-phong": {
      name: "Laptop Văn Phòng",
      description: "Laptop mỏng nhẹ, hiệu năng ổn định cho công việc",
    },
    "pc-gaming": {
      name: "PC Gaming",
      description: "PC gaming được build sẵn với cấu hình mạnh mẽ",
    },
    "linh-kien-pc": {
      name: "Linh kiện PC",
      description: "CPU, GPU, RAM, SSD và các linh kiện máy tính",
    },
    "man-hinh": {
      name: "Màn hình",
      description: "Màn hình gaming cao cấp 144Hz, 240Hz, 360Hz",
    },
    "ban-phim": {
      name: "Bàn phím",
      description: "Bàn phím cơ gaming switch đa dạng",
    },
    chuot: {
      name: "Chuột",
      description: "Chuột gaming siêu nhẹ, sensor cao cấp",
    },
    "tai-nghe": {
      name: "Tai nghe",
      description: "Tai nghe gaming âm thanh vòm, microphone rõ",
    },
    case: {
      name: "Case",
      description: "Vỏ case máy tính các loại form factor",
    },
    "khuyen-mai-hot": {
      name: "Khuyến mãi Hot",
      description: "Sản phẩm đang giảm giá sốc, cơ hội vàng săn deal",
    },
  };

export const brands = [
  "ASUS",
  "MSI",
  "Acer",
  "Lenovo",
  "HP",
  "Dell",
  "Gigabyte",
  "Razer",
  "Apple",
  "Intel",
  "NVIDIA",
  "Samsung",
  "AMD",
  "Corsair",
  "Logitech",
  "SteelSeries",
  "HyperX",
  "Kingston",
  "G.Skill",
  "WD",
  "Crucial",
  "Lian Li",
  "NZXT",
  "Phanteks",
  "Cooler Master",
  "LG",
  "AOC",
  "Duke PC",
  "Teamgroup",
  "ADATA",
  "Colorful",
  "Keychron",
  "Glorious",
];

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
      p.category.toLowerCase().includes(lowerQuery),
  );
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
};
