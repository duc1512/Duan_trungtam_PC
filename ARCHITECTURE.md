# Feature-Based Architecture

## 📁 Project Structure

```
final_exam/
├── app/                          # Next.js App Router (routes only)
│   ├── (auth)/                   # Auth route group
│   ├── (main)/                   # Main route group
│   │   ├── layout.tsx           # Uses @/components/common, @/features/cart, @/features/favorites
│   │   ├── page.tsx             # Uses @/features/home
│   │   └── build-pc/page.tsx    # Uses @/features/pc-builder
│   ├── admin/                    # Admin routes
│   └── layout.tsx               # Root layout
│
├── features/                     # Feature-Based Architecture ⭐
│   ├── pc-builder/              # PC Builder Feature (hoàn thành)
│   │   ├── components/
│   │   ├── hooks/               # 7 hooks (tách từ 291 lines)
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   ├── data/
│   │   └── index.ts             # Barrel export
│   ├── home/                    # Home Feature (hoàn thành)
│   │   ├── components/
│   │   └── index.ts
│   ├── cart/                    # Cart Feature (hoàn thành)
│   │   └── hooks/
│   ├── auth/                    # Auth Feature (hoàn thành)
│   │   ├── components/          # LoginForm, RegisterForm
│   │   └── hooks/
│   ├── favorites/               # Favorites Feature (hoàn thành)
│   │   └── hooks/
│   └── products/                # Products Feature (hoàn thành)
│       ├── components/
│       ├── hooks/
│       └── types/
│
├── components/                   # Shared Components
│   ├── common/                  # Layout components (hoàn thành)
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   ├── SearchBar.tsx
│   │   └── index.ts
│   └── ui/                      # UI Primitives (chưa làm)
│
├── hooks/                        # Global Hooks (giữ nguyên)
│   ├── useCountdown.ts
│   └── useAdmin.tsx
│
├── services/                     # API Layer (giữ nguyên)
├── data/                         # Products data (giữ nguyên)
└── types/                        # Global types (giữ nguyên)
```

## 🔄 Import Patterns

### Old Pattern (Before)
```typescript
import { useBuildSummary } from '@/hooks/usePCBuilder';
import BuilderSlot from '@/app/components/PCBuilder/BuilderSlot';
import { useCart } from '../../hooks/useCart';
```

### New Pattern (After)
```typescript
// From features
import { BuilderSlot, useBuildSummary } from '@/features/pc-builder';
import { BannerSection } from '@/features/home';
import { useCart } from '@/features/cart';
import { useAuth } from '@/features/auth';

// From common components
import { Header, Footer } from '@/components/common';
```

## ✅ Completed Refactoring

### 1. PC Builder Feature
- **291 lines** `usePCBuilder.tsx` → **6 hooks nhỏ gọn**:
  - `useComponentSelection.ts` (35 lines)
  - `useProductFilter.ts` (75 lines)
  - `useCompatibility.ts` (40 lines)
  - `useBuildSummary.ts` (35 lines)
  - `useSavedBuilds.ts` (15 lines)
  - `useExportBuild.ts` (30 lines)
  - `useProductModal.ts` (trong index.ts)

- Components, store, services, types, data đều trong `features/pc-builder/`
- Barrel export qua `features/pc-builder/index.ts`

### 2. Home Feature
- Tất cả home components chuyển sang `features/home/components/`
- Barrel export qua `features/home/index.ts`

### 3. Common Components
- Header, Footer, Navigation, SearchBar → `components/common/`
- Cập nhật imports để dùng `@/features/auth` và `@/features/cart`

### 4. Cart, Auth, Favorites, Products Features
- Mỗi feature có folder riêng với hooks/
- Barrel export để dùng từ `@/features/[name]`

### 5. UI Primitives
- Button, Card, Input, Badge components trong `components/ui/`
- Reusable cho toàn bộ app

### 6. Cleanup
- ✅ Đã xóa `hooks/usePCBuilder.tsx` (291 lines tách thành 6 hooks)
- ✅ Đã xóa `app/components/PCBuilder/`
- ✅ Đã xóa `app/components/home/`
- ✅ Đã xóa `app/components/layout/`
- ✅ Đã xóa `store/pcBuilderStore.ts` (giữ trong features/pc-builder/store)
- ✅ Đã xóa `services/compatibilityEngine.ts` (giữ trong features/pc-builder/services)
- ✅ Đã xóa `types/pc-builder.ts` (giữ trong features/pc-builder/types)
- ✅ Đã xóa `data/pc-components.ts` (giữ trong features/pc-builder/data)

## 📦 Barrel Export Example

```typescript
// features/pc-builder/index.ts
export { default as BuilderSlot } from './components/BuilderSlot';
export { useComponentSelection, useBuildSummary } from './hooks';
export { usePCBuilderStore } from './store';
export type { ComponentCategory, PCComponent } from './types';
```

## 🎯 Benefits

1. **Feature Co-location**: Tất cả code liên quan ở cùng chỗ
2. **Clear Boundaries**: Không import từ feature khác
3. **Scalable**: Thêm feature = thêm folder
4. **Clean Imports**: `from '@/features/pc-builder'` thay vì nhiều path riêng lẻ
5. **Better DX**: Tìm kiếm và maintain dễ hơn

## 📝 Notes

- `@/hooks/` vẫn giữ các global hooks chưa refactor
- `@/data/` vẫn giữ products data
- `@/types/` vẫn giữ global types
