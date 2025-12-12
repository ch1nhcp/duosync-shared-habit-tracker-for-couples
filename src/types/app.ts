export type User = 'me' | 'partner';
export const USER_COLORS: Record<User, string> = {
  me: 'bg-teal-400',
  partner: 'bg-rose-400',
};
export const USER_NAMES: Record<User, string> = {
  me: 'Me',
  partner: 'Partner',
};
export interface Habit {
  id: string;
  name: string;
  color: string; // e.g., 'bg-sky-400'
  owner: User | 'both';
}
export interface HabitCompletion {
  me: boolean;
  partner: boolean;
}
// Logs for a specific day, keyed by habitId
export type DayLog = Record<string, HabitCompletion>;
// All logs, keyed by date string 'yyyy-MM-dd'
export type HabitLogs = Record<string, DayLog>;