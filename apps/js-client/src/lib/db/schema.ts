import { CalculationRequest, CalculationResponse } from "@/lib/ballistics";

/**
 * Stored calculation profile with full input data
 */
export interface CalculationProfile {
  id?: number;
  name: string;
  description?: string;
  request: CalculationRequest;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  isFavorite?: boolean;
}

/**
 * Calculation history entry with both request and response
 */
export interface CalculationHistory {
  id?: number;
  name?: string;
  request: CalculationRequest;
  response: CalculationResponse;
  timestamp: Date;
  profileId?: number; // Reference to profile if saved
  notes?: string;
}

/**
 * Weapon preset for quick selection
 */
export interface WeaponPreset {
  id?: number;
  name: string;
  manufacturer?: string;
  model?: string;
  caliber?: string;
  sight_height: number;
  twist?: number | null;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  isFavorite?: boolean;
}

/**
 * Ammo preset for quick selection
 */
export interface AmmoPreset {
  id?: number;
  name: string;
  manufacturer?: string;
  model?: string;
  caliber?: string;
  bc: number;
  drag_model: "G1" | "G7";
  muzzle_velocity: number;
  bullet_weight?: number;
  bullet_diameter?: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  isFavorite?: boolean;
}

/**
 * Atmospheric preset for quick selection (e.g., "Summer", "Winter", "High Altitude")
 */
export interface AtmospherePreset {
  id?: number;
  name: string;
  description?: string;
  temperature: number;
  pressure: number;
  humidity: number;
  altitude: number;
  createdAt: Date;
  updatedAt: Date;
  isFavorite?: boolean;
}

/**
 * User preferences and settings
 */
export interface UserPreferences {
  id?: number;
  // Theme
  theme?: "light" | "dark" | "system";
  
  // Default values
  defaultWeaponId?: number;
  defaultAmmoId?: number;
  defaultAtmosphereId?: number;
  defaultZeroDistance?: number;
  defaultMaxRange?: number;
  defaultStepSize?: number;
  
  // UI preferences
  autoSaveHistory?: boolean;
  showAdvancedOptions?: boolean;
  chartType?: "combined" | "drop" | "windage";
  
  // Export preferences
  csvDelimiter?: "," | ";" | "\t";
  csvDecimalSeparator?: "." | ",";
  
  updatedAt: Date;
}

/**
 * Export/Import data structure for backup
 */
export interface DatabaseExport {
  version: number;
  exportedAt: Date;
  profiles: CalculationProfile[];
  history: CalculationHistory[];
  weaponPresets: WeaponPreset[];
  ammoPresets: AmmoPreset[];
  atmospherePresets: AtmospherePreset[];
  preferences: UserPreferences[];
}
