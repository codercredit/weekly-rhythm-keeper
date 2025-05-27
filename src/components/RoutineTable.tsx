
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { useRoutine } from "@/contexts/RoutineContext";
import { DAYS_OF_WEEK, TIME_BLOCKS, TimeBlock, WeekDay } from "@/types/routine";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";

export function RoutineTable() {
  const { routineData, setSelectedItem, addRoutineItem, toggleCompleted } = useRoutine();
  const { user } = useAuth();
  const [newItemDay, setNewItemDay] = useState<WeekDay>("monday");
  const [newItemTimeBlock, setNewItemTimeBlock] = useState<TimeBlock>("morning");
  const [newItemTitle, setNewItemTitle] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddItem = () => {
    if (newItemTitle.trim()) {
      addRoutineItem(newItemDay, newItemTimeBlock, newItemTitle);
      setNewItemTitle("");
      setDialogOpen(false);
    }
  };

  // Function to get items for a specific day and time block
  const getItemsFor = (day: WeekDay, timeBlock: TimeBlock) => {
    return Object.values(routineData.items).filter(
      item => item.day === day && item.timeBlock === timeBlock
    );
  };

  const formatTimeBlock = (timeBlock: TimeBlock) => {
    return timeBlock.charAt(0).toUpperCase() + timeBlock.slice(1);
  };

  const formatDay = (day: WeekDay) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  if (routineData.isLoading) {
    return (
      <div className="routine-grid min-w-[900px] gap-2 p-2">
        {Array(5).fill(0).map((_, i) => (
          <div key={`skeleton-row-${i}`} className="flex w-full space-x-2 my-4">
            {Array(8).fill(0).map((_, j) => (
              <Skeleton key={`skeleton-item-${i}-${j}`} className="h-20 w-full" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="routine-grid min-w-[900px] gap-2 p-2">
        {/* Header row with days */}
        <div className="text-muted-foreground font-semibold p-2"></div>
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="text-center font-semibold p-2">
            {formatDay(day)}
          </div>
        ))}
        
        {/* Time block rows */}
        {TIME_BLOCKS.map((timeBlock) => (
          <>
            <div key={`header-${timeBlock}`} className="text-muted-foreground font-semibold p-2">
              {formatTimeBlock(timeBlock)}
            </div>
            
            {/* Day cells for this time block */}
            {DAYS_OF_WEEK.map((day) => {
              const items = getItemsFor(day, timeBlock);
              return (
                <div key={`${day}-${timeBlock}`} className="p-1">
                  {items.length > 0 ? (
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className={cn(
                            "routine-item p-2 rounded-md border",
                            item.completed ? "bg-green-50 border-green-200" : "bg-white border-slate-200",
                            item.color && `border-l-4 border-l-[${item.color}]`,
                            user && "cursor-pointer"
                          )}
                          onClick={() => user && setSelectedItem(item)}
                          style={item.color ? { borderLeftColor: item.color } : {}}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              {item.emoji && <span className="mr-2">{item.emoji}</span>}
                              <h3 className="font-medium inline">{item.title}</h3>
                              {item.timeRange && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  {item.timeRange}
                                </div>
                              )}
                            </div>
                            {user && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                  "h-6 w-6", 
                                  item.completed && "text-green-600"
                                )}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleCompleted(item.id);
                                }}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          {item.category && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {item.category}
                            </div>
                          )}
                          {item.notes && item.notes.length > 0 && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {item.notes.length} note{item.notes.length !== 1 && 's'}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {user && (
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              className="w-full h-8 text-xs text-muted-foreground"
                              onClick={() => {
                                setNewItemDay(day);
                                setNewItemTimeBlock(timeBlock);
                              }}
                            >
                              + Add item
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add New Routine Item</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <div className="space-y-2">
                                <p className="text-sm font-medium">
                                  {formatDay(newItemDay)} - {formatTimeBlock(newItemTimeBlock)}
                                </p>
                                <Input
                                  placeholder="Item title"
                                  value={newItemTitle}
                                  onChange={(e) => setNewItemTitle(e.target.value)}
                                />
                              </div>
                              <Button onClick={handleAddItem} className="w-full">
                                Add Item
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  ) : (
                    user ? (
                      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                          <div 
                            className="h-full min-h-[80px] border border-dashed border-muted rounded-md flex items-center justify-center cursor-pointer hover:border-muted-foreground"
                            onClick={() => {
                              setNewItemDay(day);
                              setNewItemTimeBlock(timeBlock);
                            }}
                          >
                            <span className="text-sm text-muted-foreground">+ Add item</span>
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Routine Item</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                              <p className="text-sm font-medium">
                                {formatDay(newItemDay)} - {formatTimeBlock(newItemTimeBlock)}
                              </p>
                              <Input
                                placeholder="Item title"
                                value={newItemTitle}
                                onChange={(e) => setNewItemTitle(e.target.value)}
                              />
                            </div>
                            <Button onClick={handleAddItem} className="w-full">
                              Add Item
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <div className="h-full min-h-[80px] border border-dashed border-muted rounded-md flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">No items</span>
                      </div>
                    )
                  )}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
}
