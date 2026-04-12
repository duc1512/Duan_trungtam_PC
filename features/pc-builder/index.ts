/**
 * PC Builder Feature - Main Barrel Export
 * 
 * This file exports everything from the PC Builder feature.
 * Usage:
 *   import { BuilderSlot, ProductModal, useComponentSelection } from '@/features/pc-builder';
 */

// Components (default exports)
export { default as BuilderSlot } from './components/BuilderSlot';
export { default as ProductModal } from './components/ProductModal';
export { default as CompatibilityWarnings } from './components/CompatibilityWarnings';
export { default as SummaryPanel } from './components/SummaryPanel';

// Hooks
export {
  useComponentSelection,
  useProductFilter,
  useCompatibility,
  useBuildSummary,
  useSavedBuilds,
  useExportBuild,
} from './hooks';

// Store
export { usePCBuilderStore } from './store';

// Services
export {
  checkCompatibility,
  calculatePower,
  detectBottleneck,
  getSuggestions,
  autoBuildPC,
} from './services';

// Types
export type {
  ComponentCategory,
  PCComponent,
  SelectedParts,
  CompatibilityResult,
  CompatibilityRule,
  PowerEstimation,
  BuildConfig,
  CategoryConfig,
  CPUProduct,
  MainboardProduct,
  RAMProduct,
  GPUProduct,
  SSDProduct,
  PSUProduct,
  CaseProduct,
  CoolerProduct,
  CPUSpecs,
  MainboardSpecs,
  RAMSpecs,
  GPUSpecs,
  SSDSpecs,
  PSUSpecs,
  CaseSpecs,
  CoolerSpecs,
} from './types';

// Data
export {
  categoryConfigs,
  allComponents,
  budgetPresets,
  performanceTiers,
  useCases,
} from './data';
