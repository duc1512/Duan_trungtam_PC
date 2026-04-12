/**
 * Compatibility Engine
 * Production-grade compatibility checking for PC components
 */

import type {
  ComponentCategory,
  PCComponent,
  SelectedParts,
  CompatibilityResult,
  CompatibilityRule,
  PowerEstimation,
  BottleneckAnalysis,
  CPUProduct,
  MainboardProduct,
  RAMProduct,
  GPUProduct,
  SSDProduct,
  PSUProduct,
  CaseProduct,
  CoolerProduct,
} from '../types';

// Check compatibility between all selected parts
export function checkCompatibility(parts: SelectedParts): CompatibilityResult {
  const rules: CompatibilityRule[] = [];
  let score = 100;

  // CPU-Mainboard Socket Check
  const cpuMainboardRules = checkCPUMainboardCompatibility(parts);
  rules.push(...cpuMainboardRules);

  // RAM-Mainboard Compatibility
  const ramRules = checkRAMCompatibility(parts);
  rules.push(...ramRules);

  // PSU Power Check
  const psuRules = checkPSUCompatibility(parts);
  rules.push(...psuRules);

  // GPU-Case Size Check
  const gpuCaseRules = checkGPUCaseCompatibility(parts);
  rules.push(...gpuCaseRules);

  // Cooler-CPU Socket Check
  const coolerRules = checkCoolerCompatibility(parts);
  rules.push(...coolerRules);

  // Case-Mainboard Form Factor Check
  const caseMainboardRules = checkCaseMainboardCompatibility(parts);
  rules.push(...caseMainboardRules);

  // Calculate score based on severity
  rules.forEach((rule) => {
    switch (rule.severity) {
      case 'critical':
        score -= 30;
        break;
      case 'high':
        score -= 20;
        break;
      case 'medium':
        score -= 10;
        break;
      case 'low':
        score -= 5;
        break;
    }
  });

  // Has critical errors?
  const hasCriticalErrors = rules.some(
    (rule) => rule.type === 'error' && rule.severity === 'critical'
  );

  return {
    isCompatible: !hasCriticalErrors,
    rules: rules.sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    }),
    score: Math.max(0, Math.min(100, score)),
  };
}

// Check CPU and Mainboard socket compatibility
function checkCPUMainboardCompatibility(parts: SelectedParts): CompatibilityRule[] {
  const rules: CompatibilityRule[] = [];
  const cpu = parts.cpu as CPUProduct | undefined;
  const mainboard = parts.mainboard as MainboardProduct | undefined;

  if (cpu && mainboard) {
    if (cpu.specs.socket !== mainboard.specs.socket) {
      rules.push({
        type: 'error',
        category: 'cpu',
        message: `CPU ${cpu.specs.socket} không tương thích với socket ${mainboard.specs.socket} của mainboard`,
        affectedCategories: ['cpu', 'mainboard'],
        severity: 'critical',
      });
    }
  }

  return rules;
}

// Check RAM and Mainboard compatibility
function checkRAMCompatibility(parts: SelectedParts): CompatibilityRule[] {
  const rules: CompatibilityRule[] = [];
  const ram = parts.ram as RAMProduct | undefined;
  const mainboard = parts.mainboard as MainboardProduct | undefined;

  if (ram && mainboard) {
    // Memory type check
    if (ram.specs.type !== mainboard.specs.memoryType) {
      rules.push({
        type: 'error',
        category: 'ram',
        message: `RAM ${ram.specs.type} không tương thích với mainboard chỉ hỗ trợ ${mainboard.specs.memoryType}`,
        affectedCategories: ['ram', 'mainboard'],
        severity: 'critical',
      });
    }

    // Speed compatibility check (warning if RAM faster than board support)
    const maxSupportedSpeed = mainboard.specs.memoryType === 'DDR5' ? 7200 : 5333;
    if (ram.specs.speed > maxSupportedSpeed) {
      rules.push({
        type: 'warning',
        category: 'ram',
        message: `RAM ${ram.specs.speed}MHz có thể bị giới hạn xuống ${maxSupportedSpeed}MHz trên mainboard này`,
        affectedCategories: ['ram'],
        severity: 'medium',
      });
    }
  }

  return rules;
}

