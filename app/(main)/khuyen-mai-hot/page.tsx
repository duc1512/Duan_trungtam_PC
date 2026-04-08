"use client";

import { useState } from "react";

const promotions = [
  {
    id: 1,
    title: "MUA LAPTOP GAMING - TẶNG NGAY CHUỘT GAMING LOGITECH G502",
    description: "Áp dụng cho tất cả laptop gaming từ 25 triệu trở lên",
    discount: "TẶNG NGAY",
    originalPrice: null,
    discountedPrice: null,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=400&fit=crop",
    badge: "HOT",
    badgeColor: "bg-red-600",
    endDate: "30/04/2026",
    categories: ["laptop", "gaming"]
  },
  {
    id: 2,
    title: "GIẢM SỐC 20% TẤT CẢ LINH KIỆN INTEL",
    description: "CPU, mainboard Intel giảm giá cực sốc trong tuần lễ công nghệ",
    discount: "-20%",
    originalPrice: null,
    discountedPrice: null,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
    badge: "FLASH SALE",
    badgeColor: "bg-orange-500",
    endDate: "15/04/2026",
    categories: ["linh-kien", "intel"]
  },
  {
    id: 3,
    title: "BUILD PC TRẢ GÓP 0% LÃI SUẤT",
    description: "Trả góp qua thẻ tín dụng 0% lãi suất cho đơn hàng từ 15 triệu",
    discount: "0% LÃI SUẤT",
    originalPrice: null,
    discountedPrice: null,
    image: "https://images.unsplash.com/photo-1587202372775-4abc9295e321?w=600&h=400&fit=crop",
    badge: "ƯU ĐÃI",
    badgeColor: "bg-green-600",
    endDate: "31/05/2026",
    categories: ["build-pc", "tra-gop"]
  },
  {
    id: 4,
    title: "SSD SAMSUNG 980 PRO 1TB GIÁ RẺ VÔ ĐỊCH",
    description: "Giảm từ 3.590.000đ chỉ còn 2.490.000đ - Giảm 30%",
    discount: "-30%",
    originalPrice: "3.590.000đ",
    discountedPrice: "2.490.000đ",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop",
    badge: "BÁN CHẠY",
    badgeColor: "bg-blue-600",
    endDate: "20/04/2026",
    categories: ["ssd", "storage"]
  },
  {
    id: 5,
    title: "MUA VGA RTX 4060 - TẶNG NGAY RAM 16GB DDR5",
    description: "Áp dụng cho tất cả card đồ họa RTX 4060 trở lên",
    discount: "TẶNG RAM",
    originalPrice: null,
    discountedPrice: null,
    image: "https://images.unsplash.com/photo-1590644839082-cd8ad5c7d5b8?w=600&h=400&fit=crop",
    badge: "COMBO",
    badgeColor: "bg-purple-600",
    endDate: "25/04/2026",
    categories: ["vga", "gaming"]
  },
  {
    id: 6,
    title: "MONITOR GAMING 144HZ GIẢM 15%",
    description: "Tất cả màn hình gaming 144Hz trở lên giảm giá 15%",
    discount: "-15%",
    originalPrice: null,
    discountedPrice: null,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop",
    badge: "DEAL HỜI",
    badgeColor: "bg-indigo-600",
    endDate: "18/04/2026",
    categories: ["monitor", "gaming"]
  }
];

const categories = [
  { id: "all", name: "Tất cả", icon: "🔥" },
  { id: "laptop", name: "Laptop", icon: "💻" },
  { id: "linh-kien", name: "Linh kiện", icon: "🔧" },
  { id: "gaming", name: "Gaming", icon: "🎮" },
  { id: "build-pc", name: "Build PC", icon: "🖥️" },
  { id: "tra-gop", name: "Trả góp", icon: "💳" }
];

export default function KhuyenMaiHot() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPromotions = promotions.filter(promo => 
    selectedCategory === "all" || promo.categories.includes(selectedCategory)
  );

  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} ngày nữa` : "Hết hạn";
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 pt-16 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 flex items-center justify-center gap-3">
              <span className="text-5xl animate-pulse">🔥</span>
              KHUYẾN MÃI HOT
              <span className="text-5xl animate-pulse">🔥</span>
            </h1>
            <p className="text-red-100 text-lg mb-6">
              Cơ hội vàng sở hữu công nghệ với giá không tưởng
            </p>
            
            {/* Countdown Timer */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 inline-block">
              <p className="text-white text-sm mb-2">Flash sale kết thúc sau:</p>
              <div className="flex gap-4 text-white">
                <div className="bg-white/20 rounded-lg px-3 py-2">
                  <p className="text-2xl font-bold">02</p>
                  <p className="text-xs">Ngày</p>
                </div>
                <div className="bg-white/20 rounded-lg px-3 py-2">
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-xs">Giờ</p>
                </div>
                <div className="bg-white/20 rounded-lg px-3 py-2">
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-xs">Phút</p>
                </div>
                <div className="bg-white/20 rounded-lg px-3 py-2">
                  <p className="text-2xl font-bold">30</p>
                  <p className="text-xs">Giây</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-red-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromotions.map((promo) => (
            <div key={promo.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group">
              {/* Badge */}
              <div className="relative">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute top-4 left-4 ${promo.badgeColor} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                  {promo.badge}
                </div>
                {getTimeRemaining(promo.endDate) !== "Hết hạn" && (
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                    ⏰ {getTimeRemaining(promo.endDate)}
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl font-bold text-red-600">
                    {promo.discount}
                  </span>
                  {promo.originalPrice && (
                    <div className="text-right">
                      <p className="text-gray-400 line-through text-sm">{promo.originalPrice}</p>
                      <p className="text-xl font-bold text-green-600">{promo.discountedPrice}</p>
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {promo.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {promo.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <p>⏰ Hết hạn: {promo.endDate}</p>
                  </div>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Xem ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg">
            Xem thêm khuyến mãi
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-900 py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Đừng bỏ lỡ ưu đãi hot nhất!
          </h2>
          <p className="text-gray-300 mb-6">
            Đăng ký ngay để nhận thông tin khuyến mãi mới nhất qua email
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
