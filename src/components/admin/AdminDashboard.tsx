
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBlog } from "@/contexts/BlogContext";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart, AreaChart, BookOpen, Users } from "lucide-react";

export function AdminDashboard() {
  const { totalPosts } = useBlog();
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPosts}</div>
          <p className="text-xs text-muted-foreground">
            +{Math.floor(Math.random() * 10)}% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+20</div>
          <p className="text-xs text-muted-foreground">
            +15% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Page Views</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-muted-foreground">
            +18% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Engagement</CardTitle>
          <AreaChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">43%</div>
          <p className="text-xs text-muted-foreground">
            +5% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {i % 2 === 0 ? "New post created" : "Post updated"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  Admin
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
