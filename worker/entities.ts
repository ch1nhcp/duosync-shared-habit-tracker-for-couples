/**
 * Minimal real-world demo: One Durable Object instance per entity (User, ChatBoard), with Indexes for listing.
 */
import { IndexedEntity } from "./core-utils";
import type { User_DEPRECATED, Chat, ChatMessage, Habit, HabitLogs, User, HabitTrackerState } from "@shared/types";
import { MOCK_CHAT_MESSAGES, MOCK_CHATS, MOCK_USERS, MOCK_HABITS, MOCK_LOGS } from "@shared/mock-data";
// HABIT TRACKER ENTITY: Singleton DO to store all habits and logs
export class HabitTrackerEntity extends IndexedEntity<HabitTrackerState> {
  static readonly entityName = "habitTracker";
  static readonly indexName = "habitTrackers";
  static readonly initialState: HabitTrackerState = { id: 'primary', habits: [], logs: {} };
  static seedData = [{ id: 'primary', habits: MOCK_HABITS, logs: MOCK_LOGS }];
  async addHabit(name: string, color: string, owner: 'me' | 'partner' | 'both'): Promise<Habit> {
    const habit: Habit = { id: crypto.randomUUID(), name, color, owner };
    await this.mutate((s) => {
      s.habits.push(habit);
      return s;
    });
    return habit;
  }
  async toggleHabitCompletion(dateKey: string, habitId: string, user: User): Promise<void> {
    await this.mutate((s) => {
      if (!s.logs[dateKey]) s.logs[dateKey] = {};
      const dayLog = s.logs[dateKey];
      if (!dayLog[habitId]) dayLog[habitId] = { me: false, partner: false };
      dayLog[habitId][user] = !dayLog[habitId][user];
      return s;
    });
  }
  async getMonthLogs(startDate: string, endDate: string): Promise<Partial<HabitLogs>> {
    const state = await this.getState();
    const monthLogs: Partial<HabitLogs> = {};
    Object.keys(state.logs).forEach((dateKey) => {
      if (dateKey >= startDate && dateKey <= endDate) {
        monthLogs[dateKey as keyof HabitLogs] = state.logs[dateKey as keyof HabitLogs]!;
      }
    });
    return monthLogs;
  }
}
// --- DEMO ENTITIES (from template) ---
// USER ENTITY: one DO instance per user
export class UserEntity extends IndexedEntity<User_DEPRECATED> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User_DEPRECATED = { id: "", name: "" };
  static seedData = MOCK_USERS;
}
// CHAT BOARD ENTITY: one DO instance per chat board, stores its own messages
export type ChatBoardState = Chat & { messages: ChatMessage[] };
const SEED_CHAT_BOARDS: ChatBoardState[] = MOCK_CHATS.map(c => ({
  ...c,
  messages: MOCK_CHAT_MESSAGES.filter(m => m.chatId === c.id),
}));
export class ChatBoardEntity extends IndexedEntity<ChatBoardState> {
  static readonly entityName = "chat";
  static readonly indexName = "chats";
  static readonly initialState: ChatBoardState = { id: "", title: "", messages: [] };
  static seedData = SEED_CHAT_BOARDS;
  async listMessages(): Promise<ChatMessage[]> {
    const { messages } = await this.getState();
    return messages;
  }
  async sendMessage(userId: string, text: string): Promise<ChatMessage> {
    const msg: ChatMessage = { id: crypto.randomUUID(), chatId: this.id, userId, text, ts: Date.now() };
    await this.mutate(s => ({ ...s, messages: [...s.messages, msg] }));
    return msg;
  }
}