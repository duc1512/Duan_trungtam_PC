"use client";

interface ProgressBarProps {
  sold: number;
  total: number;
  threshold?: number; // Show "hot" badge when sold > threshold%
  className?: string;
}

export default function ProgressBar({
  sold,
  total,
  threshold = 80,
  className = "",
}: ProgressBarProps) {
  const percentage = Math.min((sold / total) * 100, 100);
  const isHot = percentage >= threshold;
  const isAlmostSoldOut = percentage >= 95;

  return (
    <div className={`w-full ${className}`}>
      {/* Status badges */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          {/* Hot/Fire badge */}
          {isHot && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clipRule="evenodd"
                />
              </svg>
              {isAlmostSoldOut ? "SẮP HẾT" : "CHÁY HÀNG"}
            </div>
          )}
          
          {/* Percentage text */}
          <span className="text-xs text-gray-600">
            Đã bán {Math.round(percentage)}%
          </span>
        </div>

        {/* Stock indicator */}
        {isAlmostSoldOut ? (
          <span className="text-xs text-red-500 font-semibold">
            Chỉ còn {total - sold} suất
          </span>
        ) : (
          <span className="text-xs text-gray-500">
            {sold}/{total} đã bán
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-100 animate-pulse opacity-50" />

        {/* Fill bar */}
        <div
          className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out ${
            isAlmostSoldOut
              ? "bg-gradient-to-r from-red-500 to-red-600"
              : isHot
              ? "bg-gradient-to-r from-orange-400 to-red-500"
              : "bg-gradient-to-r from-orange-400 to-orange-500"
          }`}
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
