
import React from "react";
import { Copyright, Calendar, Github, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t mt-auto bg-gradient-to-r from-background to-muted/20">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                mkk360Routine
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transform your daily routine into meaningful habits. Track, manage, and optimize your time for maximum productivity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <a href="/" className="block text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </a>
              <a href="/blog" className="block text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </a>
              <a href="/auth" className="block text-muted-foreground hover:text-foreground transition-colors">
                Sign In
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Support</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Connect</h4>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground mb-4 sm:mb-0">
            <Copyright className="mr-2 h-4 w-4" />
            <span>{currentYear} mkk360Routine. All rights reserved.</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Built with ❤️ using modern web technologies
          </div>
        </div>
      </div>
    </footer>
  );
}
