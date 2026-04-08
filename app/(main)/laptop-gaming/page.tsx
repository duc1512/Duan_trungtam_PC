"use client";

import { useState } from "react";

const gamingLaptops = [
  {
    id: 1,
    name: "ASUS ROG Strix G18 (2024)",
    brand: "ASUS",
    price: 45990000,
    originalPrice: 52990000,
    discount: 13,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=400&fit=crop",
    specs: {
      cpu: "Intel Core i9-14900HX",
      gpu: "NVIDIA RTX 4080 12GB",
      ram: "32GB DDR5",
      storage: "2TB NVMe SSD",
      display: "18\" 2K 240Hz IPS"
    },
    badge: "BÁN CHẠY",
    badgeColor: "bg-red-600",
    rating: 4.8,
    reviews: 156,
    inStock: true
  },
  {
    id: 2,
    name: "MSI Titan GT77 HX",
    brand: "MSI",
    price: 68990000,
    originalPrice: null,
    discount: 0,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop",
    specs: {
      cpu: "Intel Core i9-13980HX",
      gpu: "NVIDIA RTX 4090 16GB",
      ram: "64GB DDR5",
      storage: "4TB NVMe SSD",
      display: "17.3\" 4K 144Hz Mini-LED"
    },
    badge: "CAO CẤP",
    badgeColor: "bg-purple-600",
    rating: 4.9,
    reviews: 89,
    inStock: true
  },
  {
    id: 3,
    name: "Acer Nitro 5 AN515-58",
    brand: "Acer",
    price: 22990000,
    originalPrice: 26990000,
    discount: 15,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop",
    specs: {
      cpu: "Intel Core i5-12500H",
      gpu: "NVIDIA RTX 3060 6GB",
      ram: "16GB DDR4",
      storage: "512GB NVMe SSD",
      display: "15.6\" FHD 144Hz IPS"
    },
    badge: "GIÁ TỐT",
    badgeColor: "bg-green-600",
    rating: 4.5,
    reviews: 234,
    inStock: true
  },
  {
    id: 4,
    name: "Lenovo Legion 7i Gen 7",
    brand: "Lenovo",
    price: 38990000,
    originalPrice: null,
    discount: 0,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=400&fit=crop",
    specs: {
      cpu: "Intel Core i7-13700HX",
      gpu: "NVIDIA RTX 4070 8GB",
      ram: "32GB DDR5",
      storage: "1TB NVMe SSD",
      display: "16\" QHD 165Hz IPS"
    },
    badge: "MỚI",
    badgeColor: "bg-blue-600",
    rating: 4.7,
    reviews: 67,
    inStock: false
  },
  {
    id: 5,
    name: "HP Omen 16-wf0004tx",
    brand: "HP",
    price: 28990000,
    originalPrice: 32990000,
    discount: 12,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop",
    specs: {
      cpu: "AMD Ryzen 7 7840HS",
      gpu: "NVIDIA RTX 4060 8GB",
      ram: "16GB DDR5",
      storage: "1TB NVMe SSD",
      display: "16.1\" FHD 165Hz IPS"
    },
    badge: "HOT",
    badgeColor: "bg-orange-600",
    rating: 4.6,
    reviews: 123,
    inStock: true
  },
  {
    id: 6,
    name: "Dell Alienware m16 R2",
    brand: "Dell",
    price: 52990000,
    originalPrice: null,
    discount: 0,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop",
    specs: {
      cpu: "Intel Core i9-13900HX",
      gpu: "NVIDIA RTX 4080 12GB",
      ram: "32GB DDR5",
      storage: "2TB NVMe SSD",
      display: "16\" QHD 240Hz IPS"
    },
    badge: "ĐỘC QUYỀN",
    badgeColor: "bg-indigo-600",
    rating: 4.8,
    reviews: 45,
    inStock: true
  }
];

const brands = [
  { id: "all", name: "Tất cả", count: 156 },
  { id: "asus", name: "ASUS", count: 42 },
  { id: "msi", name: "MSI", count: 38 },
  { id: "acer", name: "Acer", count: 28 },
  { id: "lenovo", name: "Lenovo", count: 24 },
  { id: "hp", name: "HP", count: 15 },
  { id: "dell", name: "Dell", count: 9 }
];

