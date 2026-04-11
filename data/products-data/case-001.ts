import { Product } from "./types";

export const case001: Product = {
  id: "case-001",
  name: "Lian Li O11 Dynamic EVO XL",
  brand: "Lian Li",
  price: 5490000,
  originalPrice: 6290000,
  rating: 4.9,
  reviewCount: 234,
  images: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&h=600&fit=crop",
      alt: "O11D EVO XL - Front View",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=800&h=600&fit=crop",
      alt: "O11D EVO XL - Side View",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=800&h=600&fit=crop",
      alt: "O11D EVO XL - Inside",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1587202372775-4abc9295e321?w=800&h=600&fit=crop",
      alt: "O11D EVO XL - RGB",
    },
  ],
  image:
    "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
  description:
    "Lian Li O11 Dynamic EVO XL - Case Full Tower cao cấp, hỗ trợ E-ATX, dual chamber, kính cường lực 4mm, tản nhiệt nước custom tối ưu. Phiên bản lớn nhất dòng O11.",
  specifications: [
    { label: "Form factor", value: "Full Tower E-ATX" },
    { label: "Kích thước", value: "522 x 264 x 532mm (D x R x C)" },
    { label: "Mainboard", value: "E-ATX, ATX, Micro-ATX, Mini-ITX" },
    { label: "VGA", value: "Up to 460mm" },
    { label: "CPU cooler", value: "Up to 167mm (air), 420mm (radiator)" },
    { label: "PSU", value: "Up to 220mm" },
    { label: "Quạt", value: "3x 140mm top, 3x 140mm bottom, 3x 120mm side" },
    { label: "Radiator", value: "Up to 420mm top, 360mm bottom, 360mm side" },
    { label: "Ổ đĩa", value: '2x 3.5", 4x 2.5"' },
  ],
  stock: 15,
  sku: "G99.O11DEXL.00",
  warranty: "24 tháng chính hãng Lian Li",
  features: [
    "Full Tower E-ATX khổng lồ",
    "Dual chamber design",
    "Tản nhiệt nước 420mm",
    "Kính cường lực 4mm",
    "9 fan mounting positions",
    "Cable management xuất sắc",
  ],
  category: "Case",
  categoryId: "case",
  inStock: true,
  status: "active",
  sales: 156,
};
