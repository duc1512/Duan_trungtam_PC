import { Product } from "./types";

export const pcgaming001: Product = {
  id: "pcgaming-001",
  name: "PC Gaming Duke Dragon RTX 4090 i9",
  brand: "Duke PC",
  price: 89990000,
  originalPrice: 99990000,
  rating: 4.9,
  reviewCount: 128,
  images: [
    {
      id: 1,
      url: "https://media.very.co.uk/i/very/VQ09U_SQ1_0000000004_BLACK_SLf",
      alt: "RTX 4090 Gaming PC - Front View",
    },
    {
      id: 2,
      url: "https://media.very.co.uk/i/very/VQ09U_SQ1_0000000004_BLACK_SLf",
      alt: "RTX 4090 Gaming PC - Side View",
    },
    {
      id: 3,
      url: "https://media.very.co.uk/i/very/VQ09U_SQ1_0000000004_BLACK_SLf",
      alt: "RTX 4090 Gaming PC - Interior",
    },
    {
      id: 4,
      url: "https://media.very.co.uk/i/very/VQ09U_SQ1_0000000004_BLACK_SLf",
      alt: "RTX 4090 Gaming PC - RGB",
    },
  ],
  image:
    "https://media.very.co.uk/i/very/VQ09U_SQ1_0000000004_BLACK_SLf",
  description:
    "PC Gaming Duke Dragon RTX 4090 i9 - Chiến binh gaming đỉnh cao với Intel Core i9-14900K, RTX 4090 24GB, 64GB DDR5-6400. Case Full Tower kính cường lực, tản nhiệt nước AIO 360mm, PSU 1200W 80 Plus Platinum.",
  specifications: [
    { label: "CPU", value: "Intel Core i9-14900K (24C/32T, up to 6.0GHz)" },
    { label: "GPU", value: "NVIDIA GeForce RTX 4090 24GB GDDR6X" },
    { label: "RAM", value: "64GB DDR5-6400 RGB (2x32GB)" },
    { label: "SSD", value: "2TB NVMe Gen4x4 (Read 7000MB/s)" },
    { label: "Mainboard", value: "ASUS ROG Maximus Z790 Hero" },
    { label: "PSU", value: "1200W 80 Plus Platinum Full Modular" },
    { label: "Case", value: "Full Tower E-ATX, kính cường lực 4mm" },
    { label: "Tản nhiệt", value: "AIO 360mm RGB, 6 fan ARGB" },
  ],
  stock: 5,
  sku: "DUKE-PC-RTX4090-I9",
  warranty: "36 tháng toàn bộ linh kiện",
  features: [
    "Hiệu năng gaming 4K max setting",
    "Cấu hình RTX 4090 + i9-14900K đỉnh cao",
    "Tản nhiệt nước AIO 360mm hiệu quả",
    "64GB RAM DDR5-6400 siêu nhanh",
    "RGB đồng bộ full case",
  ],
  category: "PC Gaming",
  categoryId: "pc-gaming",
  inStock: true,
  status: "active",
  sales: 45,
};
