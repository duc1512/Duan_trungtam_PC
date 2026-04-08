"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const categories = [
  "Laptop Gaming",
  "PC Gaming", 
  "Card VGA",
  "CPU - Bộ vi xử lý",
  "Mainboard",
  "RAM",
  "SSD - Ổ cứng",
  "Màn hình",
  "Bàn phím",
  "Chuột gaming",
  "Tai nghe",
  "Case - Vỏ case"
];

export default function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState(0);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Handle scroll to keep dropdown fixed
  useEffect(() => {
    const handleScroll = () => {
      // Dropdown stays fixed at 48px from top, doesn't scroll
      setDropdownPosition(48);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="bg-gray-900 text-white hidden md:block">
      {/* Backdrop */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 bg-black/60  z-40"
          onClick={closeDropdown}
        />
      )}
      
      <div className="container mx-auto px-4 flex items-center relative z-40">
        {/* Logo */}
        <div className="bg-[#e30019] w-64 py-3 px-4 flex items-center gap-2 font-bold cursor-pointer relative">
          <span onClick={toggleDropdown}>☰</span> 
          <span onClick={toggleDropdown}>Danh mục sản phẩm</span>
          <div 
            className={`fixed left-4 top-38 w-56 bg-white border border-gray-200 rounded-lg text-gray-800 shadow-xl z-50 ${
              isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
            style={{ 
              transition: 'opacity 0.3s ease-out, visibility 0.3s ease-out'
            }}
          >
            {categories.map((category, idx) => (
              <Link 
                key={idx} 
                href={`/category/${idx + 1}`} 
                className="block px-3 py-2 border-b border-gray-100 hover:text-[#e30019] hover:bg-gray-50 text-sm font-medium"
                onClick={closeDropdown}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Links ngang */}
        <div className="flex flex-1 ml-6 gap-6 text-sm font-semibold uppercase">
          <Link href="/khuyen-mai-hot" className="hover:text-yellow-400 transition-colors">🔥 Khuyến mãi hot</Link>
          <Link href="/laptop-gaming" className="hover:text-yellow-400 transition-colors">Laptop Gaming</Link>
          <Link href="/pc-gaming" className="hover:text-yellow-400 transition-colors">PC Gaming</Link>
          <Link href="/tin-tuc" className="hover:text-yellow-400 transition-colors">Tin tức công nghệ</Link>
          <Link href="/ho-tro-khach-hang" className="hover:text-yellow-400 transition-colors">Hỗ trợ khách hàng</Link>
          <Link href="/lien-he" className="hover:text-yellow-400 transition-colors">Liên hệ</Link>
        </div>
      </div>
    </nav>
  );
}