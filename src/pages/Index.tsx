
import { Header } from "@/components/Header";
import { RoutineTable } from "@/components/RoutineTable";
import { DetailPanel } from "@/components/DetailPanel";
import { RoutineManager } from "@/components/RoutineManager";
import { BlogPost } from "@/components/BlogPost";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useBlog } from "@/contexts/BlogContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  const { isAdmin, user } = useAuth();
  const { posts, isLoading: blogLoading, fetchPosts } = useBlog();

  useEffect(() => {
    fetchPosts();
  }, []);

  // Get the most recent blog post as featured post
  const featuredPost = posts.length > 0 ? posts[0] : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">My mkk360Routine</h2>
          <p className="text-muted-foreground">
            Manage your daily schedule and habits. Click on any item to add notes or mark as complete.
          </p>
        </div>
        
        {!isAdmin && (
          <Alert className="mb-6">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Demo Mode</AlertTitle>
            <AlertDescription>
              You are viewing the routine dashboard in demo mode. To edit items, remove or update routines, please login as an admin.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Featured Post</h3>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/blog">
              View All Posts
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {blogLoading ? (
          <div className="h-48 bg-muted animate-pulse rounded-md mb-8"></div>
        ) : featuredPost ? (
          <BlogPost
            id={featuredPost.id}
            title={featuredPost.title}
            description={featuredPost.description}
            date={featuredPost.date}
            readTime={featuredPost.readTime}
            featured={true}
            className="mb-8"
            image={featuredPost.image}
          />
        ) : (
          <div className="border border-dashed border-muted-foreground/25 rounded-lg p-8 text-center mb-8">
            <p className="text-muted-foreground">No blog posts available yet.</p>
            {isAdmin && (
              <Button variant="outline" className="mt-2" asChild>
                <Link to="/blog-management">Create First Post</Link>
              </Button>
            )}
          </div>
        )}

        <RoutineManager />
        <RoutineTable />
        <DetailPanel />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
