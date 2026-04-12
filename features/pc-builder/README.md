# PC Builder Feature

A comprehensive PC building module with compatibility checking, component selection, and build management.

## Structure

```
pc-builder/
├── components/          # UI Components
│   ├── BuilderSlot.tsx        # Component slot UI
│   ├── ProductModal.tsx       # Product selection modal
│   ├── CompatibilityWarnings.tsx  # Compatibility display
│   └── SummaryPanel.tsx       # Build summary sidebar
├── hooks/              # React Hooks (split from 291 lines)
│   ├── useComponentSelection.ts   # Selection logic
│   ├── useProductFilter.ts        # Filter & search
│   ├── useCompatibility.ts        # Compatibility check
│   ├── useBuildSummary.ts         # Build totals
│   ├── useSavedBuilds.ts          # Saved builds
│   ├── useExportBuild.ts          # Export/share
│   └── useProductModal.ts         # Modal state (in index.ts)
├── services/           # Business Logic
│   └── compatibilityEngine.ts     # Compatibility checking
├── store/              # State Management
│   └── pcBuilderStore.ts          # Zustand store
├── types/              # TypeScript Types
│   └── index.ts
├── data/               # Mock Data
│   ├── mockComponents.ts
│   └── index.ts
└── index.ts            # Main barrel export
```

## Usage

```tsx
import {
  BuilderSlot,
  ProductModal,
  useComponentSelection,
  useBuildSummary,
} from '@/features/pc-builder';
```

## Key Features

- **Component Selection**: Select PC components by category
- **Compatibility Engine**: Real-time compatibility checking
- **Power Calculator**: Power consumption estimation
- **Saved Builds**: Save and load build configurations
- **Export**: JSON export and shareable links
