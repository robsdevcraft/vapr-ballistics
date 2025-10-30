"use client";

import React, { useState } from "react";
import { History, Trash2, Search, Download } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useHistory } from "@/hooks/useDatabase";
import type { CalculationHistory } from "@/lib/db/schema";

interface HistoryViewerProps {
  onLoadHistory: (entry: CalculationHistory) => void;
}

export function HistoryViewer({ onLoadHistory }: HistoryViewerProps) {
  const { history, remove, clear, search } = useHistory(50); // Limit to last 50
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CalculationHistory[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<CalculationHistory | null>(null);

  const handleLoad = (entry: CalculationHistory) => {
    onLoadHistory(entry);
    setDialogOpen(false);
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this history entry?")) {
      await remove(id);
    }
  };

  const handleClearAll = async () => {
    if (confirm("Are you sure you want to clear all history? This cannot be undone.")) {
      await clear();
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const results = await search(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const displayHistory = searchResults.length > 0 ? searchResults : history || [];

  const exportHistoryToCSV = (entry: CalculationHistory) => {
    // Create CSV content from trajectory data
    const headers = ["Distance (yd)", "Drop (mils)", "Windage (mils)", "Velocity (fps)", "Energy (ft-lb)", "Time (s)"];
    
    const rows = entry.response.trajectory.map((point) => [
      point.distance.toFixed(0),
      point.drop_adjustment.toFixed(2),
      point.windage_adjustment.toFixed(2),
      point.velocity.toFixed(0),
      point.energy.toFixed(0),
      point.time.toFixed(3),
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    // Download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `history-${entry.id}-${new Date(entry.timestamp).toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            History
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Calculation History</DialogTitle>
            <DialogDescription>
              View and load previous calculations. Click on an entry to see details.
            </DialogDescription>
          </DialogHeader>

          {/* Search and Actions */}
          <div className="flex gap-2">
            <Input
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button onClick={handleClearAll} variant="destructive" size="sm">
              Clear All
            </Button>
          </div>

          {/* History List */}
          <div className="flex-1 overflow-y-auto">
            {displayHistory.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No calculation history yet. Run a calculation to see it here!
              </p>
            ) : (
              <div className="space-y-2">
                {displayHistory.map((entry) => (
                  <Card
                    key={entry.id}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setSelectedEntry(entry)}
                  >
                    <CardContent className="p-3 flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">
                            {entry.name || `Calculation ${entry.id}`}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1 grid grid-cols-2 gap-2">
                          <span>BC: {entry.request.ammo.bc} ({entry.request.ammo.drag_model})</span>
                          <span>MV: {entry.request.ammo.muzzle_velocity} fps</span>
                          <span>Zero: {entry.request.zero_distance} yd</span>
                          <span>Range: {entry.request.max_range} yd</span>
                        </div>
                        {entry.notes && (
                          <p className="text-sm text-muted-foreground mt-1">{entry.notes}</p>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            exportHistoryToCSV(entry);
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLoad(entry);
                          }}
                        >
                          Load
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleDelete(entry.id!, e)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Entry Detail Dialog */}
      {selectedEntry && (
        <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>{selectedEntry.name || `Calculation ${selectedEntry.id}`}</DialogTitle>
              <DialogDescription>
                {new Date(selectedEntry.timestamp).toLocaleString()}
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto space-y-4">
              {/* Summary */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Ballistic Coefficient:</span> {selectedEntry.request.ammo.bc}
                </div>
                <div>
                  <span className="font-medium">Drag Model:</span> {selectedEntry.request.ammo.drag_model}
                </div>
                <div>
                  <span className="font-medium">Muzzle Velocity:</span> {selectedEntry.request.ammo.muzzle_velocity} fps
                </div>
                <div>
                  <span className="font-medium">Zero Distance:</span> {selectedEntry.request.zero_distance} yd
                </div>
                <div>
                  <span className="font-medium">Max Range:</span> {selectedEntry.request.max_range} yd
                </div>
                <div>
                  <span className="font-medium">Step Size:</span> {selectedEntry.request.step_size} yd
                </div>
              </div>

              {/* Trajectory Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Distance</TableHead>
                      <TableHead>Drop</TableHead>
                      <TableHead>Windage</TableHead>
                      <TableHead>Velocity</TableHead>
                      <TableHead>Energy</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedEntry.response.trajectory.slice(0, 10).map((point, index) => (
                      <TableRow key={index}>
                        <TableCell>{point.distance.toFixed(0)} yd</TableCell>
                        <TableCell>{point.drop_adjustment.toFixed(2)} mils</TableCell>
                        <TableCell>{point.windage_adjustment.toFixed(2)} mils</TableCell>
                        <TableCell>{point.velocity.toFixed(0)} fps</TableCell>
                        <TableCell>{point.energy.toFixed(0)} ft-lb</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {selectedEntry.response.trajectory.length > 10 && (
                  <p className="text-xs text-muted-foreground text-center py-2">
                    Showing first 10 of {selectedEntry.response.trajectory.length} points
                  </p>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button onClick={() => exportHistoryToCSV(selectedEntry)} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button onClick={() => handleLoad(selectedEntry)}>Load This Calculation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
