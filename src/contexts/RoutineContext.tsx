
import React, { createContext, useContext, useEffect, useState } from "react";
import { RoutineItem, RoutineData, DEFAULT_ROUTINE_ITEMS, Note, WeekDay, TimeBlock, generateItemId } from "../types/routine";
import { toast } from "sonner";

interface RoutineContextType {
  routineData: RoutineData;
  selectedItem: RoutineItem | null;
  setSelectedItem: (item: RoutineItem | null) => void;
  addRoutineItem: (day: WeekDay, timeBlock: TimeBlock, title: string) => void;
  updateRoutineItem: (itemId: string, updates: Partial<RoutineItem>) => void;
  deleteRoutineItem: (itemId: string) => void;
  addNote: (itemId: string, content: string) => void;
  deleteNote: (itemId: string, noteId: string) => void;
  toggleCompleted: (itemId: string) => void;
  exportData: () => void;
}

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export function RoutineProvider({ children }: { children: React.ReactNode }) {
  const [routineData, setRoutineData] = useState<RoutineData>({ items: {} });
  const [selectedItem, setSelectedItem] = useState<RoutineItem | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("routineData");
    if (savedData) {
      try {
        setRoutineData(JSON.parse(savedData));
      } catch (error) {
        console.error("Failed to parse routine data:", error);
        initializeDefaultData();
      }
    } else {
      initializeDefaultData();
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(routineData.items).length) {
      localStorage.setItem("routineData", JSON.stringify(routineData));
    }
  }, [routineData]);

  function initializeDefaultData() {
    const itemsMap: Record<string, RoutineItem> = {};
    DEFAULT_ROUTINE_ITEMS.forEach(item => {
      itemsMap[item.id] = item;
    });
    
    setRoutineData({ items: itemsMap });
  }

  function addRoutineItem(day: WeekDay, timeBlock: TimeBlock, title: string) {
    const newItem: RoutineItem = {
      id: generateItemId(day, timeBlock),
      title,
      day,
      timeBlock,
      notes: [],
      completed: false
    };

    setRoutineData(prev => ({
      ...prev,
      items: {
        ...prev.items,
        [newItem.id]: newItem
      }
    }));

    toast.success("New routine item added");
  }

  function updateRoutineItem(itemId: string, updates: Partial<RoutineItem>) {
    setRoutineData(prev => {
      if (!prev.items[itemId]) return prev;

      return {
        ...prev,
        items: {
          ...prev.items,
          [itemId]: {
            ...prev.items[itemId],
            ...updates
          }
        }
      };
    });

    // If the selected item is being updated, update it as well
    if (selectedItem && selectedItem.id === itemId) {
      setSelectedItem(prev => prev ? { ...prev, ...updates } : null);
    }

    toast.success("Routine item updated");
  }

  function deleteRoutineItem(itemId: string) {
    setRoutineData(prev => {
      const newItems = { ...prev.items };
      delete newItems[itemId];
      return { ...prev, items: newItems };
    });

    // If the selected item is being deleted, clear it
    if (selectedItem && selectedItem.id === itemId) {
      setSelectedItem(null);
    }

    toast.success("Routine item deleted");
  }

  function addNote(itemId: string, content: string) {
    const newNote: Note = {
      id: `note-${new Date().getTime()}`,
      content,
      createdAt: new Date().toISOString()
    };

    setRoutineData(prev => {
      if (!prev.items[itemId]) return prev;

      return {
        ...prev,
        items: {
          ...prev.items,
          [itemId]: {
            ...prev.items[itemId],
            notes: [...prev.items[itemId].notes, newNote]
          }
        }
      };
    });

    // Update selected item if this note is for the selected item
    if (selectedItem && selectedItem.id === itemId) {
      setSelectedItem(prev => {
        if (!prev) return null;
        return {
          ...prev,
          notes: [...prev.notes, newNote]
        };
      });
    }

    toast.success("Note added");
  }

  function deleteNote(itemId: string, noteId: string) {
    setRoutineData(prev => {
      if (!prev.items[itemId]) return prev;

      return {
        ...prev,
        items: {
          ...prev.items,
          [itemId]: {
            ...prev.items[itemId],
            notes: prev.items[itemId].notes.filter(note => note.id !== noteId)
          }
        }
      };
    });

    // Update selected item if this note is being deleted from the selected item
    if (selectedItem && selectedItem.id === itemId) {
      setSelectedItem(prev => {
        if (!prev) return null;
        return {
          ...prev,
          notes: prev.notes.filter(note => note.id !== noteId)
        };
      });
    }

    toast.success("Note deleted");
  }

  function toggleCompleted(itemId: string) {
    setRoutineData(prev => {
      if (!prev.items[itemId]) return prev;

      return {
        ...prev,
        items: {
          ...prev.items,
          [itemId]: {
            ...prev.items[itemId],
            completed: !prev.items[itemId].completed
          }
        }
      };
    });

    // Update selected item if it's being toggled
    if (selectedItem && selectedItem.id === itemId) {
      setSelectedItem(prev => {
        if (!prev) return null;
        return {
          ...prev,
          completed: !prev.completed
        };
      });
    }

    toast.success("Status updated");
  }

  function exportData() {
    try {
      // Create text version of the data
      const dataStr = JSON.stringify(routineData, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      // Create and trigger download link
      const exportFileDefaultName = `weekly-routine-export-${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success("Data exported successfully");
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("Failed to export data");
    }
  }

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
