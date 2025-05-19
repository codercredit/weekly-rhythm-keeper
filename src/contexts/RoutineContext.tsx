
import React, { createContext, useContext, useEffect, useState } from "react";
import { RoutineItem, RoutineData, Note, WeekDay, TimeBlock } from "../types/routine";
import { toast } from "sonner";
import * as supabaseService from "../services/supabaseService";

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
  const [routineData, setRoutineData] = useState<RoutineData>({ items: {}, isLoading: true });
  const [selectedItem, setSelectedItem] = useState<RoutineItem | null>(null);

  // Load data from Supabase on mount
  useEffect(() => {
    async function loadData() {
      try {
        setRoutineData(prev => ({ ...prev, isLoading: true }));
        const items = await supabaseService.fetchRoutineItems();
        
        const itemsMap: Record<string, RoutineItem> = {};
        items.forEach(item => {
          itemsMap[item.id] = item;
        });
        
        setRoutineData({ items: itemsMap, isLoading: false });
      } catch (error) {
        console.error("Failed to load routine data:", error);
        toast.error("Failed to load your routine data");
        setRoutineData(prev => ({ ...prev, isLoading: false }));
      }
    }
    
    loadData();
  }, []);

  // Load notes for selected item
  useEffect(() => {
    if (selectedItem) {
      async function loadNotes() {
        try {
          const notes = await supabaseService.fetchNotes(selectedItem.id);
          setSelectedItem(prev => prev ? { ...prev, notes } : null);
        } catch (error) {
          console.error("Failed to load notes:", error);
          toast.error("Failed to load notes");
        }
      }
      
      loadNotes();
    }
  }, [selectedItem?.id]);

  async function addRoutineItem(day: WeekDay, timeBlock: TimeBlock, title: string) {
    try {
      const newItem = await supabaseService.addRoutineItem({
        title,
        day,
        timeBlock,
        completed: false
      });

      setRoutineData(prev => ({
        ...prev,
        items: {
          ...prev.items,
          [newItem.id]: newItem
        }
      }));

      toast.success("New routine item added");
    } catch (error) {
      console.error("Failed to add routine item:", error);
      toast.error("Failed to add routine item");
    }
  }

  async function updateRoutineItem(itemId: string, updates: Partial<RoutineItem>) {
    try {
      await supabaseService.updateRoutineItem(itemId, updates);

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
    } catch (error) {
      console.error("Failed to update routine item:", error);
      toast.error("Failed to update routine item");
    }
  }

  async function deleteRoutineItem(itemId: string) {
    try {
      await supabaseService.deleteRoutineItem(itemId);

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
    } catch (error) {
      console.error("Failed to delete routine item:", error);
      toast.error("Failed to delete routine item");
    }
  }

  async function addNote(itemId: string, content: string) {
    try {
      const newNote = await supabaseService.addNote(itemId, content);

      setRoutineData(prev => {
        if (!prev.items[itemId]) return prev;

        return {
          ...prev,
          items: {
            ...prev.items,
            [itemId]: {
              ...prev.items[itemId],
              notes: [...(prev.items[itemId].notes || []), newNote]
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
    } catch (error) {
      console.error("Failed to add note:", error);
      toast.error("Failed to add note");
    }
  }

  async function deleteNote(itemId: string, noteId: string) {
    try {
      await supabaseService.deleteNote(noteId);

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
    } catch (error) {
      console.error("Failed to delete note:", error);
      toast.error("Failed to delete note");
    }
  }

  async function toggleCompleted(itemId: string) {
    try {
      const currentItem = routineData.items[itemId];
      if (!currentItem) return;
      
      const newCompletedState = !currentItem.completed;
      await supabaseService.toggleCompleted(itemId, newCompletedState);

      setRoutineData(prev => {
        if (!prev.items[itemId]) return prev;

        return {
          ...prev,
          items: {
            ...prev.items,
            [itemId]: {
              ...prev.items[itemId],
              completed: newCompletedState
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
            completed: newCompletedState
          };
        });
      }

      toast.success(newCompletedState ? "Marked as completed" : "Marked as incomplete");
    } catch (error) {
      console.error("Failed to toggle completed status:", error);
      toast.error("Failed to update status");
    }
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
