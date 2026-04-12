import { Product } from "./types";

export const laptop002: Product = {
  id: "laptop-002",
  name: "MacBook Pro M3 Max 14-inch",
  brand: "Apple",
  price: 65990000,
  originalPrice: 71990000,
  rating: 4.9,
  reviewCount: 324,
  images: [
    {
      id: 1,
      url: "http://www.maccenter.vn/App_images/MacBookPro-14-M3Pro-Black-B.jpg",
      alt: "MacBook Pro M3 Max - Front View",
    },
    {
      id: 2,
      url: "http://www.maccenter.vn/App_images/MacBookPro-14-M3Pro-Black-B.jpg",
      alt: "MacBook Pro M3 Max - Open",
    },
    {
      id: 3,
      url: "http://www.maccenter.vn/App_images/MacBookPro-14-M3Pro-Black-B.jpg",
      alt: "MacBook Pro M3 Max - Keyboard",
    },
    {
      id: 4,
      url: "http://www.maccenter.vn/App_images/MacBookPro-14-M3Pro-Black-B.jpg",
      alt: "MacBook Pro M3 Max - Detail",
    },
  ],
  image: "http://www.maccenter.vn/App_images/MacBookPro-14-M3Pro-Black-B.jpg",
  description:
    "MacBook Pro 14-inch với chip M3 Max - Hiệu năng đỉnh cao cho chuyên gia sáng tạo. Màn hình Liquid Retina XDR tuyệt đẹp, thời lượng pin ấn tượng lên đến 18 giờ.",
  specifications: [
    { label: "CPU", value: "Apple M3 Max (14 nhân CPU, 30 nhân GPU)" },
    { label: "RAM", value: "36GB Unified Memory" },
    { label: "Ổ cứng", value: "1TB SSD" },
    {
      label: "Màn hình",
      value: '14.2" Liquid Retina XDR, 3024x1964, 120Hz ProMotion',
    },
    { label: "Camera", value: "12MP Center Stage với True Tone" },
    { label: "Kết nối", value: "Wi-Fi 6E, Bluetooth 5.3, 3x Thunderbolt 4" },
    { label: "Cổng", value: "HDMI, SDXC, MagSafe 3, 3.5mm headphone" },
    { label: "Pin", value: "100Wh, sạc nhanh 70W" },
    { label: "Trọng lượng", value: "1.61 kg" },
  ],
  stock: 15,
  sku: "MPHG3VN/A",
  warranty: "12 tháng chính hãng Apple",
  features: [
    "Chip M3 Max hiệu năng cực mạnh",
    "Màn hình Liquid Retina XDR 14.2 inch",
    "Thời lượng pin lên đến 18 giờ",
    "Loa stereo 6 loa hi-fi",
    "Touch ID bảo mật",
  ],
  category: "Laptop Văn Phòng",
  categoryId: "laptop-van-phong",
  specs: { cpu: "M3 Max", ram: "36GB", storage: "1TB SSD", gpu: "30-core GPU" },
  inStock: true,
  status: "active",
  sales: 89,
};
