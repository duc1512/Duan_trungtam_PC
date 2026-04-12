import { Product } from "./types";

export const ssd003: Product = {
  id: "ssd-003",
  name: "Samsung 990 PRO 2TB NVMe PCIe 4.0",
  brand: "Samsung",
  price: 3990000,
  originalPrice: 4590000,
  rating: 4.9,
  reviewCount: 456,
  images: [
    {
      id: 1,
      url: "https://cdn.mwave.com.au/images/400/samsung_990_pro_2tb_pcie_40_nvme_m2_2280_ssd_mzv9p2t0bw_ac58657_54766.jpg",
      alt: "Samsung 990 PRO - Front View",
    },
    {
      id: 2,
      url: "https://cdn.mwave.com.au/images/400/samsung_990_pro_2tb_pcie_40_nvme_m2_2280_ssd_mzv9p2t0bw_ac58657_54766.jpg",
      alt: "Samsung 990 PRO - Chip",
    },
    {
      id: 3,
      url: "https://cdn.mwave.com.au/images/400/samsung_990_pro_2tb_pcie_40_nvme_m2_2280_ssd_mzv9p2t0bw_ac58657_54766.jpg",
      alt: "Samsung 990 PRO - Detail",
    },
    {
      id: 4,
      url: "https://cdn.mwave.com.au/images/400/samsung_990_pro_2tb_pcie_40_nvme_m2_2280_ssd_mzv9p2t0bw_ac58657_54766.jpg",
      alt: "Samsung 990 PRO - Box",
    },
  ],
  image:
    "https://cdn.mwave.com.au/images/400/samsung_990_pro_2tb_pcie_40_nvme_m2_2280_ssd_mzv9p2t0bw_ac58657_54766.jpg",
  description:
    "Samsung 990 PRO 2TB - SSD NVMe PCIe 4.0 x4 tốc độ cao nhất thị trường, đọc 7450MB/s ghi 6900MB/s, controller Pascal Samsung, bộ nhớ V-NAND 7th Gen.",
  specifications: [
    { label: "Dung lượng", value: "2TB (1,024GB usable)" },
    { label: "Giao tiếp", value: "PCIe 4.0 x4, NVMe 2.0" },
    { label: "Tốc độ đọc", value: "Up to 7,450 MB/s" },
    { label: "Tốc độ ghi", value: "Up to 6,900 MB/s" },
    { label: "IOPS", value: "1.4M Read / 1.55M Write" },
    { label: "Controller", value: "Samsung Pascal 8nm" },
    { label: "NAND", value: "Samsung V-NAND 7th Gen 176L TLC" },
    { label: "DRAM Cache", value: "2GB LPDDR4" },
    { label: "TBW", value: "1,200 TB" },
  ],
  stock: 32,
  sku: "MZ-V9P2T0BW",
  warranty: "60 tháng chính hãng Samsung",
  features: [
    "SSD PCIe 4.0 nhanh nhất",
    "Đọc 7450MB/s ghi 6900MB/s",
    "2TB dư dả lưu trữ",
    "Controller Samsung Pascal",
    "V-NAND 7th Gen tiết kiệm điện",
    "Phù hợp gaming & creator",
  ],
  category: "Linh kiện PC",
  categoryId: "linh-kien-pc",
  inStock: true,
  status: "active",
  sales: 267,
};
