import { Product } from "./types";

export const gpu001: Product = {
  id: "gpu-001",
  name: "NVIDIA GeForce RTX 4090 24GB GDDR6X",
  brand: "NVIDIA",
  price: 40990000,
  originalPrice: 53990000,
  rating: 4.9,
  reviewCount: 512,
  images: [
    {
      id: 1,
      url: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6521/6521430cv13d.jpg",
      alt: "RTX 4090 - Front View",
    },
    {
      id: 2,
      url: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6521/6521430cv13d.jpg",
      alt: "RTX 4090 - Side View",
    },
    {
      id: 3,
      url: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6521/6521430cv13d.jpg",
      alt: "RTX 4090 - Ports",
    },
    {
      id: 4,
      url: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6521/6521430cv13d.jpg",
      alt: "RTX 4090 - Detail",
    },
  ],
  image:
    "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6521/6521430cv13d.jpg",
  description:
    "NVIDIA GeForce RTX 4090 - Card đồ họa gaming đỉnh cao với kiến trúc Ada Lovelace. 24GB GDDR6X, hiệu năng gấp 2-4 lần RTX 3090 Ti. Hỗ trợ DLSS 3, Ray Tracing, cho trải nghiệm gaming 4K 144FPS mượt mà.",
  specifications: [
    { label: "GPU", value: "NVIDIA AD102-300-A1 (Ada Lovelace)" },
    { label: "CUDA Cores", value: "16,384" },
    { label: "Bộ nhớ", value: "24GB GDDR6X 384-bit" },
    { label: "Xung nhịp", value: "2.52 GHz (Boost)" },
    { label: "TDP", value: "450W (Khuyến nghị PSU 850W)" },
    { label: "Kích thước", value: "336 x 140 x 61 mm (3 slot)" },
    { label: "Cổng kết nối", value: "1x HDMI 2.1, 3x DisplayPort 1.4a" },
    { label: "Công nghệ", value: "DLSS 3, Ray Tracing Gen 3, NVENC" },
  ],
  stock: 8,
  sku: "RTX-4090-24GB-FE",
  warranty: "36 tháng chính hãng NVIDIA",
  features: [
    "Hiệu năng gaming 4K đỉnh cao",
    "24GB VRAM cho đồ họa chuyên nghiệp",
    "DLSS 3 tăng FPS gấp 4 lần",
    "Ray Tracing thế hệ 3",
    "Hỗ trợ AV1 encode",
  ],
  category: "Linh kiện PC",
  categoryId: "linh-kien-pc",
  inStock: true,
  status: "active",
  sales: 89,
};
