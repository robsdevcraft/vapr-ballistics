import Dexie, { Table } from "dexie";
import type {
  CalculationProfile,
  CalculationHistory,
  WeaponPreset,
  AmmoPreset,
  AtmospherePreset,
  UserPreferences,
} from "./schema";

/**
 * Ballistics Calculator Database
 * Uses Dexie.js for IndexedDB operations
 */
export class BallisticsDatabase extends Dexie {
  // Tables
  profiles!: Table<CalculationProfile, number>;
  history!: Table<CalculationHistory, number>;
  weaponPresets!: Table<WeaponPreset, number>;
  ammoPresets!: Table<AmmoPreset, number>;
  atmospherePresets!: Table<AtmospherePreset, number>;
  preferences!: Table<UserPreferences, number>;

  constructor() {
    super("BallisticsCalculator");
    
    // Version 1: Initial schema
    this.version(1).stores({
      profiles: "++id, name, createdAt, updatedAt, isFavorite, *tags",
      history: "++id, timestamp, profileId, name",
      weaponPresets: "++id, name, manufacturer, model, caliber, createdAt, updatedAt, isFavorite, *tags",
      ammoPresets: "++id, name, manufacturer, model, caliber, drag_model, createdAt, updatedAt, isFavorite, *tags",
      atmospherePresets: "++id, name, createdAt, updatedAt, isFavorite",
      preferences: "++id, updatedAt",
    });

    // Optional: Add upgrade logic for future versions
    // this.version(2).stores({...}).upgrade(tx => {...});
  }
}

// Create singleton instance
export const db = new BallisticsDatabase();

/**
 * Initialize database with default data
 */
export async function initializeDatabase(): Promise<void> {
  try {
    // Check if preferences exist, if not create default
    const prefsCount = await db.preferences.count();
    if (prefsCount === 0) {
      await db.preferences.add({
        theme: "system",
        autoSaveHistory: true,
        showAdvancedOptions: false,
        chartType: "combined",
        csvDelimiter: ",",
        csvDecimalSeparator: ".",
        defaultZeroDistance: 100,
        defaultMaxRange: 1000,
        defaultStepSize: 100,
        updatedAt: new Date(),
      });
    }

    // Add default atmospheric presets if none exist
    const atmosphereCount = await db.atmospherePresets.count();
    if (atmosphereCount === 0) {
      await db.atmospherePresets.bulkAdd([
        {
          name: "Standard (ICAO)",
          description: "International Standard Atmosphere at sea level",
          temperature: 59,
          pressure: 29.92,
          humidity: 0.0,
          altitude: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          isFavorite: true,
        },
        {
          name: "Hot Summer Day",
          description: "Typical hot summer conditions",
          temperature: 95,
          pressure: 29.92,
          humidity: 0.7,
          altitude: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          isFavorite: false,
        },
        {
          name: "Cold Winter Day",
          description: "Typical cold winter conditions",
          temperature: 32,
          pressure: 30.12,
          humidity: 0.4,
          altitude: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          isFavorite: false,
        },
        {
          name: "High Altitude (5000ft)",
          description: "Mountain conditions at 5000ft elevation",
          temperature: 50,
          pressure: 24.89,
          humidity: 0.3,
          altitude: 5000,
          createdAt: new Date(),
          updatedAt: new Date(),
          isFavorite: false,
        },
      ]);
    }

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
}

/**
 * Check if IndexedDB is supported
 */
export function isIndexedDBSupported(): boolean {
  try {
    return typeof indexedDB !== "undefined";
  } catch {
    return false;
  }
}

/**
 * Clear all data from database (for testing or reset)
 */
export async function clearDatabase(): Promise<void> {
  await db.transaction("rw", db.tables, async () => {
    await Promise.all(db.tables.map((table) => table.clear()));
  });
}

/**
 * Get database statistics
 */
export async function getDatabaseStats() {
  const [
    profilesCount,
    historyCount,
    weaponPresetsCount,
    ammoPresetsCount,
    atmospherePresetsCount,
  ] = await Promise.all([
    db.profiles.count(),
    db.history.count(),
    db.weaponPresets.count(),
    db.ammoPresets.count(),
    db.atmospherePresets.count(),
  ]);

  return {
    profiles: profilesCount,
    history: historyCount,
    weaponPresets: weaponPresetsCount,
    ammoPresets: ammoPresetsCount,
    atmospherePresets: atmospherePresetsCount,
    total:
      profilesCount +
      historyCount +
      weaponPresetsCount +
      ammoPresetsCount +
      atmospherePresetsCount,
  };
}
