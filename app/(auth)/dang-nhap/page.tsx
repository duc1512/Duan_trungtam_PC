"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      let userData = null;
      
      // Check admin credentials
      if (formData.email === "admin@gmail.com" && formData.password === "123456") {
        userData = {
          name: "Admin",
          email: "admin@gmail.com",
          avatar: "https://via.placeholder.com/150/cccccc/ffffff?text=👤",
          role: "admin"
        };
      }
      // Check user credentials
      else if (formData.email === "user@gmail.com" && formData.password === "123456") {
        userData = {
          name: "Đức",
          email: "user@gmail.com",
          avatar: "https://via.placeholder.com/150/cccccc/ffffff?text=👤",
          role: "user"
        };
      }
      
      if (userData) {
        // Store login state in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userProfile", JSON.stringify(userData));
        
        // Redirect based on role
        if (userData.role === "admin") {
          router.push("/"); // Admin also goes to home page
        } else {
          router.push("/"); // Home page for regular user
        }
      } else {
        alert("Email hoặc mật khẩu không đúng!");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="animate-fade-in-up w-full max-w-sm mx-auto">
      {/* Tiêu đề */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 bg-[#e30019] rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xl">T</span>
          </div>
          <span className="text-2xl font-black italic text-white tracking-tighter">Duke</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          Chào mừng trở lại
        </h2>
        <p className="text-sm text-gray-400 font-medium">
          Đăng nhập vào hệ thống{" "}
          <span className="text-[#e30019] font-black tracking-widest italic">
            TDuke
          </span>
        </p>
      </div>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Input: Tài khoản */}
        <div>
          <label className="block text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider text-xs">
            Số điện thoại / Email
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-600 group-focus-within:text-[#e30019] transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input 
              type="text" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:bg-gray-800 focus:outline-none focus:border-[#e30019] focus:ring-1 focus:ring-[#e30019] transition-all duration-200 shadow-inner"
              placeholder="Nhập số điện thoại hoặc email..."
              required
            />
          </div>
        </div>
        
        {/* Input: Mật khẩu */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider text-xs">
              Mật khẩu
            </label>
            <Link href="/quen-mat-khau" className="text-xs font-medium text-[#e30019] hover:text-red-400 hover:underline transition-colors">
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-600 group-focus-within:text-[#e30019] transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl pl-11 pr-12 py-3.5 text-sm text-white placeholder-gray-600 focus:bg-gray-800 focus:outline-none focus:border-[#e30019] focus:ring-1 focus:ring-[#e30019] transition-all duration-200 font-mono shadow-inner"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-[#e30019] transition-colors focus:outline-none"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0l-3.29-3.29" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Nút Đăng nhập */}
        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#e30019] hover:bg-red-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-300 active:scale-[0.98] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
        </button>
      </form>
      
      {/* Đăng ký */}
      <div className="mt-10 text-center text-sm text-gray-500">
        Bạn chưa có tài khoản?{" "}
        <Link href="/dang-ky" className="text-[#e30019] font-bold hover:text-red-400 hover:underline transition-colors">
          Đăng ký thành viên
        </Link>
      </div>
    </div>
  );
}