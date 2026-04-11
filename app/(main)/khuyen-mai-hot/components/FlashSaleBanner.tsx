"use client";

import FlashSaleTimer from "./FlashSaleTimer";

interface FlashSaleBannerProps {
  endTime: Date | string;
  title?: string;
  subtitle?: string;
}

export default function FlashSaleBanner({
  endTime,
  title = "FLASH SALE",
  subtitle = "Săn deal cực sốc - Giá hời cuối tuần",
}: FlashSaleBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.4&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse" />
      </div>

      {/* Lightning effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-10 top-0 w-40 h-full bg-gradient-to-l from-white/20 to-transparent transform -skew-x-12 animate-shimmer" />
      </div>

      <div className="relative container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Title & Subtitle */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              {/* Flash Icon */}
              <div className="relative">
                <svg
                  className="w-10 h-10 text-yellow-300 animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <div className="absolute inset-0 bg-yellow-300 blur-xl opacity-50 animate-pulse" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                {title}
              </h1>
            </div>
            <p className="text-red-100 text-lg">{subtitle}</p>
          </div>

          {/* Right: Countdown Timer */}
          <div className="flex flex-col items-center">
            <p className="text-sm text-red-100 mb-2 font-medium">Kết thúc sau:</p>
            <FlashSaleTimer endTime={endTime} />
          </div>
        </div>

        {/* Deal Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-6 pt-6 border-t border-white/20">
          {[
            { value: "50%", label: "Giảm giá lên đến" },
            { value: "24h", label: "Thời gian diễn ra" },
            { value: "Free", label: "Vận chuyển miễn phí" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-red-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
