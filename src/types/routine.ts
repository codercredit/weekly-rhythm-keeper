
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
  reminder?: string;
  color?: string;
}

export interface RoutineData {
  items: Record<string, RoutineItem>;
}

export const DEFAULT_ROUTINE_ITEMS: RoutineItem[] = [
  {
    id: "monday-morning-1",
    title: "Morning Exercise",
    day: "monday",
    timeBlock: "morning",
    notes: [],
    completed: false
  },
  {
    id: "monday-afternoon-1",
    title: "Team Meeting",
    day: "monday",
    timeBlock: "afternoon",
    notes: [],
    completed: false
  },
  {
    id: "tuesday-morning-1",
    title: "JavaScript Learning",
    day: "tuesday",
    timeBlock: "morning",
    notes: [],
    completed: false
  },
  {
    id: "wednesday-evening-1",
    title: "Cook Dinner",
    day: "wednesday",
    timeBlock: "evening",
    notes: [],
    completed: false
  },
  {
    id: "friday-afternoon-1",
    title: "Weekly Review",
    day: "friday",
    timeBlock: "afternoon",
    notes: [],
    completed: false
  },
  {
    id: "saturday-morning-1",
    title: "Weekend Hike",
    day: "saturday",
    timeBlock: "morning",
    notes: [],
    completed: false
  }
];

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
