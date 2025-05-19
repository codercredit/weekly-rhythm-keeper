
import { useState, useEffect } from "react";
import { RoutineData, RoutineItem } from "../types/routine";
import { toast } from "sonner";
import * as supabaseService from "../services/supabaseService";

export function useRoutineData() {
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

  return {
    routineData,
    setRoutineData,
    selectedItem,
    setSelectedItem,
  };
}
