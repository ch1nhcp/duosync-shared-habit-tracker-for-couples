import { Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
interface StreakBadgeProps {
  streakCount: number;
  user: 'me' | 'partner';
  className?: string;
}
export function StreakBadge({ streakCount, user, className }: StreakBadgeProps) {
  const hasStreak = streakCount > 0;
  return (
    <AnimatePresence>
      {hasStreak && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Badge
            variant="outline"
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold border-2 transition-all duration-300',
              user === 'me'
                ? 'bg-teal-500/10 border-teal-500/50 text-teal-600 dark:text-teal-400'
                : 'bg-rose-500/10 border-rose-500/50 text-rose-600 dark:text-rose-400',
              className
            )}
          >
            <Flame className="w-4 h-4" />
            <span className="tabular-nums">{streakCount}</span>
            <span className="hidden sm:inline">Day Streak</span>
          </Badge>
        </motion.div>
      )}
    </AnimatePresence>
  );
}