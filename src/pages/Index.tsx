
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const Index = () => {
  // Featured blog post data
  const featuredPost = {
    title: "Getting Started with mkk360Routine",
    description: "Learn how to use mkk360Routine to boost your productivity and manage your daily schedule effectively.",
    date: "May 20, 2025",
    readTime: "5 min read",
  };

  const { isAdmin, user } = useAuth();

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
        
        <BlogPost
          title={featuredPost.title}
          description={featuredPost.description}
          date={featuredPost.date}
          readTime={featuredPost.readTime}
          featured={true}
          className="mb-8"
        />

        <RoutineManager />
        <RoutineTable />
        <DetailPanel />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
