
import { RoutineItem, WeekDay, TimeBlock, Note } from "../types/routine";
import { toast } from "sonner";
import * as supabaseService from "../services/supabaseService";

interface UseRoutineActionsProps {
  routineData: {
    items: Record<string, RoutineItem>;
    isLoading: boolean;
  };
  setRoutineData: React.Dispatch<React.SetStateAction<{
    items: Record<string, RoutineItem>;
    isLoading: boolean;
  }>>;
  selectedItem: RoutineItem | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<RoutineItem | null>>;
}

export function useRoutineActions({
  routineData,
  setRoutineData,
  selectedItem,
  setSelectedItem
}: UseRoutineActionsProps) {
  
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

  return {
    addRoutineItem,
    updateRoutineItem,
    deleteRoutineItem,
  };
}
