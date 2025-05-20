
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useRoutine } from "@/contexts/RoutineContext";
import { Sun, Moon, Calendar, Filter, Settings } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { exportData, toggleCategoryFilter, toggleCompletedFilter } = useRoutine();

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            mkk360Routine
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Options
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem onClick={exportData}>
                <Calendar className="h-4 w-4 mr-2" />
                Export Data
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleCategoryFilter}>
                <Filter className="h-4 w-4 mr-2" />
                Toggle Category Filter
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleCompletedFilter}>
                <Filter className="h-4 w-4 mr-2" />
                Show/Hide Completed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={toggleTheme} variant="ghost" size="icon">
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
