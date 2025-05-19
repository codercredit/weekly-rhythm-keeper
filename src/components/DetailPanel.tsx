
import { useState } from "react";
import { format } from "date-fns";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useRoutine } from "@/contexts/RoutineContext";
import { Check, Edit, Trash, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TimeBlock, WeekDay } from "@/types/routine";
import { EditRoutineItemForm } from "./EditRoutineItemForm";

export function DetailPanel() {
  const { selectedItem, setSelectedItem, addNote, deleteNote, toggleCompleted, deleteRoutineItem } = useRoutine();
  const [newNote, setNewNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleAddNote = async () => {
    if (selectedItem && newNote.trim()) {
      await addNote(selectedItem.id, newNote);
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
            {isEditing ? (
              <>
                <SheetHeader>
                  <SheetTitle>Edit Routine Item</SheetTitle>
                </SheetHeader>
                <EditRoutineItemForm 
                  item={selectedItem}
                  onCancel={() => setIsEditing(false)}
                  onSuccess={() => setIsEditing(false)}
                />
              </>
            ) : (
              <>
                <SheetHeader>
                  <SheetTitle className="flex justify-between items-center">
                    <div className="flex items-center">
                      {selectedItem.emoji && <span className="mr-2">{selectedItem.emoji}</span>}
                      <span>{selectedItem.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsEditing(true)}
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleCompleted(selectedItem.id)}
                        title={selectedItem.completed ? "Mark as incomplete" : "Mark as complete"}
                      >
                        <Check className={`h-4 w-4 ${selectedItem.completed ? "text-green-600" : ""}`} />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          deleteRoutineItem(selectedItem.id);
                          setSelectedItem(null);
                        }}
                        title="Delete"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedItem(null)}
                        title="Close"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </SheetTitle>
                  <div className="text-muted-foreground">
                    {formatDay(selectedItem.day)} • {formatTimeBlock(selectedItem.timeBlock)}
                    {selectedItem.timeRange && ` • ${selectedItem.timeRange}`}
                  </div>
                  {selectedItem.category && (
                    <div className="text-muted-foreground">
                      Category: {selectedItem.category}
                    </div>
                  )}
                  {selectedItem.completed && (
                    <div className="text-green-600 font-medium">Completed</div>
                  )}
                </SheetHeader>
                
                {selectedItem.description && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium">Description</h3>
                    <p className="text-sm text-muted-foreground mt-1">{selectedItem.description}</p>
                  </div>
                )}

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
                      {selectedItem.notes.map((note) => (
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
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
