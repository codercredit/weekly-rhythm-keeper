
import { RoutineData } from "../types/routine";
import { toast } from "sonner";

export function exportRoutineData(routineData: RoutineData) {
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
