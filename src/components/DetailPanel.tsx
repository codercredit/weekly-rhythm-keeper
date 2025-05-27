
import { useRoutine } from "@/contexts/RoutineContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditRoutineItemForm } from "./EditRoutineItemForm";
import { Trash2, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function DetailPanel() {
  const { selectedItem, setSelectedItem, deleteRoutineItem } = useRoutine();
  const { user } = useAuth();
  
  if (!selectedItem || !user) return null;

  const handleClose = () => {
    setSelectedItem(null);
  };

  const handleDelete = async () => {
    await deleteRoutineItem(selectedItem.id);
    setSelectedItem(null);
  };

  const handleSuccess = () => {
    setSelectedItem(null);
  };

  const handleCancel = () => {
    setSelectedItem(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto overflow-hidden">
        <CardHeader className="relative pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>{selectedItem.title}</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <EditRoutineItemForm
            item={selectedItem}
            onCancel={handleCancel}
            onSuccess={handleSuccess}
          />
        </CardContent>
      </Card>
    </div>
  );
}
