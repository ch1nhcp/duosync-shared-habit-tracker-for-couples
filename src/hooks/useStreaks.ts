import { useMemo } from 'react';
import { useHabits } from './useHabits';
import { useMonthLogs } from './useMonthLogs';
import type { User, Habit, HabitLogs } from '@shared/types';
import { subDays, format, isAfter, startOfDay } from 'date-fns';
export interface Streak {
  currentStreak: number;
  longestStreak: number;
  todayCompleted: boolean;
}
export interface StreaksData {
  [habitId: string]: Streak;
}
export const useStreaks = (user: User, habits: Habit[] | undefined, monthLogs: HabitLogs | undefined) => {
  const streaks = useMemo<StreaksData>(() => {
    if (!habits || !monthLogs) return {};
    const userHabits = habits.filter(h => h.owner === user || h.owner === 'both');
    const today = startOfDay(new Date());
    const streaksData: StreaksData = {};
    userHabits.forEach(habit => {
      let currentStreak = 0;
      let longestStreak = 0;
      let tempStreak = 0;
      const todayCompleted = !!monthLogs[format(today, 'yyyy-MM-dd')]?.[habit.id]?.[user];
      // Calculate current streak
      let dayCursor = today;
      // If today is not completed, start checking from yesterday
      if (!todayCompleted) {
        dayCursor = subDays(today, 1);
      }
      while (true) {
        const dateKey = format(dayCursor, 'yyyy-MM-dd');
        if (monthLogs[dateKey]?.[habit.id]?.[user]) {
          currentStreak++;
          dayCursor = subDays(dayCursor, 1);
        } else {
          break;
        }
      }
      // Calculate longest streak from all available logs
      const sortedLogKeys = Object.keys(monthLogs).sort((a, b) => isAfter(new Date(a), new Date(b)) ? -1 : 1);
      for (const dateKey of sortedLogKeys) {
        if (monthLogs[dateKey]?.[habit.id]?.[user]) {
          tempStreak++;
        } else {
          if (tempStreak > longestStreak) {
            longestStreak = tempStreak;
          }
          tempStreak = 0;
        }
      }
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
      streaksData[habit.id] = {
        currentStreak,
        longestStreak,
        todayCompleted,
      };
    });
    return streaksData;
  }, [user, habits, monthLogs]);
  return streaks;
};