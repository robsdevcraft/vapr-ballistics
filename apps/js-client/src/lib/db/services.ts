import { db } from "./database";
import type {
  CalculationProfile,
  CalculationHistory,
  WeaponPreset,
  AmmoPreset,
  AtmospherePreset,
  UserPreferences,
  DatabaseExport,
} from "./schema";

/**
 * Profile Service - CRUD operations for calculation profiles
 */
export const profileService = {
  async getAll(): Promise<CalculationProfile[]> {
    return db.profiles.orderBy("updatedAt").reverse().toArray();
  },

  async getById(id: number): Promise<CalculationProfile | undefined> {
    return db.profiles.get(id);
  },

  async getFavorites(): Promise<CalculationProfile[]> {
    return db.profiles.where("isFavorite").equals(1).toArray();
  },

  async search(query: string): Promise<CalculationProfile[]> {
    const lowerQuery = query.toLowerCase();
    return db.profiles
      .filter(
        (profile) =>
          profile.name.toLowerCase().includes(lowerQuery) ||
          (profile.description?.toLowerCase().includes(lowerQuery) ?? false) ||
          (profile.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) ?? false)
      )
      .toArray();
  },

  async create(profile: Omit<CalculationProfile, "id" | "createdAt" | "updatedAt">): Promise<number> {
    const now = new Date();
    return db.profiles.add({
      ...profile,
      createdAt: now,
      updatedAt: now,
    });
  },

  async update(id: number, updates: Partial<CalculationProfile>): Promise<number> {
    return db.profiles.update(id, {
      ...updates,
      updatedAt: new Date(),
    });
  },

  async delete(id: number): Promise<void> {
    await db.profiles.delete(id);
  },

  async toggleFavorite(id: number): Promise<void> {
    const profile = await db.profiles.get(id);
    if (profile) {
      await db.profiles.update(id, {
        isFavorite: !profile.isFavorite,
        updatedAt: new Date(),
      });
    }
  },
};

/**
 * History Service - CRUD operations for calculation history
 */
export const historyService = {
  async getAll(limit?: number): Promise<CalculationHistory[]> {
    const query = db.history.orderBy("timestamp").reverse();
    return limit ? query.limit(limit).toArray() : query.toArray();
  },

  async getById(id: number): Promise<CalculationHistory | undefined> {
    return db.history.get(id);
  },

  async getByProfileId(profileId: number): Promise<CalculationHistory[]> {
    return db.history.where("profileId").equals(profileId).toArray();
  },

  async search(query: string): Promise<CalculationHistory[]> {
    const lowerQuery = query.toLowerCase();
    return db.history
      .filter(
        (entry) =>
          (entry.name?.toLowerCase().includes(lowerQuery) ?? false) ||
          (entry.notes?.toLowerCase().includes(lowerQuery) ?? false)
      )
      .toArray();
  },

  async create(entry: Omit<CalculationHistory, "id" | "timestamp">): Promise<number> {
    return db.history.add({
      ...entry,
      timestamp: new Date(),
    });
  },

  async update(id: number, updates: Partial<CalculationHistory>): Promise<number> {
    return db.history.update(id, updates);
  },

  async delete(id: number): Promise<void> {
    await db.history.delete(id);
  },

  async deleteOlderThan(days: number): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return db.history.where("timestamp").below(cutoffDate).delete();
  },

  async clear(): Promise<void> {
    await db.history.clear();
  },
};

/**
 * Weapon Preset Service - CRUD operations for weapon presets
 */
export const weaponPresetService = {
  async getAll(): Promise<WeaponPreset[]> {
    return db.weaponPresets.orderBy("name").toArray();
  },

  async getById(id: number): Promise<WeaponPreset | undefined> {
    return db.weaponPresets.get(id);
  },

  async getFavorites(): Promise<WeaponPreset[]> {
    return db.weaponPresets.where("isFavorite").equals(1).toArray();
  },

  async search(query: string): Promise<WeaponPreset[]> {
    const lowerQuery = query.toLowerCase();
    return db.weaponPresets
      .filter(
        (preset) =>
          preset.name.toLowerCase().includes(lowerQuery) ||
          (preset.manufacturer?.toLowerCase().includes(lowerQuery) ?? false) ||
          (preset.model?.toLowerCase().includes(lowerQuery) ?? false) ||
          (preset.caliber?.toLowerCase().includes(lowerQuery) ?? false)
      )
      .toArray();
  },

  async create(preset: Omit<WeaponPreset, "id" | "createdAt" | "updatedAt">): Promise<number> {
    const now = new Date();
    return db.weaponPresets.add({
      ...preset,
      createdAt: now,
      updatedAt: now,
    });
  },

  async update(id: number, updates: Partial<WeaponPreset>): Promise<number> {
    return db.weaponPresets.update(id, {
      ...updates,
      updatedAt: new Date(),
    });
  },

  async delete(id: number): Promise<void> {
    await db.weaponPresets.delete(id);
  },

  async toggleFavorite(id: number): Promise<void> {
    const preset = await db.weaponPresets.get(id);
    if (preset) {
      await db.weaponPresets.update(id, {
        isFavorite: !preset.isFavorite,
        updatedAt: new Date(),
      });
    }
  },
};

/**
 * Ammo Preset Service - CRUD operations for ammo presets
 */
