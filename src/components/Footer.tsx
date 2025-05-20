
import React from "react";
import { Copyright } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t mt-auto py-6 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground mb-4 sm:mb-0">
          <Copyright className="mr-2 h-4 w-4" />
          <span>{currentYear} mkk360Routine. All rights reserved.</span>
        </div>
        
        <div className="flex space-x-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Help
          </a>
        </div>
      </div>
    </footer>
  );
}
