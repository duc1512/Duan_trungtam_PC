'use client';

import { Suspense } from 'react';
import {
  BuilderSlot,
  ProductModal,
  CompatibilityWarnings,
  SummaryPanel,
  useBuildSummary,
  useCompatibility,
} from '@/features/pc-builder';
import type { ComponentCategory } from '@/features/pc-builder';

// Format price to VND
const formatPrice = (price: number) => 
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

function PCBuilderContent() {
  const { 
    totalPrice, 
    selectedCount, 
    completedCategories,
    totalCategories,
    isComplete 
  } = useBuildSummary();
  const { compatibility, power } = useCompatibility();

  // Required categories in order
  const categoryOrder: ComponentCategory[] = [
    'cpu',
    'mainboard', 
    'ram',
    'vga',
    'ssd',
    'psu',
    'case',
    'cooler'
  ];

  return (
    <div className="bg-[#f4f6f8] min-h-screen py-10 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-[#e30019] transition-colors">Trang chủ</a>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium">Xây dựng PC</span>
        </nav>
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              PC Builder Pro <span className="text-[#e30019]">⚡</span>
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Xây dựng cỗ máy trong mơ với kiểm tra tương thích thông minh
            </p>
          </div>
          
          {/* Status Indicator */}
          {selectedCount > 0 && (
            <div className={`px-5 py-3 rounded-xl flex items-center gap-3 w-full md:w-auto border ${
              compatibility.isCompatible 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 ${
                compatibility.isCompatible ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {compatibility.isCompatible ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div>
                <p className={`font-bold leading-tight ${
                  compatibility.isCompatible ? 'text-green-800' : 'text-red-800'
                }`}>
                  {compatibility.isCompatible 
                    ? 'Tương thích tốt!' 
                    : 'Có lỗi tương thích'
                  }
                </p>
                <p className={`text-xs mt-0.5 ${
                  compatibility.isCompatible ? 'text-green-600' : 'text-red-600'
                }`}>
                  {completedCategories}/{totalCategories} linh kiện • {compatibility.score}% tương thích
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Builder Slots */}
          <div className="w-full lg:w-2/3 space-y-4">
            {categoryOrder.map((categoryId, index) => (
              <BuilderSlot 
                key={categoryId} 
                category={categoryId} 
                index={index}
              />
            ))}

            {/* Compatibility Warnings Panel */}
            <div className="mt-6">
              <CompatibilityWarnings />
            </div>
          </div>

          {/* Right Column: Sticky Summary Panel */}
          <div className="w-full lg:w-1/3">
            <SummaryPanel />
          </div>

        </div>

        {/* Product Selection Modal */}
        <ProductModal />
      </div>
    </div>
  );
}

// Loading fallback component
function PCBuilderLoading() {
  return (
    <div className="bg-[#f4f6f8] min-h-screen py-10 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="animate-pulse">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 h-24" />
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3 space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 h-24" />
              ))}
            </div>
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-96" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main export with Suspense wrapper
export default function PremiumPCBuilder() {
  return (
    <Suspense fallback={<PCBuilderLoading />}>
      <PCBuilderContent />
    </Suspense>
  );
}
