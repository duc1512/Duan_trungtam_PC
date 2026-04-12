/**
 * useComponentSelection Hook
 * Manages component selection in PC Builder
 */

import { useCallback } from 'react';
import { usePCBuilderStore } from '../store';
import type { ComponentCategory, PCComponent } from '../types';

export function useComponentSelection() {
  const store = usePCBuilderStore();

  const handleSelect = useCallback((category: ComponentCategory, component: PCComponent) => {
    store.selectPart(category, component);
  }, [store]);

  const handleRemove = useCallback((category: ComponentCategory) => {
    store.removePart(category);
  }, [store]);

  const getSelectedPart = useCallback((category: ComponentCategory) => {
    return store.getSelectedPart(category);
  }, [store]);

  return {
    selectedParts: store.selectedParts,
    handleSelect,
    handleRemove,
    getSelectedPart,
    clearBuild: store.clearBuild,
  };
}
