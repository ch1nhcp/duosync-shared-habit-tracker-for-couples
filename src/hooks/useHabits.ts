import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Habit, User, HabitLogs } from '@shared/types';
import { toast } from 'sonner';
// --- QUERIES ---
export const useHabits = () => {
  return useQuery<Habit[]>({
    queryKey: ['habits'],
    queryFn: () => api<Habit[]>('/api/habits'),
  });
};
// --- MUTATIONS ---
interface AddHabitPayload {
  name: string;
  color: string;
  owner: User | 'both';
}
export const useAddHabitMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Habit, Error, AddHabitPayload>({
    mutationFn: (newHabit) => api<Habit>('/api/habits', {
      method: 'POST',
      body: JSON.stringify(newHabit),
    }),
    onSuccess: () => {
      toast.success('Habit added successfully!');
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
    onError: (error) => {
      toast.error(`Failed to add habit: ${error.message}`);
    },
  });
};
interface ToggleHabitPayload {
  date: string; // yyyy-MM-dd
  habitId: string;
  user: User;
}
export const useToggleHabitMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, ToggleHabitPayload>({
    mutationFn: (payload) => api<void>('/api/completions', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ['logs'] });
      const previousLogs = queryClient.getQueryData<HabitLogs>(['logs']);
      queryClient.setQueryData<HabitLogs>(['logs'], (old) => {
        const newLogs = { ...old };
        if (!newLogs[payload.date]) newLogs[payload.date] = {};
        const dayLog = newLogs[payload.date];
        if (!dayLog[payload.habitId]) dayLog[payload.habitId] = { me: false, partner: false };
        dayLog[payload.habitId][payload.user] = !dayLog[payload.habitId][payload.user];
        return newLogs;
      });
      return { previousLogs };
    },
    onError: (err, newTodo, context) => {
      toast.error(`Update failed: ${err.message}`);
      if (context?.previousLogs) {
        queryClient.setQueryData(['logs'], context.previousLogs);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
};