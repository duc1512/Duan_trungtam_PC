"use client";

import { memo } from "react";

export const CategorySkeleton = memo(() => (
  <div className="flex-shrink-0 w-[160px] h-[160px] md:w-[200px] md:h-[200px] animate-pulse">
    <div className="bg-gray-200 rounded-2xl p-4 h-full flex flex-col items-center justify-center">
      <div className="w-14 h-14 bg-gray-300 rounded-xl mb-3" />
      <div className="h-4 bg-gray-300 rounded w-24 mb-2" />
      <div className="h-3 bg-gray-300 rounded w-16" />
    </div>
  </div>
));

CategorySkeleton.displayName = "CategorySkeleton";
