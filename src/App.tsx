
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { RoutineProvider } from "./contexts/RoutineContext";
import { BlogProvider } from "./contexts/BlogContext";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogDetail from "./pages/BlogDetail";
import BlogList from "./pages/BlogList";
import BlogManagement from "./pages/BlogManagement";
import Auth from "./pages/Auth";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <RoutineProvider>
        <AuthProvider>
          <BlogProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/blog" element={<BlogList />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  <Route path="/blog-management" element={<BlogManagement />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route 
                    path="/admin" 
                    element={
                      <PrivateRoute requiresAdmin={true}>
                        <AdminPanel />
                      </PrivateRoute>
                    } 
                  />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </BlogProvider>
        </AuthProvider>
      </RoutineProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
