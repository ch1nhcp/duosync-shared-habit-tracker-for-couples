import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import { Check, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import useAppStore from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { Habit, User, USER_NAMES } from '@/types/app';
export function DayFocusModal() {
  const selectedDate = useAppStore((s) => s.selectedDate);
  const setSelectedDate = useAppStore((s) => s.setSelectedDate);
  const habits = useAppStore((s) => s.habits);
  const logs = useAppStore((s) => s.logs);
  const selectedUser = useAppStore((s) => s.selectedUser);
  const toggleHabit = useAppStore((s) => s.toggleHabit);
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedDate(null);
    }
  };
  if (!selectedDate) return null;
  const dateKey = format(selectedDate, 'yyyy-MM-dd');
  const dayLog = logs[dateKey] || {};
  const userHabits = habits.filter(
    (h) => h.owner === selectedUser || h.owner === 'both'
  );
  return (
    <Dialog open={!!selectedDate} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background/80 backdrop-blur-sm border-border/50">
        <DialogHeader>
          <DialogTitle>
            Habits for {format(selectedDate, 'MMMM d, yyyy')}
          </DialogTitle>
          <DialogDescription>
            You are editing for: <span className={cn("font-bold", selectedUser === 'me' ? 'text-teal-500' : 'text-rose-500')}>{USER_NAMES[selectedUser]}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          <AnimatePresence>
            {userHabits.map((habit, index) => {
              const isCompleted = dayLog[habit.id]?.[selectedUser] || false;
              return (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn('w-2 h-2 rounded-full', habit.color)} />
                    <span className="font-medium text-foreground">{habit.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleHabit(habit.id, selectedDate)}
                    className={cn(
                      'w-8 h-8 rounded-full transition-all duration-200',
                      isCompleted
                        ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                        : 'bg-muted hover:bg-muted-foreground/20'
                    )}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isCompleted ? 'check' : 'x'}
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isCompleted ? <Check className="w-4 h-4" /> : <div className="w-4 h-4" />}
                      </motion.div>
                    </AnimatePresence>
                  </Button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}