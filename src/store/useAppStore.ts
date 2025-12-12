import { create } from 'zustand';
import { addMonths, subMonths } from 'date-fns';
import type { User } from '@shared/types';
// --- STORE DEFINITION ---
interface AppState {
  currentDate: Date;
  selectedUser: User;
  selectedDate: Date | null;
}
interface AppActions {
  nextMonth: () => void;
  prevMonth: () => void;
  setSelectedUser: (user: User) => void;
  setSelectedDate: (date: Date | null) => void;
}
const useAppStore = create<AppState & AppActions>((set) => ({
  currentDate: new Date(),
  selectedUser: 'me',
  selectedDate: null,
  nextMonth: () => set((state) => ({ currentDate: addMonths(state.currentDate, 1) })),
  prevMonth: () => set((state) => ({ currentDate: subMonths(state.currentDate, 1) })),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
export default useAppStore;