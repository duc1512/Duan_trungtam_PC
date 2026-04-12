"use client";

export const CategoryIcons = {
  laptop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M2 17h20" />
      <path d="M6 21h12" />
      <path d="M8 21l-1 3" />
      <path d="M16 21l1 3" />
    </svg>
  ),
  pcGaming: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="4" y="4" width="16" height="14" rx="2" />
      <path d="M8 21h8" />
      <circle cx="12" cy="11" r="2" />
      <path d="M12 13v2" />
      <path d="M8 8h.01" />
      <path d="M16 8h.01" />
    </svg>
  ),
  components: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M6 10h12" />
      <path d="M10 6v12" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  ),
  monitor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 16v5" />
    </svg>
  ),
  keyboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 10h.01" />
      <path d="M10 10h.01" />
      <path d="M13 10h.01" />
      <path d="M16 10h.01" />
      <path d="M7 14h10" />
    </svg>
  ),
  mouse: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="8" y="3" width="8" height="13" rx="4" />
      <path d="M12 7v3" />
      <path d="M8 10h8" />
      <path d="M12 16v5" />
    </svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M3 14v-3a9 9 0 1118 0v3" />
      <path d="M3 14v4a2 2 0 002 2h1a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
      <path d="M18 10h-1a2 2 0 00-2 2v4a2 2 0 002 2h1a2 2 0 002-2v-4a2 2 0 00-2-2z" />
    </svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 7v2a2 2 0 002 2h2" />
      <path d="M7 17H5a2 2 0 01-2-2v-2" />
      <path d="M19 17h2a2 2 0 002-2v-2" />
    </svg>
  ),
  storage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="6" y="4" width="12" height="16" rx="2" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </svg>
  ),
  chair: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M6 10v10" />
      <path d="M18 10v10" />
      <path d="M6 14h12" />
      <path d="M6 10a4 4 0 014-4h4a4 4 0 014 4" />
    </svg>
  ),
};

export type IconType = keyof typeof CategoryIcons;
