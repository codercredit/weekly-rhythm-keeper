
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/types/blog";

export async function fetchBlogPosts(page: number = 1, limit: number = 8): Promise<{ data: BlogPost[], count: number }> {
  const startRange = (page - 1) * limit;
  const endRange = startRange + limit - 1;
  
  // @ts-ignore - Ignoring TypeScript error since the table is in the database but not in the types yet
  const { data: blogPosts, error, count } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact' })
    .order('date', { ascending: false })
    .range(startRange, endRange);

  if (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }

  return { 
    data: blogPosts.map(post => ({
      id: post.id,
      title: post.title,
      description: post.description,
      content: post.content,
      date: post.date,
      readTime: post.read_time,
      author: post.author,
      image: post.image
    })),
    count: count || 0 
  };
}

export async function fetchBlogPost(id: string): Promise<BlogPost> {
  // @ts-ignore - Ignoring TypeScript error since the table is in the database but not in the types yet
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }

  return {
    id: post.id,
    title: post.title,
    description: post.description,
    content: post.content,
    date: post.date,
    readTime: post.read_time,
    author: post.author,
    image: post.image
  };
}

export async function createBlogPost(post: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  // @ts-ignore - Ignoring TypeScript error since the table is in the database but not in the types yet
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      title: post.title,
      description: post.description,
      content: post.content,
      date: post.date,
      read_time: post.readTime,
      author: post.author,
      image: post.image
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    content: data.content,
    date: data.date,
    readTime: data.read_time,
    author: data.author,
    image: data.image
  };
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<void> {
  const updateData: any = {};
  
  if (updates.title) updateData.title = updates.title;
  if (updates.description) updateData.description = updates.description;
  if (updates.content) updateData.content = updates.content;
  if (updates.date) updateData.date = updates.date;
  if (updates.readTime) updateData.read_time = updates.readTime;
  if (updates.author) updateData.author = updates.author;
  if (updates.image) updateData.image = updates.image;
  
  // @ts-ignore - Ignoring TypeScript error since the table is in the database but not in the types yet
  const { error } = await supabase
    .from('blog_posts')
    .update(updateData)
    .eq('id', id);

  if (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
}

export async function deleteBlogPost(id: string): Promise<void> {
  // @ts-ignore - Ignoring TypeScript error since the table is in the database but not in the types yet
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}
