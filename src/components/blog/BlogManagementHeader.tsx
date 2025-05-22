
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, Plus } from "lucide-react";

interface BlogManagementHeaderProps {
  onCreateNew: () => void;
}

export function BlogManagementHeader({ onCreateNew }: BlogManagementHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div>
        <div className="flex items-center">
          <Button variant="ghost" className="p-0 mr-2" asChild>
            <Link to="/blog">
              <ChevronLeft className="h-4 w-4 mr-1" />
            </Link>
          </Button>
          <h2 className="text-3xl font-bold">Blog Management</h2>
        </div>
        <p className="text-muted-foreground mt-2">
          Create, edit, and manage your blog posts
        </p>
      </div>
      <Button onClick={onCreateNew}>
        <Plus className="mr-2 h-4 w-4" />
        New Post
      </Button>
    </div>
  );
}
