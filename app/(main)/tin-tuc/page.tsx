"use client";

import { useState } from "react";

const newsCategories = [
  { id: "all", name: "Tất cả", count: 45 },
  { id: "pc-gaming", name: "PC Gaming", count: 12 },
  { id: "laptop", name: "Laptop", count: 8 },
  { id: "linh-kien", name: "Linh kiện", count: 10 },
  { id: "review", name: "Review", count: 15 },
];

const newsArticles = [
  {
    id: 1,
    title: "NVIDIA RTX 5090 Ti: Card đồ họa mạnh nhất thế giới sắp ra mắt",
    excerpt: "NVIDIA chuẩn bị trình làng RTX 5090 Ti với hiệu năng vượt trội, hứa hẹn sẽ thay đổi hoàn toàn cục diện ngành đồ họa PC và AI trong năm nay.",
    category: "pc-gaming",
    categoryName: "PC Gaming",
    author: "Nguyễn Văn A",
    authorAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    date: "02/04/2026",
    readTime: "5 phút đọc",
    image: "https://images.unsplash.com/photo-1590644839082-cd8ad5c7d5b8?w=1200&h=600&fit=crop",
    featured: true,
    tags: ["NVIDIA", "RTX 5090", "Card đồ họa"]
  },
  {
    id: 2,
    title: "Top 5 laptop gaming đáng mua nhất trong tháng 4/2026",
    excerpt: "Tổng hợp những mẫu laptop gaming có hiệu năng tốt nhất trong phân khúc giá từ 20-50 triệu đồng dành cho game thủ và dân đồ họa.",
    category: "laptop",
    categoryName: "Laptop",
    author: "Trần Thị B",
    authorAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    date: "01/04/2026",
    readTime: "8 phút đọc",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=400&fit=crop",
    featured: false,
    tags: ["Laptop", "Gaming", "Review"]
  },
  {
    id: 3,
    title: "Intel Core i9-14900K: Vua hiệu năng mới của nhà Intel",
    excerpt: "Chi tiết về bộ xử lý mới nhất của Intel với 24 nhân, 32 luồng và xung nhịp lên đến 6.0GHz, đánh bại mọi đối thủ trong tầm giá.",
    category: "linh-kien",
    categoryName: "Linh kiện",
    author: "Lê Văn C",
    authorAvatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    date: "31/03/2026",
    readTime: "6 phút đọc",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
    featured: false,
    tags: ["Intel", "CPU", "Core i9"]
  },
  {
    id: 4,
    title: "Hướng dẫn build PC gaming 30 triệu đồng tối ưu 2026",
    excerpt: "Cấu hình PC gaming mạnh mẽ trong ngân sách 30 triệu, tối ưu linh kiện để chơi mượt các tựa game AAA mới nhất ở độ phân giải 2K.",
    category: "pc-gaming",
    categoryName: "PC Gaming",
    author: "Phạm Văn D",
    authorAvatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    date: "30/03/2026",
    readTime: "10 phút đọc",
    image: "https://images.unsplash.com/photo-1587202372775-4abc9295e321?w=800&h=400&fit=crop",
    featured: false,
    tags: ["Build PC", "Gaming", "Hướng dẫn"]
  },
  {
    id: 5,
    title: "SSD NVMe Gen5: Tốc độ đọc ghi vượt đỉnh 10GB/s",
    excerpt: "Thế hệ SSD mới nhất mang lại tốc độ ấn tượng, giảm đáng kể thời gian tải game và khởi động hệ điều hành.",
    category: "linh-kien",
    categoryName: "Linh kiện",
    author: "Hoàng Thị E",
    authorAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    date: "29/03/2026",
    readTime: "4 phút đọc",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop",
    featured: false,
    tags: ["SSD", "NVMe", "Lưu trữ"]
  },
  {
    id: 6,
    title: "ASUS ROG Strix G18: Quái vật laptop 18 inch",
    excerpt: "Review chi tiết laptop gaming đỉnh cao ASUS ROG Strix G18 trang bị màn hình 2K 240Hz sắc nét cùng card đồ họa siêu khủng RTX 4080.",
    category: "review",
    categoryName: "Review",
    author: "Ngô Văn F",
    authorAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    date: "28/03/2026",
    readTime: "12 phút đọc",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=400&fit=crop",
    featured: false,
    tags: ["ASUS", "ROG", "Review"]
  }
];

