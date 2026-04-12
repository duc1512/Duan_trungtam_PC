import { Product } from "./types";

export const mainboard001: Product = {
  id: "mainboard-001",
  name: "ASUS ROG Maximus Z790 Hero DDR5",
  brand: "ASUS",
  price: 12990000,
  originalPrice: 14990000,
  rating: 4.9,
  reviewCount: 156,
  images: [
    {
      id: 1,
      url: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6523/6523718cv11d.jpg",
      alt: "ROG Maximus Z790 Hero - Front View",
    },
    {
      id: 2,
      url: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6523/6523718cv11d.jpg",
      alt: "ROG Maximus Z790 Hero - IO Panel",
    },
    {
      id: 3,
      url: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6523/6523718cv11d.jpg",
      alt: "ROG Maximus Z790 Hero - Heatsink",
    },
    {
      id: 4,
      url: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6523/6523718cv11d.jpg",
      alt: "ROG Maximus Z790 Hero - Detail",
    },
  ],
  image:
    "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6523/6523718cv11d.jpg",
  description:
    "ASUS ROG Maximus Z790 Hero - Mainboard cao cấp cho Intel 12/13/14th Gen, E-ATX, DDR5-8000, PCIe 5.0, WiFi 6E, 5 M.2 slots. Thiết kế đỉnh cao cho PC gaming khủng.",
  specifications: [
    { label: "Socket", value: "LGA 1700 (Intel 12/13/14th Gen)" },
    { label: "Chipset", value: "Intel Z790" },
    { label: "Form factor", value: "E-ATX (305 x 244 mm)" },
    { label: "RAM", value: "4x DDR5-8000, up to 192GB" },
    { label: "PCIe", value: "1x PCIe 5.0 x16, 1x PCIe 4.0 x16" },
    {
      label: "Storage",
      value: "5x M.2 (1x PCIe 5.0, 4x PCIe 4.0), 4x SATA 6Gb/s",
    },
    { label: "USB", value: "2x Thunderbolt 4, 6x USB 3.2 Gen 2" },
    { label: "Network", value: "Marvell 10GbE + Intel 2.5GbE, WiFi 6E" },
    { label: "Audio", value: "ROG SupremeFX ALC4082" },
  ],
  stock: 12,
  sku: "ROG-MAXIMUS-Z790-HERO",
  warranty: "36 tháng chính hãng ASUS",
  features: [
    "Mainboard cao cấp nhất Z790",
    "Hỗ trợ DDR5-8000 XMP",
    "PCIe 5.0 GPU và M.2",
    "10GbE + WiFi 6E",
    "5 M.2 slots khủng",
    "VRM 20+1 phase 90A",
  ],
  category: "Linh kiện PC",
  categoryId: "linh-kien-pc",
  inStock: true,
  status: "active",
  sales: 78,
};
