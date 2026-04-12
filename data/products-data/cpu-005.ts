import { Product } from "./types";

export const cpu005: Product = {
  id: "cpu-005",
  name: "Intel Core i5-14400F (Box)",
  brand: "Intel",
  price: 4290000,
  originalPrice: 4890000,
  rating: 4.6,
  reviewCount: 678,
  images: [
    {
      id: 1,
      url: "https://thaher.tech/wp-content/uploads/2024/02/1-22.jpg",
      alt: "Intel Core i5-14400F - Box View",
    },
    {
      id: 2,
      url: "https://thaher.tech/wp-content/uploads/2024/02/1-22.jpg",
      alt: "Intel Core i5-14400F - CPU View",
    },
    {
      id: 3,
      url: "https://thaher.tech/wp-content/uploads/2024/02/1-22.jpg",
      alt: "Intel Core i5-14400F - Detail View",
    },
    {
      id: 4,
      url: "https://thaher.tech/wp-content/uploads/2024/02/1-22.jpg",
      alt: "Intel Core i5-14400F - Socket View",
    },
  ],
  image:
    "https://thaher.tech/wp-content/uploads/2024/02/1-22.jpg",
  description:
    "Intel Core i5-14400F - CPU gaming phổ thông 10 nhân 16 luồng, xung nhịp 4.7GHz. Phiên bản không iGPU, giá tốt hơn, dùng card rời hiệu quả.",
  specifications: [
    { label: "Dòng CPU", value: "Intel Core 14th Gen Raptor Lake Refresh" },
    { label: "Nhân luồng", value: "10 nhân (6P+4E), 16 luồng" },
    { label: "Xung nhịp", value: "Up to 4.7GHz (P-core) / 3.5GHz (E-core)" },
    { label: "Cache", value: "20MB Intel Smart Cache" },
    { label: "TDP", value: "65W (Base) / 154W (Max Turbo)" },
    { label: "Socket", value: "LGA 1700" },
    { label: "Bộ nhớ hỗ trợ", value: "DDR5-4800 / DDR4-3200, up to 192GB" },
    { label: "Đồ họa tích hợp", value: "Không có (cần GPU rời)" },
  ],
  stock: 85,
  sku: "BX8071514400F",
  warranty: "36 tháng chính hãng Intel",
  features: [
    "Giá tốt không có iGPU",
    "10 nhân đa nhiệm tốt",
    "Gaming 1080p mượt mà",
    "TDP 65W tiết kiệm điện",
    "Tương thích B660/H610",
  ],
  category: "Linh kiện PC",
  categoryId: "linh-kien-pc",
  inStock: true,
  status: "active",
  sales: 567,
};
