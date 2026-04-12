"use client";

import { useState } from "react";

const BarChart = ({ data, color = "bg-[#e30019]" }: { data: number[]; color?: string }) => {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-2 h-40">
      {data.map((value, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className={`w-full ${color} rounded-t transition-all duration-500`} style={{ height: `${(value / max) * 100}%` }} />
          <span className="text-xs text-gray-400">T{i + 1}</span>
        </div>
      ))}
    </div>
  );
};

const LineChart = ({ data }: { data: number[] }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((value, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - ((value - min) / range) * 100,
  }));
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  return (
    <div className="h-40 relative bg-gray-700/30 rounded-lg overflow-hidden">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        <path d={pathD} fill="none" stroke="#e30019" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        {points.map((p, i) => (<circle key={i} cx={p.x} cy={p.y} r="3" fill="#e30019" />))}
      </svg>
    </div>
  );
};

const PieChart = ({ data }: { data: { label: string; value: number; color: string }[] }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = 0;
  return (
    <div className="flex items-center gap-6">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {data.map((item, i) => {
            const angle = (item.value / total) * 360;
            const x1 = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
            const y1 = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);
            const x2 = 50 + 40 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
            const y2 = 50 + 40 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
            const largeArc = angle > 180 ? 1 : 0;
            const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;
            currentAngle += angle;
            return <path key={i} d={path} fill={item.color} />;
          })}
          <circle cx="50" cy="50" r="20" fill="#1f2937" />
        </svg>
      </div>
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-gray-300">{item.label}: {item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(price);
};

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("7days");
  const revenueData = [45000000, 52000000, 48000000, 61000000, 55000000, 72000000, 68000000];
  const ordersData = [12, 15, 11, 18, 14, 22, 19];
  const visitorsData = [120, 145, 132, 168, 155, 190, 175];
  const categoryData = [
    { label: "Laptop Gaming", value: 45, color: "#e30019" },
    { label: "PC Gaming", value: 25, color: "#3b82f6" },
    { label: "Linh Kiện", value: 20, color: "#10b981" },
    { label: "Phụ Kiện", value: 10, color: "#f59e0b" },
  ];
  const topProducts = [
    { name: "ASUS ROG Strix G16", sales: 234, revenue: 10500000000 },
    { name: "MSI Katana 15", sales: 189, revenue: 6230000000 },
    { name: "Acer Predator Helios", sales: 156, revenue: 6080000000 },
    { name: "Lenovo Legion Pro 7", sales: 98, revenue: 5190000000 },
    { name: "Dell XPS 15", sales: 67, revenue: 3080000000 },
  ];
  const stats = [
    { label: "Tổng doanh thu", value: formatPrice(411000000), change: "+23%", icon: "💰" },
    { label: "Đơn hàng", value: "111", change: "+15%", icon: "📦" },
    { label: "Khách truy cập", value: "1,085", change: "+18%", icon: "👥" },
    { label: "Tỷ lệ chuyển đổi", value: "10.2%", change: "+2.3%", icon: "📈" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Thống kê & Báo cáo</h1>
        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#e30019]">
          <option value="7days">7 ngày qua</option>
          <option value="30days">30 ngày qua</option>
          <option value="90days">3 tháng qua</option>
          <option value="year">Năm nay</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <span className="text-green-400 text-sm">{stat.change}</span>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Doanh thu theo ngày</h3>
          <BarChart data={revenueData} />
          <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
            <span>Tổng: {formatPrice(revenueData.reduce((a, b) => a + b, 0))}</span>
            <span>TB/ngày: {formatPrice(revenueData.reduce((a, b) => a + b, 0) / revenueData.length)}</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Đơn hàng theo ngày</h3>
          <LineChart data={ordersData} />
          <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
            <span>Tổng: {ordersData.reduce((a, b) => a + b, 0)} đơn</span>
            <span>TB/ngày: {(ordersData.reduce((a, b) => a + b, 0) / ordersData.length).toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Phân bố theo danh mục</h3>
          <PieChart data={categoryData} />
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-4">Lượt truy cập</h3>
          <BarChart data={visitorsData} color="bg-blue-500" />
          <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
            <span>Tổng: {visitorsData.reduce((a, b) => a + b, 0)} lượt</span>
            <span>TB/ngày: {Math.round(visitorsData.reduce((a, b) => a + b, 0) / visitorsData.length)}</span>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Sản phẩm bán chạy</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Sản phẩm</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Số lượng bán</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Doanh thu</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Tỷ lệ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {topProducts.map((product, index) => {
                const totalRevenue = topProducts.reduce((sum, p) => sum + p.revenue, 0);
                const percentage = ((product.revenue / totalRevenue) * 100).toFixed(1);
                return (
                  <tr key={product.name}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-[#e30019] rounded-lg flex items-center justify-center text-white font-bold text-sm">{index + 1}</span>
                        <span className="text-white font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-white">{product.sales}</td>
                    <td className="px-6 py-4 text-right text-white font-semibold">{formatPrice(product.revenue)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-[#e30019] rounded-full" style={{ width: `${percentage}%` }} />
                        </div>
                        <span className="text-gray-400 text-sm">{percentage}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Xuất báo cáo PDF
        </button>
      </div>
    </div>
  );
}
