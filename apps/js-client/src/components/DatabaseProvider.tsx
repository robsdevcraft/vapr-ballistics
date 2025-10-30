"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeDatabase, isIndexedDBSupported } from "@/lib/db";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface DatabaseContextValue {
  isSupported: boolean;
  isInitialized: boolean;
  error: string | null;
}

const DatabaseContext = createContext<DatabaseContextValue>({
  isSupported: false,
  isInitialized: false,
  error: null,
});

export function useDatabaseContext() {
  return useContext(DatabaseContext);
}

interface DatabaseProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component that initializes the database and provides context
 * Shows error UI if IndexedDB is not supported
 */
export function DatabaseProvider({ children }: DatabaseProviderProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      // Check if IndexedDB is supported
      const supported = isIndexedDBSupported();
      setIsSupported(supported);

      if (!supported) {
        setError(
          "Your browser doesn't support IndexedDB. Some features like saving profiles and history will not work."
        );
        return;
      }

      try {
        await initializeDatabase();
        setIsInitialized(true);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to initialize database";
        setError(message);
        console.error("Database initialization error:", err);
      }
    }

    init();
  }, []);

  const value: DatabaseContextValue = {
    isSupported,
    isInitialized,
    error,
  };

  // Show warning if database is not supported, but still render children
  if (!isSupported) {
    return (
      <DatabaseContext.Provider value={value}>
        <div className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Your browser doesn&apos;t support offline storage. Profile saving, history, and presets
              will not be available. The calculator will still work normally.
            </AlertDescription>
          </Alert>
          {children}
        </div>
      </DatabaseContext.Provider>
    );
  }

  // Show error if initialization failed
  if (error && isSupported) {
    return (
      <DatabaseContext.Provider value={value}>
        <div className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Database error: {error}. Some features may not work properly.
            </AlertDescription>
          </Alert>
          {children}
        </div>
      </DatabaseContext.Provider>
    );
  }

  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
}
