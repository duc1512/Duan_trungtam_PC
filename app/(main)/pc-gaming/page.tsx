"use client";

import { useState } from "react";

const pcBuilds = [
  {
    id: 1,
    name: "PC Gaming Esports Pro",
    price: 45990000,
    originalPrice: 52990000,
    discount: 13,
    image: "https://images.unsplash.com/photo-1587202372775-4abc9295e321?w=600&h=400&fit=crop",
    category: "cao-cap",
    categoryName: "Cao cấp",
    badge: "BÁN CHẠY",
    badgeColor: "bg-red-600",
    specs: {
      cpu: "Intel Core i9-14900K",
      gpu: "NVIDIA RTX 4080 Super 16GB",
      ram: "32GB DDR5 6000MHz",
      storage: "2TB NVMe Gen4 SSD",
      motherboard: "ASUS ROG Strix Z790-E",
      psu: "Corsair RM1000x 1000W",
      case: "Lian Li O11 Dynamic EVO",
      cooling: "360mm AIO Liquid Cooler"
    },
    performance: {
      gaming: "Ultra 4K 144Hz+",
      productivity: "Cực mạnh",
      upgrade: "Dễ nâng cấp"
    },
    inStock: true,
    buildTime: "3-5 ngày"
  },
  {
    id: 2,
    name: "PC Gaming Streamer",
    price: 68990000,
    originalPrice: null,
    discount: 0,
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop",
    category: "streamer",
    categoryName: "Streamer",
    badge: "CAO CẤP",
    badgeColor: "bg-purple-600",
    specs: {
      cpu: "AMD Ryzen 9 7950X",
      gpu: "NVIDIA RTX 4090 24GB",
      ram: "64GB DDR5 6000MHz",
      storage: "4TB NVMe Gen4 SSD + 8TB HDD",
      motherboard: "ASUS ROG Crosshair X670E Hero",
      psu: "Seasonic PRIME TX-1300 1300W",
      case: "Phanteks Enthoo 719",
      cooling: "Custom Water Cooling"
    },
    performance: {
      gaming: "Ultra 4K 240Hz",
      productivity: "Siêu mạnh",
      upgrade: "Tối đa"
    },
    inStock: true,
    buildTime: "7-10 ngày"
  },
  {
    id: 3,
    name: "PC Gaming Entry Level",
    price: 18990000,
    originalPrice: 22990000,
    discount: 17,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
    category: "pho-thong",
    categoryName: "Phổ thông",
    badge: "GIÁ TỐT",
    badgeColor: "bg-green-600",
    specs: {
      cpu: "Intel Core i5-13400F",
      gpu: "NVIDIA RTX 4060 8GB",
      ram: "16GB DDR4 3200MHz",
      storage: "1TB NVMe SSD",
      motherboard: "MSI B760M Gaming Plus",
      psu: "Corsair CV650 650W",
      case: "MSI MAG Forge 100M",
      cooling: "Tower Air Cooler"
    },
    performance: {
      gaming: "High 1080p / Medium 1440p",
      productivity: "Tốt",
      upgrade: "Khá dễ"
    },
    inStock: true,
    buildTime: "2-3 ngày"
  },
  {
    id: 4,
    name: "PC Gaming Mid-Range",
    price: 32990000,
    originalPrice: null,
    discount: 0,
    image: "https://images.unsplash.com/photo-1590644839082-cd8ad5c7d5b8?w=600&h=400&fit=crop",
    category: "trung-cap",
    categoryName: "Trung cấp",
    badge: "MỚI",
    badgeColor: "bg-blue-600",
    specs: {
      cpu: "AMD Ryzen 7 7700X",
      gpu: "NVIDIA RTX 4070 Ti 12GB",
      ram: "32GB DDR5 5600MHz",
      storage: "2TB NVMe Gen4 SSD",
      motherboard: "ASUS TUF Gaming B650-Plus",
      psu: "Seasonic Focus GX-850 850W",
      case: "Lian Li Lancool 216",
      cooling: "280mm AIO Liquid Cooler"
    },
    performance: {
      gaming: "Ultra 1440p / High 4K",
      productivity: "Rất mạnh",
      upgrade: "Dễ"
    },
    inStock: false,
    buildTime: "4-6 ngày"
  },
  {
    id: 5,
    name: "PC Gaming Compact SFF",
    price: 28990000,
    originalPrice: 32990000,
    discount: 12,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=400&fit=crop",
    category: "compact",
    categoryName: "Compact",
    badge: "HOT",
    badgeColor: "bg-orange-600",
    specs: {
      cpu: "Intel Core i7-13700K",
      gpu: "NVIDIA RTX 4070 12GB",
      ram: "32GB DDR5 5600MHz",
      storage: "1TB NVMe Gen4 SSD",
      motherboard: "ASUS ROG Strix Z790-I",
      psu: "Corsair SF750 750W SFX",
      case: "Fractal Design Node 304",
      cooling: "240mm AIO Liquid Cooler"
    },
    performance: {
      gaming: "Ultra 1440p",
      productivity: "Mạnh",
      upgrade: "Khó"
    },
    inStock: true,
    buildTime: "5-7 ngày"
  },
  {
    id: 6,
    name: "PC Gaming Workstation",
    price: 52990000,
    originalPrice: null,
    discount: 0,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop",
    category: "workstation",
    categoryName: "Workstation",
    badge: "ĐỘC QUYỀN",
    badgeColor: "bg-indigo-600",
    specs: {
      cpu: "Intel Core i9-14900K",
      gpu: "NVIDIA RTX 4080 Super 16GB + RTX A4000",
      ram: "128GB DDR5 5600MHz ECC",
      storage: "4TB NVMe Gen4 SSD RAID 0 + 20TB NAS",
      motherboard: "ASUS Pro WS W790E-SAGE",
      psu: "Seasonic PRIME TX-1600 1600W",
      case: "Thermaltake Core W200",
      cooling: "Custom Water Cooling + Phase Change"
    },
    performance: {
      gaming: "Ultra 4K+",
      productivity: "Tối đa",
      upgrade: "Chuyên nghiệp"
    },
    inStock: true,
    buildTime: "10-14 ngày"
  }
];

