
import React from "react";
import { useRoutine } from "@/contexts/RoutineContext";
import { CategoryFilter } from "./CategoryFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function RoutineManager() {
  const { showCategoryFilter, showCompletedOnly } = useRoutine();
  
  return (
    <div className="mb-8">
      {showCategoryFilter && <CategoryFilter />}
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          <Button variant="outline" size="sm" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add New Task
          </Button>
          
          {showCompletedOnly && (
            <Button variant="outline" size="sm" className="w-full">
              Mark All as Incomplete
            </Button>
          )}
          
          {!showCompletedOnly && (
            <Button variant="outline" size="sm" className="w-full">
              Mark All as Complete
            </Button>
          )}
          
          <Button variant="outline" size="sm" className="w-full">
            Sort by Priority
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
