"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/features/auth";
import { useCart } from "@/features/cart";
import { SearchBar } from "./index";

export default function Header() {
  const [activeTab, setActiveTab] = useState("login");
  const { isLoggedIn, userProfile, logout, isAdmin } = useAuth();
  const { totalItems, showLoginModal, setShowLoginModal } = useCart();

  const openLoginModal = () => {
    setShowLoginModal(true);
    setActiveTab("login");
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-[#e30019] shadow-sm sticky top-0 z-50">
      {/* Login Modal with Backdrop */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 "
            onClick={() => setShowLoginModal(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6 z-10">
            {/* Close Button */}
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>
            
            <h2 className="text-xl font-bold text-center mb-6 text-gray-800">Tài khoản</h2>
            
            {/* Login Button */}
            <Link 
              href="/dang-nhap"
              onClick={() => setShowLoginModal(false)}
              className="block w-full bg-[#e30019] text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors mb-3 text-center"
            >
               Đăng nhập
            </Link>
            
            {/* Register Button */}
            <Link 
              href="/dang-ky"
              onClick={() => setShowLoginModal(false)}
              className="block w-full bg-white border-2 border-[#e30019] text-[#e30019] font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
               Đăng ký
            </Link>
            
            {/* Help Section */}
            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500 mb-1">💡 Cần trợ giúp?</p>
              <p className="text-xs text-gray-600">Liên hệ hotline <span className="text-[#e30019] font-bold">1900.5301</span></p>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 ml-12">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#e30019] font-black text-xl">T</span>
            </div>
            <span className="text-3xl font-black italic text-white tracking-tighter">Duke</span>
          </Link>

          {/* Thanh tìm kiếm */}
          <div className="flex-1 max-w-xl relative hidden md:block">
            <SearchBar />
          </div>

          {/* Hotline & Showroom */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="tel:19005301" className="flex items-center gap-2 text-sm hover:text-white/80 transition-colors">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1a9 9 0 0 0-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2a7 7 0 0 1 7-7 7 7 0 0 1 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7a9 9 0 0 0-9-9z"/>
              </svg>
              <div>
                <p className="text-white/80 text-xs">Hotline</p>
                <p className="font-bold text-white">1900.5301</p>
              </div>
            </Link>

            <Link href="/he-thong-showroom" className="flex items-center gap-2 text-sm hover:text-white/80 transition-colors">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
              </svg>
              <div>
                <p className="text-white/80 text-xs">Hệ thống</p>
                <p className="font-bold text-white">Showroom</p>
              </div>
            </Link>
          </div>

          {/* Các nút tương tác */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <Link href="/build-pc" className="hidden lg:flex items-center gap-2 text-sm font-semibold hover:text-white">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
              </svg>
              <div>
                <p className="text-white/80 text-xs font-normal">Xây dựng cấu hình</p>
                <p className="text-white">Build PC</p>
              </div>
            </Link>

            {!isAdmin && (
              <button 
                onClick={() => {
                  if (!isLoggedIn) {
                    openLoginModal();
                  } else {
                    window.location.href = "/cart";
                  }
                }}
                className="flex items-center gap-2 text-sm font-semibold hover:text-white relative"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
                <span className="absolute top-0 left-5 bg-yellow-400 text-red-700 text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white transform -translate-x-1 -translate-y-1">{totalItems}</span>
                <div className="hidden sm:block">
                  <p className="text-white">Giỏ hàng</p>
                </div>
              </button>
            )}

            {/* Login Button / User Avatar */}
            {isLoggedIn && userProfile ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-sm font-bold hover:text-white bg-[#b30000] px-3 py-2 rounded-lg transition-all">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src={userProfile.avatar} 
                      alt={userProfile.name}
                      className="w-full h-full object-cover"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.currentTarget;
                        target.src = `https://ui-avatars.com/api/?name=${userProfile.name}&background=e30019&color=fff&size=32`;
                      }}
                    />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-white text-sm font-bold">{userProfile.name}</p>
                  </div>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{userProfile.name}</p>
                    <p className="text-xs text-gray-500">{userProfile.email}</p>
                  </div>
                  <div className="py-2">
                    <Link href={isAdmin ? "/admin/dashboard" : "/tai-khoan"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        Tài khoản của tôi
                      </div>
                    </Link>
                    {!isAdmin && (
                      <>
                        <Link href="/don-hang" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                            </svg>
                            Đơn hàng của tôi
                          </div>
                        </Link>
                        <Link href="/yeu-thich" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            Sản phẩm yêu thích
                          </div>
                        </Link>
                      </>
                    )}
                  </div>
                  <div className="border-t border-gray-200 py-2">
                    <button 
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                      </svg>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={openLoginModal}
                className="flex items-center gap-2 text-sm font-bold hover:text-white bg-[#b30000] px-3 py-2 rounded-lg transition-all"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <div className="hidden sm:block">
                  <p className="text-white text-sm font-bold">Đăng nhập</p>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}