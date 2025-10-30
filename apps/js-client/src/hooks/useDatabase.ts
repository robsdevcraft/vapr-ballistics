"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { useCallback } from "react";
import { toast } from "sonner";
import {
  profileService,
  historyService,
  weaponPresetService,
  ammoPresetService,
  atmospherePresetService,
  preferencesService,
  exportImportService,
} from "@/lib/db/services";
import type {
  CalculationProfile,
  CalculationHistory,
  WeaponPreset,
  AmmoPreset,
  AtmospherePreset,
  UserPreferences,
} from "@/lib/db/schema";

// Re-export useDatabaseContext from DatabaseProvider
export { useDatabaseContext } from "@/components/DatabaseProvider";

/**
 * Hook for profiles CRUD operations
 */
export function useProfiles() {
  const profiles = useLiveQuery(() => profileService.getAll());
  const favorites = useLiveQuery(() => profileService.getFavorites());

  const create = useCallback(async (profile: Omit<CalculationProfile, "id" | "createdAt" | "updatedAt">) => {
    try {
      const id = await profileService.create(profile);
      toast.success(`Profile "${profile.name}" saved`);
      return id;
    } catch (error) {
      toast.error("Failed to save profile");
      throw error;
    }
  }, []);

  const update = useCallback(async (id: number, updates: Partial<CalculationProfile>) => {
    try {
      await profileService.update(id, updates);
      toast.success("Profile updated");
    } catch (error) {
      toast.error("Failed to update profile");
      throw error;
    }
  }, []);

  const remove = useCallback(async (id: number) => {
    try {
      await profileService.delete(id);
      toast.success("Profile deleted");
    } catch (error) {
      toast.error("Failed to delete profile");
      throw error;
    }
  }, []);

  const toggleFavorite = useCallback(async (id: number) => {
    try {
      await profileService.toggleFavorite(id);
    } catch (error) {
      toast.error("Failed to update favorite");
      throw error;
    }
  }, []);

  const search = useCallback(async (query: string) => {
    try {
      return await profileService.search(query);
    } catch (error) {
      toast.error("Failed to search profiles");
      throw error;
    }
  }, []);

  return {
    profiles,
    favorites,
    create,
    update,
    remove,
    toggleFavorite,
    search,
  };
}

/**
 * Hook for calculation history CRUD operations
 */
export function useHistory(limit?: number) {
  const history = useLiveQuery(() => historyService.getAll(limit));

  const add = useCallback(async (entry: Omit<CalculationHistory, "id" | "timestamp">) => {
    try {
      const id = await historyService.create(entry);
      return id;
    } catch (error) {
      toast.error("Failed to save to history");
      throw error;
    }
  }, []);

  const update = useCallback(async (id: number, updates: Partial<CalculationHistory>) => {
    try {
      await historyService.update(id, updates);
      toast.success("History entry updated");
    } catch (error) {
      toast.error("Failed to update history");
      throw error;
    }
  }, []);

  const remove = useCallback(async (id: number) => {
    try {
      await historyService.delete(id);
      toast.success("History entry deleted");
    } catch (error) {
      toast.error("Failed to delete history entry");
      throw error;
    }
  }, []);

  const clear = useCallback(async () => {
    try {
      await historyService.clear();
      toast.success("History cleared");
    } catch (error) {
      toast.error("Failed to clear history");
      throw error;
    }
  }, []);

  const deleteOlderThan = useCallback(async (days: number) => {
    try {
      const count = await historyService.deleteOlderThan(days);
      toast.success(`Deleted ${count} old entries`);
    } catch (error) {
      toast.error("Failed to delete old entries");
      throw error;
    }
  }, []);

  const search = useCallback(async (query: string) => {
    try {
      return await historyService.search(query);
    } catch (error) {
      toast.error("Failed to search history");
      throw error;
    }
  }, []);

  return {
    history,
    add,
    update,
    remove,
    clear,
    deleteOlderThan,
    search,
  };
}

/**
 * Hook for weapon presets CRUD operations
 */
export function useWeaponPresets() {
  const presets = useLiveQuery(() => weaponPresetService.getAll());
  const favorites = useLiveQuery(() => weaponPresetService.getFavorites());

  const create = useCallback(async (preset: Omit<WeaponPreset, "id" | "createdAt" | "updatedAt">) => {
    try {
      const id = await weaponPresetService.create(preset);
      toast.success(`Weapon preset "${preset.name}" saved`);
      return id;
    } catch (error) {
      toast.error("Failed to save weapon preset");
      throw error;
    }
  }, []);

  const update = useCallback(async (id: number, updates: Partial<WeaponPreset>) => {
    try {
      await weaponPresetService.update(id, updates);
      toast.success("Weapon preset updated");
    } catch (error) {
      toast.error("Failed to update weapon preset");
      throw error;
    }
  }, []);

  const remove = useCallback(async (id: number) => {
    try {
      await weaponPresetService.delete(id);
      toast.success("Weapon preset deleted");
    } catch (error) {
      toast.error("Failed to delete weapon preset");
      throw error;
    }
  }, []);

  const toggleFavorite = useCallback(async (id: number) => {
    try {
      await weaponPresetService.toggleFavorite(id);
    } catch (error) {
      toast.error("Failed to update favorite");
      throw error;
    }
  }, []);

  const search = useCallback(async (query: string) => {
    try {
      return await weaponPresetService.search(query);
    } catch (error) {
      toast.error("Failed to search weapon presets");
      throw error;
    }
  }, []);

  return {
    presets,
    favorites,
    create,
    update,
    remove,
    toggleFavorite,
    search,
  };
}

