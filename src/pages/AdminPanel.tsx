
import React, { useEffect, useState } from "react";
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
import { ChevronLeft, ChevronRight, Users, Settings, LayoutDashboard } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminUserManager } from "@/components/admin/AdminUserManager";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminSettings } from "@/components/admin/AdminSettings";

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
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEditPost, setCurrentEditPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  
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
      title: values.title || "",
      description: values.description || "",
      content: values.content || "",
      author: values.author || user?.email?.split('@')[0] || "Admin",
      readTime: values.readTime || "3 min read",
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
  
  const renderBlogContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-32 bg-muted animate-pulse rounded-md"></div>
          ))}
        </div>
      );
    } 
    
    if (posts.length === 0) {
      return <EmptyBlogState onCreateNew={() => setIsCreateDialogOpen(true)} />;
    }
    
    return (
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
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage your site from one central location</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/">Back to Site</Link>
          </Button>
        </div>
        
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4" />
              Blog Posts
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>
          
          <TabsContent value="blog">
            <Card>
              <CardHeader>
                <BlogManagementHeader onCreateNew={() => setIsCreateDialogOpen(true)} />
              </CardHeader>
              <CardContent>
                {renderBlogContent()}
              </CardContent>
            </Card>
            
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
          </TabsContent>
          
          <TabsContent value="users">
            <AdminUserManager />
          </TabsContent>
          
          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;
