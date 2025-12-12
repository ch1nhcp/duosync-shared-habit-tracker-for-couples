import { useMemo } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, getDay } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { DayCell } from './DayCell';
import useAppStore from '@/store/useAppStore';
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export function CalendarGrid() {
  const currentDate = useAppStore((s) => s.currentDate);
  const { days, firstDayOfMonth, lastDayOfMonth } = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    return {
      days: eachDayOfInterval({ start, end }),
      firstDayOfMonth: startOfMonth(currentDate),
      lastDayOfMonth: endOfMonth(currentDate),
    };
  }, [currentDate]);
  return (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground mb-2">
        {WEEKDAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={format(currentDate, 'yyyy-MM')}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-7 gap-1 md:gap-2"
        >
          {days.map((day) => (
            <DayCell
              key={day.toString()}
              day={day}
              isCurrentMonth={day >= firstDayOfMonth && day <= lastDayOfMonth}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}