"use client";

import React, { useState } from "react";
import { Save, FolderOpen, Star, Trash2, Search } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProfiles } from "@/hooks/useDatabase";
import type { CalculationRequest } from "@/lib/ballistics";
import type { CalculationProfile } from "@/lib/db/schema";

interface ProfileManagerProps {
  currentData: CalculationRequest;
  onLoadProfile: (profile: CalculationProfile) => void;
}

export function ProfileManager({ currentData, onLoadProfile }: ProfileManagerProps) {
  const { profiles, favorites, create, remove, toggleFavorite, search } = useProfiles();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CalculationProfile[]>([]);

  const handleSave = async () => {
    if (!profileName.trim()) return;

    await create({
      name: profileName,
      description: profileDescription || undefined,
      request: currentData,
      tags: [],
      isFavorite: false,
    });

    setProfileName("");
    setProfileDescription("");
    setSaveDialogOpen(false);
  };

  const handleLoad = (profile: CalculationProfile) => {
    onLoadProfile(profile);
    setLoadDialogOpen(false);
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this profile?")) {
      await remove(id);
    }
  };

  const handleFavorite = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleFavorite(id);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const results = await search(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const displayProfiles = searchResults.length > 0 ? searchResults : profiles || [];

  return (
    <div className="flex gap-2">
      {/* Save Profile Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Profile
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Calculation Profile</DialogTitle>
            <DialogDescription>
              Save your current configuration for quick access later.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="profile-name">Profile Name *</Label>
              <Input
                id="profile-name"
                placeholder="e.g., 6.5 Creedmoor 100yd Zero"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profile-description">Description (optional)</Label>
              <Input
                id="profile-description"
                placeholder="Add notes about this profile"
                value={profileDescription}
                onChange={(e) => setProfileDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!profileName.trim()}>
              Save Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load Profile Dialog */}
      <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            Load Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Load Calculation Profile</DialogTitle>
            <DialogDescription>
              Select a saved profile to load its configuration.
            </DialogDescription>
          </DialogHeader>

          {/* Search */}
          <div className="flex gap-2">
            <Input
              placeholder="Search profiles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} size="sm">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Favorites Section */}
          {favorites && favorites.length > 0 && searchResults.length === 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Star className="h-4 w-4 fill-current" />
                Favorites
              </h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {favorites.map((profile) => (
                  <Card
                    key={profile.id}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleLoad(profile)}
                  >
                    <CardContent className="p-3 flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{profile.name}</h4>
                        {profile.description && (
                          <p className="text-sm text-muted-foreground">{profile.description}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          Updated: {new Date(profile.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleFavorite(profile.id!, e)}
                        >
                          <Star className="h-4 w-4 fill-current" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleDelete(profile.id!, e)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Profiles */}
          <div className="space-y-2 flex-1 overflow-hidden flex flex-col">
            <h3 className="text-sm font-semibold">
              {searchResults.length > 0 ? "Search Results" : "All Profiles"}
            </h3>
            <div className="space-y-2 flex-1 overflow-y-auto">
              {displayProfiles.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  {searchResults.length === 0 && searchQuery
                    ? "No profiles found"
                    : "No profiles saved yet. Save your first profile!"}
                </p>
              ) : (
                displayProfiles.map((profile) => (
                  <Card
                    key={profile.id}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleLoad(profile)}
                  >
                    <CardContent className="p-3 flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{profile.name}</h4>
                          {profile.isFavorite && (
                            <Star className="h-3 w-3 fill-current text-yellow-500" />
                          )}
                        </div>
                        {profile.description && (
                          <p className="text-sm text-muted-foreground">{profile.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">
                            Updated: {new Date(profile.updatedAt).toLocaleDateString()}
                          </p>
                          {profile.tags && profile.tags.length > 0 && (
                            <div className="flex gap-1">
                              {profile.tags.map((tag, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleFavorite(profile.id!, e)}
                        >
                          <Star
                            className={`h-4 w-4 ${profile.isFavorite ? "fill-current text-yellow-500" : ""}`}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleDelete(profile.id!, e)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setLoadDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
