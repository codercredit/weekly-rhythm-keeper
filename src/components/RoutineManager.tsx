
import React from "react";
import { useRoutine } from "@/contexts/RoutineContext";
import { CategoryFilter } from "./CategoryFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Check, X } from "lucide-react";

export function RoutineManager() {
  const { 
    showCategoryFilter, 
    showCompletedOnly, 
    toggleCompletedFilter,
    addRoutineItem,
    routineData,
    updateRoutineItem
  } = useRoutine();
  
  // Function to add a new task
  const handleAddNewTask = () => {
    // Add a new task with default values - using "monday" and "morning" as defaults
    addRoutineItem("monday", "morning", "New Task");
  };
  
  // Function to mark all tasks as complete or incomplete
  const handleMarkAll = (status: boolean) => {
    const items = Object.values(routineData.items);
    
    // Update each item's status to the specified value
    items.forEach(item => {
      updateRoutineItem(item.id, { completed: status });
    });
  };
  
  // Function to sort items by priority (dummy implementation for now)
  const handleSortByPriority = () => {
    // In a real implementation, this would sort by a priority field
    // For now, we'll just show a toast message
    console.log("Sort by priority clicked");
  };
  
  return (
    <div className="mb-8">
      {showCategoryFilter && <CategoryFilter />}
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          <Button variant="outline" size="sm" className="w-full" onClick={handleAddNewTask}>
            <Plus className="mr-2 h-4 w-4" /> Add New Task
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={() => handleMarkAll(true)}
          >
            <Check className="mr-2 h-4 w-4" /> Mark All Complete
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={() => handleMarkAll(false)}
          >
            <X className="mr-2 h-4 w-4" /> Mark All Incomplete
          </Button>
          
          <Button variant="outline" size="sm" className="w-full" onClick={handleSortByPriority}>
            Sort by Priority
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
