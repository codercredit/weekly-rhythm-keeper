
import React from "react";
import { BlogPost } from "@/types/blog";
import { BlogPostCard } from "./BlogPostCard";

interface BlogPostListProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
}

export function BlogPostList({ posts, onEdit, onDelete }: BlogPostListProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <BlogPostCard 
          key={post.id} 
          post={post} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}
