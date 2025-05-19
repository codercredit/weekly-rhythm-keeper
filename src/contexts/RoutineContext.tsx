
import React, { createContext, useContext } from "react";
import { RoutineItem, RoutineData, WeekDay, TimeBlock } from "../types/routine";
import { useRoutineData } from "../hooks/useRoutineData";
import { useRoutineActions } from "../hooks/useRoutineActions";
import { useNotesActions } from "../hooks/useNotesActions";
import { useStatusActions } from "../hooks/useStatusActions";
import { exportRoutineData } from "../utils/exportUtils";

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
}

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export function RoutineProvider({ children }: { children: React.ReactNode }) {
  const { routineData, setRoutineData, selectedItem, setSelectedItem } = useRoutineData();
  
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
  
  const exportData = () => exportRoutineData(routineData);

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
      exportData
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
