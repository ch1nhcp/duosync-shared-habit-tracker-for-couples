import { create } from 'zustand';
import { produce } from 'immer';
import { addMonths, subMonths, format } from 'date-fns';
import { Habit, User, HabitLogs, DayLog } from '@/types/app';
import { v4 as uuidv4 } from 'uuid';
// --- MOCK DATA ---
const MOCK_HABITS: Habit[] = [
  { id: 'h1', name: 'Morning Jog', color: 'bg-sky-400', owner: 'both' },
  { id: 'h2', name: 'Read 10 pages', color: 'bg-amber-400', owner: 'me' },
  { id: 'h3', name: 'Meditate', color: 'bg-violet-400', owner: 'partner' },
  { id: 'h4', name: 'Drink 8 glasses of water', color: 'bg-blue-400', owner: 'both' },
];
const MOCK_LOGS: HabitLogs = {
  [format(new Date(), 'yyyy-MM-dd')]: {
    h1: { me: true, partner: false },
    h2: { me: true, partner: false },
  },
  [format(subMonths(new Date(), 0).setDate(1), 'yyyy-MM-dd')]: {
    h1: { me: true, partner: true },
    h2: { me: true, partner: false },
  },
  [format(subMonths(new Date(), 0).setDate(3), 'yyyy-MM-dd')]: {
    h1: { me: false, partner: true },
    h3: { me: false, partner: true },
    h4: { me: true, partner: true },
  },
  [format(subMonths(new Date(), 0).setDate(5), 'yyyy-MM-dd')]: {
    h1: { me: true, partner: false },
    h2: { me: true, partner: false },
    h4: { me: true, partner: false },
  },
};
// --- STORE DEFINITION ---
interface AppState {
  currentDate: Date;
  selectedUser: User;
  habits: Habit[];
  logs: HabitLogs;
  selectedDate: Date | null;
}
interface AppActions {
  nextMonth: () => void;
  prevMonth: () => void;
  setSelectedUser: (user: User) => void;
  toggleHabit: (habitId: string, date: Date) => void;
  addHabit: (habit: Omit<Habit, 'id'>) => void;
  setSelectedDate: (date: Date | null) => void;
}
const useAppStore = create<AppState & AppActions>((set) => ({
  currentDate: new Date(),
  selectedUser: 'me',
  habits: MOCK_HABITS,
  logs: MOCK_LOGS,
  selectedDate: null,
  nextMonth: () => set((state) => ({ currentDate: addMonths(state.currentDate, 1) })),
  prevMonth: () => set((state) => ({ currentDate: subMonths(state.currentDate, 1) })),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  toggleHabit: (habitId, date) =>
    set(
      produce((state: AppState) => {
        const dateKey = format(date, 'yyyy-MM-dd');
        const user = state.selectedUser;
        if (!state.logs[dateKey]) {
          state.logs[dateKey] = {};
        }
        const dayLog: DayLog = state.logs[dateKey];
        if (!dayLog[habitId]) {
          dayLog[habitId] = { me: false, partner: false };
        }
        dayLog[habitId][user] = !dayLog[habitId][user];
      })
    ),
  addHabit: (habit) =>
    set(
      produce((state: AppState) => {
        state.habits.push({ ...habit, id: uuidv4() });
      })
    ),
}));
export default useAppStore;