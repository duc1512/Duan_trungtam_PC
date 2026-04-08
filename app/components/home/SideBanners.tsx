"use client";

import Link from "next/link";
import { useState } from "react";

export default function SideBanners() {
  const [laptopImgError, setLaptopImgError] = useState(false);
  const [ssdImgError, setSsdImgError] = useState(false);

  return (
    <div className="w-full md:w-[300px] flex flex-col gap-4">
      {/* Top Banner - Laptop Gaming */}
      <div className="relative flex-1 bg-white rounded-md overflow-hidden shadow-sm h-[192px] group cursor-pointer">
        <img 
          src={laptopImgError ? "/placeholder-product.png" : "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=300&h=192&fit=crop"} 
          alt="Laptop Gaming" 
          onError={() => setLaptopImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold w-fit mb-2">
            🔥 HOT
          </span>
          <h3 className="text-white font-bold text-lg mb-1">ASUS ROG Gaming</h3>
          <p className="text-white/90 text-sm mb-2">RTX 4070 - Intel i7</p>
          <div className="flex items-center justify-between">
            <span className="text-yellow-400 font-bold">28.990.000đ</span>
            <Link href="/products/laptop" className="bg-white/20 backdrop-blur text-white px-3 py-1 rounded text-xs hover:bg-white/30 transition-colors">
              Xem ngay
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Banner - SSD Sale */}
      <div className="relative flex-1 bg-white rounded-md overflow-hidden shadow-sm h-[192px] group cursor-pointer">
        <img 
          src={ssdImgError ? "/placeholder-product.png" : "https://images.unsplash.com/photo-1587202372775-4abc9295e321?w=300&h=192&fit=crop"} 
          alt="SSD Sale" 
          onError={() => setSsdImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent p-4 flex flex-col justify-end">
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold w-fit mb-2">
            💾 DEAL SỐC
          </span>
          <h3 className="text-white font-bold text-lg mb-1">SSD NVMe Gen4</h3>
          <p className="text-white/90 text-sm mb-2">Tốc độ đọc 7.000MB/s</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-yellow-400 font-bold">1.290.000đ</span>
              <span className="text-white/60 text-xs line-through ml-2">1.990.000đ</span>
            </div>
            <Link href="/products/ssd" className="bg-white/20 backdrop-blur text-white px-3 py-1 rounded text-xs hover:bg-white/30 transition-colors">
              Xem ngay
            </Link>
          </div>
        </div>
      </div>

      {/* Additional Small Banner - Free Shipping */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-md p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
              <span className="text-lg">🚚</span> Miễn phí vận chuyển
            </h4>
            <p className="text-xs text-white/90">Đơn hàng từ 2.000.000đ</p>
          </div>
          <div className="text-2xl font-black">FREESHIP</div>
        </div>
      </div>
    </div>
  );
}
