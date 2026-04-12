'use client';

import { useState, useEffect } from 'react';

export function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    }
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial calculation
    
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
  
  return progress;
}