/**
 * Hook for ammo presets CRUD operations
 */
export function useAmmoPresets() {
  const presets = useLiveQuery(() => ammoPresetService.getAll());
  const favorites = useLiveQuery(() => ammoPresetService.getFavorites());

  const create = useCallback(async (preset: Omit<AmmoPreset, "id" | "createdAt" | "updatedAt">) => {
    try {
      const id = await ammoPresetService.create(preset);
      toast.success(`Ammo preset "${preset.name}" saved`);
      return id;
    } catch (error) {
      toast.error("Failed to save ammo preset");
      throw error;
    }
  }, []);

  const update = useCallback(async (id: number, updates: Partial<AmmoPreset>) => {
    try {
      await ammoPresetService.update(id, updates);
      toast.success("Ammo preset updated");
    } catch (error) {
      toast.error("Failed to update ammo preset");
      throw error;
    }
  }, []);

  const remove = useCallback(async (id: number) => {
    try {
      await ammoPresetService.delete(id);
      toast.success("Ammo preset deleted");
    } catch (error) {
      toast.error("Failed to delete ammo preset");
      throw error;
    }
  }, []);

  const toggleFavorite = useCallback(async (id: number) => {
    try {
      await ammoPresetService.toggleFavorite(id);
    } catch (error) {
      toast.error("Failed to update favorite");
      throw error;
    }
  }, []);

  const search = useCallback(async (query: string) => {
    try {
      return await ammoPresetService.search(query);
    } catch (error) {
      toast.error("Failed to search ammo presets");
      throw error;
    }
  }, []);

  return {
    presets,
    favorites,
    create,
    update,
    remove,
    toggleFavorite,
    search,
  };
}

/**
 * Hook for atmosphere presets CRUD operations
 */
export function useAtmospherePresets() {
  const presets = useLiveQuery(() => atmospherePresetService.getAll());
  const favorites = useLiveQuery(() => atmospherePresetService.getFavorites());

  const create = useCallback(async (preset: Omit<AtmospherePreset, "id" | "createdAt" | "updatedAt">) => {
    try {
      const id = await atmospherePresetService.create(preset);
      toast.success(`Atmosphere preset "${preset.name}" saved`);
      return id;
    } catch (error) {
      toast.error("Failed to save atmosphere preset");
      throw error;
    }
  }, []);

  const update = useCallback(async (id: number, updates: Partial<AtmospherePreset>) => {
    try {
      await atmospherePresetService.update(id, updates);
      toast.success("Atmosphere preset updated");
    } catch (error) {
      toast.error("Failed to update atmosphere preset");
      throw error;
    }
  }, []);

  const remove = useCallback(async (id: number) => {
    try {
      await atmospherePresetService.delete(id);
      toast.success("Atmosphere preset deleted");
    } catch (error) {
      toast.error("Failed to delete atmosphere preset");
      throw error;
    }
  }, []);

  const toggleFavorite = useCallback(async (id: number) => {
    try {
      await atmospherePresetService.toggleFavorite(id);
    } catch (error) {
      toast.error("Failed to update favorite");
      throw error;
    }
  }, []);

  return {
    presets,
    favorites,
    create,
    update,
    remove,
    toggleFavorite,
  };
}

/**
 * Hook for user preferences
 */
export function usePreferences() {
  const preferences = useLiveQuery(() => preferencesService.get());

  const update = useCallback(async (updates: Partial<UserPreferences>) => {
    try {
      await preferencesService.update(updates);
    } catch (error) {
      toast.error("Failed to update preferences");
      throw error;
    }
  }, []);

  const reset = useCallback(async () => {
    try {
      await preferencesService.reset();
      toast.success("Preferences reset to defaults");
    } catch (error) {
      toast.error("Failed to reset preferences");
      throw error;
    }
  }, []);

  return {
    preferences,
    update,
    reset,
  };
}

/**
 * Hook for export/import operations
 */
export function useExportImport() {
  const exportData = useCallback(async () => {
    try {
      const data = await exportImportService.exportAll();
      return data;
    } catch (error) {
      toast.error("Failed to export data");
      throw error;
    }
  }, []);

  const exportToJSON = useCallback(async () => {
    try {
      const json = await exportImportService.exportToJSON();
      
      // Create and download file
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ballistics-backup-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("Data exported successfully");
    } catch (error) {
      toast.error("Failed to export data");
      throw error;
    }
  }, []);

  const importFromJSON = useCallback(async (json: string, merge: boolean = false) => {
    try {
      await exportImportService.importFromJSON(json, { merge });
      toast.success("Data imported successfully");
    } catch (error) {
      toast.error("Failed to import data");
      throw error;
    }
  }, []);

  const importFromFile = useCallback(async (file: File, merge: boolean = false) => {
    try {
      const text = await file.text();
      await importFromJSON(text, merge);
    } catch (error) {
      toast.error("Failed to import file");
      throw error;
    }
  }, [importFromJSON]);

  return {
    exportData,
    exportToJSON,
    importFromJSON,
    importFromFile,
  };
}
