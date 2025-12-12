export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// Minimal real-world chat example types (shared by frontend and worker)
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
// DuoSync Types
export type User = 'me' | 'partner';
export const USER_NAMES: Record<User, string> = {
  me: 'Me',
  partner: 'Partner',
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
  id: 'primary'; // Singleton entity
  habits: Habit[];
  logs: HabitLogs;
}