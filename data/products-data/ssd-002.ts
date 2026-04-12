import { Product } from "./types";

export const ssd002: Product = {
  id: "ssd-002",
  name: "Samsung 980 PRO 1TB PCIe Gen 4.0 NVMe",
  brand: "Samsung",
  price: 1290000,
  originalPrice: 1990000,
  rating: 4.7,
  reviewCount: 892,
  images: [
    {
      id: 1,
      url: "https://static-01.daraz.com.np/p/dda9589395b7be994877df040782ab21.jpg",
      alt: "Samsung 980 PRO - Front View",
    },
    {
      id: 2,
      url: "https://static-01.daraz.com.np/p/dda9589395b7be994877df040782ab21.jpg",
      alt: "Samsung 980 PRO - Chip View",
    },
    {
      id: 3,
      url: "https://static-01.daraz.com.np/p/dda9589395b7be994877df040782ab21.jpg",
      alt: "Samsung 980 PRO - Box View",
    },
  ],
  image:
    "https://static-01.daraz.com.np/p/dda9589395b7be994877df040782ab21.jpg",
  description:
    "Samsung 980 PRO 1TB - SSD NVMe PCIe Gen 4.0 hàng đầu. Tốc độ đọc lên đến 7,000MB/s, ghi 5,000MB/s. Hiệu năng vượt trội cho gaming và xử lý dữ liệu.",
  specifications: [
    { label: "Dung lượng", value: "1TB (1000GB)" },
    { label: "Chuẩn kết nối", value: "PCIe Gen 4.0 x4, NVMe 1.4" },
    { label: "Tốc độ đọc", value: "Up to 7,000 MB/s" },
    { label: "Tốc độ ghi", value: "Up to 5,000 MB/s" },
    { label: "IOPS (Đọc/Ghi)", value: "1,000K / 1,000K" },
    { label: "NAND Flash", value: "Samsung V-NAND 3-bit MLC" },
    { label: "Bộ nhớ đệm", value: "1GB LPDDR4" },
    { label: "TBW", value: "600 TB" },
    { label: "Form factor", value: "M.2 2280" },
  ],
  stock: 45,
  sku: "MZ-V8P1T0BW",
  warranty: "60 tháng chính hãng Samsung",
  features: [
    "Tốc độ Gen 4 đỉnh cao",
    "Đọc 7,000MB/s - Ghi 5,000MB/s",
    "Bộ nhớ đệm 1GB LPDDR4",
    "Tản nhiệt nhôm tích hợp",
    "Phần mềm Samsung Magician",
  ],
  category: "Linh kiện PC",
  categoryId: "linh-kien-pc",
  inStock: true,
  status: "active",
  sales: 324,
};
