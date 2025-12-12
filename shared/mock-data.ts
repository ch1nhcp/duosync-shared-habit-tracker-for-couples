import type { User_DEPRECATED, Chat, ChatMessage } from './types';
import type { Habit, HabitLogs } from './types';
// DuoSync Mock Data
export const MOCK_HABITS: Habit[] = [
  { id: 'h1', name: 'Morning Jog', color: 'bg-sky-400', owner: 'both' },
  { id: 'h2', name: 'Read 10 pages', color: 'bg-amber-400', owner: 'me' },
  { id: 'h3', name: 'Meditate', color: 'bg-violet-400', owner: 'partner' },
  { id: 'h4', name: 'Drink 8 glasses of water', color: 'bg-blue-400', owner: 'both' },
];
export const MOCK_LOGS: HabitLogs = {
  '2024-10-01': {
    h1: { me: true, partner: true },
    h2: { me: true, partner: false },
  },
  '2024-10-03': {
    h1: { me: false, partner: true },
    h3: { me: false, partner: true },
    h4: { me: true, partner: true },
  },
  '2024-10-05': {
    h1: { me: true, partner: false },
    h2: { me: true, partner: false },
    h4: { me: true, partner: false },
  },
};
// --- DEPRECATED DEMO DATA ---
export const MOCK_USERS: User_DEPRECATED[] = [
  { id: 'u1', name: 'User A' },
  { id: 'u2', name: 'User B' }
];
export const MOCK_CHATS: Chat[] = [
  { id: 'c1', title: 'General' },
];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', userId: 'u1', text: 'Hello', ts: Date.now() },
];