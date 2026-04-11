"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import BannerSection from "../components/home/BannerSection";
import FlashSale from "../components/home/FlashSale";
import BestSellers from "../components/home/BestSellers";
import PopularCategories from "../components/home/PopularCategories";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Check for login success flag (timestamp or "true")
    const showLoginSuccess = localStorage.getItem("showLoginSuccess");
    console.log("[HomePage] showLoginSuccess:", showLoginSuccess);
    
    // Check if value exists and is not empty (timestamp or "true")
    if (showLoginSuccess && showLoginSuccess !== "") {
      const userProfile = localStorage.getItem("userProfile");
      const userName = userProfile ? JSON.parse(userProfile).name : "";
      
      // Remove flag
      localStorage.removeItem("showLoginSuccess");
      
      // Show Sonner toast with small delay to ensure DOM is ready
      setTimeout(() => {
        console.log("[HomePage] Showing toast for", userName);
        toast.success("Đăng nhập thành công!", {
          description: `Chào mừng ${userName} quay trở lại`,
          duration: 3000,
        });
      }, 300);
    }
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    // Listen for custom loginSuccess event (for client-side navigation)
    const handleLoginSuccess = () => {
      console.log("[HomePage] Received loginSuccess event");
      const userProfile = localStorage.getItem("userProfile");
      const userName = userProfile ? JSON.parse(userProfile).name : "";
      
      toast.success("Đăng nhập thành công!", {
        description: `Chào mừng ${userName} quay trở lại`,
        duration: 3000,
      });
    };
    
    window.addEventListener('loginSuccess', handleLoginSuccess);
    
    return () => {
      window.removeEventListener('loginSuccess', handleLoginSuccess);
    };
  }, [mounted]);

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <BannerSection />
      <FlashSale />
      <BestSellers />
      <PopularCategories />
    </div>
  );
}