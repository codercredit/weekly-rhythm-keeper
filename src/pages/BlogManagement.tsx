
import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useBlog } from "@/contexts/BlogContext";
import { BlogPost as BlogPostType } from "@/types/blog";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { EmptyBlogState } from "@/components/blog/EmptyBlogState";
import { CreateBlogDialog } from "@/components/blog/CreateBlogDialog";
import { EditBlogDialog } from "@/components/blog/EditBlogDialog";
import { BlogManagementHeader } from "@/components/blog/BlogManagementHeader";
import { BlogFormValues } from "@/components/blog/BlogPostForm";
import { Plus } from "lucide-react";

const BlogManagement = () => {
  const { posts, isLoading, fetchPosts, addPost, editPost, removePost } = useBlog();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostType | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreateSubmit = (values: BlogFormValues) => {
    const today = new Date().toISOString().split('T')[0];
    
    addPost({
      title: values.title,
      description: values.description,
      content: values.content,
      author: values.author,
      readTime: values.readTime,
      date: today,
      image: values.image,
    });
    
    setIsCreateDialogOpen(false);
  };

  const handleEditSubmit = (values: BlogFormValues) => {
    if (editingPost) {
      editPost(editingPost.id, values);
      setIsEditDialogOpen(false);
      setEditingPost(null);
    }
  };

  const handleEdit = (post: BlogPostType) => {
    setEditingPost(post);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    removePost(id);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-24 bg-muted animate-pulse rounded-md"></div>
          ))}
        </div>
      );
    }

    if (posts.length === 0) {
      return <EmptyBlogState onCreateNew={() => setIsCreateDialogOpen(true)} />;
    }

    return (
      <BlogPostList
        posts={posts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <BlogManagementHeader onCreateNew={() => setIsCreateDialogOpen(true)} />

        {renderContent()}
      </main>

      <CreateBlogDialog 
        isOpen={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateSubmit}
      />

      <EditBlogDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        post={editingPost}
        onSubmit={handleEditSubmit}
      />

      <Footer />
    </div>
  );
};

export default BlogManagement;
