"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// Mảng chứa dữ liệu các slide (Ảnh, Tiêu đề, Mô tả)
const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=2000&auto=format&fit=crop",
    title: "Build PC.",
    highlight: "Nâng tầm",
    subtitle: "trải nghiệm.",
    desc: "Gia nhập hệ sinh thái Duke Computer ngay hôm nay. Săn linh kiện giá gốc, nhận voucher độc quyền và build dàn máy trong mơ của bạn."
  },
  {
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=2000&auto=format&fit=crop",
    title: "Hiệu năng.",
    highlight: "Bứt phá",
    subtitle: "mọi giới hạn.",
    desc: "Sở hữu những cấu hình khủng nhất. Cân mượt mọi tựa game AAA và xử lý đồ họa nặng một cách trơn tru, hoàn hảo."
  },
  {
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2000&auto=format&fit=crop",
    title: "Linh kiện.",
    highlight: "Chính hãng",
    subtitle: "100%.",
    desc: "Phân phối trực tiếp từ các thương hiệu hàng đầu thế giới: ASUS, GIGABYTE, MSI, Corsair... Bảo hành an tâm tuyệt đối."
  }
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play Slider (chuyển sau 4 giây)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* ================= CỘT TRÁI: SLIDER (Ẩn trên Mobile) ================= */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900 group">
        
        {/* Left Arrow Button */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-[#e30019] text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1))}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-[#e30019] text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Render các lớp ảnh nền */}
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-0" : "opacity-0 z-[-1]"
            }`}
          >
            {/* Ảnh có hiệu ứng zoom từ từ (Ken Burns effect) */}
            <div 
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[4000ms] ease-linear ${
                index === currentSlide ? "scale-105" : "scale-100"
              }`}
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            {/* Lớp phủ Gradient đen để làm nổi bật chữ */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />
          </div>
        ))}

        {/* Nội dung tĩnh đè lên trên ảnh */}
        <div className="absolute inset-0 flex flex-col justify-end p-12 sm:p-16 z-10">
          <div className="relative z-10 text-white max-w-lg w-full">
            
            {/* Logo tĩnh */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#e30019] rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
                <span className="font-black text-2xl text-white">T</span>
              </div>
              <span className="text-3xl font-black italic tracking-widest text-white">
                DUKE PC
              </span>
            </div>
            
            {/* Vùng chứa Text thay đổi theo Slide (Cố định chiều cao để không bị giật layout) */}
            <div className="relative min-h-[180px]">
              {SLIDES.map((slide, index) => (
                <div 
                  key={index} 
                  className={`absolute top-0 left-0 transition-all duration-700 transform ${
                    index === currentSlide 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight tracking-tight">
                    {slide.title} <br />
                    <span className="text-[#e30019]">{slide.highlight}</span> {slide.subtitle}
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                    {slide.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-8 border-t border-gray-700/50 pt-8">
              {/* Trust badge */}
              <div className="flex items-center gap-5 text-sm font-medium text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#e30019]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Hàng chính hãng
                </div>
              </div>

              {/* Navigation Dots (Dấu chấm chuyển slide) */}
              <div className="flex items-center gap-2">
                {SLIDES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? "w-8 bg-[#e30019]" // Dấu chấm đang active (Dài, màu đỏ)
                        : "w-2 bg-gray-500/50 hover:bg-gray-300" // Các dấu chấm khác
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Blur gradient overlay to hide seam between columns */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-24 -translate-x-1/2 z-10 pointer-events-none">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-gray-900/20 to-transparent "></div>
      </div>

      {/* ================= CỘT PHẢI: KHU VỰC FORM ================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative bg-gradient-to-b from-gray-900 via-gray-900 to-black">
        
        {/* Background overlay to match left column */}
        <div className="absolute inset-0 bg-gray-900/95"></div>
        
        {/* Nút quay về (Góc trên phải) */}
        <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-20">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors bg-gray-800/50 hover:bg-gray-700 px-4 py-2 rounded-full border border-gray-700"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Về trang chủ
          </Link>
        </div>

        {/* Logo hiển thị riêng cho Mobile (vì cột trái bị ẩn) */}
        <div className="lg:hidden w-full max-w-md mb-8 flex justify-center mt-8 relative z-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#e30019] rounded-lg flex items-center justify-center">
              <span className="font-black text-xl text-white">T</span>
            </div>
            <span className="text-2xl font-black italic tracking-widest text-white">
              DUKE PC
            </span>
          </Link>
        </div>

        {/* Khung chứa Form (Được bọc bởi thẻ children) */}
        <div className="w-full max-w-md mt-4 lg:mt-0 relative z-20">
          {children}
        </div>
        
        {/* Footer của form */}
        <div className="mt-12 text-center text-sm text-gray-500 relative z-20">
          <p className="text-gray-400">© {new Date().getFullYear()} Duke Computer. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
      
    </div>
  );
}