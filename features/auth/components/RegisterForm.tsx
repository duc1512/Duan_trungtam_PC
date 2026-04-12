"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";

interface RegisteredUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  role: "user";
  avatar: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => { const newErrors = { ...prev }; delete newErrors[name]; return newErrors; });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "Vui lòng nhập họ";
    if (!formData.lastName.trim()) newErrors.lastName = "Vui lòng nhập tên";
    if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email không hợp lệ";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    else if (!/^[0-9]{10,11}$/.test(formData.phone)) newErrors.phone = "Số điện thoại không hợp lệ";
    if (!formData.address.trim()) newErrors.address = "Vui lòng nhập địa chỉ";
    if (!formData.password) newErrors.password = "Vui lòng nhập mật khẩu";
    else if (formData.password.length < 6) newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    if (!agreeTerms) newErrors.terms = "Vui lòng đồng ý với điều khoản";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]") as RegisteredUser[];
      if (existingUsers.some(u => u.email === formData.email)) {
        setErrors({ email: "Email đã được đăng ký" });
        setIsLoading(false);
        return;
      }
      
      const newUser: RegisteredUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
        role: "user",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.firstName + " " + formData.lastName)}&background=e30019&color=fff&size=150`,
      };
      
      existingUsers.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
      localStorage.setItem("showRegisterSuccess", "true");
      
      router.push(`/dang-nhap?email=${encodeURIComponent(formData.email)}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Họ"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          error={errors.firstName}
          placeholder="Nhập họ"
        />
        <Input
          label="Tên"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          error={errors.lastName}
          placeholder="Nhập tên"
        />
      </div>

      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        placeholder="Nhập email"
      />

      <Input
        label="Số điện thoại"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        error={errors.phone}
        placeholder="Nhập số điện thoại"
      />

      <Input
        label="Địa chỉ"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        error={errors.address}
        placeholder="Nhập địa chỉ"
      />

      <div className="relative">
        <Input
          label="Mật khẩu"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
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

      <div className="relative">
        <Input
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          placeholder="Nhập lại mật khẩu"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
        >
          {showConfirmPassword ? "🙈" : "👁️"}
        </button>
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="agreeTerms"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
          className="mt-1 rounded border-gray-300"
        />
        <label htmlFor="agreeTerms" className="text-sm text-gray-600">
          Tôi đồng ý với{" "}
          <Link href="#" className="text-[#e30019] hover:underline">
            điều khoản sử dụng
          </Link>
        </label>
      </div>
      {errors.terms && <p className="text-sm text-red-600">{errors.terms}</p>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isLoading}
      >
        Đăng ký
      </Button>
    </form>
  );
}