// Check PSU power compatibility
function checkPSUCompatibility(parts: SelectedParts): CompatibilityRule[] {
  const rules: CompatibilityRule[] = [];
  const psu = parts.psu as PSUProduct | undefined;
  
  if (!psu) return rules;

  const power = calculatePower(parts);
  const recommendedWattage = power.recommendedPsu;

  // Check if PSU has enough wattage
  if (psu.specs.wattage < recommendedWattage) {
    rules.push({
      type: 'error',
      category: 'psu',
      message: `Nguồn ${psu.specs.wattage}W không đủ công suất. Cần ít nhất ${recommendedWattage}W`,
      affectedCategories: ['psu'],
      severity: 'critical',
    });
  } else if (psu.specs.wattage < recommendedWattage + 100) {
    rules.push({
      type: 'warning',
      category: 'psu',
      message: `Nguồn ${psu.specs.wattage}W chỉ đủ vừa đủ. Khuyến nghị nguồn ${recommendedWattage + 100}W để an toàn`,
      affectedCategories: ['psu'],
      severity: 'medium',
    });
  }

  // Check GPU power connectors
  const gpu = parts.vga as GPUProduct | undefined;
  if (gpu && psu) {
    const gpuConnectors = gpu.specs.powerConnectors;
    const psuConnectors = psu.specs.pciExpressConnectors;

    // Check for 12VHPWR (RTX 40 series)
    if (gpuConnectors.includes('1x16pin') && psuConnectors.twelveVHPWR === 0) {
      rules.push({
        type: 'warning',
        category: 'vga',
        message: `GPU cần cáp 12VHPWR/16-pin. Nguồn này không có sẵn, cần adapter`,
        affectedCategories: ['vga', 'psu'],
        severity: 'medium',
      });
    }
  }

  return rules;
}

// Check GPU and Case size compatibility
function checkGPUCaseCompatibility(parts: SelectedParts): CompatibilityRule[] {
  const rules: CompatibilityRule[] = [];
  const gpu = parts.vga as GPUProduct | undefined;
  const pcCase = parts.case as CaseProduct | undefined;

  if (gpu && pcCase) {
    if (gpu.specs.length > pcCase.specs.maxGpuLength) {
      rules.push({
        type: 'error',
        category: 'vga',
        message: `Card đồ họa dài ${gpu.specs.length}mm vượt quá giới hạn ${pcCase.specs.maxGpuLength}mm của case`,
        affectedCategories: ['vga', 'case'],
        severity: 'critical',
      });
    } else if (gpu.specs.length > pcCase.specs.maxGpuLength - 20) {
      rules.push({
        type: 'warning',
        category: 'vga',
        message: `Card đồ họa dài ${gpu.specs.length}mm gần đạt giới hạn case (${pcCase.specs.maxGpuLength}mm). Kiểm tra khoảng trống cable`,
        affectedCategories: ['vga', 'case'],
        severity: 'low',
      });
    }

    // Check slot size
    if (gpu.specs.slots > pcCase.specs.expansionSlots) {
      rules.push({
        type: 'error',
        category: 'vga',
        message: `Card đồ họa chiếm ${gpu.specs.slots} slot nhưng case chỉ có ${pcCase.specs.expansionSlots} khe mở rộng`,
        affectedCategories: ['vga', 'case'],
        severity: 'critical',
      });
    }
  }

  return rules;
}

