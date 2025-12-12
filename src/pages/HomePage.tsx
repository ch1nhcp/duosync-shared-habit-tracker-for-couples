import { useState } from 'react';
import { motion } from 'framer-motion';
import { ListTodo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { DayFocusModal } from '@/components/calendar/DayFocusModal';
import { HabitDrawer } from '@/components/habits/HabitDrawer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Toaster } from '@/components/ui/sonner';
import { StatsChart } from '@/components/analytics/StatsChart';
import { useHabits } from '@/hooks/useHabits';
import { useMonthLogs } from '@/hooks/useMonthLogs';
import useAppStore from '@/store/useAppStore';
export function HomePage() {
  const [isHabitDrawerOpen, setIsHabitDrawerOpen] = useState(false);
  const currentDate = useAppStore((s) => s.currentDate);
  const { data: habits, isLoading: habitsLoading } = useHabits();
  const { data: monthLogs, isLoading: logsLoading } = useMonthLogs(currentDate);
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-start relative overflow-x-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-gradient-to-br from-teal-400/10 via-transparent to-rose-400/10" />
      <ThemeToggle className="absolute top-4 right-4" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-background/60 dark:bg-slate-900/60 backdrop-blur-xl border border-border/20 rounded-2xl shadow-lg overflow-hidden">
                  <Header />
                  <CalendarGrid />
                </div>
              </div>
              <div className="lg:col-span-1">
                <StatsChart
                  habits={habits}
                  monthLogs={monthLogs}
                  isLoading={habitsLoading || logsLoading}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <DayFocusModal />
      <HabitDrawer open={isHabitDrawerOpen} onOpenChange={setIsHabitDrawerOpen} />
      <Button
        onClick={() => setIsHabitDrawerOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 rounded-full h-14 w-14 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95 z-20"
        aria-label="Manage habits"
      >
        <ListTodo className="w-6 h-6" />
      </Button>
      <footer className="w-full text-center py-4 text-xs text-muted-foreground/80">
        <p>Built with ❤️ at Cloudflare</p>
      </footer>
      <Toaster richColors closeButton theme="light" />
    </div>
  );
}