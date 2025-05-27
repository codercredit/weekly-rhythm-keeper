
import { Header } from "@/components/Header";
import { RoutineTable } from "@/components/RoutineTable";
import { DetailPanel } from "@/components/DetailPanel";
import { RoutineManager } from "@/components/RoutineManager";
import { BlogPost } from "@/components/BlogPost";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, TrendingUp, Calendar, Target, BookOpen, Lightbulb, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useBlog } from "@/contexts/BlogContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const { user } = useAuth();
  const { posts, isLoading: blogLoading, fetchPosts } = useBlog();

  useEffect(() => {
    fetchPosts();
  }, []);

  // Get the first 3 blog posts for featured content
  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              mkk360Routine
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {user 
              ? "Welcome back! Manage your daily schedule and build lasting habits with our intuitive routine management system."
              : "Transform your daily routine into meaningful habits. Track, manage, and optimize your time for maximum productivity."
            }
          </p>
          {!user && (
            <Button asChild size="lg" className="mt-6">
              <Link to="/auth">Get Started Today</Link>
            </Button>
          )}
        </div>

        {/* Statistics Cards */}
        {user && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">75%</div>
                <p className="text-xs text-muted-foreground">Today's completion rate</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Weekly Streak</CardTitle>
                <Target className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">12 days</div>
                <p className="text-xs text-muted-foreground">Keep it up!</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                <Calendar className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">28</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>
        )}
        
        {!user && (
          <Alert className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-950/20 dark:to-indigo-950/20 dark:border-blue-800">
            <InfoIcon className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800 dark:text-blue-200">Experience Full Functionality</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-300">
              You're currently viewing in guest mode. Sign in to unlock personalized routine management, progress tracking, and habit building features.
            </AlertDescription>
          </Alert>
        )}

        {/* Routine Management Section - Main Focus */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Routine Management</CardTitle>
            <CardDescription>
              {user 
                ? "Organize your daily tasks and track your progress across the week"
                : "Preview how routine management works - sign in to start building your habits"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RoutineManager />
            <RoutineTable />
          </CardContent>
        </Card>

        {/* Featured Content Section - 3 Items */}
        <Card className="bg-gradient-to-r from-background to-muted/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Featured Content</CardTitle>
                <CardDescription>Stay updated with the latest insights and productivity tips</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/blog">
                  View All Posts
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {blogLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-48 bg-gradient-to-r from-muted to-muted/50 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : featuredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                  <BlogPost
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    readTime={post.readTime}
                    image={post.image}
                    className="h-full"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Placeholder content when no blog posts are available */}
                <Card className="border border-dashed border-muted-foreground/25 bg-gradient-to-br from-muted/20 to-muted/10">
                  <CardContent className="p-6 text-center">
                    <Lightbulb className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-medium text-muted-foreground mb-2">Productivity Tips</h3>
                    <p className="text-sm text-muted-foreground">Learn how to maximize your daily routine effectiveness</p>
                  </CardContent>
                </Card>
                
                <Card className="border border-dashed border-muted-foreground/25 bg-gradient-to-br from-muted/20 to-muted/10">
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-medium text-muted-foreground mb-2">Community Stories</h3>
                    <p className="text-sm text-muted-foreground">Discover how others build successful habits</p>
                  </CardContent>
                </Card>
                
                <Card className="border border-dashed border-muted-foreground/25 bg-gradient-to-br from-muted/20 to-muted/10">
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-medium text-muted-foreground mb-2">Getting Started</h3>
                    <p className="text-sm text-muted-foreground">Step-by-step guide to building better routines</p>
                    {user && (
                      <Button variant="outline" size="sm" className="mt-3" asChild>
                        <Link to="/blog-management">Create Content</Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        <DetailPanel />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
