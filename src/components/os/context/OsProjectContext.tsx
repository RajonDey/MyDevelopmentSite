"use client";

import { createContext, useContext, useState, useCallback } from "react";

type OsProjectContextValue = {
  selectedProjectId: string | null;
  openProject: (id: string) => void;
  closeProject: () => void;
};

const OsProjectContext = createContext<OsProjectContextValue | null>(null);

export function OsProjectProvider({ children }: { children: React.ReactNode }) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const openProject = useCallback((id: string) => {
    setSelectedProjectId(id);
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProjectId(null);
  }, []);

  return (
    <OsProjectContext.Provider
      value={{ selectedProjectId, openProject, closeProject }}
    >
      {children}
    </OsProjectContext.Provider>
  );
}

export function useOsProject() {
  const ctx = useContext(OsProjectContext);
  if (!ctx) {
    throw new Error("useOsProject must be used within OsProjectProvider");
  }
  return ctx;
}
