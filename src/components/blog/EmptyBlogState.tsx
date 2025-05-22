
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyBlogStateProps {
  onCreateNew: () => void;
}

export function EmptyBlogState({ onCreateNew }: EmptyBlogStateProps) {
  return (
    <div className="text-center py-12 border rounded-lg bg-muted/20">
      <h3 className="text-xl font-medium mb-2">No blog posts yet</h3>
      <p className="text-muted-foreground mb-6">Create your first blog post to get started</p>
      <Button onClick={onCreateNew}>
        <Plus className="mr-2 h-4 w-4" />
        Create New Post
      </Button>
    </div>
  );
}