const categories = [
  { id: "all", name: "Tất cả", count: 45 },
  { id: "pho-thong", name: "Phổ thông", count: 12 },
  { id: "trung-cap", name: "Trung cấp", count: 15 },
  { id: "cao-cap", name: "Cao cấp", count: 10 },
  { id: "streamer", name: "Streamer", count: 5 },
  { id: "compact", name: "Compact", count: 3 }
];

const priceRanges = [
  { id: "all", name: "Tất cả giá", min: 0, max: Infinity },
  { id: "under-20", name: "Dưới 20 triệu", min: 0, max: 20000000 },
  { id: "20-35", name: "20-35 triệu", min: 20000000, max: 35000000 },
  { id: "35-50", name: "35-50 triệu", min: 35000000, max: 50000000 },
  { id: "over-50", name: "Trên 50 triệu", min: 50000000, max: Infinity }
];

export default function PCGaming() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredPCs = pcBuilds.filter(pc => {
    const matchesCategory = selectedCategory === "all" || pc.category === selectedCategory;
    const matchesPrice = pc.price >= priceRanges.find(r => r.id === selectedPriceRange)!.min && 
                        pc.price <= priceRanges.find(r => r.id === selectedPriceRange)!.max;
    return matchesCategory && matchesPrice;
  });

  const sortedPCs = [...filteredPCs].sort((a, b) => {
    switch(sortBy) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      default: return 0;
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0 
    }).format(price);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-cyan-900 pt-16 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              🖥️ PC GAMING
            </h1>
            <p className="text-blue-200 text-lg mb-6">
              Build PC gaming theo yêu cầu, hiệu năng đỉnh cao, bảo hành tận tâm
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-3xl mb-2">⚡</div>
                <p className="text-white font-bold">Hiệu năng tối ưu</p>
                <p className="text-blue-200 text-sm">Tối ưu cho gaming</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-3xl mb-2">🔧</div>
                <p className="text-white font-bold">Lắp ráp chuyên nghiệp</p>
                <p className="text-blue-200 text-sm">Kỹ thuật viên tay nghề cao</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-3xl mb-2">🛡️</div>
                <p className="text-white font-bold">Bảo hành 3 năm</p>
                <p className="text-blue-200 text-sm">1 đổi 1 trong 30 ngày</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-3xl mb-2">🚀</div>
                <p className="text-white font-bold">Giao hàng 24H</p>
                <p className="text-blue-200 text-sm">Miễn phí toàn quốc</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm">Dòng PC</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-sm text-gray-500">({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm">Khoảng giá</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setSelectedPriceRange(range.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedPriceRange === range.id
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {range.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Build PC Service */}
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-4 text-white">
                <h4 className="font-bold mb-2">🎮 Build PC theo yêu cầu</h4>
                <p className="text-sm text-blue-100 mb-3">
                  Tư vấn miễn phí, build theo ngân sách và nhu cầu
                </p>
                <button className="bg-white text-blue-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                  Tư vấn ngay
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            
            {/* Sort Bar */}
            <div className="bg-white rounded-xl p-4 mb-6 shadow-sm flex justify-between items-center">
              <div className="text-gray-600">
                Tìm thấy <span className="font-bold text-gray-900">{sortedPCs.length}</span> cấu hình
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Nổi bật</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
              </select>
            </div>

            {/* PC Builds Grid */}
            <div className="grid grid-cols-1 gap-6">
              {sortedPCs.map((pc) => (
                <div key={pc.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="lg:w-1/3 relative">
                      <img
                        src={pc.image}
                        alt={pc.name}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                      <div className={`absolute top-4 left-4 ${pc.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                        {pc.badge}
                      </div>
                      {pc.discount > 0 && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          -{pc.discount}%
                        </div>
                      )}
                    </div>
                    
                    {/* Content Section */}
                    <div className="lg:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{pc.name}</h3>
                          <p className="text-sm text-gray-500">{pc.categoryName}</p>
                        </div>
                        <div className="text-right">
                          {pc.originalPrice && (
                            <p className="text-gray-400 line-through text-sm">{formatPrice(pc.originalPrice)}</p>
                          )}
                          <p className="text-2xl font-bold text-blue-600">{formatPrice(pc.price)}</p>
                        </div>
                      </div>
                      
                      {/* Key Specs */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1">CPU</p>
                          <p className="text-sm font-medium text-gray-900">{pc.specs.cpu}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1">GPU</p>
                          <p className="text-sm font-medium text-gray-900">{pc.specs.gpu}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1">RAM</p>
                          <p className="text-sm font-medium text-gray-900">{pc.specs.ram}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1">Ổ cứng</p>
                          <p className="text-sm font-medium text-gray-900">{pc.specs.storage}</p>
                        </div>
                      </div>
                      
                      {/* Performance */}
                      <div className="flex gap-4 mb-4">
                        <div className="flex-1 text-center p-2 bg-blue-50 rounded-lg">
                          <p className="text-xs text-gray-600">Gaming</p>
                          <p className="text-sm font-bold text-blue-600">{pc.performance.gaming}</p>
                        </div>
                        <div className="flex-1 text-center p-2 bg-green-50 rounded-lg">
                          <p className="text-xs text-gray-600">Đồ họa</p>
                          <p className="text-sm font-bold text-green-600">{pc.performance.productivity}</p>
                        </div>
                        <div className="flex-1 text-center p-2 bg-purple-50 rounded-lg">
                          <p className="text-xs text-gray-600">Nâng cấp</p>
                          <p className="text-sm font-bold text-purple-600">{pc.performance.upgrade}</p>
                        </div>
                      </div>
                      
                      {/* Build Info */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm text-gray-600">
                          <p>⏱️ Thời gian lắp ráp: <span className="font-medium">{pc.buildTime}</span></p>
                        </div>
                        <span className={`text-sm ${pc.inStock ? 'text-green-600' : 'text-red-600'}`}>
                          {pc.inStock ? '✓ Có sẵn linh kiện' : '✗ Hết linh kiện'}
                        </span>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-3">
                        <button className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                          pc.inStock 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`} disabled={!pc.inStock}>
                          {pc.inStock ? 'Đặt build ngay' : 'Hết linh kiện'}
                        </button>
                        <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          📋 Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg">
                Xem thêm cấu hình
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
