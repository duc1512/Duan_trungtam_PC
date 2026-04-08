import Link from "next/link";

const popularCategories = [
  { id: 1, name: "Laptop", icon: "💻" },
  { id: 2, name: "PC Gaming", icon: "🖥️" },
  { id: 3, name: "Linh Kiện PC", icon: "⚙️" },
  { id: 4, name: "Màn Hình", icon: "📺" },
  { id: 5, name: "Bàn Phím", icon: "⌨️" },
  { id: 6, name: "Chuột Máy Tính", icon: "🖱️" },
  { id: 7, name: "Tai Nghe", icon: "🎧" },
  { id: 8, name: "Thiết Bị Mạng", icon: "🌐" },
];

export default function PopularCategories() {
  return (
    <section className="bg-white rounded-md shadow-sm p-4 mb-8">
      <h2 className="text-lg font-bold uppercase text-gray-800 mb-4">Danh mục nổi bật</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
        {popularCategories.map((cat) => (
          <Link 
            key={cat.id} 
            href={`/category/${cat.id}`} 
            className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-transparent rounded-md hover:bg-white hover:border-[#e30019] hover:shadow-md transition-all group duration-300"
          >
            <span className="text-4xl mb-3 group-hover:-translate-y-1 transition-transform duration-300">{cat.icon}</span>
            <span className="text-xs text-center font-medium text-gray-700 group-hover:text-[#e30019]">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}