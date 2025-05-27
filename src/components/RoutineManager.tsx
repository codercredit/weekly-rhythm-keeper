
import React from "react";
import { useRoutine } from "@/contexts/RoutineContext";
import { CategoryFilter } from "./CategoryFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Check, X, BarChart3 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function RoutineManager() {
  const { 
    showCategoryFilter, 
    showCompletedOnly, 
    toggleCompletedFilter,
    addRoutineItem,
    routineData,
    updateRoutineItem
  } = useRoutine();

  const { user } = useAuth();
  
  // If not authenticated, don't render the manager
  if (!user) return null;
  
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
    console.log("Sort by priority clicked");
  };
  
  return (
    <div className="space-y-6">
      {showCategoryFilter && <CategoryFilter />}
      
      <Card className="bg-gradient-to-r from-background to-muted/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full h-11 font-medium bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 border-primary/20" 
              onClick={handleAddNewTask}
            >
              <Plus className="mr-2 h-4 w-4" /> 
              Add New Task
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full h-11 font-medium bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-green-200 text-green-700 dark:from-green-950/20 dark:to-emerald-950/20 dark:border-green-800 dark:text-green-300" 
              onClick={() => handleMarkAll(true)}
            >
              <Check className="mr-2 h-4 w-4" /> 
              Complete All
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full h-11 font-medium bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 border-orange-200 text-orange-700 dark:from-orange-950/20 dark:to-red-950/20 dark:border-orange-800 dark:text-orange-300" 
              onClick={() => handleMarkAll(false)}
            >
              <X className="mr-2 h-4 w-4" /> 
              Reset All
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full h-11 font-medium bg-gradient-to-r from-secondary/5 to-secondary/10 hover:from-secondary/10 hover:to-secondary/20 border-secondary/20" 
              onClick={handleSortByPriority}
            >
              Sort by Priority
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
