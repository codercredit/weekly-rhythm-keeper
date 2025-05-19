
export type TimeBlock = "morning" | "afternoon" | "evening" | "night";

export type WeekDay = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export interface Note {
  id: string;
  content: string;
  createdAt: string;
}

export interface RoutineItem {
  id: string;
  title: string;
  day: WeekDay;
  timeBlock: TimeBlock;
  notes: Note[];
  completed: boolean;
  timeRange?: string;
  description?: string;
  category?: string;
  emoji?: string;
  color?: string;
}

export interface RoutineData {
  items: Record<string, RoutineItem>;
  isLoading: boolean;
}

export const DAYS_OF_WEEK: WeekDay[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];

export const TIME_BLOCKS: TimeBlock[] = ["morning", "afternoon", "evening", "night"];

export function generateItemId(day: WeekDay, timeBlock: TimeBlock): string {
  return `${day}-${timeBlock}-${new Date().getTime()}`;
}
