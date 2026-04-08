"use client";

import { useState } from "react";

const contactInfo = [
  {
    icon: "📍",
    title: "Địa chỉ",
    content: "123 Nguyễn Văn Linh, P. Bình Thuận, Q. 7, TP.HCM",
    detail: "Ghé cửa hàng từ 8:00 - 22:00 hàng ngày"
  },
  {
    icon: "📞",
    title: "Hotline",
    content: "1900.5301",
    detail: "Tổng đài hỗ trợ 24/7"
  },
  {
    icon: "✉️",
    title: "Email",
    content: "support@tduke.vn",
    detail: "Phản hồi trong vòng 2 giờ"
  },
  {
    icon: "💬",
    title: "Live Chat",
    content: "Chat trực tuyến",
    detail: "Tư vấn viên online 8:00 - 22:00"
  }
];

const branches = [
  {
    name: "Showroom Quận 1",
    address: "265 Nguyễn Trãi, P. Nguyễn Cư Trinh, Q.1",
    phone: "028.3925.1234",
    hours: "8:00 - 22:00",
    map: "https://maps.google.com/?q=265+Nguyễn+Trãi+Quận+1"
  },
  {
    name: "Showroom Quận 7",
    address: "123 Nguyễn Văn Linh, P. Bình Thuận, Q.7",
    phone: "028.5412.5678",
    hours: "8:00 - 22:00",
    map: "https://maps.google.com/?q=123+Nguyễn+Văn+Linh+Quận+7"
  },
  {
    name: "Showroom Thủ Đức",
    address: "459 Võ Văn Ngân, P. Linh Chiểu, TP.Thủ Đức",
    phone: "028.3725.9012",
    hours: "8:00 - 22:00",
    map: "https://maps.google.com/?q=459+Võ+Văn+Ngân+Thủ+Đức"
  },
  {
    name: "Showroom Bình Thạnh",
    address: "789 Phan Văn Trị, P. 12, Q.Bình Thạnh",
    phone: "028.3512.3456",
    hours: "8:00 - 22:00",
    map: "https://maps.google.com/?q=789+Phan+Văn+Trị+Bình+Thạnh"
  }
];

const faqs = [
  {
    question: "TDuke có những dịch vụ gì?",
    answer: "TDuke cung cấp dịch vụ bán lẻ laptop, PC, linh kiện, build PC theo yêu cầu, sửa chữa và bảo hành thiết bị công nghệ."
  },
  {
    question: "Thời gian bảo hành sản phẩm là bao lâu?",
    answer: "Thời gian bảo hành tùy thuộc vào sản phẩm: Laptop 24 tháng, PC 36 tháng, linh kiện 12-24 tháng. Có chính sách 1 đổi 1 trong 30 ngày đầu."
  },
  {
    question: "Có hỗ trợ trả góp không?",
    answer: "TDuke hỗ trợ trả góp qua thẻ tín dụng 0% lãi suất và trả góp qua công ty tài chính với thủ tục nhanh gọn."
  },
  {
    question: "Giao hàng có mất phí không?",
    answer: "Miễn phí giao hàng cho đơn hàng từ 2 triệu trong nội thành TP.HCM. Các khu vực khác có chi phí vận chuyển hợp lý."
  }
];

export default function LienHe() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [selectedBranch, setSelectedBranch] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 pt-16 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Liên Hệ TDuke
            </h1>
            <p className="text-gray-300 text-lg">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-center">
              <div className="text-4xl mb-4">{info.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
              <p className="text-lg font-semibold text-red-600 mb-1">{info.content}</p>
              <p className="text-sm text-gray-600">{info.detail}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gửi tin nhắn cho chúng tôi</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="09xxxxxxxx"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chủ đề <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">-- Chọn chủ đề --</option>
                      <option value="hoidap">Hỏi đáp sản phẩm</option>
                      <option value="baohanh">Bảo hành & Sửa chữa</option>
                      <option value="baogia">Yêu cầu báo giá</option>
                      <option value="hop-tac">Hợp tác kinh doanh</option>
                      <option value="khac">Khác</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung tin nhắn <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                    placeholder="Nhập nội dung bạn muốn chia sẻ..."
                  ></textarea>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Gửi tin nhắn
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: ""
                    })}
                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Làm mới
                  </button>
                </div>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl p-8 shadow-lg mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Câu hỏi thường gặp</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Branches */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hệ thống cửa hàng</h3>
              <div className="space-y-4">
                {branches.map((branch, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <h4 className="font-semibold text-gray-900 mb-2">{branch.name}</h4>
                    <p className="text-sm text-gray-600 mb-1">{branch.address}</p>
                    <p className="text-sm text-gray-600 mb-1">📞 {branch.phone}</p>
                    <p className="text-sm text-gray-600 mb-2">⏰ {branch.hours}</p>
                    <a
                      href={branch.map}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 text-sm hover:underline inline-flex items-center gap-1"
                    >
                      🗺️ Xem bản đồ
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">⏰ Giờ làm việc</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Thứ 2 - Thứ 6:</span>
                  <span className="font-semibold">8:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Thứ 7 - Chủ nhật:</span>
                  <span className="font-semibold">8:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Hotline hỗ trợ:</span>
                  <span className="font-semibold">24/7</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-red-500">
                <p className="text-sm text-red-100">
                  🎉 Hotline luôn sẵn sàng phục vụ kể cả ngày lễ và Tết
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kết nối với TDuke</h3>
              <div className="grid grid-cols-2 gap-3">
                <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg text-center transition-colors">
                  Facebook
                </a>
                <a href="#" className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-lg text-center transition-colors">
                  Instagram
                </a>
                <a href="#" className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg text-center transition-colors">
                  YouTube
                </a>
                <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg text-center transition-colors">
                  Zalo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
