
import { RoutineItem } from "../types/routine";
import { toast } from "sonner";
import * as supabaseService from "../services/supabaseService";

interface UseStatusActionsProps {
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

export function useStatusActions({
  routineData,
  setRoutineData,
  selectedItem,
  setSelectedItem
}: UseStatusActionsProps) {
  
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

  return {
    toggleCompleted
  };
}
