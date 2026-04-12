"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button, Input } from "@/components/ui";

interface RegisteredUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  role: "user" | "admin";
  avatar: string;
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailFromUrl = searchParams.get("email");
    if (emailFromUrl) {
      setFormData(prev => ({ ...prev, email: emailFromUrl }));
    }
    
    const showRegisterSuccess = localStorage.getItem("showRegisterSuccess");
    if (showRegisterSuccess === "true") {
      localStorage.removeItem("showRegisterSuccess");
      toast.success("Đăng ký thành công!", {
        description: "Vui lòng đăng nhập để tiếp tục",
        duration: 4000,
      });
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check against registered users
      const registeredUsers: RegisteredUser[] = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const user = registeredUsers.find(u => u.email === formData.email && u.password === formData.password);

      if (user) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userProfile", JSON.stringify({
          name: `${user.firstName} ${user.lastName}`.trim() || "Người dùng",
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          phone: user.phone,
          address: user.address,
        }));
        
        localStorage.setItem("showLoginSuccess", Date.now().toString());
        
        if (user.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      } else {
        setError("Email hoặc mật khẩu không chính xác");
      }
    } catch {
      setError("Có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <Input
        label="Email"
        name="email"
        type="email"
        required
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Nhập email của bạn"
      />

      <div>
        <div className="relative">
          <Input
            label="Mật khẩu"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Nhập mật khẩu"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-gray-600">
          <input type="checkbox" className="rounded border-gray-300" />
          Ghi nhớ đăng nhập
        </label>
        <Link href="/quen-mat-khau" className="text-[#e30019] hover:underline">
          Quên mật khẩu?
        </Link>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isLoading}
      >
        Đăng nhập
      </Button>
    </form>
  );
}
