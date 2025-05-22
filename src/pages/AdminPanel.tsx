
import React, { useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBlog } from "@/contexts/BlogContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { EmptyBlogState } from "@/components/blog/EmptyBlogState";
import { BlogManagementHeader } from "@/components/blog/BlogManagementHeader";
import { CreateBlogDialog } from "@/components/blog/CreateBlogDialog";
import { EditBlogDialog } from "@/components/blog/EditBlogDialog";
import { BlogFormValues } from "@/components/blog/BlogPostForm";
import { BlogPost } from "@/types/blog";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const { 
    posts, 
    totalPosts, 
    isLoading, 
    fetchPosts, 
    currentPage, 
    setCurrentPage, 
    postsPerPage,
    addPost,
    editPost,
    removePost
  } = useBlog();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [currentEditPost, setCurrentEditPost] = React.useState<BlogPost | null>(null);
  
  useEffect(() => {
    fetchPosts();
  }, [currentPage]);
  
  // Redirect if not admin
  if (!user || !isAdmin) {
    return <Navigate to="/auth" />;
  }
  
  const handleCreatePost = async (values: BlogFormValues) => {
    await addPost({
      ...values,
      date: format(new Date(), "MMMM dd, yyyy"),
    });
    setIsCreateDialogOpen(false);
  };
  
  const handleEditPost = async (values: BlogFormValues) => {
    if (currentEditPost) {
      await editPost(currentEditPost.id, values);
      setIsEditDialogOpen(false);
      setCurrentEditPost(null);
    }
  };
  
  const handleDeletePost = async (id: string) => {
    await removePost(id);
  };
  
  const handleOpenEditDialog = (post: BlogPost) => {
    setCurrentEditPost(post);
    setIsEditDialogOpen(true);
  };
  
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <BlogManagementHeader onCreateNew={() => setIsCreateDialogOpen(true)} />
        
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-32 bg-muted animate-pulse rounded-md"></div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <EmptyBlogState onCreateNew={() => setIsCreateDialogOpen(true)} />
        ) : (
          <>
            <BlogPostList 
              posts={posts} 
              onEdit={handleOpenEditDialog} 
              onDelete={handleDeletePost} 
            />
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
        
        <CreateBlogDialog 
          isOpen={isCreateDialogOpen} 
          onOpenChange={setIsCreateDialogOpen} 
          onSubmit={handleCreatePost} 
        />
        
        <EditBlogDialog 
          isOpen={isEditDialogOpen} 
          onOpenChange={setIsEditDialogOpen} 
          post={currentEditPost} 
          onSubmit={handleEditPost} 
        />
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;
