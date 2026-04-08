import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white pt-0 overflow-hidden">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full hidden sm:block">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Đăng ký nhận tin ưu đãi</h3>
              <p className="text-red-100 text-sm">Đừng bỏ lỡ các chương trình Flash Sale và mã giảm giá độc quyền.</p>
            </div>
          </div>
          <div className="w-full md:w-auto flex-1 max-w-md flex relative">
            <input 
              type="email" 
              placeholder="Nhập email của bạn..." 
              className="w-full pl-4 pr-32 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button className="absolute right-1 top-1 bottom-1 bg-gray-900 hover:bg-black text-white font-semibold px-6 rounded-full transition-colors text-sm">
              Đăng ký
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-12 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
                <span className="text-white font-black text-xl">T</span>
              </div>
              <h3 className="font-black text-2xl tracking-wide uppercase">Duke<span className="text-red-500">.</span></h3>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              TDuke tự hào là đơn vị chuyên cung cấp thiết bị công nghệ, PC Gaming và linh kiện cao cấp với giá tốt nhất thị trường. Cam kết 100% chính hãng.
            </p>
            <div className="flex gap-3">
              {/* Social Icons */}
              {['facebook', 'youtube', 'tiktok'].map((social, idx) => (
                <Link key={idx} href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-4 h-4 bg-white" style={{ maskImage: `url(https://cdn.simpleicons.org/${social})`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskImage: `url(https://cdn.simpleicons.org/${social})`, WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wider text-sm">Liên kết nhanh</h4>
            <ul className="space-y-3">
              {[
                { name: "Giới thiệu TDuke", url: "/about" },
                { name: "Hệ thống cửa hàng", url: "/he-thong-showroom" },
                { name: "Tất cả sản phẩm", url: "/products" },
                { name: "Xây dựng cấu hình PC", url: "/build-pc" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.url} className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group text-sm">
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-red-500">▹</span>
                    <span className="-translate-x-4 group-hover:translate-x-0 transition-all duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wider text-sm">Chính sách</h4>
            <ul className="space-y-3">
              {[
                { name: "Chính sách bảo hành", url: "/warranty" },
                { name: "Chính sách đổi trả", url: "/returns" },
                { name: "Chính sách giao hàng", url: "/shipping" },
                { name: "Bảo mật thông tin", url: "/privacy" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.url} className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group text-sm">
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-red-500">▹</span>
                    <span className="-translate-x-4 group-hover:translate-x-0 transition-all duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wider text-sm">Liên hệ</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-gray-800 text-red-400 rounded flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <p className="text-gray-400 mb-0.5">Hotline mua hàng:</p>
                  <p className="font-semibold text-white">1900.5301 <span className="text-xs font-normal text-gray-500">(8h00 - 22h00)</span></p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-gray-800 text-red-400 rounded flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <p className="text-gray-400 mb-0.5">Email hỗ trợ:</p>
                  <p className="font-semibold text-white hover:text-red-400 cursor-pointer transition-colors">support@tduke.vn</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-gray-800 text-red-400 rounded flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <p className="text-gray-400 mb-0.5">Trụ sở chính:</p>
                  <p className="font-medium text-white leading-snug">123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider & Bottom */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            <div className="text-gray-400 text-sm text-center lg:text-left">
              <p>© {new Date().getFullYear()} Công ty TNHH Công Nghệ TDuke. Tất cả quyền được bảo lưu.</p>
              <p className="text-xs mt-1 text-gray-500">Giấy chứng nhận ĐKKD số: 0123456789 do Sở KH & ĐT TP.HCM cấp.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Payment Methods */}
              <div className="flex items-center gap-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 object-contain bg-white px-2 py-1 rounded" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 object-contain bg-white px-2 py-1 rounded" />
                <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="MoMo" className="h-6 object-contain bg-white px-2 py-1 rounded" />
                <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png" alt="ZaloPay" className="h-6 w-10 object-contain bg-white px-1 py-1 rounded" />
              </div>
              
              {/* Bo Cong Thuong Tag */}
              <img src="https://theme.hstatic.net/1000300454/1000395368/14/logo-bct.png?v=330" alt="Đã thông báo Bộ Công Thương" className="h-10" />
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}