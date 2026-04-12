/**
 * useCompatibility Hook
 * Checks component compatibility
 */

import type { CompatibilityRule, PSUProduct } from '../types';
import { useMemo } from 'react';
import { usePCBuilderStore } from '../store';

export function useCompatibility() {
  const store = usePCBuilderStore();
  const { compatibility, power, selectedParts } = store;

  const criticalErrors = useMemo(() => {
    return compatibility.rules.filter(
      (r: CompatibilityRule) => r.type === 'error' && r.severity === 'critical'
    );
  }, [compatibility.rules]);

  const warnings = useMemo(() => {
    return compatibility.rules.filter((r: CompatibilityRule) => r.type === 'warning');
  }, [compatibility.rules]);

  const suggestions = useMemo(() => {
    return compatibility.rules.filter((r: CompatibilityRule) => r.type === 'info');
  }, [compatibility.rules]);

  const psuAdequate = useMemo(() => {
    const psu = selectedParts.psu as PSUProduct | undefined;
    if (!psu || power.total === 0) return null;
    return {
      adequate: psu.specs.wattage >= power.recommendedPsu,
      headroom: psu.specs.wattage - power.total,
      percentage: (power.total / psu.specs.wattage) * 100,
    };
  }, [selectedParts.psu, power]);

  return {
    compatibility,
    power,
    criticalErrors,
    warnings,
    suggestions,
    psuAdequate,
    isCompatible: compatibility.isCompatible,
    score: compatibility.score,
  };
}
