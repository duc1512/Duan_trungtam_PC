import { Product } from "./index";

export const flash006: Product = {
  id: "flash-006",
  name: "Samsung 990 PRO 2TB NVMe Gen 5 - SSD cao cấp giảm giá",
  brand: "Samsung",
  price: 2990000,
  originalPrice: 4990000,
  rating: 4.9,
  reviewCount: 234,
  images: [
    { id: 1, url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&h=600&fit=crop", alt: "Samsung 990 PRO - Front" },
    { id: 2, url: "https://images.unsplash.com/photo-1562976540-ff2e8d5b2a8a?w=800&h=600&fit=crop", alt: "Samsung 990 PRO - Chip" },
  ],
  image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
  description: "SSD NVMe Gen 5 tốc độ đọc 14,500MB/s, ghi 13,000MB/s. Controller Samsung Pascal, NAND V-NAND TLC 236-layer. Hỗ trợ Microsoft DirectStorage cho gaming.",
  specifications: [
    { label: "Dung lượng", value: "2TB" },
    { label: "Chuẩn", value: "PCIe Gen 5.0 x4 NVMe 2.0" },
    { label: "Tốc độ đọc", value: "14,500 MB/s" },
    { label: "Tốc độ ghi", value: "13,000 MB/s" },
    { label: "Controller", value: "Samsung Pascal" },
    { label: "NAND", value: "V-NAND TLC 236-layer" },
  ],
  features: [
    "Tốc độ Gen 5 vượt trội",
    "Hỗ trợ DirectStorage",
    "Bộ nhớ đệm 2GB LPDDR4",
    "Công nghệ tản nhiệt thụ động",
    "Bảo hành 5 năm / 1200TBW",
  ],
  stock: 8,
  sku: "MZ-V9P2T0BW",
  warranty: "60 tháng chính hãng Samsung",
  category: "linh-kien-pc",
  inStock: true,
  status: "active",
  sales: 72,
};
