
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { 
  Form, 
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RoutineItem, DAYS_OF_WEEK, TIME_BLOCKS } from "@/types/routine";
import { useRoutine } from "@/contexts/RoutineContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  day: z.string().min(1, "Day is required"),
  timeBlock: z.string().min(1, "Time block is required"),
  timeRange: z.string().optional(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface EditRoutineItemFormProps {
  item: RoutineItem;
  onCancel: () => void;
  onSuccess: () => void;
}

export function EditRoutineItemForm({ item, onCancel, onSuccess }: EditRoutineItemFormProps) {
  const { updateRoutineItem } = useRoutine();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: item.title,
      day: item.day,
      timeBlock: item.timeBlock,
      timeRange: item.timeRange || "",
      description: item.description || "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    try {
      await updateRoutineItem(item.id, {
        title: data.title,
        day: data.day as any,
        timeBlock: data.timeBlock as any,
        timeRange: data.timeRange || undefined,
        description: data.description || undefined,
      });
      onSuccess();
    } catch (error) {
      console.error("Failed to update routine item:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="day"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Day</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {DAYS_OF_WEEK.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeBlock"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Time Block</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time block" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TIME_BLOCKS.map((block) => (
                      <SelectItem key={block} value={block}>
                        {block.charAt(0).toUpperCase() + block.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="timeRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Range (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 9:00 AM - 10:30 AM" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter description..." 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