const priceRanges = [
  { id: "all", name: "Tất cả giá", min: 0, max: Infinity },
  { id: "under-25", name: "Dưới 25 triệu", min: 0, max: 25000000 },
  { id: "25-40", name: "25-40 triệu", min: 25000000, max: 40000000 },
  { id: "40-60", name: "40-60 triệu", min: 40000000, max: 60000000 },
  { id: "over-60", name: "Trên 60 triệu", min: 60000000, max: Infinity }
];

export default function LaptopGaming() {
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredLaptops = gamingLaptops.filter(laptop => {
    const matchesBrand = selectedBrand === "all" || laptop.brand.toLowerCase() === selectedBrand;
    const matchesPrice = laptop.price >= priceRanges.find(r => r.id === selectedPriceRange)!.min && 
                        laptop.price <= priceRanges.find(r => r.id === selectedPriceRange)!.max;
    return matchesBrand && matchesPrice;
  });

  const sortedLaptops = [...filteredLaptops].sort((a, b) => {
    switch(sortBy) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "rating": return b.rating - a.rating;
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
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 pt-16 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              💻 LAPTOP GAMING
            </h1>
            <p className="text-purple-200 text-lg mb-6">
              Dàn laptop gaming mạnh mẽ nhất, chiến mượt mọi tựa game
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 text-white">
              <div className="text-center">
                <p className="text-3xl font-bold">156+</p>
                <p className="text-sm text-purple-200">Mẫu laptop</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">RTX 40</p>
                <p className="text-sm text-purple-200">Series mới nhất</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">24H</p>
                <p className="text-sm text-purple-200">Giao hàng nhanh</p>
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
              
              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm">Thương hiệu</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => setSelectedBrand(brand.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedBrand === brand.id
                          ? "bg-purple-100 text-purple-700 font-medium"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{brand.name}</span>
                        <span className="text-sm text-gray-500">({brand.count})</span>
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
                          ? "bg-purple-100 text-purple-700 font-medium"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {range.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Offers */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl p-4 text-white">
                <h4 className="font-bold mb-2">🎮 Ưu đãi đặc biệt</h4>
                <p className="text-sm text-purple-100 mb-3">
                  Mua laptop gaming tặng chuột gaming worth 1.590.000đ
                </p>
                <button className="bg-white text-purple-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            
            {/* Sort Bar */}
            <div className="bg-white rounded-xl p-4 mb-6 shadow-sm flex justify-between items-center">
              <div className="text-gray-600">
                Tìm thấy <span className="font-bold text-gray-900">{sortedLaptops.length}</span> sản phẩm
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="featured">Nổi bật</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="rating">Đánh giá cao</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedLaptops.map((laptop) => (
                <div key={laptop.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group">
                  {/* Badge */}
                  <div className="relative">
                    <img
                      src={laptop.image}
                      alt={laptop.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute top-4 left-4 ${laptop.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                      {laptop.badge}
                    </div>
                    {!laptop.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">Hết hàng</span>
                      </div>
                    )}
                    {laptop.discount > 0 && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        -{laptop.discount}%
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{laptop.name}</h3>
                        <p className="text-sm text-gray-500">{laptop.brand}</p>
                      </div>
                      <div className="text-right">
                        {laptop.originalPrice && (
                          <p className="text-gray-400 line-through text-sm">{formatPrice(laptop.originalPrice)}</p>
                        )}
                        <p className="text-xl font-bold text-purple-600">{formatPrice(laptop.price)}</p>
                      </div>
                    </div>
                    
                    {/* Specs */}
                    <div className="space-y-1 mb-4 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>CPU:</span>
                        <span className="font-medium">{laptop.specs.cpu}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GPU:</span>
                        <span className="font-medium">{laptop.specs.gpu}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>RAM:</span>
                        <span className="font-medium">{laptop.specs.ram}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Màn hình:</span>
                        <span className="font-medium">{laptop.specs.display}</span>
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <div className="flex text-yellow-400">
                          {'★'.repeat(Math.floor(laptop.rating))}
                          {'☆'.repeat(5 - Math.floor(laptop.rating))}
                        </div>
                        <span className="text-sm text-gray-600">({laptop.reviews})</span>
                      </div>
                      <span className={`text-sm ${laptop.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {laptop.inStock ? '✓ Còn hàng' : '✗ Hết hàng'}
                      </span>
                    </div>
                    
                    <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      laptop.inStock 
                        ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`} disabled={!laptop.inStock}>
                      {laptop.inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg">
                Xem thêm sản phẩm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
