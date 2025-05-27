
import React from "react";
import { FileText, Calendar, Clock } from "lucide-react";
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
    <Card className={`${className} ${featured ? "border-t-4 border-t-primary shadow-lg bg-gradient-to-br from-background to-muted/10" : "h-full hover:shadow-md transition-shadow"} group`}>
      {image && (
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
              {featured ? "Featured" : "Article"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readTime}
            </div>
          </div>
        </div>
        <CardTitle className={`${featured ? "text-xl" : "text-lg"} leading-tight group-hover:text-primary transition-colors`}>
          {title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-0">
        <div className="flex justify-between items-center w-full">
          <div className="text-xs text-muted-foreground">
            {description.length > 100 ? `${description.substring(0, 100)}...` : description}
          </div>
          {id ? (
            <Button variant="outline" size="sm" className="ml-4 shrink-0" asChild>
              <Link to={`/blog/${id}`}>Read More</Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="ml-4 shrink-0" disabled>
              Read More
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
