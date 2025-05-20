
import React from "react";
import { FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function BlogPost() {
  // Featured blog post data
  const featuredPost = {
    title: "Getting Started with mkk360Routine",
    description: "Learn how to use mkk360Routine to boost your productivity and manage your daily schedule effectively.",
    date: "May 20, 2025",
    readTime: "5 min read",
  };

  return (
    <Card className="mb-8 border-t-4 border-t-primary shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="mr-2 h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Featured Post</span>
          </div>
          <span className="text-xs text-muted-foreground">{featuredPost.date} • {featuredPost.readTime}</span>
        </div>
        <CardTitle className="text-xl mt-2">{featuredPost.title}</CardTitle>
        <CardDescription>{featuredPost.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          mkk360Routine helps you organize your day, track your habits, and improve your productivity.
          With our intuitive interface, you can manage your tasks, set reminders, and monitor your progress.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="ml-auto">
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
}
