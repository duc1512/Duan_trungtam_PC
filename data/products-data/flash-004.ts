import { Product } from "./index";

export const flash004: Product = {
  id: "flash-004",
  name: "PC Gaming RTX 4080 Super i9-14900K 32GB DDR5 - Giá sốc",
  brand: "Custom",
  price: 42990000,
  originalPrice: 59990000,
  rating: 4.9,
  reviewCount: 78,
  images: [
    { id: 1, url: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&h=600&fit=crop", alt: "PC Gaming RTX 4080 - Front" },
    { id: 2, url: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&h=600&fit=crop", alt: "PC Gaming RTX 4080 - Inside" },
  ],
  image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=300&fit=crop",
  description: "PC gaming cao cấp với RTX 4080 Super và i9-14900K. Cấu hình mạnh nhất cho gaming 4K và streaming. Case Corsair 5000D Airflow, tản nước AIO 360mm.",
  specifications: [
    { label: "CPU", value: "Intel Core i9-14900K (24 nhân, 32 luồng)" },
    { label: "GPU", value: "NVIDIA RTX 4080 Super 16GB GDDR6X" },
    { label: "RAM", value: "32GB DDR5-6000MHz RGB" },
    { label: "Storage", value: "2TB PCIe Gen 4 NVMe SSD" },
    { label: "Mainboard", value: "ASUS ROG Maximus Z790 Hero" },
    { label: "PSU", value: "Corsair RM1000e 80+ Gold" },
  ],
  features: [
    "Hiệu năng gaming 4K tối đa",
    "Tản nhiệt nước AIO 360mm",
    "Case airflow tối ưu",
    "LED RGB đồng bộ Aura Sync",
    "Bảo hành tại nơi sử dụng",
  ],
  stock: 2,
  sku: "PC-4080S-I9K",
  warranty: "36 tháng linh kiện, 12 tháng tại nơi",
  category: "pc-gaming",
  inStock: true,
  status: "active",
  sales: 18,
};
