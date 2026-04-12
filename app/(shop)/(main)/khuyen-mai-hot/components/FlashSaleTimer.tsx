"use client";

import { useCountdown, formatTimeUnit } from "@/hooks/useCountdown";

interface FlashSaleTimerProps {
  endTime: Date | string;
  className?: string;
}

export default function FlashSaleTimer({ endTime, className = "" }: FlashSaleTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(endTime);

  if (isExpired) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-red-600 font-bold">Đã kết thúc</span>
      </div>
    );
  }

  const timeUnits = [
    { value: days, label: "Ngày" },
    { value: hours, label: "Giờ" },
    { value: minutes, label: "Phút" },
    { value: seconds, label: "Giây" },
  ];

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="bg-gray-900 text-white rounded-lg px-2 py-1 min-w-[36px] text-center">
              <span className="text-lg font-bold tabular-nums">
                {formatTimeUnit(unit.value)}
              </span>
            </div>
            <span className="text-[10px] text-gray-500 mt-0.5">{unit.label}</span>
          </div>
          {index < timeUnits.length - 1 && (
            <span className="text-gray-900 font-bold text-lg mx-1">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
