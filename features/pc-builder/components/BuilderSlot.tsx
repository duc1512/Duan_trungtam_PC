'use client';

import { memo } from 'react';
import Image from 'next/image';
import { useComponentSelection } from '../hooks';
import { usePCBuilderStore } from '../store';
import { categoryConfigs } from '../data';
import type { ComponentCategory, PCComponent } from '../types';

interface BuilderSlotProps {
  category: ComponentCategory;
  index: number;
}

// Format price to VND
const formatPrice = (price: number) => 
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

// Category icons SVG
const categoryIcons: Record<ComponentCategory, React.ReactNode> = {
  cpu: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  mainboard: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 7h4v4H7zM15 7h2v2h-2zM15 11h2v2h-2zM7 15h10v2H7z" />
    </svg>
  ),
  ram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect width="18" height="8" x="3" y="8" rx="2" />
      <line x1="7" x2="7" y1="12" y2="16" />
      <line x1="11" x2="11" y1="12" y2="16" />
      <line x1="15" x2="15" y1="12" y2="16" />
    </svg>
  ),
  vga: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <path d="M6 18v4h12v-4M9 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM15 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </svg>
  ),
  ssd: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="9" x2="15" y1="6" y2="6" />
      <line x1="9" x2="15" y1="18" y2="18" />
      <path d="M12 10v4" />
    </svg>
  ),
  psu: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 2v8h2V2h-2zM4.9 5.3L6.3 6.7M19.1 5.3l-1.4 1.4M2 12h8v2H2v-2zm12 0h8v2h-8v-2zm-9.1 6.7l1.4-1.4M19.1 18.7l-1.4-1.4M11 20v2h2v-2h-2z" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  case: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect width="14" height="20" x="5" y="2" rx="2" />
      <path d="M9 6h6M12 10v4M9 18h6" />
    </svg>
  ),
  cooler: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v16M4 12h16" />
      <path d="M6 6l12 12M6 18L18 6" />
    </svg>
  ),
  fan: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v7M12 15v7M2 12h7M15 12h7" />
      <path d="M4.9 4.9l4.95 4.95M14.15 14.15l4.95 4.95M4.9 19.1l4.95-4.95M14.15 9.05l4.95-4.95" />
    </svg>
  ),
};

const BuilderSlot = memo(({ category, index }: BuilderSlotProps) => {
  const { getSelectedPart, handleRemove } = useComponentSelection();
  const { openModal } = usePCBuilderStore();
  const component = getSelectedPart(category);
  const config = categoryConfigs.find((c) => c.id === category);

  if (!config) return null;

  const handleClick = () => {
    if (!component) {
      openModal(category);
    }
  };

  const handleChangeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal(category);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleRemove(category);
  };

  // Get spec badges based on component type
  const getSpecBadges = (comp: PCComponent): string[] => {
    const badges: string[] = [];
    
    switch (comp.category) {
      case 'cpu':
        badges.push(`${comp.specs.cores}C/${comp.specs.threads}T`);
        badges.push(comp.specs.socket);
        break;
      case 'mainboard':
        badges.push(comp.specs.chipset);
        badges.push(comp.specs.formFactor);
        badges.push(comp.specs.memoryType);
        break;
      case 'ram':
        badges.push(`${comp.specs.capacity * comp.specs.sticks}GB`);
        badges.push(`${comp.specs.speed}MHz`);
        badges.push(comp.specs.type);
        break;
      case 'vga':
        badges.push(comp.specs.chipset);
        badges.push(`${comp.specs.memory}GB ${comp.specs.memoryType}`);
        break;
      case 'ssd':
        badges.push(`${comp.specs.capacity >= 1000 ? comp.specs.capacity / 1000 + 'TB' : comp.specs.capacity + 'GB'}`);
        badges.push(comp.specs.interface);
        break;
      case 'psu':
        badges.push(`${comp.specs.wattage}W`);
        badges.push(comp.specs.efficiency);
        break;
      case 'case':
        badges.push(comp.specs.formFactor);
        if (comp.specs.temperedGlass) badges.push('TG');
        break;
      case 'cooler':
        badges.push(comp.specs.type);
        if (comp.specs.type === 'AIO' && comp.specs.radiatorSize) {
          badges.push(comp.specs.radiatorSize);
        }
        break;
    }
    
    return badges.slice(0, 3); // Max 3 badges
  };

  return (
    <div 
      className="relative group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {component ? (
        // Selected Component State
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-300">
          {/* Product Image */}
          <div className="w-full sm:w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center p-2 border border-gray-100 shrink-0">
            <Image
              src={component.image || '/placeholder-product.png'}
              alt={component.name}
              width={96}
              height={96}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {config.name}
              </span>
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 leading-tight mb-2 line-clamp-2">
              {component.name}
            </h3>
            
            {/* Spec Badges */}
            <div className="flex flex-wrap gap-1.5">
              {getSpecBadges(component).map((spec, idx) => (
                <span 
                  key={idx} 
                  className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[11px] font-medium border border-gray-200"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Price & Actions */}
          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0 gap-3">
            <div className="text-lg font-black text-[#e30019]">
              {formatPrice(component.price)}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleChangeClick}
                className="p-2 bg-gray-50 hover:bg-blue-50 text-gray-500 hover:text-blue-600 rounded-lg transition-colors border border-gray-200"
                title="Thay đổi"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button 
                onClick={handleRemoveClick}
                className="p-2 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-lg transition-colors border border-gray-200"
                title="Xóa"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Empty Slot State
        <div 
          onClick={handleClick}
          className="bg-white border-2 border-dashed border-gray-300 hover:border-[#e30019] hover:bg-red-50/30 rounded-2xl p-4 md:p-5 flex items-center justify-between cursor-pointer transition-all duration-300 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 text-gray-400 group-hover:bg-red-100 group-hover:text-[#e30019] rounded-xl flex items-center justify-center transition-colors">
              {categoryIcons[category]}
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800 group-hover:text-[#e30019] transition-colors flex items-center gap-2">
                {config.name}
                {config.required && (
                  <span className="text-[10px] text-[#e30019] bg-red-50 px-1.5 py-0.5 rounded font-bold">
                    BẮT BUỘC
                  </span>
                )}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{config.description}</p>
            </div>
          </div>
          <button className="bg-white border border-gray-200 shadow-sm group-hover:border-red-300 group-hover:bg-[#e30019] group-hover:text-white text-gray-700 px-5 py-2 rounded-xl text-sm font-bold transition-all">
            + Chọn
          </button>
        </div>
      )}
    </div>
  );
});

BuilderSlot.displayName = 'BuilderSlot';

export default BuilderSlot;
