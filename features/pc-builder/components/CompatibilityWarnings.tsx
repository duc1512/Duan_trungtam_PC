'use client';

import { useCompatibility } from '../hooks';
import type { CompatibilityRule } from '../types';

export default function CompatibilityWarnings() {
  const { compatibility, power, psuAdequate } = useCompatibility();
  const { rules, score, isCompatible } = compatibility;

  // Separate rules by type
  const errors = rules.filter((r) => r.type === 'error');
  const warnings = rules.filter((r) => r.type === 'warning');
  const infos = rules.filter((r) => r.type === 'info');

  if (rules.length === 0 && (!psuAdequate || psuAdequate.adequate)) {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* Score Banner */}
      <div className={`rounded-xl p-4 flex items-center gap-4 ${
        score >= 90 
          ? 'bg-green-50 border border-green-200' 
          : score >= 70 
            ? 'bg-yellow-50 border border-yellow-200'
            : 'bg-red-50 border border-red-200'
      }`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
          score >= 90 
            ? 'bg-green-500 text-white' 
            : score >= 70 
              ? 'bg-yellow-500 text-white'
              : 'bg-red-500 text-white'
        }`}>
          {score}
        </div>
        <div>
          <p className={`font-semibold ${
            score >= 90 
              ? 'text-green-900' 
              : score >= 70 
                ? 'text-yellow-900'
                : 'text-red-900'
          }`}>
            {score >= 90 
              ? 'Tương thích tốt!' 
              : score >= 70 
                ? 'Cần chú ý một số điểm'
                : 'Có lỗi tương thích nghiêm trọng'}
          </p>
          <p className={`text-sm ${
            score >= 90 
              ? 'text-green-700' 
              : score >= 70 
                ? 'text-yellow-700'
                : 'text-red-700'
          }`}>
            {rules.length} vấn đề cần xem xét
          </p>
        </div>
      </div>

      {/* Power Estimation */}
      {power.total > 0 && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Ước tính công suất
            </span>
            <span className="font-bold text-gray-900">
              {power.total}W
            </span>
          </div>
          
          {/* Power Breakdown */}
          <div className="space-y-1 mb-3">
            {power.cpu > 0 && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>CPU</span>
                <span>{power.cpu}W</span>
              </div>
            )}
            {power.gpu > 0 && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>GPU</span>
                <span>{power.gpu}W</span>
              </div>
            )}
            {power.ram > 0 && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>RAM</span>
                <span>{power.ram}W</span>
              </div>
            )}
            {power.ssd > 0 && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>SSD</span>
                <span>{power.ssd}W</span>
              </div>
            )}
          </div>

          {/* Power Bar */}
          {psuAdequate && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Mức sử dụng nguồn</span>
                <span className={psuAdequate.percentage > 80 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                  {Math.round(psuAdequate.percentage)}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    psuAdequate.percentage > 80 
                      ? 'bg-red-500' 
                      : psuAdequate.percentage > 60 
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(psuAdequate.percentage, 100)}%` }}
                />
              </div>
              {!psuAdequate.adequate && (
                <p className="text-xs text-red-600 mt-2">
                  ⚠️ Nguồn hiện tại không đủ công suất. Cần nguồn tối thiểu {power.recommendedPsu}W
                </p>
              )}
              {psuAdequate.adequate && psuAdequate.percentage > 80 && (
                <p className="text-xs text-yellow-600 mt-2">
                  ⚠️ Nguồn đang chạy gần giới hạn. Cân nhắc nâng cấp để an toàn hơn.
                </p>
              )}
            </div>
          )}

          {!psuAdequate && power.recommendedPsu > 0 && (
            <p className="text-sm text-blue-600 mt-2">
              💡 Gợi ý: Chọn nguồn có công suất tối thiểu {power.recommendedPsu}W
            </p>
          )}
        </div>
      )}

      {/* Error List */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-red-100 border-b border-red-200">
            <h4 className="font-semibold text-red-900 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Lỗi tương thích ({errors.length})
            </h4>
          </div>
          <div className="p-4 space-y-2">
            {errors.map((error, index) => (
              <RuleItem key={index} rule={error} />
            ))}
          </div>
        </div>
      )}

      {/* Warning List */}
      {warnings.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-yellow-100 border-b border-yellow-200">
            <h4 className="font-semibold text-yellow-900 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Cảnh báo ({warnings.length})
            </h4>
          </div>
          <div className="p-4 space-y-2">
            {warnings.map((warning, index) => (
              <RuleItem key={index} rule={warning} />
            ))}
          </div>
        </div>
      )}

      {/* Info List */}
      {infos.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-blue-100 border-b border-blue-200">
            <h4 className="font-semibold text-blue-900 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Thông tin ({infos.length})
            </h4>
          </div>
          <div className="p-4 space-y-2">
            {infos.map((info, index) => (
              <RuleItem key={index} rule={info} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Rule Item Component
function RuleItem({ rule }: { rule: CompatibilityRule }) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flex items-start gap-3 text-sm">
      <span className={`px-2 py-0.5 rounded text-xs font-medium shrink-0 ${getSeverityColor(rule.severity)}`}>
        {rule.severity === 'critical' ? 'Nghiêm trọng' : 
         rule.severity === 'high' ? 'Cao' :
         rule.severity === 'medium' ? 'Trung bình' : 'Thấp'}
      </span>
      <p className="text-gray-700">{rule.message}</p>
    </div>
  );
}
