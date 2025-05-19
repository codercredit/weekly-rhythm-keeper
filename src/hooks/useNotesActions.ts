
import { RoutineItem, Note } from "../types/routine";
import { toast } from "sonner";
import * as supabaseService from "../services/supabaseService";

interface UseNotesActionsProps {
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

export function useNotesActions({
  routineData,
  setRoutineData,
  selectedItem,
  setSelectedItem
}: UseNotesActionsProps) {
  
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

  return {
    addNote,
    deleteNote
  };
}
