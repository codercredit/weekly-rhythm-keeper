
import { supabase } from "@/integrations/supabase/client";
import { Note, RoutineItem, TimeBlock, WeekDay } from "@/types/routine";

export async function fetchRoutineItems(): Promise<RoutineItem[]> {
  const { data, error } = await supabase
    .from('routine_items')
    .select('*')
    .order('time_range', { ascending: true });

  if (error) {
    console.error('Error fetching routine items:', error);
    throw error;
  }

  return data.map(item => ({
    id: item.id,
    title: item.title,
    day: item.day as WeekDay,
    timeBlock: item.time_block as TimeBlock,
    completed: item.completed || false,
    notes: [],
    timeRange: item.time_range,
    description: item.description,
    category: item.category,
    emoji: item.emoji,
    color: item.color
  }));
}

export async function fetchNotes(routineItemId: string): Promise<Note[]> {
  const { data, error } = await supabase
    .from('routine_notes')
    .select('*')
    .eq('routine_item_id', routineItemId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }

  return data.map(note => ({
    id: note.id,
    content: note.content,
    createdAt: note.created_at || new Date().toISOString()
  }));
}

export async function addRoutineItem(item: Omit<RoutineItem, 'id' | 'notes'>): Promise<RoutineItem> {
  const { data, error } = await supabase
    .from('routine_items')
    .insert({
      title: item.title,
      day: item.day,
      time_block: item.timeBlock,
      time_range: item.timeRange,
      description: item.description,
      category: item.category,
      emoji: item.emoji,
      color: item.color,
      completed: item.completed || false
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding routine item:', error);
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    day: data.day as WeekDay,
    timeBlock: data.time_block as TimeBlock,
    completed: data.completed || false,
    notes: [],
    timeRange: data.time_range,
    description: data.description,
    category: data.category,
    emoji: data.emoji,
    color: data.color
  };
}

export async function updateRoutineItem(id: string, updates: Partial<RoutineItem>): Promise<void> {
  const updateData: any = {};
  
  if (updates.title) updateData.title = updates.title;
  if (updates.day) updateData.day = updates.day;
  if (updates.timeBlock) updateData.time_block = updates.timeBlock;
  if (updates.timeRange) updateData.time_range = updates.timeRange;
  if (updates.description) updateData.description = updates.description;
  if (updates.category) updateData.category = updates.category;
  if (updates.emoji) updateData.emoji = updates.emoji;
  if (updates.color) updateData.color = updates.color;
  if (updates.completed !== undefined) updateData.completed = updates.completed;
  
  const { error } = await supabase
    .from('routine_items')
    .update(updateData)
    .eq('id', id);

  if (error) {
    console.error('Error updating routine item:', error);
    throw error;
  }
}

export async function deleteRoutineItem(id: string): Promise<void> {
  const { error } = await supabase
    .from('routine_items')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting routine item:', error);
    throw error;
  }
}

export async function addNote(routineItemId: string, content: string): Promise<Note> {
  const { data, error } = await supabase
    .from('routine_notes')
    .insert({
      routine_item_id: routineItemId,
      content
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding note:', error);
    throw error;
  }

  return {
    id: data.id,
    content: data.content,
    createdAt: data.created_at || new Date().toISOString()
  };
}

export async function deleteNote(noteId: string): Promise<void> {
  const { error } = await supabase
    .from('routine_notes')
    .delete()
    .eq('id', noteId);

  if (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
}

export async function toggleCompleted(id: string, completed: boolean): Promise<void> {
  const { error } = await supabase
    .from('routine_items')
    .update({ completed })
    .eq('id', id);

  if (error) {
    console.error('Error toggling completed status:', error);
    throw error;
  }
}
