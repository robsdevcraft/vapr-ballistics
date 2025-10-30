"use client";

import React, { useState } from "react";
import { Library, Plus, Star, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWeaponPresets, useAmmoPresets, useAtmospherePresets } from "@/hooks/useDatabase";
import type { WeaponPreset, AmmoPreset, AtmospherePreset } from "@/lib/db/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PresetLibraryProps {
  onLoadWeapon?: (preset: WeaponPreset) => void;
  onLoadAmmo?: (preset: AmmoPreset) => void;
  onLoadAtmosphere?: (preset: AtmospherePreset) => void;
  currentWeapon?: { sight_height: number; twist?: number };
  currentAmmo?: {
    bc: number;
    drag_model: "G1" | "G7";
    muzzle_velocity: number;
    bullet_weight?: number;
  };
}

export function PresetLibrary({
  onLoadWeapon,
  onLoadAmmo,
  onLoadAtmosphere,
  currentWeapon,
  currentAmmo,
}: PresetLibraryProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"weapon" | "ammo" | "atmosphere">("weapon");

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Library className="h-4 w-4" />
          Presets
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Preset Library</DialogTitle>
          <DialogDescription>
            Save and load weapon, ammo, and atmospheric presets
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "weapon" | "ammo" | "atmosphere")} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weapon">Weapons</TabsTrigger>
            <TabsTrigger value="ammo">Ammunition</TabsTrigger>
            <TabsTrigger value="atmosphere">Atmosphere</TabsTrigger>
          </TabsList>

          <TabsContent value="weapon" className="flex-1 overflow-y-auto mt-4">
            <WeaponPresetManager
              onLoad={(preset: WeaponPreset) => {
                onLoadWeapon?.(preset);
                setDialogOpen(false);
              }}
              currentWeapon={currentWeapon}
            />
          </TabsContent>

          <TabsContent value="ammo" className="flex-1 overflow-y-auto mt-4">
            <AmmoPresetManager
              onLoad={(preset: AmmoPreset) => {
                onLoadAmmo?.(preset);
                setDialogOpen(false);
              }}
              currentAmmo={currentAmmo}
            />
          </TabsContent>

          <TabsContent value="atmosphere" className="flex-1 overflow-y-auto mt-4">
            <AtmospherePresetManager
              onLoad={(preset: AtmospherePreset) => {
                onLoadAtmosphere?.(preset);
                setDialogOpen(false);
              }}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function WeaponPresetManager({
  onLoad,
  currentWeapon,
}: {
  onLoad: (preset: WeaponPreset) => void;
  currentWeapon?: { sight_height: number; twist?: number };
}) {
  const { presets, favorites, create, remove, toggleFavorite, search } = useWeaponPresets();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    model: "",
    caliber: "",
    sight_height: currentWeapon?.sight_height || 2.0,
    twist: currentWeapon?.twist || 8.0,
    description: "",
  });

  const handleSave = async () => {
    if (!formData.name.trim()) return;

    await create({
      name: formData.name,
      manufacturer: formData.manufacturer || undefined,
      model: formData.model || undefined,
      caliber: formData.caliber || undefined,
      sight_height: formData.sight_height,
      twist: formData.twist || undefined,
      description: formData.description || undefined,
      tags: [],
      isFavorite: false,
    });

    setFormData({
      name: "",
      manufacturer: "",
      model: "",
      caliber: "",
      sight_height: 2.0,
      twist: 8.0,
      description: "",
    });
    setAddDialogOpen(false);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await search(searchQuery);
    }
  };

  const displayPresets = presets || [];

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="flex gap-2">
        <Input
          placeholder="Search weapons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} size="sm">
          <Search className="h-4 w-4" />
        </Button>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Weapon Preset</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., AR-15 Platform"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Manufacturer</Label>
                  <Input
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Model</Label>
                  <Input
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Caliber</Label>
                <Input
                  value={formData.caliber}
                  onChange={(e) => setFormData({ ...formData, caliber: e.target.value })}
                  placeholder="e.g., 6.5 Creedmoor"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Sight Height (inches) *</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.sight_height}
                    onChange={(e) =>
                      setFormData({ ...formData, sight_height: parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Barrel Twist (inches)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.twist}
                    onChange={(e) =>
                      setFormData({ ...formData, twist: parseFloat(e.target.value) })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!formData.name.trim()}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Favorites */}
      {favorites && favorites.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Star className="h-4 w-4 fill-current" />
            Favorites
          </h3>
          <div className="space-y-2">
            {favorites.map((preset) => (
              <WeaponPresetCard
                key={preset.id}
                preset={preset}
                onLoad={onLoad}
                onDelete={(id) => remove(id)}
                onToggleFavorite={(id) => toggleFavorite(id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Presets */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">All Weapons</h3>
        {displayPresets.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No weapon presets yet. Add your first weapon!
          </p>
        ) : (
          <div className="space-y-2">
            {displayPresets.map((preset) => (
              <WeaponPresetCard
                key={preset.id}
                preset={preset}
                onLoad={onLoad}
                onDelete={(id) => remove(id)}
                onToggleFavorite={(id) => toggleFavorite(id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WeaponPresetCard({
  preset,
  onLoad,
  onDelete,
  onToggleFavorite,
}: {
  preset: WeaponPreset;
  onLoad: (preset: WeaponPreset) => void;
  onDelete: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}) {
  return (
    <Card className="cursor-pointer hover:bg-accent transition-colors" onClick={() => onLoad(preset)}>
      <CardContent className="p-3 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{preset.name}</h4>
            {preset.isFavorite && <Star className="h-3 w-3 fill-current text-yellow-500" />}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {preset.manufacturer && <span>{preset.manufacturer} </span>}
            {preset.model && <span>- {preset.model} </span>}
            {preset.caliber && <Badge variant="secondary">{preset.caliber}</Badge>}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Sight Height: {preset.sight_height}&quot; • Twist: {preset.twist || "N/A"}&quot;
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(preset.id!);
            }}
          >
            <Star
              className={`h-4 w-4 ${preset.isFavorite ? "fill-current text-yellow-500" : ""}`}
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("Delete this preset?")) onDelete(preset.id!);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AmmoPresetManager({
  onLoad,
  currentAmmo,
}: {
  onLoad: (preset: AmmoPreset) => void;
  currentAmmo?: { bc: number; drag_model: "G1" | "G7"; muzzle_velocity: number; bullet_weight?: number };
}) {
  const { presets, favorites, create, remove, toggleFavorite, search } = useAmmoPresets();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    model: "",
    caliber: "",
    bc: currentAmmo?.bc || 0.326,
    drag_model: currentAmmo?.drag_model || "G7" as "G1" | "G7",
    muzzle_velocity: currentAmmo?.muzzle_velocity || 2750,
    bullet_weight: currentAmmo?.bullet_weight || 140,
    description: "",
  });

  const handleSave = async () => {
    if (!formData.name.trim()) return;

    await create({
      name: formData.name,
      manufacturer: formData.manufacturer || undefined,
      model: formData.model || undefined,
      caliber: formData.caliber || undefined,
      bc: formData.bc,
      drag_model: formData.drag_model,
      muzzle_velocity: formData.muzzle_velocity,
      bullet_weight: formData.bullet_weight || undefined,
      description: formData.description || undefined,
      tags: [],
      isFavorite: false,
    });

    setFormData({
      name: "",
      manufacturer: "",
      model: "",
      caliber: "",
      bc: 0.326,
      drag_model: "G7",
      muzzle_velocity: 2750,
      bullet_weight: 140,
      description: "",
    });
    setAddDialogOpen(false);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await search(searchQuery);
    }
  };

  const displayPresets = presets || [];

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="flex gap-2">
        <Input
          placeholder="Search ammo..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} size="sm">
          <Search className="h-4 w-4" />
        </Button>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Ammo Preset</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Hornady ELD Match"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Manufacturer</Label>
                  <Input
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Model</Label>
                  <Input
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Caliber</Label>
                <Input
                  value={formData.caliber}
                  onChange={(e) => setFormData({ ...formData, caliber: e.target.value })}
                  placeholder="e.g., 6.5 Creedmoor"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Ballistic Coefficient *</Label>
                  <Input
                    type="number"
                    step="0.001"
                    value={formData.bc}
                    onChange={(e) => setFormData({ ...formData, bc: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Drag Model *</Label>
                  <Select
                    value={formData.drag_model}
                    onValueChange={(v) => setFormData({ ...formData, drag_model: v as "G1" | "G7" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="G1">G1</SelectItem>
                      <SelectItem value="G7">G7</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Muzzle Velocity (fps) *</Label>
                  <Input
                    type="number"
                    step="1"
                    value={formData.muzzle_velocity}
                    onChange={(e) =>
                      setFormData({ ...formData, muzzle_velocity: parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Bullet Weight (grains)</Label>
                  <Input
                    type="number"
                    step="1"
                    value={formData.bullet_weight}
                    onChange={(e) =>
                      setFormData({ ...formData, bullet_weight: parseFloat(e.target.value) })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!formData.name.trim()}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Favorites */}
      {favorites && favorites.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Star className="h-4 w-4 fill-current" />
            Favorites
          </h3>
          <div className="space-y-2">
            {favorites.map((preset) => (
              <AmmoPresetCard
                key={preset.id}
                preset={preset}
                onLoad={onLoad}
                onDelete={(id) => remove(id)}
                onToggleFavorite={(id) => toggleFavorite(id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Presets */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">All Ammunition</h3>
        {displayPresets.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No ammo presets yet. Add your first ammo!
          </p>
        ) : (
          <div className="space-y-2">
            {displayPresets.map((preset) => (
              <AmmoPresetCard
                key={preset.id}
                preset={preset}
                onLoad={onLoad}
                onDelete={(id) => remove(id)}
                onToggleFavorite={(id) => toggleFavorite(id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AmmoPresetCard({
  preset,
  onLoad,
  onDelete,
  onToggleFavorite,
}: {
  preset: AmmoPreset;
  onLoad: (preset: AmmoPreset) => void;
  onDelete: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}) {
  return (
    <Card className="cursor-pointer hover:bg-accent transition-colors" onClick={() => onLoad(preset)}>
      <CardContent className="p-3 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{preset.name}</h4>
            {preset.isFavorite && <Star className="h-3 w-3 fill-current text-yellow-500" />}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {preset.manufacturer && <span>{preset.manufacturer} </span>}
            {preset.model && <span>- {preset.model} </span>}
            {preset.caliber && <Badge variant="secondary">{preset.caliber}</Badge>}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            BC: {preset.bc} ({preset.drag_model}) • MV: {preset.muzzle_velocity} fps • Weight: {preset.bullet_weight || "N/A"} gr
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(preset.id!);
            }}
          >
            <Star
              className={`h-4 w-4 ${preset.isFavorite ? "fill-current text-yellow-500" : ""}`}
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("Delete this preset?")) onDelete(preset.id!);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AtmospherePresetManager({ onLoad }: { onLoad: (preset: AtmospherePreset) => void }) {
  const { presets, favorites, create, remove, toggleFavorite } = useAtmospherePresets();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    temperature: 59,
    pressure: 29.92,
    humidity: 0.0,
    altitude: 0,
  });

  const handleSave = async () => {
    if (!formData.name.trim()) return;

    await create({
      name: formData.name,
      description: formData.description || undefined,
      temperature: formData.temperature,
      pressure: formData.pressure,
      humidity: formData.humidity,
      altitude: formData.altitude,
      isFavorite: false,
    });

    setFormData({
      name: "",
      description: "",
      temperature: 59,
      pressure: 29.92,
      humidity: 0.0,
      altitude: 0,
    });
    setAddDialogOpen(false);
  };

  const displayPresets = presets || [];

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="flex gap-2 justify-end">
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Atmosphere Preset</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Mountain Conditions"
                />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Temperature (°F) *</Label>
                  <Input
                    type="number"
                    value={formData.temperature}
                    onChange={(e) =>
                      setFormData({ ...formData, temperature: parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Pressure (inHg) *</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.pressure}
                    onChange={(e) =>
                      setFormData({ ...formData, pressure: parseFloat(e.target.value) })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Humidity (0-1) *</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.humidity}
                    onChange={(e) =>
                      setFormData({ ...formData, humidity: parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Altitude (feet) *</Label>
                  <Input
                    type="number"
                    value={formData.altitude}
                    onChange={(e) =>
                      setFormData({ ...formData, altitude: parseFloat(e.target.value) })
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!formData.name.trim()}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Favorites */}
      {favorites && favorites.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Star className="h-4 w-4 fill-current" />
            Favorites
          </h3>
          <div className="space-y-2">
            {favorites.map((preset) => (
              <AtmospherePresetCard
                key={preset.id}
                preset={preset}
                onLoad={onLoad}
                onDelete={(id) => remove(id)}
                onToggleFavorite={(id) => toggleFavorite(id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Presets */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">All Conditions</h3>
        {displayPresets.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No atmosphere presets yet. Some defaults should have been added!
          </p>
        ) : (
          <div className="space-y-2">
            {displayPresets.map((preset) => (
              <AtmospherePresetCard
                key={preset.id}
                preset={preset}
                onLoad={onLoad}
                onDelete={(id) => remove(id)}
                onToggleFavorite={(id) => toggleFavorite(id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AtmospherePresetCard({
  preset,
  onLoad,
  onDelete,
  onToggleFavorite,
}: {
  preset: AtmospherePreset;
  onLoad: (preset: AtmospherePreset) => void;
  onDelete: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}) {
  return (
    <Card className="cursor-pointer hover:bg-accent transition-colors" onClick={() => onLoad(preset)}>
      <CardContent className="p-3 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{preset.name}</h4>
            {preset.isFavorite && <Star className="h-3 w-3 fill-current text-yellow-500" />}
          </div>
          {preset.description && (
            <p className="text-sm text-muted-foreground mt-1">{preset.description}</p>
          )}
          <div className="text-xs text-muted-foreground mt-1">
            {preset.temperature}°F • {preset.pressure} inHg • {(preset.humidity * 100).toFixed(0)}% humidity • {preset.altitude} ft
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(preset.id!);
            }}
          >
            <Star
              className={`h-4 w-4 ${preset.isFavorite ? "fill-current text-yellow-500" : ""}`}
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("Delete this preset?")) onDelete(preset.id!);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
