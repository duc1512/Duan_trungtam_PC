"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MainBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  
  const slides = [
    {
      id: 1,
      title: "RTX 4090 Super - Gaming Cực Đỉnh",
      description: "Giảm đến 30% + Tặng kèm Gaming Mouse worth 2.990.000đ. Hiệu năng vượt trội cho mọi game thủ.",
      price: "40.990.000đ",
      oldPrice: "53.990.000đ",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=900&h=400&fit=crop",
      productId: "gpu-001"
    },
    {
      id: 2,
      title: "Intel i9-14900K - CPU Đỉnh Cao",
      description: "Giảm 15% + Tặng kèm cooler. Hiệu năng vượt trội cho mọi game thủ.",
      price: "15.490.000đ",
      oldPrice: "17.990.000đ",
      image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=900&h=400&fit=crop",
      productId: "cpu-001"
    },
    {
      id: 3,
      title: "SSD Gen5 - Tốc độ Vũ Trụ",
      description: "Giảm 20% + Tặng kèm adapter. Tốc độ đọc 14.500MB/s.",
      price: "4.990.000đ",
      oldPrice: "5.990.000đ",
      image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=900&h=400&fit=crop",
      productId: "ssd-001"
    }
  ];

  const handleImgError = (id: number) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [currentSlide]); // Reset interval when slide changes

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative bg-white rounded-md overflow-hidden h-[200px] md:h-[400px] shadow-sm group">
      <div className="relative w-full h-full">
        <div 
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full h-full flex-shrink-0">
              <img 
                src={imgErrors[slide.id] ? "/placeholder-product.png" : slide.image} 
                alt={slide.title} 
                onError={() => handleImgError(slide.id)}
                className="w-full h-full object-cover transition-transform duration-500" 
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent p-8 flex flex-col justify-center text-white">
        <div className="max-w-lg transition-all duration-500 ease-in-out">
          <span className="inline-block bg-[#e30019] px-3 py-1 rounded-full text-xs font-bold mb-4">
            🔥 SIÊU SALE 2026
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight transition-all duration-500 ease-in-out">
            {currentSlideData.title}
          </h1>
          <p className="text-sm md:text-base mb-6 text-white/90 leading-relaxed transition-all duration-500 ease-in-out">
            {currentSlideData.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href={currentSlideData.productId.startsWith("category/") ? `/${currentSlideData.productId}` : `/product/${currentSlideData.productId}`} 
              className="bg-[#e30019] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors text-center"
            >
              Khám phá ngay
            </Link>
            <Link href={`/build-pc?type=${currentSlide === 0 ? "rtx4090" : currentSlide === 1 ? "i9" : "ssd"}`} className="bg-white/20 backdrop-blur text-white px-6 py-3 rounded-lg font-bold hover:bg-white/30 transition-colors text-center border border-white/30">
              Xây dựng PC
            </Link>
          </div>
        </div>
      </div>

      {/* Price Badge */}
      <div className="absolute top-4 right-4 bg-yellow-400 text-red-700 px-4 py-2 rounded-lg shadow-lg transition-all duration-500 ease-in-out">
        <div className="text-center">
          <p className="text-xs font-semibold">Chỉ từ</p>
          <p className="text-xl font-black transition-all duration-300 ease-in-out">{currentSlideData.price}</p>
          <p className="text-xs line-through text-gray-600 transition-all duration-300 ease-in-out">{currentSlideData.oldPrice}</p>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`${
              index === currentSlide 
                ? "w-8 h-2 bg-[#e30019] rounded-full" 
                : "w-2 h-2 bg-white/50 rounded-full hover:bg-white/70"
            } cursor-pointer transition-colors`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors opacity-0 group-hover:opacity-100"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors opacity-0 group-hover:opacity-100"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
}
