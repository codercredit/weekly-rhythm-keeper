
import React, { createContext, useContext, useState } from "react";
import { RoutineItem, RoutineData, WeekDay, TimeBlock } from "../types/routine";
import { useRoutineData } from "../hooks/useRoutineData";
import { useRoutineActions } from "../hooks/useRoutineActions";
import { useNotesActions } from "../hooks/useNotesActions";
import { useStatusActions } from "../hooks/useStatusActions";
import { exportRoutineData } from "../utils/exportUtils";
import { toast } from "sonner";

interface RoutineContextType {
  routineData: RoutineData;
  selectedItem: RoutineItem | null;
  setSelectedItem: (item: RoutineItem | null) => void;
  addRoutineItem: (day: WeekDay, timeBlock: TimeBlock, title: string) => Promise<void>;
  updateRoutineItem: (itemId: string, updates: Partial<RoutineItem>) => Promise<void>;
  deleteRoutineItem: (itemId: string) => Promise<void>;
  addNote: (itemId: string, content: string) => Promise<void>;
  deleteNote: (itemId: string, noteId: string) => Promise<void>;
  toggleCompleted: (itemId: string) => Promise<void>;
  exportData: () => void;
  toggleCategoryFilter: () => void;
  toggleCompletedFilter: () => void;
  showCategoryFilter: boolean;
  showCompletedOnly: boolean;
}

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export function RoutineProvider({ children }: { children: React.ReactNode }) {
  const { routineData, setRoutineData, selectedItem, setSelectedItem } = useRoutineData();
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  
  const { addRoutineItem, updateRoutineItem, deleteRoutineItem } = useRoutineActions({
    routineData,
    setRoutineData,
    selectedItem,
    setSelectedItem
  });
  
  const { addNote, deleteNote } = useNotesActions({
    routineData,
    setRoutineData,
    selectedItem,
    setSelectedItem
  });
  
  const { toggleCompleted } = useStatusActions({
    routineData,
    setRoutineData,
    selectedItem,
    setSelectedItem
  });
  
  const exportData = () => {
    exportRoutineData(routineData);
    toast.success("Data exported successfully");
  };

  const toggleCategoryFilter = () => {
    setShowCategoryFilter(prev => !prev);
    toast.info(`Category filter ${!showCategoryFilter ? 'enabled' : 'disabled'}`);
  };

  const toggleCompletedFilter = () => {
    setShowCompletedOnly(prev => !prev);
    toast.info(`${!showCompletedOnly ? 'Showing completed tasks only' : 'Showing all tasks'}`);
  };

  return (
    <RoutineContext.Provider value={{
      routineData,
      selectedItem,
      setSelectedItem,
      addRoutineItem,
      updateRoutineItem,
      deleteRoutineItem,
      addNote,
      deleteNote,
      toggleCompleted,
      exportData,
      toggleCategoryFilter,
      toggleCompletedFilter,
      showCategoryFilter,
      showCompletedOnly
    }}>
      {children}
    </RoutineContext.Provider>
  );
}

export function useRoutine() {
  const context = useContext(RoutineContext);
  if (context === undefined) {
    throw new Error("useRoutine must be used within a RoutineProvider");
  }
  return context;
}
