"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/common";

// Dữ liệu giả lập cho các Showroom
const showrooms = [
  {
    id: 1,
    city: "TP. Hồ Chí Minh",
    name: "TDuke Flagship Store Quận 1",
    address: "123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
    phone: "0352.967.501",
    hours: "08:00 - 22:00 (Cả tuần)",
    status: "Đang mở cửa",
    image: "https://picsum.photos/seed/store1/600/400",
    mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.513274106207!2d106.70114441533423!3d10.771944962222384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4139882dc5%3A0x6b10787a74087123!2zTmd1eeG7hW4gSHXhu4csIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1680000000000!5m2!1svi!2s",
    features: ["Bãi đậu ô tô", "Trải nghiệm High-end PC", "Bảo hành siêu tốc"],
  },
  {
    id: 2,
    city: "TP. Hồ Chí Minh",
    name: "TDuke Gaming Center Quận 10",
    address: "456 Sư Vạn Hạnh, Phường 12, Quận 10, TP.HCM",
    phone: "0909.789.012",
    hours: "08:30 - 21:30 (Cả tuần)",
    status: "Đang mở cửa",
    image: "https://picsum.photos/seed/store2/600/400",
    mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241681944883!2d106.66519121533433!3d10.77878896220807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eda189eb86d%3A0x61a07dfa74087123!2zU8awIFbhuqFuIEjhuqFuaCwgUXXhuq1uIDEwLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1680000000001!5m2!1svi!2s",
    features: ["Khu vực test gear", "Vệ sinh PC miễn phí"],
  },
  {
    id: 3,
    city: "Hà Nội",
    name: "TDuke Mega Store Cầu Giấy",
    address: "789 Thái Hà, Phường Trung Liệt, Đống Đa, Hà Nội",
    phone: "0988.111.222",
    hours: "08:00 - 21:00 (Cả tuần)",
    status: "Đang mở cửa",
    image: "https://picsum.photos/seed/store3/600/400",
    mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.388835820464!2d105.8188164153852!3d21.01712299355157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab649581aeb9%3A0x8b8db074087123!2zVGjDoWkgSMOgLCDEkOG7kW5nIMSQYSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1680000000002!5m2!1svi!2s",
    features: ["Phòng Stream trải nghiệm", "Trả góp 0%"],
  }
];

const cities = ["Tất cả", "TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng"];

export default function ShowroomSystem() {
  const [activeCity, setActiveCity] = useState("Tất cả");
  const [activeStore, setActiveStore] = useState(showrooms[0]);

  // Lọc danh sách theo thành phố
  const filteredStores = activeCity === "Tất cả" 
    ? showrooms 
    : showrooms.filter(store => store.city === activeCity);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={[{ name: "Hệ thống cửa hàng TDuke" }]} />
      
      {/* Header Section */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-black uppercase text-gray-900 mb-3">Hệ Thống Showroom</h1>
        <p className="text-gray-600">Trải nghiệm trực tiếp các sản phẩm công nghệ đỉnh cao tại hệ thống cửa hàng TDuke trên toàn quốc.</p>
      </div>

      {/* Main Layout: Chia 2 cột trên Desktop */}
      <div className="flex flex-col lg:flex-row gap-6 h-[800px] lg:h-[650px]">
        
        {/* Cột trái: Danh sách cửa hàng */}
        <div className="w-full lg:w-1/3 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Bộ lọc Thành phố */}
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <select 
              className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 font-medium outline-none"
              value={activeCity}
              onChange={(e) => {
                setActiveCity(e.target.value);
                // Tự động chọn store đầu tiên của thành phố đó
                const firstStore = showrooms.find(s => e.target.value === "Tất cả" || s.city === e.target.value);
                if (firstStore) setActiveStore(firstStore);
              }}
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Danh sách cuộn (Scrollable List) */}
          <div className="flex-1 overflow-y-auto hide-scrollbar p-3 space-y-3 bg-gray-50/50">
            {filteredStores.map((store) => (
              <div 
                key={store.id}
                onClick={() => setActiveStore(store)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border-2 ${
                  activeStore.id === store.id 
                    ? "border-red-500 bg-red-50 shadow-md" 
                    : "border-transparent bg-white hover:border-red-200 hover:shadow-sm"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-bold text-sm ${activeStore.id === store.id ? "text-red-600" : "text-gray-900"}`}>
                    {store.name}
                  </h3>
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0">
                    {store.status}
                  </span>
                </div>
                
                <div className="space-y-1.5 mt-3 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-1.414.586L8 17.657V8a2 2 0 012-2H6a2 2 0 00-2 2v9.657z" /></svg>
                    <span className="leading-snug">{store.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2v10a2 2 0 01-2 2h14a2 2 0 01-2-2V7a2 2 0 012-2 2v8a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2z" /></svg>
                    <span className="font-semibold">{store.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{store.hours}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredStores.length === 0 && (
              <div className="text-center text-gray-500 py-10 text-sm">
                Đang cập nhật showroom tại khu vực này...
              </div>
            )}
          </div>
        </div>

        {/* Cột phải: Bản đồ và Chi tiết cửa hàng */}
        <div className="w-full lg:w-2/3 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
          
          {/* Iframe Google Maps */}
          <div className="h-[300px] lg:h-3/5 w-full bg-gray-200 relative">
            <iframe 
              src={activeStore.mapIframe} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title={`Bản đồ ${activeStore.name}`}
            ></iframe>
          </div>

          {/* Cụm thông tin chi tiết (Phần Offline Thực Tế) */}
          <div className="flex-1 p-5 md:p-6 flex flex-col md:flex-row gap-6">
            {/* Hình ảnh mặt tiền (giúp khách dễ nhận diện khi đi đường) */}
            <div className="w-full md:w-1/3 aspect-video md:aspect-square bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative group">
              <img src={activeStore.image} alt={activeStore.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-semibold border border-white px-3 py-1 rounded">Xem ảnh 360°</span>
              </div>
            </div>

            {/* Thông tin dịch vụ đặc quyền */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{activeStore.name}</h2>
              <p className="text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">{activeStore.address}</p>
              
              <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Tiện ích tại cửa hàng</h4>
              <div className="flex flex-wrap gap-2">
                {activeStore.features.map((feature, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {feature}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <a href={`tel:${activeStore.phone.replace(/\./g, '')}`} className="flex-1 bg-gray-900 hover:bg-black text-white text-center py-2.5 rounded-lg text-sm font-semibold transition-colors">
                  Gọi điện: {activeStore.phone}
                </a>
                <button className="flex-1 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white border border-red-100 text-center py-2.5 rounded-lg text-sm font-semibold transition-colors">
                  Chỉ đường tới đây
                </button>
              </div>
            </div>
          </div>
          
        </div>
        </div>
    </div>
  );
}