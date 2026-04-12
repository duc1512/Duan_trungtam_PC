/**
 * useBuildSummary Hook
 * Calculates build totals and progress
 */

import { useMemo } from 'react';
import { usePCBuilderStore } from '../store';
import { categoryConfigs } from '../data';
import type { ComponentCategory, PCComponent } from '../types';

export function useBuildSummary() {
  const store = usePCBuilderStore();
  const { selectedParts, getTotalPrice, getSelectedCount, isComplete } = store;

  const categoryStatus = useMemo(() => {
    return categoryConfigs.map((cat) => ({
      ...cat,
      selected: !!(selectedParts as Partial<Record<ComponentCategory, PCComponent>>)[cat.id],
      component: (selectedParts as Partial<Record<ComponentCategory, PCComponent>>)[cat.id],
    }));
  }, [selectedParts]);

  const completedCategories = useMemo(() => {
    return categoryStatus.filter((c) => c.selected).length;
  }, [categoryStatus]);

  const requiredCategories = useMemo(() => {
    return categoryStatus.filter((c) => c.required && !c.selected);
  }, [categoryStatus]);

  return {
    totalPrice: getTotalPrice(),
    selectedCount: getSelectedCount(),
    completedCategories,
    totalCategories: categoryConfigs.length,
    categoryStatus,
    requiredCategories,
    isComplete: isComplete(),
    missingRequired: store.getMissingRequired(),
  };
}
