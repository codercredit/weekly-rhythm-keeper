
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useBlog } from "@/contexts/BlogContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedPost, isLoading, getPost } = useBlog();

  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, [id, getPost]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/blog">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        {isLoading ? (
          <div className="space-y-4">
            <div className="h-8 bg-muted animate-pulse rounded-md w-3/4"></div>
            <div className="h-4 bg-muted animate-pulse rounded-md w-1/4"></div>
            <div className="h-64 bg-muted animate-pulse rounded-md mt-6"></div>
          </div>
        ) : selectedPost ? (
          <article className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold mb-4">{selectedPost.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground mb-8">
              <span>{selectedPost.date}</span>
              <span className="mx-2">•</span>
              <span>{selectedPost.readTime}</span>
              <span className="mx-2">•</span>
              <span>By {selectedPost.author}</span>
            </div>
            {selectedPost.image && (
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="w-full h-auto object-cover rounded-lg mb-8 max-h-96"
              />
            )}
            
            <div className="mt-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
          </article>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-medium mb-2">Blog post not found</h3>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/blog">Back to All Posts</Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;