// Check CPU cooler compatibility
function checkCoolerCompatibility(parts: SelectedParts): CompatibilityRule[] {
  const rules: CompatibilityRule[] = [];
  const cooler = parts.cooler as CoolerProduct | undefined;
  const cpu = parts.cpu as CPUProduct | undefined;
  const pcCase = parts.case as CaseProduct | undefined;

  if (cooler && cpu) {
    // Check socket support
    if (!cooler.specs.socketSupport.includes(cpu.specs.socket)) {
      rules.push({
        type: 'error',
        category: 'cooler',
        message: `Tản nhiệt không hỗ trợ socket ${cpu.specs.socket}`,
        affectedCategories: ['cooler', 'cpu'],
        severity: 'critical',
      });
    }

    // Check TDP capacity
    if (cooler.specs.tdp < cpu.specs.tdp) {
      rules.push({
        type: 'warning',
        category: 'cooler',
        message: `Tản nhiệt chỉ hỗ trợ TDP ${cooler.specs.tdp}W nhưng CPU cần ${cpu.specs.tdp}W. Có thể quá nóng`,
        affectedCategories: ['cooler', 'cpu'],
        severity: 'high',
      });
    }
  }

  // Check cooler height with case
  if (cooler && pcCase && cooler.specs.type === 'Air' && cooler.specs.height) {
    if (cooler.specs.height > pcCase.specs.maxCpuCoolerHeight) {
      rules.push({
        type: 'error',
        category: 'cooler',
        message: `Tản nhiệt cao ${cooler.specs.height}mm vượt quá giới hạn ${pcCase.specs.maxCpuCoolerHeight}mm của case`,
        affectedCategories: ['cooler', 'case'],
        severity: 'critical',
      });
    }
  }

  return rules;
}

// Check Case and Mainboard form factor compatibility
function checkCaseMainboardCompatibility(parts: SelectedParts): CompatibilityRule[] {
  const rules: CompatibilityRule[] = [];
  const pcCase = parts.case as CaseProduct | undefined;
  const mainboard = parts.mainboard as MainboardProduct | undefined;

  if (pcCase && mainboard) {
    const supported = pcCase.specs.motherboardSupport.includes(mainboard.specs.formFactor);
    
    if (!supported) {
      rules.push({
        type: 'error',
        category: 'case',
        message: `Case không hỗ trợ form factor ${mainboard.specs.formFactor} của mainboard`,
        affectedCategories: ['case', 'mainboard'],
        severity: 'critical',
      });
    }
  }

  return rules;
}

// Calculate power consumption
export function calculatePower(parts: SelectedParts): PowerEstimation {
  const cpu = parts.cpu as CPUProduct | undefined;
  const gpu = parts.vga as GPUProduct | undefined;
  const ram = parts.ram as RAMProduct | undefined;
  const mainboard = parts.mainboard as MainboardProduct | undefined;
  const ssd = parts.ssd as SSDProduct | undefined;
  const cooler = parts.cooler as CoolerProduct | undefined;

  const cpuPower = cpu?.specs.tdp || 0;
  const gpuPower = gpu?.specs.tdp || 0;
  
  // RAM power estimate (roughly 3W per stick, 5W for RGB)
  const ramPower = ram ? ram.specs.sticks * (ram.specs.rgb ? 5 : 3) : 0;
  
  // Motherboard power (varies by features)
  const mainboardPower = mainboard ? 30 : 0;
  
  // SSD power (roughly 7W for NVMe, 3W for SATA)
  const ssdPower = ssd ? (ssd.specs.interface.includes('PCIe') ? 7 : 3) : 0;
  
  // Cooler power (fans + pump)
  const coolerPower = cooler ? cooler.specs.fanCount * 3 : 0;
  
  // Case fans (estimate 3W each, assume 3 fans if case selected)
  const fansPower = parts.case ? 9 : 0;
  
  const total = cpuPower + gpuPower + ramPower + mainboardPower + ssdPower + coolerPower + fansPower;
  
  // Add headroom (20% for basic, 30% for high-end)
  const headroomPercent = total > 500 ? 0.3 : 0.2;
  const recommendedPsu = Math.ceil((total * (1 + headroomPercent)) / 50) * 50;

  return {
    cpu: cpuPower,
    gpu: gpuPower,
    ram: ramPower,
    mainboard: mainboardPower,
    ssd: ssdPower,
    cooler: coolerPower,
    fans: fansPower,
    total,
    recommendedPsu,
    headroom: Math.round(headroomPercent * 100),
  };
}

