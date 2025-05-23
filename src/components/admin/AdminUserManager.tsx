
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Edit, Trash2, UserPlus, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Form schema for adding a new user
const userFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "user", "moderator"]),
});

type UserFormValues = z.infer<typeof userFormSchema>;

export function AdminUserManager() {
  // In a real application, this would fetch real users from your backend
  const [users, setUsers] = useState([
    { id: '1', email: 'admin@admin.com', role: 'admin', status: 'active', createdAt: '2023-01-01' },
    { id: '2', email: 'user1@example.com', role: 'user', status: 'active', createdAt: '2023-01-05' },
    { id: '3', email: 'user2@example.com', role: 'user', status: 'inactive', createdAt: '2023-01-10' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    toast.success("User role updated successfully");
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    toast.success("User status updated successfully");
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success("User deleted successfully");
  };

  // Form for adding a new user
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "user",
    },
  });

  const handleAddUser = async (values: UserFormValues) => {
    setIsSubmitting(true);
    try {
      // Create a new user with the provided credentials
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email: values.email,
        role: values.role,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
      };
      
      setUsers([...users, newUser]);
      
      toast.success(`User ${values.email} created successfully with password: ${values.password}`);
      setIsAddUserDialogOpen(false);
      form.reset();
    } catch (error: any) {
      toast.error("Failed to create user: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>User Management</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Create User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New User Account</DialogTitle>
                <DialogDescription>
                  Create a new user account with email and password. The user can use these credentials to login.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddUser)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="user@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter secure password" {...field} />
                        </FormControl>
                        <FormDescription>
                          Minimum 6 characters. Share this password with the user.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="moderator">Moderator</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsAddUserDialogOpen(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Creating..." : "Create User"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={user.role}
                    onValueChange={(value) => handleRoleChange(user.id, value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    defaultValue={user.status}
                    onValueChange={(value) => handleStatusChange(user.id, value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">
                        <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
                      </SelectItem>
                      <SelectItem value="inactive">
                        <Badge variant="outline" className="bg-amber-100 text-amber-800">Inactive</Badge>
                      </SelectItem>
                      <SelectItem value="suspended">
                        <Badge variant="outline" className="bg-red-100 text-red-800">Suspended</Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" disabled>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon"
                          disabled={user.email === 'admin@admin.com'}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete User</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {user.email}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
