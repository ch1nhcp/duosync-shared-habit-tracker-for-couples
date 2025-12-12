export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// DuoSync Types
export type User = 'me' | 'partner';
export const USER_NAMES: Record<User, string> = {
  me: 'Sage', // Example Name
  partner: 'Terra', // Example Name
};
export interface Habit {
  id: string;
  name: string;
  color: string;
  owner: User | 'both';
}
export interface HabitCompletion {
  me: boolean;
  partner: boolean;
}
export type DayLog = Record<string, HabitCompletion>;
export type HabitLogs = Record<string, DayLog>;
export interface HabitTrackerState {
  id: string; // Changed from 'primary' literal to string
  habits: Habit[];
  logs: HabitLogs;
}
export interface StreakInfo {
  current: number;
  habitId: string;
  user: User;
}
// --- DEPRECATED DEMO TYPES ---
// These are kept for template compatibility but are not used by DuoSync
export interface User_DEPRECATED {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number; // epoch millis
}