// Detect bottleneck between CPU and GPU
export function detectBottleneck(parts: SelectedParts): BottleneckAnalysis {
  const cpu = parts.cpu as CPUProduct | undefined;
  const gpu = parts.vga as GPUProduct | undefined;

  if (!cpu || !gpu) {
    return {
      hasBottleneck: false,
      balanceScore: 50,
      recommendations: [],
    };
  }

  const recommendations: string[] = [];
  let hasBottleneck = false;
  let balanceScore = 100;

  // Simple bottleneck detection based on tier matching
  const cpuTier = getCPUTier(cpu);
  const gpuTier = getGPUTier(gpu);

  const tierDiff = cpuTier - gpuTier;

  if (tierDiff >= 2) {
    hasBottleneck = true;
    balanceScore = 60;
    recommendations.push(`CPU ${cpu.name} có thể là bottleneck cho ${gpu.name}. Nâng cấp GPU hoặc chọn CPU thấp hơn để cân bằng.`);
  } else if (tierDiff <= -2) {
    hasBottleneck = true;
    balanceScore = 60;
    recommendations.push(`GPU ${gpu.name} bị giới hạn bởi ${cpu.name}. Nâng cấp CPU để tận dụng hết GPU.`);
  } else if (tierDiff === 1 || tierDiff === -1) {
    balanceScore = 80;
    recommendations.push(`Cấu hình khá cân bằng. Có thể nâng cấp ${tierDiff > 0 ? 'GPU' : 'CPU'} để tối ưu.`);
  } else {
    balanceScore = 100;
    recommendations.push('Cấu hình CPU và GPU rất cân bằng!');
  }

  // RAM bottleneck check
  const ram = parts.ram as RAMProduct | undefined;
  if (ram && cpu) {
    if (ram.specs.type === 'DDR4' && cpu.specs.supportedMemory.includes('DDR5')) {
      recommendations.push('Mainboard và CPU hỗ trợ DDR5. Cân nhắc nâng cấp RAM để tối ưu hiệu năng.');
      balanceScore -= 10;
    }
  }

  return {
    hasBottleneck,
    bottleneckComponent: hasBottleneck ? (tierDiff > 0 ? 'cpu' : 'vga') : undefined,
    bottleneckDescription: hasBottleneck
      ? tierDiff > 0
        ? 'CPU quá mạnh so với GPU'
        : 'GPU quá mạnh so với CPU'
      : undefined,
    balanceScore,
    recommendations,
  };
}

// Helper: Get CPU tier (1-5 scale)
function getCPUTier(cpu: CPUProduct): number {
  const name = cpu.name.toLowerCase();
  if (name.includes('i9') || name.includes('ryzen 9')) return 5;
  if (name.includes('i7') || name.includes('ryzen 7')) return 4;
  if (name.includes('i5') || name.includes('ryzen 5')) return 3;
  if (name.includes('i3') || name.includes('ryzen 3')) return 2;
  return 1;
}

// Helper: Get GPU tier (1-5 scale)
function getGPUTier(gpu: GPUProduct): number {
  const name = gpu.name.toLowerCase();
  
  if (name.includes('4090') || name.includes('7900 xtx')) return 5;
  if (name.includes('4080') || name.includes('7900 xt')) return 5;
  if (name.includes('4070 ti') || name.includes('7800 xt')) return 4;
  if (name.includes('4070') || name.includes('7700 xt')) return 4;
  if (name.includes('4060 ti') || name.includes('7600')) return 3;
  if (name.includes('4060')) return 3;
  return 2;
}

