import { format, isToday } from 'date-fns';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import useAppStore from '@/store/useAppStore';
import { Habit } from '@/types/app';
interface DayCellProps {
  day: Date;
  isCurrentMonth: boolean;
}
export function DayCell({ day, isCurrentMonth }: DayCellProps) {
  const setSelectedDate = useAppStore((s) => s.setSelectedDate);
  const logs = useAppStore((s) => s.logs);
  const habits = useAppStore((s) => s.habits);
  const dateKey = format(day, 'yyyy-MM-dd');
  const dayLog = logs[dateKey];
  const getCompletedHabits = (user: 'me' | 'partner') => {
    if (!dayLog) return [];
    return habits.filter(
      (habit) =>
        (habit.owner === user || habit.owner === 'both') &&
        dayLog[habit.id]?.[user]
    );
  };
  const meCompleted = getCompletedHabits('me');
  const partnerCompleted = getCompletedHabits('partner');
  const handleClick = () => {
    if (isCurrentMonth) {
      setSelectedDate(day);
    }
  };
  return (
    <motion.div
      onClick={handleClick}
      className={cn(
        'relative aspect-square rounded-lg p-1.5 md:p-2 flex flex-col items-center justify-start transition-colors duration-200',
        isCurrentMonth ? 'bg-background/50 hover:bg-accent cursor-pointer' : 'text-muted-foreground/50',
        isToday(day) && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
      )}
      whileHover={{ scale: isCurrentMonth ? 1.05 : 1 }}
      whileTap={{ scale: isCurrentMonth ? 0.95 : 1 }}
    >
      <span className="text-xs md:text-sm font-medium">{format(day, 'd')}</span>
      {isCurrentMonth && (
        <div className="flex-grow flex items-center justify-center w-full mt-1">
          <div className="flex flex-wrap items-center justify-center gap-1">
            {meCompleted.map((habit) => (
              <div key={`${habit.id}-me`} className={cn('w-1.5 h-1.5 rounded-full bg-teal-400')} />
            ))}
            {partnerCompleted.map((habit) => (
              <div key={`${habit.id}-partner`} className={cn('w-1.5 h-1.5 rounded-full bg-rose-400')} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}