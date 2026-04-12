/**
 * useSavedBuilds Hook
 * Manages saved build configurations
 */

import { usePCBuilderStore } from '../store';

export function useSavedBuilds() {
  const store = usePCBuilderStore();
  const { savedBuilds, currentBuildId, saveBuild, loadBuild, deleteBuild } = store;

  return {
    builds: savedBuilds,
    currentBuildId,
    saveBuild,
    loadBuild,
    deleteBuild,
    currentBuild: savedBuilds.find((b: { id: string }) => b.id === currentBuildId),
  };
}
