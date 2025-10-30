"use client";

import React, { useRef, useState } from "react";
import { Database, Upload, Download, Trash2 } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { useExportImport } from "@/hooks/useDatabase";
import { getDatabaseStats, clearDatabase } from "@/lib/db";
import { toast } from "sonner";

export function DataManager() {
  const { exportToJSON, importFromFile } = useExportImport();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [stats, setStats] = useState<{
    profiles: number;
    history: number;
    weaponPresets: number;
    ammoPresets: number;
    atmospherePresets: number;
    total: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadStats = async () => {
    const dbStats = await getDatabaseStats();
    setStats(dbStats);
  };

  const handleExport = async () => {
    try {
      await exportToJSON();
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await importFromFile(file, false); // false = replace all data
      await loadStats();
    } catch (error) {
      console.error("Import error:", error);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleMergeImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await importFromFile(file, true); // true = merge with existing data
      await loadStats();
    } catch (error) {
      console.error("Import error:", error);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClearAll = async () => {
    if (
      !confirm(
        "Are you sure you want to clear ALL data? This will delete all profiles, history, and presets. This cannot be undone!"
      )
    ) {
      return;
    }

    try {
      await clearDatabase();
      await loadStats();
      toast.success("All data cleared");
    } catch (error) {
      console.error("Clear error:", error);
      toast.error("Failed to clear data");
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        if (open) {
          loadStats();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Database className="h-4 w-4" />
          Data
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Data Management</DialogTitle>
          <DialogDescription>
            Export, import, or clear your saved data
          </DialogDescription>
        </DialogHeader>

        {/* Statistics */}
        {stats && (
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-sm">Database Statistics</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Profiles:</div>
              <div className="font-medium">{stats.profiles}</div>
              <div>History:</div>
              <div className="font-medium">{stats.history}</div>
              <div>Weapon Presets:</div>
              <div className="font-medium">{stats.weaponPresets}</div>
              <div>Ammo Presets:</div>
              <div className="font-medium">{stats.ammoPresets}</div>
              <div>Atmosphere Presets:</div>
              <div className="font-medium">{stats.atmospherePresets}</div>
              <div className="border-t pt-2 font-semibold">Total Records:</div>
              <div className="border-t pt-2 font-semibold">{stats.total}</div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-4">
          {/* Export */}
          <div className="space-y-2">
            <Label>Export Data</Label>
            <Button onClick={handleExport} className="w-full" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export All Data to JSON
            </Button>
            <p className="text-xs text-muted-foreground">
              Download all your data as a JSON backup file
            </p>
          </div>

          {/* Import */}
          <div className="space-y-2">
            <Label>Import Data</Label>
            <div className="flex gap-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
                variant="outline"
              >
                <Upload className="h-4 w-4 mr-2" />
                Replace All
              </Button>
              <Button
                onClick={() => {
                  // Create a temporary input for merge
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "application/json";
                  input.onchange = handleMergeImport as unknown as ((this: GlobalEventHandlers, ev: Event) => void);
                  input.click();
                }}
                className="flex-1"
                variant="outline"
              >
                <Upload className="h-4 w-4 mr-2" />
                Merge
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              onChange={handleImport}
              className="hidden"
            />
            <p className="text-xs text-muted-foreground">
              Import data from a backup file. &quot;Replace All&quot; will delete existing data,
              &quot;Merge&quot; will add to existing data.
            </p>
          </div>

          {/* Clear */}
          <div className="space-y-2">
            <Label className="text-destructive">Danger Zone</Label>
            <Button onClick={handleClearAll} className="w-full" variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Data
            </Button>
            <p className="text-xs text-muted-foreground">
              Permanently delete all profiles, history, and presets. This cannot be undone!
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
