
import React from "react";
import { FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BlogPostProps {
  id?: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  featured?: boolean;
  className?: string;
  image?: string;
}

export function BlogPost({ id, title, description, date, readTime, featured = false, className = "", image }: BlogPostProps) {
  return (
    <Card className={`${className} ${featured ? "border-t-4 border-t-primary shadow-md" : "h-full"}`}>
      {image && (
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="mr-2 h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              {featured ? "Featured Post" : "Blog Post"}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{date} • {readTime}</span>
        </div>
        <CardTitle className="text-xl mt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">
          {description}
        </p>
      </CardContent>
      <CardFooter>
        {id ? (
          <Button variant="outline" size="sm" className="ml-auto" asChild>
            <Link to={`/blog/${id}`}>Read More</Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="ml-auto" disabled>
            Read More
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
