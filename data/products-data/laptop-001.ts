import { Product } from "./types";

export const laptop001: Product = {
  id: "laptop-001",
  name: "Laptop Gaming ASUS ROG Strix G16 G614JV-N3135W",
  brand: "ASUS",
  price: 44990000,
  originalPrice: 49990000,
  rating: 4.8,
  reviewCount: 128,
  images: [
    {
      id: 1,
      url: "https://m.media-amazon.com/images/I/71zuMSjwDfL._AC_SL1500_.jpg",
      alt: "ROG Strix G16 - Front View",
    },
    {
      id: 2,
      url: "https://m.media-amazon.com/images/I/71zuMSjwDfL._AC_SL1500_.jpg",
      alt: "ROG Strix G16 - Open",
    },
    {
      id: 3,
      url: "https://m.media-amazon.com/images/I/71zuMSjwDfL._AC_SL1500_.jpg",
      alt: "ROG Strix G16 - Keyboard",
    },
    {
      id: 4,
      url: "https://m.media-amazon.com/images/I/71zuMSjwDfL._AC_SL1500_.jpg",
      alt: "ROG Strix G16 - Ports",
    },
  ],
  image: "https://m.media-amazon.com/images/I/71zuMSjwDfL._AC_SL1500_.jpg",
  description:
    "Laptop Gaming ASUS ROG Strix G16 G614JV-N3135W là chiếc laptop gaming cao cấp với thiết kế hiện đại, cấu hình mạnh mẽ đáp ứng mọi nhu cầu từ gaming đến đồ họa chuyên nghiệp. Trang bị Intel Core i9-13980HX và RTX 4060, máy dễ dàng xử lý mọi tựa game nặng nhất ở thiết lập cao.",
  specifications: [
    {
      label: "CPU",
      value: "Intel Core i9-13980HX (24 nhân, 32 luồng, up to 5.6GHz)",
    },
    { label: "GPU", value: "NVIDIA GeForce RTX 4060 8GB GDDR6" },
    { label: "RAM", value: "16GB DDR5-4800 (2 khe, nâng cấp tối đa 64GB)" },
    { label: "Ổ cứng", value: "1TB PCIe 4.0 NVMe M.2 SSD" },
    { label: "Màn hình", value: '16" FHD+ 165Hz IPS-Level, 100% sRGB' },
    { label: "Hệ điều hành", value: "Windows 11 Home" },
    { label: "Pin", value: "90Wh với sạc nhanh 100W PD" },
    { label: "Trọng lượng", value: "2.5 kg" },
    { label: "Kích thước", value: "354 x 264 x 22.5 ~ 30 mm" },
  ],
  stock: 15,
  sku: "G614JV-N3135W",
  warranty: "24 tháng chính hãng",
  features: [
    "Màn hình 165Hz siêu mượt cho gaming",
    "Tản nhiệt ROG Intelligent Cooling",
    "Bàn phím RGB Aura Sync",
    "Wi-Fi 6E và Bluetooth 5.2",
    "Cổng Thunderbolt 4",
  ],
  category: "Laptop Gaming",
  categoryId: "laptop-gaming",
  specs: {
    cpu: "i9-13980HX",
    ram: "32GB",
    storage: "1TB SSD",
    gpu: "RTX 4080",
  },
  inStock: true,
  status: "active",
  sales: 234,
};
