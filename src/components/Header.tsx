
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useRoutine } from "@/contexts/RoutineContext";
import { Sun, Moon } from "lucide-react";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { exportData } = useRoutine();

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Weekly Routine
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={exportData} variant="outline" size="sm">
            Export Data
          </Button>
          <Button onClick={toggleTheme} variant="ghost" size="icon">
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
