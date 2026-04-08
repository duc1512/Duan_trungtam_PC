"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const flashSaleProducts = [
  { id: 1, name: "Laptop Gaming Acer Nitro 5 Eagle 2023", price: "17.490.000đ", oldPrice: "21.990.000đ", discount: "-20%", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop", sold: 15, total: 20 },
  { id: 2, name: "Card màn hình ASUS Dual GeForce RTX 4060", price: "8.290.000đ", oldPrice: "9.500.000đ", discount: "-12%", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=300&fit=crop", sold: 48, total: 50 },
  { id: 3, name: "Màn hình LG UltraGear 24GN65R-B 144Hz", price: "3.590.000đ", oldPrice: "4.890.000đ", discount: "-26%", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop", sold: 120, total: 150 },
  { id: 4, name: "Chuột Gaming Logitech G102 Lightsync RGB", price: "390.000đ", oldPrice: "599.000đ", discount: "-34%", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&h=300&fit=crop", sold: 95, total: 100 },
  { id: 5, name: "Bàn phím cơ DareU EK87 White/Black (Blue/Brown/Red Switch)", price: "450.000đ", oldPrice: "650.000đ", discount: "-30%", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=300&h=300&fit=crop", sold: 12, total: 50 },
];

export default function CompactFlashSale() {
  const [timeLeft, setTimeLeft] = useState(20538);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return { h, m, s };
  };

  const time = formatTime(timeLeft);

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-6">
      {/* Header Gọn Gàng */}
      <div className="bg-white border-b border-gray-100 p-3 md:px-4 flex justify-between items-center">
        <div className="flex items-center gap-3 md:gap-4">
          <h2 className="text-lg md:text-xl font-bold uppercase text-red-600 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-red-600"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            FLASH SALE
          </h2>
          
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded">{time.h}</span>
            <span className="text-gray-500">:</span>
            <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded">{time.m}</span>
            <span className="text-gray-500">:</span>
            <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded">{time.s}</span>
          </div>
        </div>

        <Link href="#" className="text-sm font-medium text-red-600 hover:underline hidden sm:block">
          Xem tất cả &rsaquo;
        </Link>
      </div>

      {/* Product Grid - Dùng 5 cột (hoặc 6 tùy ý) để ép thẻ nhỏ lại */}
      <div className="p-2 md:p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
        {flashSaleProducts.map((item) => {
          const progress = Math.round((item.sold / item.total) * 100);

          return (
            <Link key={item.id} href={`/product/${item.id}`} className="block">
              <div className="bg-white hover:border-red-500 border border-transparent rounded p-2 transition-all duration-300 group cursor-pointer relative flex flex-col hover:shadow-lg transform translate-y-0 hover:-translate-y-2">
                
                {/* Badge Giảm Giá với design đẹp hơn */}
                <div className="absolute -top-2 -right-2 z-20">
                  <div className="relative group">
                    {/* Hiệu ứng halo */}
                    <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-50 animate-pulse scale-150"></div>
                    
                    {/* Badge chính dạng tag */}
                    <div className="relative bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl transform rotate-12 hover:rotate-6 transition-all duration-300">
                      <div className="flex items-center gap-1 px-3 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-300">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span className="font-black text-sm">{item.discount}</span>
                      </div>
                      {/* Mũi nhọn tag */}
                      <div className="absolute -bottom-2 right-2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-red-600"></div>
                    </div>
                  </div>
                </div>

                {/* Hình ảnh */}
                <div className="aspect-square w-full mb-2 bg-gray-50 rounded overflow-hidden flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300 p-2" />
                </div>

                {/* Tên sản phẩm - Font chữ nhỏ, giới hạn 2 dòng */}
                <h3 className="text-[13px] text-gray-700 line-clamp-2 h-[38px] mb-1 leading-snug group-hover:text-red-600 transition-colors">
                  {item.name}
                </h3>
                
                <div className="mt-auto">
                  {/* Khu vực Giá */}
                  <div className="flex flex-col mb-2">
                    <span className="text-red-600 font-bold text-base leading-none mb-1">{item.price}</span>
                    <span className="text-[11px] text-gray-400 line-through leading-none">{item.oldPrice}</span>
                  </div>

                  {/* Thanh tiến độ Gọn Nhẹ (Chữ đè lên thanh) */}
                  <div className="relative w-full h-4 bg-red-100 rounded-full overflow-hidden flex items-center justify-center">
                    <div 
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 to-orange-400 transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    ></div>
                    <span className="relative z-10 text-[9px] font-bold text-white uppercase drop-shadow-md tracking-wider">
                      {progress >= 90 ? 'Sắp hết' : `Đã bán ${item.sold}`}
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}