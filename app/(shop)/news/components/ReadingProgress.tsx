'use client';

import { useReadingProgress } from '../hooks/useReadingProgress';

export function ReadingProgress() {
  const progress = useReadingProgress();
  
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
