"use client";

import { useState } from "react";

const supportTopics = [
  { id: "order", title: "Đơn hàng & Vận chuyển", desc: "Tra cứu đơn hàng, thời gian giao nhận", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { id: "warranty", title: "Bảo hành & Sửa chữa", desc: "Chính sách, tra cứu bảo hành", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { id: "return", title: "Đổi trả & Hoàn tiền", desc: "Quy định đổi trả trong 7-30 ngày", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id: "tech", title: "Hỗ trợ Kỹ thuật", desc: "Cài đặt phần mềm, lỗi phần cứng", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> },
  { id: "payment", title: "Thanh toán & Trả góp", desc: "Hướng dẫn thanh toán, hồ sơ trả góp", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
  { id: "account", title: "Tài khoản của tôi", desc: "Quản lý thông tin, điểm thưởng", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
];

const faqs = [
  { id: 1, q: "Tôi có thể kiểm tra tình trạng đơn hàng ở đâu?", a: "Bạn có thể kiểm tra tình trạng đơn hàng bằng cách đăng nhập vào tài khoản, chọn mục 'Đơn hàng của tôi'. Hoặc bạn có thể nhập mã đơn hàng vào khung tra cứu nhanh ở trang chủ." },
  { id: 2, q: "Sản phẩm bị lỗi trong 7 ngày đầu thì xử lý thế nào?", a: "TDuke áp dụng chính sách 1 ĐỔI 1 trong 7 ngày đầu tiên nếu sản phẩm có lỗi từ nhà sản xuất. Bạn vui lòng mang sản phẩm (kèm đầy đủ hộp, phụ kiện) đến showroom gần nhất để được hỗ trợ đổi mới ngay lập tức." },
  { id: 3, q: "Mua trả góp cần những thủ tục gì?", a: "Để mua trả góp, bạn chỉ cần chuẩn bị Căn cước công dân (CCCD) gắn chip. Bạn có thể làm thủ tục trả góp qua thẻ tín dụng (0% lãi suất) hoặc qua công ty tài chính ngay tại cửa hàng hoặc làm hồ sơ online." },
  { id: 4, q: "Làm sao để tôi gửi PC đi bảo hành?", a: "Bạn có thể mang trực tiếp PC đến bất kỳ trung tâm bảo hành nào của TDuke. Nếu bạn ở xa, vui lòng gọi Hotline 1900.5301, chúng tôi sẽ hướng dẫn bạn đóng gói và gửi qua đơn vị chuyển phát nhanh." },
];

export default function HelpCenter() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (id: number | null) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16 font-sans">
      
      {/* Hero Section & Search */}
      <div className="bg-gray-900 pt-16 pb-24 px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/2"></div>

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            TDuke xin chào. Chúng tôi có thể giúp gì cho bạn?
          </h1>
          <p className="text-gray-400 text-lg mb-8">Nhập câu hỏi, từ khóa hoặc vấn đề bạn đang gặp phải</p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <input 
              type="text" 
              placeholder="VD: Cách lắp tản nhiệt nước, Tra cứu bảo hành màn hình..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-0 shadow-lg text-gray-900 text-base focus:ring-4 focus:ring-red-500/30 outline-none transition-all"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-red-600 hover:bg-red-700 text-white px-6 rounded-xl font-bold transition-colors">
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto max-w-6xl px-4 -mt-10 relative z-20">
        
        {/* Support Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16">
          {supportTopics.map((topic) => (
            <div 
              key={topic.id} 
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-red-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex items-start gap-5"
            >
              <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-red-50 group-hover:text-red-600 transition-colors shrink-0">
                {topic.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">{topic.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{topic.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* FAQ Accordion */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-blue-500">❓</span> Câu hỏi thường gặp
            </h2>
            
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              {faqs.map((faq, index) => (
                <div key={faq.id} className={`${index !== faqs.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <button 
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
                  >
                    <span className={`font-semibold text-base ${activeFaq === faq.id ? 'text-red-600' : 'text-gray-800'}`}>
                      {faq.q}
                    </span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" height="20" 
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                      className={`text-gray-400 transition-transform duration-300 ${activeFaq === faq.id ? 'rotate-180 text-red-500' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === faq.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center lg:text-left">
              <button className="text-blue-600 font-semibold hover:underline text-sm">Xem tất cả câu hỏi thường gặp &rarr;</button>
            </div>
          </div>

          {/* Contact Support Direct */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Bạn vẫn cần hỗ trợ?</h2>
            
            <div className="space-y-4">
              {/* Hotline Card */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">Gọi Hotline (8:00 - 22:00)</p>
                  <p className="text-lg font-black text-red-600 tracking-wide">1900.5301</p>
                </div>
              </div>

              {/* Chat Card */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 border border-blue-500 shadow-md shadow-blue-600/20 flex items-center justify-between text-white group cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-0.5">Chat với CSKH</p>
                    <p className="text-xs text-blue-100">Phản hồi trong 5 phút</p>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:border-gray-300 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">Gửi Email hỗ trợ</p>
                  <p className="text-xs text-gray-500">support@tduke.vn</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}