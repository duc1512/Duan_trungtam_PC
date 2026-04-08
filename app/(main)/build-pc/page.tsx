"use client";

import { useState } from "react";
import Breadcrumb from "@/app/components/layout/Breadcrumb";

// Thay thế Emoji bằng SVG Icon chuyên nghiệp
const categories: { id: ComponentCategory; name: string; required: boolean; icon: React.ReactNode }[] = [
  { id: "cpu", name: "Vi xử lý (CPU)", required: true, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg> },
  { id: "mainboard", name: "Bo mạch chủ", required: true, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h4v4H7zM15 7h2v2h-2zM15 11h2v2h-2zM7 15h10v2H7z"/></svg> },
  { id: "ram", name: "RAM", required: true, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="18" height="8" x="3" y="8" rx="2"/><line x1="7" x2="7" y1="12" y2="16"/><line x1="11" x2="11" y1="12" y2="16"/><line x1="15" x2="15" y1="12" y2="16"/></svg> },
  { id: "vga", name: "Card màn hình", required: false, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="20" height="12" x="2" y="6" rx="2"/><path d="M6 18v4h12v-4M9 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM15 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg> },
  { id: "ssd", name: "Ổ cứng SSD", required: true, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="9" x2="15" y1="6" y2="6"/><line x1="9" x2="15" y1="18" y2="18"/><path d="M12 10v4"/></svg> },
  { id: "psu", name: "Nguồn (PSU)", required: true, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 2v8h2V2h-2zM4.9 5.3L6.3 6.7M19.1 5.3l-1.4 1.4M2 12h8v2H2v-2zm12 0h8v2h-8v-2zm-9.1 6.7l1.4-1.4M19.1 18.7l-1.4-1.4M11 20v2h2v-2h-2z"/><circle cx="12" cy="12" r="4"/></svg> },
  { id: "case", name: "Vỏ Case", required: true, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M9 6h6M12 10v4M9 18h6"/></svg> },
];

// Define the type for component categories
type ComponentCategory = 'cpu' | 'mainboard' | 'ram' | 'vga' | 'ssd' | 'psu' | 'case';

// Data xịn hơn, có thêm thông số kỹ thuật (specs)
const mockProducts: Record<ComponentCategory, { name: string; price: number; image: string; power: number; specs: string[]; }> = {
  cpu: { name: "Intel Core i5-13400F", price: 5290000, image: "https://picsum.photos/seed/cpu2/150/150", power: 65, specs: ["10 Core / 16 Thread", "LGA 1700"] },
  mainboard: { name: "ASUS TUF GAMING B760M-PLUS", price: 3890000, image: "https://picsum.photos/seed/main2/150/150", power: 30, specs: ["Micro-ATX", "DDR5", "PCIe 5.0"] },
  ram: { name: "Corsair Vengeance RGB 32GB (2x16GB)", price: 2850000, image: "https://picsum.photos/seed/ram2/150/150", power: 10, specs: ["5600MHz", "CL36", "DDR5"] },
  vga: { name: "GIGABYTE RTX 4060 Ti Windforce OC 8G", price: 10990000, image: "https://picsum.photos/seed/vga2/150/150", power: 160, specs: ["8GB GDDR6", "DLSS 3"] },
  ssd: { name: "Samsung 980 PRO 1TB PCIe Gen 4.0 NVMe", price: 2350000, image: "https://picsum.photos/seed/ssd2/150/150", power: 5, specs: ["Đọc: 7000MB/s", "Ghi: 5000MB/s"] },
  psu: { name: "Corsair RM750e 750W", price: 2690000, image: "https://picsum.photos/seed/psu2/150/150", power: 0, specs: ["80 Plus Gold", "Full Modular"] },
  case: { name: "NZXT H5 Flow Black", price: 2150000, image: "https://picsum.photos/seed/case2/150/150", power: 0, specs: ["Mid Tower", "Kính cường lực"] },
};

export default function PremiumPCBuilder() {
  const [selectedParts, setSelectedParts] = useState<Partial<Record<ComponentCategory, { name: string; price: number; image: string; power: number; specs: string[]; }>>>({});

  const handleSelect = (categoryId: ComponentCategory) => {
    if (mockProducts[categoryId]) {
      setSelectedParts(prev => ({ ...prev, [categoryId]: mockProducts[categoryId] }));
    }
  };

  const handleRemove = (categoryId: ComponentCategory) => {
    const newParts = { ...selectedParts };
    delete newParts[categoryId];
    setSelectedParts(newParts);
  };

  const selectedCount = Object.keys(selectedParts).length;
  const totalPrice = Object.values(selectedParts).reduce((sum, item) => sum + item.price, 0);
  const totalPower = Object.values(selectedParts).reduce((sum, item) => sum + (item.power || 0), 0);
  const powerPercentage = Math.min((totalPower / 750) * 100, 100); // Giả sử nguồn 750W
  
  const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  return (
    <div className="bg-[#f4f6f8] min-h-screen py-10 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        <Breadcrumb 
          items={[
            { name: "Xây dựng PC" }
          ]} 
        />
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              PC Builder Ultra <span className="text-red-500">⚡</span>
            </h1>
            <p className="text-gray-500 mt-1 text-sm">Xây dựng cỗ máy trong mơ của bạn với độ tương thích hoàn hảo.</p>
          </div>
          
          {/* Progress Indicator */}
          {selectedCount > 0 && (
            <div className="bg-green-50 border border-green-200 px-5 py-3 rounded-xl flex items-center gap-3 w-full md:w-auto">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-md shadow-green-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div>
                <p className="text-green-800 font-bold leading-tight">Hệ thống tương thích tốt!</p>
                <p className="text-green-600 text-xs mt-0.5">Đã chọn {selectedCount}/{categories.length} linh kiện</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Builder Slots */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            {categories.map((cat) => {
              const item = selectedParts[cat.id as ComponentCategory];

              return (
                <div key={cat.id} className="relative group transition-all duration-300">
                  {item ? (
                    /* --- Trạng thái ĐÃ CHỌN (Filled Slot) --- */
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
                      
                      {/* Product Image */}
                      <div className="w-full sm:w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center p-2 border border-gray-100 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{cat.name}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-500"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <h3 className="text-base font-bold text-gray-900 leading-tight mb-2">{item.name}</h3>
                        
                        {/* Specs Badges */}
                        <div className="flex flex-wrap gap-2">
                          {item.specs.map((spec, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[11px] font-medium border border-gray-200">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-4 sm:mt-0 gap-3">
                        <div className="text-lg font-black text-red-600">{formatPrice(item.price)}</div>
                        <div className="flex gap-2">
                          <button onClick={() => handleSelect(cat.id as ComponentCategory)} className="p-2 bg-gray-50 hover:bg-blue-50 text-gray-500 hover:text-blue-600 rounded-lg transition-colors border border-gray-200" title="Thay đổi">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                          </button>
                          <button onClick={() => handleRemove(cat.id as ComponentCategory)} className="p-2 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-lg transition-colors border border-gray-200" title="Xóa">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* --- Trạng thái TRỐNG (Empty Slot) --- */
                    <div 
                      onClick={() => handleSelect(cat.id as ComponentCategory)}
                      className="bg-white border-2 border-dashed border-gray-300 hover:border-red-400 hover:bg-red-50/30 rounded-2xl p-4 md:p-5 flex items-center justify-between cursor-pointer transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 text-gray-400 group-hover:bg-red-100 group-hover:text-red-500 rounded-xl flex items-center justify-center transition-colors">
                          {cat.icon}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                            {cat.name}
                            {cat.required && <span className="ml-2 text-[10px] text-red-500 bg-red-50 px-1.5 py-0.5 rounded font-bold align-top">*</span>}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">Vui lòng chọn linh kiện tương thích</p>
                        </div>
                      </div>
                      <button className="bg-white border border-gray-200 shadow-sm group-hover:border-red-300 group-hover:bg-red-500 group-hover:text-white text-gray-700 px-5 py-2 rounded-xl text-sm font-bold transition-all">
                        + Chọn
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Summary Panel */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 sticky top-8 p-6 lg:p-8 overflow-hidden relative">
              
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>

              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2 relative z-10">
                Tóm Tắt Cấu Hình
              </h2>

              {/* Power Estimation Bar */}
              <div className="mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100 relative z-10">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-semibold text-gray-600">Ước tính công suất:</span>
                  <span className="font-black text-gray-900">{totalPower}W</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${powerPercentage > 80 ? 'bg-red-500' : 'bg-gradient-to-r from-green-400 to-green-500'}`}
                    style={{ width: `${powerPercentage}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-gray-500 mt-2 italic">Gợi ý Nguồn (PSU) trên {totalPower + 150}W để đảm bảo an toàn.</p>
              </div>

              {/* Price Calculation */}
              <div className="space-y-3 mb-6 relative z-10">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Tạm tính ({selectedCount} món):</span>
                  <span className="font-medium text-gray-900">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Phí lắp ráp:</span>
                  <span className="font-medium text-green-600">Miễn phí</span>
                </div>
                <div className="border-t border-gray-100 pt-4 mt-2 flex justify-between items-end">
                  <span className="text-base font-bold text-gray-900">Tổng cộng:</span>
                  <span className="text-3xl font-black text-red-600 tracking-tight leading-none">
                    {totalPrice === 0 ? "0đ" : formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 relative z-10">
                <button 
                  disabled={totalPrice === 0}
                  className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-md ${
                    totalPrice > 0 
                      ? "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white hover:shadow-red-500/30 -translate-y-0.5" 
                      : "bg-gray-100 text-gray-400 shadow-none cursor-not-allowed"
                  }`}
                >
                  Thêm cấu hình vào giỏ
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl text-sm transition-colors">
                    Lưu cấu hình
                  </button>
                  <button className="bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 text-gray-700 font-semibold py-3 rounded-xl text-sm transition-colors">
                    In báo giá
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}