/**
 * PC Builder Hooks - Barrel Export
 */

export { useComponentSelection } from './useComponentSelection';
export { useProductFilter } from './useProductFilter';
export { useCompatibility } from './useCompatibility';
export { useBuildSummary } from './useBuildSummary';
export { useSavedBuilds } from './useSavedBuilds';
export { useExportBuild } from './useExportBuild';

// Re-export from store for convenience
export { usePCBuilderStore } from '../store';

// Simple hook for modal state
import { useCallback } from 'react';
import { usePCBuilderStore } from '../store';
import type { ComponentCategory } from '../types';

export function useProductModal() {
  const store = usePCBuilderStore();
  const { openModal, closeModal, isModalOpen, activeCategory } = store;

  const handleOpen = useCallback((category: ComponentCategory) => {
    openModal(category);
  }, [openModal]);

  const handleClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  return {
    isOpen: isModalOpen,
    activeCategory,
    openModal: handleOpen,
    closeModal: handleClose,
  };
}
