import { Product } from "./index";

export const flash002: Product = {
  id: "flash-002",
  name: "MacBook Pro M3 Max 14-inch 36GB RAM - Siêu giảm giá",
  brand: "Apple",
  price: 54990000,
  originalPrice: 69990000,
  rating: 4.8,
  reviewCount: 189,
  images: [
    { id: 1, url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop", alt: "MacBook Pro M3 Max - Front" },
    { id: 2, url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop", alt: "MacBook Pro M3 Max - Open" },
  ],
  image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
  description: "MacBook Pro M3 Max với hiệu năng vượt trội cho chuyên gia. Chip M3 Max 16-core CPU, 40-core GPU. Màn hình Liquid Retina XDR 14.2 inch, 36GB RAM, SSD 1TB.",
  specifications: [
    { label: "CPU", value: "Apple M3 Max (16 nhân CPU)" },
    { label: "GPU", value: "40 nhân GPU" },
    { label: "RAM", value: "36GB Unified Memory" },
    { label: "Storage", value: "1TB SSD" },
    { label: "Màn hình", value: "14.2\" Liquid Retina XDR (3024x1964)" },
    { label: "Pin", value: "72.4Wh, sạc 96W" },
  ],
  features: [
    "Hiệu năng đồ họa và video chuyên nghiệp",
    "Màn hình XDR 1600 nits đỉnh cao",
    "Thời lượng pin lên đến 18 giờ",
    "Touch ID và Magic Keyboard",
    "6 loa âm thanh không gian",
  ],
  stock: 2,
  sku: "MRX53ZP/A",
  warranty: "12 tháng chính hãng Apple",
  category: "laptop-van-phong",
  inStock: true,
  status: "active",
  sales: 28,
};
