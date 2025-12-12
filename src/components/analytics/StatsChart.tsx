import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Habit, HabitLogs, User } from '@shared/types';
import { USER_NAMES } from '@shared/types';
interface StatsChartProps {
  habits?: Habit[];
  monthLogs?: HabitLogs;
  isLoading: boolean;
}
const COLORS = {
  me: '#2dd4bf', // teal-400
  partner: '#fb7185', // rose-400
};
export function StatsChart({ habits, monthLogs, isLoading }: StatsChartProps) {
  const chartData = useMemo(() => {
    if (!habits || !monthLogs) return [];
    return habits.map(habit => {
      const completions = { me: 0, partner: 0 };
      Object.values(monthLogs).forEach(dayLog => {
        if (dayLog[habit.id]?.me) completions.me++;
        if (dayLog[habit.id]?.partner) completions.partner++;
      });
      return {
        name: habit.name.length > 15 ? `${habit.name.substring(0, 12)}...` : habit.name,
        [USER_NAMES.me]: completions.me,
        [USER_NAMES.partner]: completions.partner,
      };
    });
  }, [habits, monthLogs]);
  if (isLoading) {
    return (
      <Card className="bg-background/60 dark:bg-slate-900/60 backdrop-blur-xl border-border/20 shadow-lg">
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-3/4 mt-1" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[300px]" />
        </CardContent>
      </Card>
    );
  }
  if (!chartData || chartData.length === 0) {
    return (
      <Card className="bg-background/60 dark:bg-slate-900/60 backdrop-blur-xl border-border/20 shadow-lg">
        <CardHeader>
          <CardTitle>Monthly Progress</CardTitle>
          <CardDescription>Completions this month</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">No habits tracked yet. Add one to see your progress!</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="bg-background/60 dark:bg-slate-900/60 backdrop-blur-xl border-border/20 shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle>Monthly Progress</CardTitle>
        <CardDescription>A look at your completed habits this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background) / 0.8)',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
                backdropFilter: 'blur(4px)',
              }}
            />
            <Legend iconSize={10} />
            <Bar dataKey={USER_NAMES.me} stackId="a" fill={COLORS.me} radius={[4, 4, 0, 0]} />
            <Bar dataKey={USER_NAMES.partner} stackId="a" fill={COLORS.partner} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}