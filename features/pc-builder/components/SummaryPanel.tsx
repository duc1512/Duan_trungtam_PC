'use client';

import { useBuildSummary, useExportBuild, useCompatibility } from '../hooks';
import { usePCBuilderStore } from '../store';
import { useState } from 'react';

// Format price to VND
const formatPrice = (price: number) => 
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

export default function SummaryPanel() {
  const { 
    totalPrice, 
    selectedCount, 
    completedCategories,
    totalCategories,
    missingRequired,
    isComplete 
  } = useBuildSummary();
  const { power, compatibility } = useCompatibility();
  const { exportToJSON, shareBuild } = useExportBuild();
  const { clearBuild, saveBuild } = usePCBuilderStore();
  
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [buildName, setBuildName] = useState('');
  const [showShareToast, setShowShareToast] = useState(false);

  const handleSave = () => {
    if (buildName.trim()) {
      saveBuild(buildName.trim());
      setShowSaveModal(false);
      setBuildName('');
    }
  };

  const handleShare = () => {
    shareBuild();
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 sticky top-8 p-6 lg:p-8 overflow-hidden relative">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#e30019]/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />

        <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2 relative z-10">
          Tóm Tắt Cấu Hình
        </h2>

        {/* Progress */}
        <div className="mb-6 relative z-10">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-semibold text-gray-600">Tiến độ</span>
            <span className="font-bold text-gray-900">{completedCategories}/{totalCategories}</span>
          </div>
          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
              style={{ width: `${(completedCategories / totalCategories) * 100}%` }}
            />
          </div>
          {missingRequired.length > 0 && (
            <p className="text-xs text-amber-600 mt-2">
              Cần thêm: {missingRequired.join(', ')}
            </p>
          )}
        </div>

        {/* Power Estimation */}
        {power.total > 0 && (
          <div className="mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100 relative z-10">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-semibold text-gray-600">Công suất tiêu thụ</span>
              <span className="font-black text-gray-900">{power.total}W</span>
            </div>
            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  power.total > 500 ? 'bg-red-500' : 'bg-gradient-to-r from-green-400 to-green-500'
                }`}
                style={{ width: `${Math.min((power.total / 1000) * 100, 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              Gợi ý nguồn tối thiểu: {power.recommendedPsu}W
            </p>
          </div>
        )}

        {/* Compatibility Score */}
        {compatibility.rules.length > 0 && (
          <div className="mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-600">Độ tương thích</span>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  compatibility.score >= 90 ? 'bg-green-500' : 
                  compatibility.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <span className={`font-bold ${
                  compatibility.score >= 90 ? 'text-green-600' : 
                  compatibility.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {compatibility.score}%
                </span>
              </div>
            </div>
            {compatibility.rules.some(r => r.type === 'error') && (
              <p className="text-xs text-red-600 mt-2">
                ⚠️ Có lỗi tương thích cần xử lý
              </p>
            )}
          </div>
        )}

        {/* Price Calculation */}
        <div className="space-y-3 mb-6 relative z-10">
          <div className="flex justify-between text-gray-500 text-sm">
            <span>Tạm tính ({selectedCount} món):</span>
            <span className="font-medium text-gray-900">{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-gray-500 text-sm">
            <span>Phí lắp ráp:</span>
            <span className="font-medium text-green-600">Miễn phí</span>
          </div>
          <div className="border-t border-gray-100 pt-4 mt-2 flex justify-between items-end">
            <span className="text-base font-bold text-gray-900">Tổng cộng:</span>
            <span className="text-3xl font-black text-[#e30019] tracking-tight leading-none">
              {totalPrice === 0 ? "0đ" : formatPrice(totalPrice)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 relative z-10">
          <button 
            disabled={!isComplete || compatibility.rules.some(r => r.type === 'error')}
            className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-md ${
              isComplete && !compatibility.rules.some(r => r.type === 'error')
                ? "bg-gradient-to-r from-[#e30019] to-red-500 hover:from-red-700 hover:to-red-600 text-white hover:shadow-red-500/30 -translate-y-0.5" 
                : "bg-gray-100 text-gray-400 shadow-none cursor-not-allowed"
            }`}
          >
            {isComplete 
              ? compatibility.rules.some(r => r.type === 'error')
                ? "Sửa lỗi tương thích trước"
                : "Thêm vào giỏ hàng"
              : `Cần thêm ${missingRequired.length} linh kiện`
            }
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setShowSaveModal(true)}
              disabled={selectedCount === 0}
              className="bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Lưu cấu hình
            </button>
            <button 
              onClick={handleShare}
              disabled={selectedCount === 0}
              className="bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 text-gray-700 font-semibold py-3 rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Chia sẻ
            </button>
          </div>
          
          {selectedCount > 0 && (
            <button 
              onClick={clearBuild}
              className="w-full py-2 text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
            >
              Xóa toàn bộ
            </button>
          )}
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSaveModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Lưu cấu hình</h3>
            <input
              type="text"
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
              placeholder="Tên cấu hình (ví dụ: PC Gaming 20tr)"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e30019] focus:border-transparent mb-4"
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={!buildName.trim()}
                className="flex-1 py-3 bg-[#e30019] hover:bg-red-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg animate-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Đã sao chép link chia sẻ!</span>
          </div>
        </div>
      )}
    </>
  );
}