export const ammoPresetService = {
  async getAll(): Promise<AmmoPreset[]> {
    return db.ammoPresets.orderBy("name").toArray();
  },

  async getById(id: number): Promise<AmmoPreset | undefined> {
    return db.ammoPresets.get(id);
  },

  async getFavorites(): Promise<AmmoPreset[]> {
    return db.ammoPresets.where("isFavorite").equals(1).toArray();
  },

  async search(query: string): Promise<AmmoPreset[]> {
    const lowerQuery = query.toLowerCase();
    return db.ammoPresets
      .filter(
        (preset) =>
          preset.name.toLowerCase().includes(lowerQuery) ||
          (preset.manufacturer?.toLowerCase().includes(lowerQuery) ?? false) ||
          (preset.model?.toLowerCase().includes(lowerQuery) ?? false) ||
          (preset.caliber?.toLowerCase().includes(lowerQuery) ?? false)
      )
      .toArray();
  },

  async create(preset: Omit<AmmoPreset, "id" | "createdAt" | "updatedAt">): Promise<number> {
    const now = new Date();
    return db.ammoPresets.add({
      ...preset,
      createdAt: now,
      updatedAt: now,
    });
  },

  async update(id: number, updates: Partial<AmmoPreset>): Promise<number> {
    return db.ammoPresets.update(id, {
      ...updates,
      updatedAt: new Date(),
    });
  },

  async delete(id: number): Promise<void> {
    await db.ammoPresets.delete(id);
  },

  async toggleFavorite(id: number): Promise<void> {
    const preset = await db.ammoPresets.get(id);
    if (preset) {
      await db.ammoPresets.update(id, {
        isFavorite: !preset.isFavorite,
        updatedAt: new Date(),
      });
    }
  },
};

/**
 * Atmosphere Preset Service - CRUD operations for atmosphere presets
 */
export const atmospherePresetService = {
  async getAll(): Promise<AtmospherePreset[]> {
    return db.atmospherePresets.orderBy("name").toArray();
  },

  async getById(id: number): Promise<AtmospherePreset | undefined> {
    return db.atmospherePresets.get(id);
  },

  async getFavorites(): Promise<AtmospherePreset[]> {
    return db.atmospherePresets.where("isFavorite").equals(1).toArray();
  },

  async create(preset: Omit<AtmospherePreset, "id" | "createdAt" | "updatedAt">): Promise<number> {
    const now = new Date();
    return db.atmospherePresets.add({
      ...preset,
      createdAt: now,
      updatedAt: now,
    });
  },

  async update(id: number, updates: Partial<AtmospherePreset>): Promise<number> {
    return db.atmospherePresets.update(id, {
      ...updates,
      updatedAt: new Date(),
    });
  },

  async delete(id: number): Promise<void> {
    await db.atmospherePresets.delete(id);
  },

  async toggleFavorite(id: number): Promise<void> {
    const preset = await db.atmospherePresets.get(id);
    if (preset) {
      await db.atmospherePresets.update(id, {
        isFavorite: !preset.isFavorite,
        updatedAt: new Date(),
      });
    }
  },
};

/**
 * Preferences Service - CRUD operations for user preferences
 */
export const preferencesService = {
  async get(): Promise<UserPreferences | undefined> {
    // Only one preferences record should exist
    return db.preferences.toCollection().first();
  },

  async update(updates: Partial<UserPreferences>): Promise<void> {
    const prefs = await this.get();
    if (prefs?.id) {
      await db.preferences.update(prefs.id, {
        ...updates,
        updatedAt: new Date(),
      });
    }
  },

  async reset(): Promise<void> {
    await db.preferences.clear();
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
  },
};

/**
 * Export/Import Service - Backup and restore operations
 */
export const exportImportService = {
  async exportAll(): Promise<DatabaseExport> {
    const [profiles, history, weaponPresets, ammoPresets, atmospherePresets, preferences] =
      await Promise.all([
        db.profiles.toArray(),
        db.history.toArray(),
        db.weaponPresets.toArray(),
        db.ammoPresets.toArray(),
        db.atmospherePresets.toArray(),
        db.preferences.toArray(),
      ]);

    return {
      version: 1,
      exportedAt: new Date(),
      profiles,
      history,
      weaponPresets,
      ammoPresets,
      atmospherePresets,
      preferences,
    };
  },

  async importAll(data: DatabaseExport, options: { merge: boolean } = { merge: false }): Promise<void> {
    if (!options.merge) {
      // Clear existing data
      await db.transaction("rw", db.tables, async () => {
        await Promise.all(db.tables.map((table) => table.clear()));
      });
    }

    // Import data
    await db.transaction("rw", db.tables, async () => {
      if (data.profiles.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        await db.profiles.bulkAdd(data.profiles.map(({ id, ...rest }) => rest));
      }
      if (data.history.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        await db.history.bulkAdd(data.history.map(({ id, ...rest }) => rest));
      }
      if (data.weaponPresets.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        await db.weaponPresets.bulkAdd(data.weaponPresets.map(({ id, ...rest }) => rest));
      }
      if (data.ammoPresets.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        await db.ammoPresets.bulkAdd(data.ammoPresets.map(({ id, ...rest }) => rest));
      }
      if (data.atmospherePresets.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        await db.atmospherePresets.bulkAdd(data.atmospherePresets.map(({ id, ...rest }) => rest));
      }
      if (data.preferences.length > 0 && !options.merge) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        await db.preferences.bulkAdd(data.preferences.map(({ id, ...rest }) => rest));
      }
    });
  },

  async exportToJSON(): Promise<string> {
    const data = await this.exportAll();
    return JSON.stringify(data, null, 2);
  },

  async importFromJSON(json: string, options: { merge: boolean } = { merge: false }): Promise<void> {
    const data = JSON.parse(json) as DatabaseExport;
    await this.importAll(data, options);
  },
};
