import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import { Check, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import useAppStore from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { USER_NAMES } from '@shared/types';
import type { User } from '@shared/types';
import { useHabits, useToggleHabitMutation } from '@/hooks/useHabits';
import { useMonthLogs } from '@/hooks/useMonthLogs';
export function DayFocusModal() {
  const selectedDate = useAppStore((s) => s.selectedDate);
  const setSelectedDate = useAppStore((s) => s.setSelectedDate);
  const selectedUser = useAppStore((s) => s.selectedUser);
  const currentDate = useAppStore((s) => s.currentDate);
  const { data: habits = [] } = useHabits();
  const { data: monthLogs = {} } = useMonthLogs(currentDate);
  const toggleMutation = useToggleHabitMutation();
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedDate(null);
    }
  };
  if (!selectedDate) return null;
  const dateKey = format(selectedDate, 'yyyy-MM-dd');
  const dayLog = monthLogs[dateKey] || {};
  const userHabits = habits.filter(
    (h) => h.owner === selectedUser || h.owner === 'both'
  );
  const handleToggle = (habitId: string) => {
    const isCompleted = dayLog[habitId]?.[selectedUser] || false;
    toggleMutation.mutate({
      date: dateKey,
      habitId,
      user: selectedUser,
    }, {
      onSuccess: () => {
        if (!isCompleted) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            zIndex: 9999,
          });
        }
      }
    });
  };
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
            {userHabits.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-muted-foreground py-8"
              >
                No habits assigned to {USER_NAMES[selectedUser]}.
              </motion.div>
            )}
            {userHabits.map((habit, index) => {
              const isCompleted = dayLog[habit.id]?.[selectedUser] || false;
              const isMutating = toggleMutation.isPending && toggleMutation.variables?.habitId === habit.id;
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
                    onClick={() => handleToggle(habit.id)}
                    disabled={isMutating}
                    className={cn(
                      'w-8 h-8 rounded-full transition-all duration-200',
                      isCompleted
                        ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                        : 'bg-muted hover:bg-muted-foreground/20'
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {isMutating ? (
                        <motion.div key="loader" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key={isCompleted ? 'check' : 'empty'}
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          {isCompleted ? <Check className="w-4 h-4" /> : <div className="w-4 h-4" />}
                        </motion.div>
                      )}
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