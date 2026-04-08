export interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: ProductImage[];
  image?: string;
  description?: string;
  specifications?: ProductSpec[];
  features?: string[];
  stock: number;
  sku?: string;
  warranty?: string;
  category: string;
  categoryId?: string;
  specs?: Record<string, string>;
  inStock?: boolean;
  status?: "active" | "inactive" | "out_of_stock";
  sales?: number;
}

export interface CategoryInfo {
  name: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "laptop-001",
    name: "Laptop Gaming ASUS ROG Strix G16 G614JV-N3135W",
    brand: "ASUS",
    price: 44990000,
    originalPrice: 49990000,
    rating: 4.8,
    reviewCount: 128,
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop", alt: "Laptop Gaming ASUS ROG - Front View" },
      { id: 2, url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop", alt: "Laptop Gaming ASUS ROG - Side View" },
      { id: 3, url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop", alt: "Laptop Gaming ASUS ROG - Open" },
      { id: 4, url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop", alt: "Laptop Gaming ASUS ROG - Detail" },
    ],
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=300&fit=crop",
    description: "Laptop Gaming ASUS ROG Strix G16 G614JV-N3135W là chiếc laptop gaming cao cấp với thiết kế hiện đại, cấu hình mạnh mẽ đáp ứng mọi nhu cầu từ gaming đến đồ họa chuyên nghiệp. Trang bị Intel Core i9-13980HX và RTX 4060, máy dễ dàng xử lý mọi tựa game nặng nhất ở thiết lập cao.",
    specifications: [
      { label: "CPU", value: "Intel Core i9-13980HX (24 nhân, 32 luồng, up to 5.6GHz)" },
      { label: "GPU", value: "NVIDIA GeForce RTX 4060 8GB GDDR6" },
      { label: "RAM", value: "16GB DDR5-4800 (2 khe, nâng cấp tối đa 64GB)" },
      { label: "Ổ cứng", value: "1TB PCIe 4.0 NVMe M.2 SSD" },
      { label: "Màn hình", value: "16\" FHD+ 165Hz IPS-Level, 100% sRGB" },
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
    specs: { cpu: "i9-13980HX", ram: "32GB", storage: "1TB SSD", gpu: "RTX 4080" },
    inStock: true,
    status: "active",
    sales: 234,
  },
  {
    id: "laptop-002",
    name: "MacBook Pro M3 Max 14-inch",
    brand: "Apple",
    price: 65990000,
    originalPrice: 69990000,
    rating: 4.9,
    reviewCount: 89,
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop", alt: "MacBook Pro M3 Max - Front View" },
      { id: 2, url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop", alt: "MacBook Pro M3 Max - Side View" },
      { id: 3, url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop", alt: "MacBook Pro M3 Max - Open" },
      { id: 4, url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop", alt: "MacBook Pro M3 Max - Detail" },
    ],
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    description: "MacBook Pro 14 inch với chip M3 Max mang đến hiệu năng chuyên nghiệp vượt trội. Thiết kế mỏng nhẹ, màn hình Liquid Retina XDR tuyệt đẹp, thời lượng pin cả ngày. Hoàn hảo cho các chuyên gia sáng tạo, lập trình viên và người dùng đòi hỏi hiệu năng cao.",
    specifications: [
      { label: "CPU", value: "Apple M3 Max (14 nhân CPU, 30 nhân GPU)" },
      { label: "RAM", value: "36GB Unified Memory" },
      { label: "Ổ cứng", value: "1TB SSD" },
      { label: "Màn hình", value: "14.2\" Liquid Retina XDR, 3024x1964, 120Hz ProMotion" },
      { label: "Hệ điều hành", value: "macOS Sonoma" },
      { label: "Pin", value: "Up to 22 giờ" },
      { label: "Trọng lượng", value: "1.61 kg" },
      { label: "Kết nối", value: "3x Thunderbolt 4, HDMI, MagSafe 3, SDXC" },
    ],
    stock: 8,
    sku: "MPHG3VN/A",
    warranty: "12 tháng chính hãng Apple",
    features: [
      "Hiệu năng M3 Max vượt trội",
      "Màn hình XDR 1600 nits HDR",
      "Thời lượng pin 22 giờ",
      "Touch ID và Magic Keyboard",
      "Kết nối Thunderbolt 4",
    ],
    category: "Laptop Văn Phòng",
    categoryId: "laptop-van-phong",
    inStock: true,
    status: "active",
    sales: 156,
  },
  {
    id: "pc-001",
    name: "PC Gaming RTX 4070 Ti - Core i7 13700K",
    brand: "Duke PC",
    price: 38990000,
    originalPrice: 42990000,
    rating: 4.7,
    reviewCount: 156,
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1587202372775-4abc9295e321?w=800&h=600&fit=crop", alt: "PC Gaming RTX 4070 Ti - Front View" },
      { id: 2, url: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=600&fit=crop", alt: "PC Gaming RTX 4070 Ti - GPU View" },
      { id: 3, url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&h=600&fit=crop", alt: "PC Gaming RTX 4070 Ti - CPU View" },
      { id: 4, url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&h=600&fit=crop", alt: "PC Gaming RTX 4070 Ti - SSD View" },
    ],
    image: "https://images.unsplash.com/photo-1587202372775-4abc9295e321?w=400&h=300&fit=crop",
    description: "PC Gaming cao cấp với RTX 4070 Ti và Intel Core i7-13700K. Cấu hình mạnh mẽ chơi game 4K mượt mà, thiết kế case gaming RGB, tản nhiệt nước AIO 360mm. Build sẵn từ Duke PC với bảo hành 3 năm.",
    specifications: [
      { label: "CPU", value: "Intel Core i7-13700K (16 nhân, 24 luồng, up to 5.4GHz)" },
      { label: "GPU", value: "NVIDIA GeForce RTX 4070 Ti 12GB GDDR6X" },
      { label: "RAM", value: "32GB DDR5-5600 RGB (2x16GB)" },
      { label: "Mainboard", value: "MSI MAG Z790 TOMAHAWK WIFI" },
      { label: "Ổ cứng", value: "1TB Samsung 980 Pro NVMe Gen4" },
      { label: "Nguồn", value: "Corsair RM850e 850W 80+ Gold" },
      { label: "Case", value: "NZXT H7 Flow RGB Mid-Tower" },
      { label: "Tản nhiệt", value: "NZXT Kraken 360 RGB AIO Liquid Cooler" },
    ],
    stock: 12,
    sku: "DUKE-PC-4070TI-01",
    warranty: "36 tháng toàn bộ PC",
    features: [
      "Chơi game 4K 60+ FPS mượt mà",
      "Tản nhiệt nước AIO 360mm",
      "RAM DDR5 RGB 5600MHz",
      "SSD Gen4 tốc độ cao",
      "Case gaming RGB đẹp mắt",
    ],
    category: "PC Gaming",
    categoryId: "pc-gaming",
    inStock: true,
    status: "active",
    sales: 98,
  },
  {
    id: "cpu-001",
    name: "Intel Core i9-14900K (Box)",
    brand: "Intel",
    price: 15490000,
    originalPrice: 17990000,
    rating: 4.8,
    reviewCount: 234,
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&h=600&fit=crop", alt: "Intel Core i9-14900K - Box View" },
      { id: 2, url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop", alt: "Intel Core i9-14900K - CPU View" },
      { id: 3, url: "https://images.unsplash.com/photo-1562976540-ff2e8d5b2a8a?w=800&h=600&fit=crop", alt: "Intel Core i9-14900K - Detail View" },
      { id: 4, url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&h=600&fit=crop", alt: "Intel Core i9-14900K - Socket View" },
    ],
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&h=300&fit=crop",
    description: "Intel Core i9-14900K - CPU đỉnh cao dòng Raptor Lake Refresh với 24 nhân 32 luồng, xung nhịp lên đến 6.0GHz. Hiệu năng vượt trội cho gaming, streaming và đồ họa chuyên nghiệp.",
    specifications: [
      { label: "Dòng CPU", value: "Intel Core 14th Gen Raptor Lake Refresh" },
      { label: "Nhân luồng", value: "24 nhân (8P+16E), 32 luồng" },
      { label: "Xung nhịp", value: "Up to 6.0GHz (P-core) / 4.4GHz (E-core)" },
      { label: "Cache", value: "36MB Intel Smart Cache" },
      { label: "TDP", value: "125W (Base) / 253W (Max Turbo)" },
      { label: "Socket", value: "LGA 1700" },
      { label: "Bộ nhớ hỗ trợ", value: "DDR5-5600 / DDR4-3200, up to 192GB" },
      { label: "Đồ họa tích hợp", value: "Intel UHD Graphics 770" },
    ],
    stock: 25,
    sku: "BX8071514900K",
    warranty: "36 tháng chính hãng Intel",
    features: [
      "Hiệu năng gaming đỉnh cao",
      "Xung nhịp 6.0GHz vượt trội",
      "Hỗ trợ DDR5-5600",
      "Socket LGA 1700 tương thích rộng",
      "Bảo hành 3 năm Intel",
    ],
    category: "Linh kiện PC",
    categoryId: "linh-kien-pc",
    inStock: true,
    status: "active",
    sales: 67,
  },
  {
    id: "2",
    name: "MSI Katana 15 B13VFK",
    brand: "MSI",
    price: 32990000,
    rating: 4.5,
    reviewCount: 89,
    images: [{ id: 1, url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop", alt: "MSI Katana 15" }],
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop",
    description: "MSI Katana 15 - Laptop gaming hiệu năng cao với RTX 4060.",
    stock: 32,
    category: "Laptop Gaming",
    categoryId: "laptop-gaming",
    features: ["RTX 4060", "i7-13620H"],
    specs: { cpu: "i7-13620H", ram: "16GB", storage: "512GB SSD", gpu: "RTX 4060" },
    inStock: true,
    status: "active",
    sales: 189,
  },
  {
    id: "3",
    name: "Acer Predator Helios 300",
    brand: "Acer",
    price: 38990000,
    originalPrice: 42990000,
    rating: 4.6,
    reviewCount: 156,
    images: [{ id: 1, url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop", alt: "Acer Predator Helios" }],
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    description: "Acer Predator Helios 300 - Laptop gaming cao cấp với RTX 4070.",
    stock: 0,
    category: "Laptop Gaming",
    categoryId: "laptop-gaming",
    features: ["RTX 4070", "i7-13700H"],
    specs: { cpu: "i7-13700H", ram: "16GB", storage: "1TB SSD", gpu: "RTX 4070" },
    inStock: false,
    status: "out_of_stock",
    sales: 156,
  },
  {
    id: "4",
    name: "Lenovo Legion Pro 7",
    brand: "Lenovo",
    price: 52990000,
    rating: 4.9,
    reviewCount: 203,
    images: [{ id: 1, url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop", alt: "Lenovo Legion Pro 7" }],
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
    description: "Lenovo Legion Pro 7 - Laptop gaming đỉnh cao với RTX 4090.",
    stock: 12,
    category: "Laptop Gaming",
    categoryId: "laptop-gaming",
    features: ["RTX 4090", "i9-13900HX"],
    specs: { cpu: "i9-13900HX", ram: "32GB", storage: "2TB SSD", gpu: "RTX 4090" },
    inStock: false,
    status: "active",
    sales: 98,
  },
  {
    id: "5",
    name: "Dell XPS 15 9520",
    brand: "Dell",
    price: 45990000,
    rating: 4.7,
    reviewCount: 112,
    images: [{ id: 1, url: "https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=800&h=600&fit=crop", alt: "Dell XPS 15" }],
    image: "https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=400&h=300&fit=crop",
    description: "Dell XPS 15 - Laptop văn phòng cao cấp.",
    stock: 28,
    category: "Laptop Văn Phòng",
    categoryId: "laptop-van-phong",
    specs: { cpu: "i7-12700H", ram: "16GB", storage: "512GB SSD", gpu: "Intel Iris Xe" },
    inStock: true,
    status: "inactive",
    sales: 67,
  },
  {
    id: "6",
    name: "HP Omen 16",
    brand: "HP",
    price: 31990000,
    originalPrice: 34990000,
    rating: 4.4,
    reviewCount: 98,
    images: [{ id: 1, url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop", alt: "HP Omen 16" }],
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop",
    description: "HP Omen 16 - Laptop gaming mạnh mẽ.",
    stock: 20,
    category: "Laptop Gaming",
    categoryId: "laptop-gaming",
    features: ["RTX 4060", "i7-13700HX"],
    specs: { cpu: "i7-13700HX", ram: "16GB", storage: "512GB SSD", gpu: "RTX 4060" },
    inStock: true,
    status: "active",
    sales: 145,
  },
  {
    id: "7",
    name: "Acer Nitro 5 AN515-58",
    brand: "Acer",
    price: 24990000,
    originalPrice: 27990000,
    rating: 4.3,
    reviewCount: 234,
    images: [{ id: 1, url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop", alt: "Acer Nitro 5" }],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    description: "Acer Nitro 5 - Laptop gaming giá rẻ.",
    stock: 45,
    category: "Laptop Gaming",
    categoryId: "laptop-gaming",
    features: ["RTX 3050", "i5-12450H"],
    specs: { cpu: "i5-12450H", ram: "8GB", storage: "512GB SSD", gpu: "RTX 3050" },
    inStock: true,
    status: "active",
    sales: 312,
  },
  {
    id: "8",
    name: "ASUS TUF Gaming F15",
    brand: "ASUS",
    price: 21990000,
    rating: 4.5,
    reviewCount: 312,
    images: [{ id: 1, url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop", alt: "ASUS TUF Gaming" }],
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=300&fit=crop",
    description: "ASUS TUF Gaming F15 - Bền bỉ cho game thủ.",
    stock: 38,
    category: "Laptop Gaming",
    categoryId: "laptop-gaming",
    features: ["RTX 3050", "i5-12500H"],
    specs: { cpu: "i5-12500H", ram: "8GB", storage: "512GB SSD", gpu: "RTX 3050" },
    inStock: true,
    status: "active",
    sales: 278,
  },
  {
    id: "9",
    name: "MSI GF63 Thin 12UCX",
    brand: "MSI",
    price: 18990000,
    originalPrice: 20990000,
    rating: 4.0,
    reviewCount: 145,
    images: [{ id: 1, url: "https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=800&h=600&fit=crop", alt: "MSI GF63" }],
    image: "https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=400&h=300&fit=crop",
    description: "MSI GF63 Thin - Mỏng nhẹ, hiệu năng tốt.",
    stock: 15,
    category: "Laptop Gaming",
    categoryId: "laptop-gaming",
    features: ["GTX 1650", "i5-12450H"],
    specs: { cpu: "i5-12450H", ram: "8GB", storage: "256GB SSD", gpu: "GTX 1650" },
    inStock: true,
    status: "active",
    sales: 189,
  },
  {
    id: "10",
    name: "Gigabyte G5 MF",
    brand: "Gigabyte",
    price: 23990000,
    rating: 4.3,
    reviewCount: 78,
    images: [{ id: 1, url: "https://images.unsplash.com/photo-1587831990711-23d6440c35b3?w=800&h=600&fit=crop", alt: "Gigabyte G5" }],
    image: "https://images.unsplash.com/photo-1587831990711-23d6440c35b3?w=400&h=300&fit=crop",
    description: "Gigabyte G5 MF - Laptop gaming tầm trung.",
    stock: 22,
    category: "Laptop Gaming",
    categoryId: "laptop-gaming",
    features: ["RTX 4050", "i5-12500H"],
    specs: { cpu: "i5-12500H", ram: "8GB", storage: "512GB SSD", gpu: "RTX 4050" },
    inStock: true,
    status: "active",
    sales: 156,
  },
  {
    id: "11",
    name: "Razer Blade 15",
    brand: "Razer",
    price: 54990000,
    rating: 4.7,
    reviewCount: 56,
    images: [{ id: 1, url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop", alt: "Razer Blade 15" }],
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
    description: "Razer Blade 15 - Laptop gaming cao cấp.",
    stock: 5,
    category: "Laptop Gaming",
    categoryId: "laptop-gaming",
    features: ["RTX 4070", "i7-13800H"],
    specs: { cpu: "i7-13800H", ram: "16GB", storage: "1TB SSD", gpu: "RTX 4070" },
    inStock: false,
    status: "active",
    sales: 34,
  },
  {
    id: "12",
    name: "Alienware m15 R7",
    brand: "Dell",
    price: 59990000,
    originalPrice: 64990000,
    rating: 4.6,
    reviewCount: 34,
    images: [{ id: 1, url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop", alt: "Alienware m15" }],
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
    description: "Alienware m15 R7 - Laptop gaming đỉnh cao.",
    stock: 8,
    category: "Laptop Gaming",
    categoryId: "laptop-gaming",
    features: ["RTX 4070", "i9-12900H"],
    specs: { cpu: "i9-12900H", ram: "32GB", storage: "1TB SSD", gpu: "RTX 4070" },
    inStock: true,
    status: "active",
    sales: 56,
  },
];

export const categories: Record<string, CategoryInfo> = {
  "laptop-gaming": { name: "Laptop Gaming", description: "Laptop gaming cao cấp từ các thương hiệu hàng đầu thế giới" },
  "laptop-van-phong": { name: "Laptop Văn Phòng", description: "Laptop mỏng nhẹ, hiệu năng ổn định cho công việc" },
  "pc-gaming": { name: "PC Gaming", description: "PC gaming được build sẵn với cấu hình mạnh mẽ" },
  "linh-kien-pc": { name: "Linh kiện PC", description: "CPU, GPU, RAM, SSD và các linh kiện máy tính" },
  "khuyen-mai-hot": { name: "Khuyến mãi Hot", description: "Sản phẩm đang giảm giá sốc, cơ hội vàng săn deal" },
};

export const brands = ["ASUS", "MSI", "Acer", "Lenovo", "HP", "Dell", "Gigabyte", "Razer", "Apple", "Intel"];

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