const popularTags = [
  { name: "NVIDIA", count: 15 }, { name: "Intel", count: 12 }, { name: "AMD", count: 10 },
  { name: "Gaming", count: 25 }, { name: "Laptop", count: 18 }, { name: "SSD", count: 8 },
  { name: "Build PC", count: 20 }
];

export default function TechMagazine() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = newsArticles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 pb-20">
      
      {/* Header / Top Section */}
      <div className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-30 pt-6 pb-4 px-4">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-black tracking-tight uppercase flex items-center gap-2">
            TDuke <span className="bg-red-600 text-white px-2 py-0.5 rounded text-xl">News</span>
          </h1>
          
          {/* Search Input */}
          <div className="relative w-full md:w-80 group">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-sm rounded-full pl-11 pr-4 py-2.5 focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="container mx-auto max-w-7xl mt-6 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 w-max">
            {newsCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-transparent"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content Area */}
          <div className="w-full lg:w-2/3 xl:w-3/4">
            
            {/* Featured Article */}
            {featuredArticle && selectedCategory === "all" && searchTerm === "" && (
              <article className="mb-12 group cursor-pointer">
                <div className="relative w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden mb-6">
                  <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-red-600 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span> Nổi bật
                  </div>
                </div>
                
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    <span className="text-red-600">{featuredArticle.categoryName}</span>
                    <span>•</span>
                    <span>{featuredArticle.date}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight group-hover:text-red-600 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <img src={featuredArticle.authorAvatar} alt={featuredArticle.author} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                    <div>
                      <p className="font-bold text-sm text-gray-900">{featuredArticle.author}</p>
                      <p className="text-xs text-gray-500">{featuredArticle.readTime}</p>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Thẻ phân cách nếu có Featured */}
            {featuredArticle && selectedCategory === "all" && searchTerm === "" && (
              <hr className="border-gray-100 mb-10" />
            )}

            {/* Thông báo nếu không tìm thấy */}
            {filteredArticles.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                <p className="text-xl font-medium mb-2">Không tìm thấy bài viết nào.</p>
                <p>Vui lòng thử lại với từ khóa khác.</p>
              </div>
            )}

            {/* Regular Articles Grid (2 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
              {regularArticles.map((article) => (
                <article key={article.id} className="group cursor-pointer flex flex-col h-full">
                  <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <span className="text-blue-600">{article.categoryName}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 leading-snug mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-auto">
                    <img src={article.authorAvatar} alt={article.author} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-xs font-semibold text-gray-700">{article.author}</span>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            {filteredArticles.length > 0 && (
              <div className="mt-14 text-center">
                <button className="bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 px-8 py-3 rounded-full text-sm font-bold transition-colors">
                  Tải thêm bài viết ↓
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <div className="sticky top-28 space-y-8">
              
              {/* Newsletter Widget */}
              <div className="bg-gray-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl shadow-gray-900/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-2xl font-black mb-2 relative z-10">Luôn cập nhật.</h3>
                <p className="text-gray-400 text-sm mb-6 relative z-10 leading-relaxed">
                  Nhận những tin tức công nghệ nóng hổi nhất và mã giảm giá độc quyền qua email.
                </p>
                <div className="relative z-10">
                  <input
                    type="email"
                    placeholder="Địa chỉ Email"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-3 rounded-xl mb-3 focus:outline-none focus:border-red-500 transition-colors text-sm"
                  />
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors text-sm">
                    Đăng ký miễn phí
                  </button>
                </div>
              </div>

              {/* Popular Tags Widget */}
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                  Chủ đề thịnh hành
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag.name}
                      className="group bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm hover:border-gray-900 hover:text-gray-900 transition-all flex items-center gap-2"
                    >
                      <span className="font-medium">{tag.name}</span>
                      <span className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded group-hover:bg-gray-900 group-hover:text-white transition-colors">
                        {tag.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Simple Banner/Ad Placeholder */}
              <div className="w-full aspect-[4/5] bg-gray-50 rounded-3xl border border-gray-100 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:border-red-200 transition-colors">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Quảng cáo</span>
                <h4 className="text-xl font-black text-gray-900 mb-2">Build PC Giá Rẻ</h4>
                <p className="text-sm text-gray-500 mb-4">Nhận ngay ưu đãi lên đến 2.000.000đ khi build máy tại TDuke.</p>
                <span className="text-red-600 font-bold text-sm hover:underline">Xem ngay →</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}