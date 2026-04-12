import Link from "next/link";

export default function CategorySidebar() {
  const categories = [
    { id: 1, name: "Laptop Gaming", icon: "💻", count: 245 },
    { id: 2, name: "PC Gaming", icon: "🖥️", count: 189 },
    { id: 3, name: "Card VGA", icon: "🎮", count: 156 },
    { id: 4, name: "CPU - Bộ vi xử lý", icon: "⚡", count: 98 },
    { id: 5, name: "Mainboard", icon: "🔧", count: 87 },
    { id: 6, name: "RAM", icon: "🧩", count: 234 },
    { id: 7, name: "SSD - Ổ cứng", icon: "💾", count: 312 },
    { id: 8, name: "Màn hình", icon: "📺", count: 178 },
    { id: 9, name: "Bàn phím", icon: "⌨️", count: 145 },
    { id: 10, name: "Chuột gaming", icon: "🖱️", count: 267 },
    { id: 11, name: "Tai nghe", icon: "🎧", count: 198 },
    { id: 12, name: "Case - Vỏ case", icon: "📦", count: 89 },
  ];

  const hotDeals = [
    { id: 1, name: "RTX 4090 Super", price: "45.990.000đ", discount: "-15%", oldPrice: "53.990.000đ" },
    { id: 2, name: "Intel i9-14900K", price: "15.490.000đ", discount: "-10%", oldPrice: "17.990.000đ" },
    { id: 3, name: "Samsung 980 Pro 2TB", price: "2.790.000đ", discount: "-20%", oldPrice: "3.490.000đ" },
  ];

  return (
    <div className="hidden md:block w-64 flex-shrink-0 bg-white shadow-sm rounded-md overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#e30019] to-[#ff4757] p-4 text-white">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <span className="text-xl">📋</span> Danh mục sản phẩm
        </h3>
      </div>
      
      {/* Categories List */}
      <div className="max-h-96 overflow-y-auto">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="flex items-center justify-between p-3 hover:bg-red-50 transition-colors border-b border-gray-100 group"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl group-hover:scale-110 transition-transform">{category.icon}</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#e30019]">
                {category.name}
              </span>
            </div>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {category.count}
            </span>
          </Link>
        ))}
      </div>

      {/* Hot Deals Section */}
      <div className="border-t border-gray-200 p-4 bg-gradient-to-b from-gray-50 to-white">
        <h4 className="font-bold text-sm text-[#e30019] mb-3 flex items-center gap-2">
          <span>🔥</span> Hot Deals
        </h4>
        <div className="space-y-3">
          {hotDeals.map((deal) => (
            <Link
              key={deal.id}
              href={`/product/${deal.id}`}
              className="block p-2 bg-white rounded-lg border border-gray-200 hover:border-[#e30019] hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start mb-1">
                <h5 className="text-xs font-medium text-gray-800 line-clamp-1 group-hover:text-[#e30019]">
                  {deal.name}
                </h5>
                <span className="bg-[#e30019] text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                  {deal.discount}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#e30019]">{deal.price}</span>
                <span className="text-xs text-gray-400 line-through">{deal.oldPrice}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
