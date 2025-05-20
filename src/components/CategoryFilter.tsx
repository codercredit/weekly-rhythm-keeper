
import React from "react";
import { useRoutine } from "@/contexts/RoutineContext";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CategoryFilter() {
  const { routineData, showCategoryFilter } = useRoutine();
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  
  // Extract unique categories from routine items
  const categories = React.useMemo(() => {
    const uniqueCategories = new Set<string>();
    
    Object.values(routineData.items).forEach(item => {
      if (item.category) {
        uniqueCategories.add(item.category);
      }
    });
    
    return Array.from(uniqueCategories);
  }, [routineData.items]);
  
  if (!showCategoryFilter) return null;
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Filter by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <Select 
          value={selectedCategory} 
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
