/**
 * PC Builder Store - Zustand State Management
 * Production grade state management for PC Builder
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ComponentCategory,
  PCComponent,
  SelectedParts,
  CompatibilityResult,
  PowerEstimation,
  BuildConfig,
} from '../types';
import {
  checkCompatibility,
  calculatePower,
} from '../services';

// Store State Interface
export interface PCBuilderState {
  // Selected Parts
  selectedParts: SelectedParts;
  
  // UI State
  activeCategory: ComponentCategory | null;
  isModalOpen: boolean;
  activeTab: 'builder' | 'suggest' | 'budget' | 'saved';
  searchQuery: string;
  filters: {
    brand: string[];
    priceMin: number;
    priceMax: number;
  };
  
  // Compatibility & Analysis
  compatibility: CompatibilityResult;
  power: PowerEstimation;
  
  // Saved Builds
  savedBuilds: BuildConfig[];
  currentBuildId: string | null;
  
  // Actions
  selectPart: (category: ComponentCategory, component: PCComponent) => void;
  removePart: (category: ComponentCategory) => void;
  clearBuild: () => void;
  openModal: (category: ComponentCategory) => void;
  closeModal: () => void;
  setActiveTab: (tab: 'builder' | 'suggest' | 'budget' | 'saved') => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<PCBuilderState['filters']>) => void;
  saveBuild: (name: string) => void;
  loadBuild: (buildId: string) => void;
  deleteBuild: (buildId: string) => void;
  autoBuild: (budget: number, useCase: string) => void;
  
  // Getters
  getTotalPrice: () => number;
  getSelectedCount: () => number;
  getSelectedPart: (category: ComponentCategory) => PCComponent | undefined;
  getMissingRequired: () => ComponentCategory[];
  isComplete: () => boolean;
}

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Initial empty compatibility result
const initialCompatibility: CompatibilityResult = {
  isCompatible: true,
  rules: [],
  score: 100,
};

// Initial empty power estimation
const initialPower: PowerEstimation = {
  cpu: 0,
  gpu: 0,
  ram: 0,
  ssd: 0,
  mainboard: 0,
  cooler: 0,
  fans: 0,
  total: 0,
  recommendedPsu: 0,
  headroom: 0,
};

// Create the store with persistence
export const usePCBuilderStore = create<PCBuilderState>()(
  persist(
    (set, get) => ({
      // Initial State
      selectedParts: {},
      activeCategory: null,
      isModalOpen: false,
      activeTab: 'builder',
      searchQuery: '',
      filters: {
        brand: [],
        priceMin: 0,
        priceMax: 100000000,
      },
      compatibility: initialCompatibility,
      power: initialPower,
      savedBuilds: [],
      currentBuildId: null,

      // Actions
      selectPart: (category, component) => {
        set((state) => {
          const newParts = { ...state.selectedParts, [category]: component };
          const compatibility = checkCompatibility(newParts);
          const power = calculatePower(newParts);
          
          return {
            selectedParts: newParts,
            compatibility,
            power,
            isModalOpen: false,
            activeCategory: null,
          };
        });
      },

      removePart: (category) => {
        set((state) => {
          const newParts = { ...state.selectedParts };
          delete newParts[category];
          
          const compatibility = checkCompatibility(newParts);
          const power = calculatePower(newParts);
          
          return {
            selectedParts: newParts,
            compatibility,
            power,
          };
        });
      },

      clearBuild: () => {
        set({
          selectedParts: {},
          compatibility: initialCompatibility,
          power: initialPower,
          currentBuildId: null,
        });
      },

      openModal: (category) => {
        set({
          isModalOpen: true,
          activeCategory: category,
          searchQuery: '',
          filters: {
            brand: [],
            priceMin: 0,
            priceMax: 100000000,
          },
        });
      },

      closeModal: () => {
        set({
          isModalOpen: false,
          activeCategory: null,
        });
      },

      setActiveTab: (tab) => set({ activeTab: tab }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setFilters: (filters) => {
        set((state) => ({
          filters: { ...state.filters, ...filters },
        }));
      },

      saveBuild: (name) => {
        const state = get();
        const build: BuildConfig = {
          id: generateId(),
          name,
          parts: state.selectedParts,
          totalPrice: state.getTotalPrice(),
          createdAt: new Date(),
          updatedAt: new Date(),
          compatibility: state.compatibility,
          power: state.power,
          performanceTier: 'mid',
          useCase: ['gaming'],
        };
        
        set((state) => ({
          savedBuilds: [build, ...state.savedBuilds],
          currentBuildId: build.id,
        }));
      },

      loadBuild: (buildId) => {
        const state = get();
        const build = state.savedBuilds.find((b) => b.id === buildId);
        
        if (build) {
          set({
            selectedParts: build.parts,
            compatibility: build.compatibility,
            power: build.power,
            currentBuildId: build.id,
          });
        }
      },

      deleteBuild: (buildId) => {
        set((state) => ({
          savedBuilds: state.savedBuilds.filter((b) => b.id !== buildId),
          currentBuildId: state.currentBuildId === buildId ? null : state.currentBuildId,
        }));
      },

      autoBuild: (budget, useCase) => {
        console.log('Auto building with budget:', budget, 'useCase:', useCase);
      },

      // Getters
      getTotalPrice: () => {
        const { selectedParts } = get();
        return Object.values(selectedParts).reduce(
          (sum, part) => sum + (part?.price || 0),
          0
        );
      },

      getSelectedCount: () => {
        return Object.keys(get().selectedParts).length;
      },

      getSelectedPart: (category) => {
        return get().selectedParts[category];
      },

      getMissingRequired: () => {
        const { selectedParts } = get();
        const required: ComponentCategory[] = ['cpu', 'mainboard', 'ram', 'ssd', 'psu', 'case'];
        return required.filter((cat) => !selectedParts[cat]);
      },

      isComplete: () => {
        return get().getMissingRequired().length === 0;
      },
    }),
    {
      name: 'pc-builder-storage',
      partialize: (state) => ({
        selectedParts: state.selectedParts,
        savedBuilds: state.savedBuilds,
      }),
    }
  )
);

// Selector hooks for better performance
export const useSelectedParts = () => usePCBuilderStore((state) => state.selectedParts);
export const useCompatibilityStore = () => usePCBuilderStore((state) => state.compatibility);
export const usePowerStore = () => usePCBuilderStore((state) => state.power);
export const useTotalPrice = () => usePCBuilderStore((state) => state.getTotalPrice());
export const useSelectedCount = () => usePCBuilderStore((state) => state.getSelectedCount());
export const useIsComplete = () => usePCBuilderStore((state) => state.isComplete());
export const useMissingRequired = () => usePCBuilderStore((state) => state.getMissingRequired());