// Get compatibility suggestions for a category
export function getSuggestions(
  category: ComponentCategory,
  parts: SelectedParts
): string[] {
  const suggestions: string[] = [];

  switch (category) {
    case 'mainboard': {
      const cpu = parts.cpu as CPUProduct | undefined;
      if (cpu) {
        suggestions.push(`Chọn mainboard socket ${cpu.specs.socket}`);
        suggestions.push(`Hỗ trợ ${cpu.specs.supportedMemory.join(' hoặc ')}`);
      }
      break;
    }
    case 'ram': {
      const mainboard = parts.mainboard as MainboardProduct | undefined;
      if (mainboard) {
        suggestions.push(`Chọn RAM ${mainboard.specs.memoryType}`);
        suggestions.push(`Tối đa ${mainboard.specs.maxMemory}GB`);
      }
      break;
    }
    case 'psu': {
      const power = calculatePower(parts);
      if (power.total > 0) {
        suggestions.push(`Cần nguồn tối thiểu ${power.recommendedPsu}W`);
        suggestions.push(`Chọn 80 Plus Gold để tiết kiệm điện`);
      }
      break;
    }
    case 'vga': {
      const psu = parts.psu as PSUProduct | undefined;
      const pcCase = parts.case as CaseProduct | undefined;
      if (psu) {
        suggestions.push(`Kiểm tra công suất nguồn (${psu.specs.wattage}W)`);
      }
      if (pcCase) {
        suggestions.push(`Giới hạn độ dài GPU: ${pcCase.specs.maxGpuLength}mm`);
      }
      break;
    }
    case 'cooler': {
      const cpu = parts.cpu as CPUProduct | undefined;
      if (cpu) {
        suggestions.push(`Hỗ trợ socket ${cpu.specs.socket}`);
        suggestions.push(`TDP tối thiểu: ${cpu.specs.tdp}W`);
      }
      break;
    }
    case 'case': {
      const mainboard = parts.mainboard as MainboardProduct | undefined;
      const gpu = parts.vga as GPUProduct | undefined;
      if (mainboard) {
        suggestions.push(`Hỗ trợ ${mainboard.specs.formFactor}`);
      }
      if (gpu) {
        suggestions.push(`Cần độ dài tối thiểu ${gpu.specs.length + 30}mm`);
      }
      break;
    }
  }

  return suggestions;
}

// Auto-build PC based on budget and use case
export function autoBuildPC(
  budget: number,
  useCase: string,
  allComponents: Record<ComponentCategory, PCComponent[]>
): SelectedParts {
  const build: SelectedParts = {};
  
  // Budget allocation percentages
  const allocations: Record<string, Record<ComponentCategory, number>> = {
    gaming: {
      cpu: 0.20,
      mainboard: 0.12,
      ram: 0.08,
      vga: 0.35,
      ssd: 0.08,
      psu: 0.10,
      case: 0.04,
      cooler: 0.02,
      fan: 0.01,
    },
    'content-creation': {
      cpu: 0.30,
      mainboard: 0.12,
      ram: 0.12,
      vga: 0.20,
      ssd: 0.10,
      psu: 0.09,
      case: 0.04,
      cooler: 0.02,
      fan: 0.01,
    },
    workstation: {
      cpu: 0.35,
      mainboard: 0.15,
      ram: 0.15,
      vga: 0.15,
      ssd: 0.09,
      psu: 0.07,
      case: 0.02,
      cooler: 0.01,
      fan: 0.01,
    },
  };

  const allocation = allocations[useCase] || allocations.gaming;

  // Select components within budget
  (Object.keys(allocation) as ComponentCategory[]).forEach((category) => {
    const categoryBudget = budget * allocation[category];
    const components = allComponents[category];
    
    if (components && components.length > 0) {
      // Find best component within budget
      const suitable = components.filter((c) => c.price <= categoryBudget);
      
      if (suitable.length > 0) {
        // Sort by price descending to get the best within budget
        suitable.sort((a, b) => b.price - a.price);
        build[category] = suitable[0];
      } else {
        // If nothing fits, take the cheapest
        const cheapest = [...components].sort((a, b) => a.price - b.price)[0];
        build[category] = cheapest;
      }
    }
  });

  return build;
}

// Export build to JSON
export function exportBuildJSON(parts: SelectedParts, name: string): string {
  const build = {
    name,
    createdAt: new Date().toISOString(),
    components: Object.entries(parts).map(([category, component]) => ({
      category,
      id: component?.id,
      name: component?.name,
      brand: component?.brand,
      price: component?.price,
    })),
    totalPrice: Object.values(parts).reduce((sum, p) => sum + (p?.price || 0), 0),
    compatibility: checkCompatibility(parts),
    power: calculatePower(parts),
  };

  return JSON.stringify(build, null, 2);
}

// Generate shareable link (mock)
export function generateShareLink(parts: SelectedParts): string {
  const ids = Object.entries(parts)
    .map(([cat, comp]) => `${cat}=${comp?.id}`)
    .join('&');
  return `${typeof window !== 'undefined' ? window.location.origin : ''}/build-pc?${ids}`;
}
