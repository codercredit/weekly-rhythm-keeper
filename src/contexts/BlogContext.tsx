
import React, { createContext, useContext, useState, ReactNode } from "react";
import { BlogPost } from "@/types/blog";
import { 
  fetchBlogPosts, 
  fetchBlogPost, 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost 
} from "@/services/blogService";
import { useToast } from "@/hooks/use-toast";

interface BlogContextType {
  posts: BlogPost[];
  totalPosts: number;
  selectedPost: BlogPost | null;
  isLoading: boolean;
  currentPage: number;
  postsPerPage: number;
  fetchPosts: (page?: number) => Promise<void>;
  getPost: (id: string) => Promise<void>;
  addPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  editPost: (id: string, updates: Partial<BlogPost>) => Promise<void>;
  removePost: (id: string) => Promise<void>;
  setCurrentPage: (page: number) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const { toast } = useToast();

  const fetchPosts = async (page: number = currentPage) => {
    setIsLoading(true);
    try {
      const { data, count } = await fetchBlogPosts(page, postsPerPage);
      setPosts(data);
      setTotalPosts(count);
      setCurrentPage(page);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive"
      });
      console.error("Failed to fetch blog posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPost = async (id: string) => {
    setIsLoading(true);
    try {
      const post = await fetchBlogPost(id);
      setSelectedPost(post);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load blog post",
        variant: "destructive"
      });
      console.error("Failed to fetch blog post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addPost = async (post: Omit<BlogPost, 'id'>) => {
    setIsLoading(true);
    try {
      await createBlogPost(post);
      toast({
        title: "Success",
        description: "Blog post created successfully"
      });
      fetchPosts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive"
      });
      console.error("Failed to create blog post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const editPost = async (id: string, updates: Partial<BlogPost>) => {
    setIsLoading(true);
    try {
      await updateBlogPost(id, updates);
      toast({
        title: "Success",
        description: "Blog post updated successfully"
      });
      fetchPosts();
      if (selectedPost && selectedPost.id === id) {
        getPost(id);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive"
      });
      console.error("Failed to update blog post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removePost = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteBlogPost(id);
      toast({
        title: "Success",
        description: "Blog post deleted successfully"
      });
      fetchPosts();
      if (selectedPost && selectedPost.id === id) {
        setSelectedPost(null);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive"
      });
      console.error("Failed to delete blog post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        totalPosts,
        selectedPost,
        isLoading,
        currentPage,
        postsPerPage,
        fetchPosts,
        getPost,
        addPost,
        editPost,
        removePost,
        setCurrentPage
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
