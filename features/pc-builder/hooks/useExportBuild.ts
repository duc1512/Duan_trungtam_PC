/**
 * useExportBuild Hook
 * Exports and shares build configurations
 */

import { useCallback } from 'react';
import { usePCBuilderStore } from '../store';
import type { PCComponent } from '../types';

export function useExportBuild() {
  const store = usePCBuilderStore();
  const { selectedParts } = store;

  const exportToJSON = useCallback(() => {
    const build = {
      name: 'My PC Build',
      createdAt: new Date().toISOString(),
      components: Object.entries(selectedParts).map(([category, component]: [string, PCComponent | undefined]) => ({
        category,
        id: component?.id,
        name: component?.name,
        brand: component?.brand,
        price: component?.price,
      })),
      totalPrice: Object.values(selectedParts).reduce(
        (sum: number, p: PCComponent | undefined) => sum + (p?.price || 0),
        0
      ),
    };

    const blob = new Blob([JSON.stringify(build, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pc-build-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [selectedParts]);

  const shareBuild = useCallback(() => {
    const ids = Object.entries(selectedParts)
      .map(([cat, comp]: [string, PCComponent | undefined]) => `${cat}=${comp?.id}`)
      .join('&');
    const url = `${window.location.origin}/build-pc?${ids}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    
    return url;
  }, [selectedParts]);

  return {
    exportToJSON,
    shareBuild,
  };
}
