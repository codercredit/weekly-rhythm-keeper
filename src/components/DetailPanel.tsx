
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto overflow-hidden shadow-2xl border-0 bg-background/95 backdrop-blur">
        <CardHeader className="relative pb-3 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">{selectedItem.title}</CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground hover:bg-muted h-8 w-8"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
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
