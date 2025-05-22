
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BlogPostForm, BlogFormValues } from "./BlogPostForm";
import { BlogPost } from "@/types/blog";

interface EditBlogDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  post: BlogPost | null;
  onSubmit: (values: BlogFormValues) => void;
}

export function EditBlogDialog({ isOpen, onOpenChange, post, onSubmit }: EditBlogDialogProps) {
  if (!post) return null;

  const defaultValues = {
    title: post.title,
    description: post.description,
    content: post.content,
    author: post.author,
    readTime: post.readTime,
    image: post.image || "",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Blog Post</DialogTitle>
          <DialogDescription>
            Update the details for your blog post. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <BlogPostForm 
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          submitButtonText="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
}
