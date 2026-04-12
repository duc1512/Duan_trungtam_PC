/**
 * PC Builder Types - Production Grade
 * Comprehensive type definitions for PC building system
 */

// Component Categories
export type ComponentCategory = 
  | 'cpu' 
  | 'mainboard' 
  | 'ram' 
  | 'vga' 
  | 'ssd' 
  | 'psu' 
  | 'case' 
  | 'cooler'
  | 'fan';

// CPU Specifications
export interface CPUSpecs {
  socket: string;
  cores: number;
  threads: number;
  baseClock: number;
  boostClock: number;
  tdp: number;
  integratedGraphics: boolean;
  architecture: string;
  supportedMemory: string[];
  pcieVersion: string;
}

// Mainboard Specifications
export interface MainboardSpecs {
  socket: string;
  chipset: string;
  formFactor: string;
  memoryType: string;
  memorySlots: number;
  maxMemory: number;
  pcieSlots: {
    x16: number;
    x4: number;
    x1: number;
  };
  m2Slots: number;
  sataPorts: number;
  wifi: boolean;
  bluetooth: boolean;
  usbPorts: {
    usb2: number;
    usb3: number;
    usbC: number;
  };
}

// RAM Specifications
export interface RAMSpecs {
  type: string;
  capacity: number;
  sticks: number;
  speed: number;
  casLatency: number;
  voltage: number;
  rgb: boolean;
  height: number;
}

// GPU Specifications
export interface GPUSpecs {
  chipset: string;
  memory: number;
  memoryType: string;
  tdp: number;
  length: number;
  slots: number;
  powerConnectors: string[];
  rayTracing: boolean;
  dlss: boolean;
  ports: {
    hdmi: number;
    displayPort: number;
  };
}

// SSD Specifications
export interface SSDSpecs {
  interface: string;
  formFactor: string;
  capacity: number;
  readSpeed: number;
  writeSpeed: number;
  tbw: number;
  nandType: string;
  hasCache: boolean;
}

// PSU Specifications
export interface PSUSpecs {
  wattage: number;
  efficiency: string;
  modular: string;
  formFactor: string;
  pciExpressConnectors: {
    sixPin: number;
    eightPin: number;
    twelveVHPWR: number;
  };
  fanSize: number;
  zeroRpmMode: boolean;
}

// Case Specifications
export interface CaseSpecs {
  formFactor: string;
  motherboardSupport: string[];
  maxGpuLength: number;
  maxCpuCoolerHeight: number;
  maxPsuLength: number;
  driveBays: {
    threePointFive: number;
    twoPointFive: number;
  };
  expansionSlots: number;
  frontPanelPorts: {
    usb2: number;
    usb3: number;
    usbC: number;
    audio: boolean;
  };
  radiatorSupport: string[];
  fanMounts: number;
  temperedGlass: boolean;
  rgb: boolean;
}

// Cooler Specifications
export interface CoolerSpecs {
  type: string;
  tdp: number;
  socketSupport: string[];
  fanSize: number;
  fanCount: number;
  radiatorSize?: string;
  height?: number;
  rgb: boolean;
}

// Base Product Interface
export interface BaseProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: ComponentCategory;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  warranty: string;
}

// Component Product Types
export interface CPUProduct extends BaseProduct {
  category: 'cpu';
  specs: CPUSpecs;
}

export interface MainboardProduct extends BaseProduct {
  category: 'mainboard';
  specs: MainboardSpecs;
}

export interface RAMProduct extends BaseProduct {
  category: 'ram';
  specs: RAMSpecs;
}

export interface GPUProduct extends BaseProduct {
  category: 'vga';
  specs: GPUSpecs;
}

export interface SSDProduct extends BaseProduct {
  category: 'ssd';
  specs: SSDSpecs;
}

export interface PSUProduct extends BaseProduct {
  category: 'psu';
  specs: PSUSpecs;
}

export interface CaseProduct extends BaseProduct {
  category: 'case';
  specs: CaseSpecs;
}

export interface CoolerProduct extends BaseProduct {
  category: 'cooler';
  specs: CoolerSpecs;
}

// Union Type for all products
export type PCComponent = 
  | CPUProduct 
  | MainboardProduct 
  | RAMProduct 
  | GPUProduct 
  | SSDProduct 
  | PSUProduct 
  | CaseProduct
  | CoolerProduct;

// Selected Parts Map
export type SelectedParts = Partial<Record<ComponentCategory, PCComponent>>;

// Compatibility Rule
export interface CompatibilityRule {
  type: 'error' | 'warning' | 'info';
  category: ComponentCategory;
  message: string;
  affectedCategories: ComponentCategory[];
  severity: 'critical' | 'high' | 'medium' | 'low';
}

// Compatibility Check Result
export interface CompatibilityResult {
  isCompatible: boolean;
  rules: CompatibilityRule[];
  score: number;
}

// Power Estimation
export interface PowerEstimation {
  cpu: number;
  gpu: number;
  ram: number;
  ssd: number;
  mainboard: number;
  cooler: number;
  fans: number;
  total: number;
  recommendedPsu: number;
  headroom: number;
}

// Build Configuration
export interface BuildConfig {
  id: string;
  name: string;
  parts: SelectedParts;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  compatibility: CompatibilityResult;
  power: PowerEstimation;
  performanceTier: 'entry' | 'mid' | 'high' | 'enthusiast';
  useCase: string[];
}

// Category Configuration
export interface CategoryConfig {
  id: ComponentCategory;
  name: string;
  nameEn: string;
  required: boolean;
  icon: string;
  description: string;
  order: number;
}

// Bottleneck Analysis
export interface BottleneckAnalysis {
  hasBottleneck: boolean;
  bottleneckComponent?: ComponentCategory;
  bottleneckDescription?: string;
  balanceScore: number;
  recommendations: string[];
}

// Filter Options
export interface ProductFilter {
  category: ComponentCategory;
  brand?: string[];
  priceMin?: number;
  priceMax?: number;
  specs?: Partial<Record<string, string | number | boolean | string[]>>;
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'popular';
}
