
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BlogPostForm, BlogFormValues } from "./BlogPostForm";

interface CreateBlogDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: BlogFormValues) => void;
}

export function CreateBlogDialog({ isOpen, onOpenChange, onSubmit }: CreateBlogDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
          <DialogDescription>
            Fill in the details for your new blog post. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <BlogPostForm 
          onSubmit={onSubmit} 
          onCancel={() => onOpenChange(false)}
          submitButtonText="Create Post" 
        />
      </DialogContent>
    </Dialog>
  );
}
