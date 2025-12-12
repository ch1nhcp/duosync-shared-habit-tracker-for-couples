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
export function HomePage() {
  const [isHabitDrawerOpen, setIsHabitDrawerOpen] = useState(false);
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-start p-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-gradient-to-br from-teal-400/10 via-transparent to-rose-400/10" />
      <ThemeToggle className="absolute top-4 right-4" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-4xl mx-auto my-8 md:my-12 lg:my-16"
      >
        <div className="bg-background/60 dark:bg-slate-900/60 backdrop-blur-xl border border-border/20 rounded-2xl shadow-lg overflow-hidden">
          <Header />
          <CalendarGrid />
        </div>
      </motion.div>
      <DayFocusModal />
      <HabitDrawer open={isHabitDrawerOpen} onOpenChange={setIsHabitDrawerOpen} />
      <Button
        onClick={() => setIsHabitDrawerOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 rounded-full h-14 w-14 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95"
        aria-label="Manage habits"
      >
        <ListTodo className="w-6 h-6" />
      </Button>
      <footer className="absolute bottom-4 text-center text-xs text-muted-foreground/80 w-full">
        <p>Built with ❤️ at Cloudflare</p>
      </footer>
      <Toaster richColors closeButton />
    </div>
  );
}