"use client";

import { useState } from "react";
import Link from "next/link";

const newProducts = [
  { id: 5, name: "CPU Intel Core i5-14400F (LGA 1700)", price: "5.490.000đ", image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=300&h=300&fit=crop", specs: ["10 Nhân", "16 Luồng", "Turbo 4.7GHz"] },
  { id: 6, name: "Mainboard MSI MAG B760M MORTAR WIFI", price: "4.290.000đ", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop", specs: ["DDR5", "PCIe 5.0", "Wi-Fi 6E"] },
  { id: 7, name: "RAM Kingston FURY Beast 16GB (2x8GB) DDR4", price: "1.150.000đ", image: "https://images.unsplash.com/photo-1562976540-ff2e8d5b2a8a?w=300&h=300&fit=crop", specs: ["3200MHz", "DDR4", "Tản nhiệt nhôm"] },
  { id: 8, name: "SSD WD Blue SN580 1TB NVMe PCIe Gen4", price: "1.790.000đ", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=300&fit=crop", specs: ["Đọc: 4150MB", "Ghi: 4150MB"] },
  { id: 9, name: "Nguồn Corsair RM850e 850W 80 Plus Gold", price: "2.890.000đ", image: "https://images.unsplash.com/photo-1587202372775-4abc9295e321?w=300&h=300&fit=crop", specs: ["850W", "Full Modular", "80+ Gold"] },
];

const categories = ["Tất cả", "CPU - Bộ vi xử lý", "Mainboard", "VGA - Card màn hình", "RAM - SSD"];

export default function BestSellers() {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const handleImgError = (id: number) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mt-6">
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-gray-100 pb-4 mb-5 gap-4">
        <h2 className="text-xl md:text-2xl font-black uppercase text-gray-800 flex items-center gap-2">
          <span className="text-yellow-500">🏆</span> Linh Kiện Bán Chạy
        </h2>
        
        {/* Scrollable Tabs cho Mobile / Flex cho Desktop */}
        <div className="w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 hide-scrollbar">
          <div className="flex gap-2 md:gap-3 text-sm font-medium w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeTab === cat
                    ? "bg-red-50 text-red-600 border border-red-200 font-bold shadow-sm"
                    : "bg-gray-50 text-gray-600 border border-transparent hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {newProducts.map((item, index) => (
          <Link key={item.id} href={`/product/${item.id}`} className="block">
          <div className="bg-white border border-gray-100 rounded-xl p-3 md:p-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group flex flex-col relative">
            
            {/* Tag Top #1, #2 (Optional) */}
            {index < 2 && (
              <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm z-10">
                TOP {index + 1}
              </div>
            )}

            {/* Hình ảnh */}
            <div className="aspect-square relative mb-4 bg-white rounded-lg overflow-hidden flex items-center justify-center p-2">
              <img 
                src={imgErrors[item.id] ? "/placeholder-product.png" : item.image} 
                alt={item.name} 
                onError={() => handleImgError(item.id)}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            
            {/* Tên sản phẩm */}
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-3 group-hover:text-red-600 cursor-pointer min-h-[40px] leading-snug">
              {item.name}
            </h3>
            
            {/* Thông số kỹ thuật (Specs) - Đổi sang style công nghệ */}
            <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
              {item.specs.map((spec, i) => (
                <span key={i} className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded-md font-medium text-[10px] whitespace-nowrap">
                  {spec}
                </span>
              ))}
            </div>

            {/* Giá & Nút Mua */}
            <div>
              <p className="text-red-600 font-extrabold text-base md:text-lg mb-3">{item.price}</p>
              <button onClick={(e) => { e.stopPropagation(); }} className="w-full bg-gray-900 text-white font-semibold py-2.5 rounded-lg border border-transparent hover:bg-red-600 hover:shadow-lg hover:shadow-red-600/30 transition-all duration-300 text-sm flex items-center justify-center gap-2 group/btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/btn:-rotate-12">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                Mua ngay
              </button>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </section>
  );
}