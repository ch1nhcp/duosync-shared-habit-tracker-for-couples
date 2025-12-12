import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { HabitLogs } from '@shared/types';
import { startOfMonth, endOfMonth, format } from 'date-fns';
export const useMonthLogs = (currentDate: Date) => {
  const startDate = format(startOfMonth(currentDate), 'yyyy-MM-dd');
  const endDate = format(endOfMonth(currentDate), 'yyyy-MM-dd');
  return useQuery<HabitLogs>({
    queryKey: ['logs', format(currentDate, 'yyyy-MM')],
    queryFn: () => api<HabitLogs>(`/api/logs?start=${startDate}&end=${endDate}`),
  });
};