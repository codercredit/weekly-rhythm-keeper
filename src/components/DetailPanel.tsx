
import { useState } from "react";
import { format } from "date-fns";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useRoutine } from "@/contexts/RoutineContext";
import { Check, Trash, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TimeBlock, WeekDay } from "@/types/routine";

export function DetailPanel() {
  const { selectedItem, setSelectedItem, addNote, deleteNote, toggleCompleted, deleteRoutineItem } = useRoutine();
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (selectedItem && newNote.trim()) {
      addNote(selectedItem.id, newNote);
      setNewNote("");
    }
  };

  const formatDay = (day: WeekDay) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  const formatTimeBlock = (timeBlock: TimeBlock) => {
    return timeBlock.charAt(0).toUpperCase() + timeBlock.slice(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy 'at' h:mm a");
  };

  return (
    <Sheet open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        {selectedItem && (
          <>
            <SheetHeader>
              <SheetTitle className="flex justify-between items-center">
                <span>{selectedItem.title}</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleCompleted(selectedItem.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      deleteRoutineItem(selectedItem.id);
                      setSelectedItem(null);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedItem(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </SheetTitle>
              <div className="text-muted-foreground">
                {formatDay(selectedItem.day)} • {formatTimeBlock(selectedItem.timeBlock)}
              </div>
              {selectedItem.completed && (
                <div className="text-primary font-medium">Completed</div>
              )}
            </SheetHeader>

            <div className="mt-6">
              <h3 className="mb-2 font-medium">Add Note</h3>
              <Textarea 
                placeholder="Add your notes here..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="min-h-[100px]"
              />
              <Button onClick={handleAddNote} className="mt-2 w-full">
                Save Note
              </Button>
            </div>

            <Separator className="my-6" />

            <h3 className="mb-4 font-medium">Notes History</h3>
            {selectedItem.notes.length > 0 ? (
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {[...selectedItem.notes].reverse().map((note) => (
                    <Card key={note.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="text-xs text-muted-foreground mb-2">
                            {formatDate(note.createdAt)}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => deleteNote(selectedItem.id, note.id)}
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No notes yet. Add your first note above.
              </div>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
