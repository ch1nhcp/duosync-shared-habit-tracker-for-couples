import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import useAppStore from '@/store/useAppStore';
import { USER_NAMES } from '@shared/types';
export function Header() {
  const currentDate = useAppStore((s) => s.currentDate);
  const selectedUser = useAppStore((s) => s.selectedUser);
  const nextMonth = useAppStore((s) => s.nextMonth);
  const prevMonth = useAppStore((s) => s.prevMonth);
  const setSelectedUser = useAppStore((s) => s.setSelectedUser);
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-rose-400 flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">DuoSync</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={prevMonth} aria-label="Previous month">
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <span className="w-32 text-center font-semibold text-foreground">
          {format(currentDate, 'MMMM yyyy')}
        </span>
        <Button variant="ghost" size="icon" onClick={nextMonth} aria-label="Next month">
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
      <ToggleGroup
        type="single"
        value={selectedUser}
        onValueChange={(value) => {
          if (value) setSelectedUser(value as 'me' | 'partner');
        }}
        className="p-1 bg-secondary rounded-full"
      >
        <ToggleGroupItem value="me" aria-label="Toggle user to me" className="rounded-full px-4 data-[state=on]:bg-teal-400 data-[state=on]:text-white">
          {USER_NAMES['me']}
        </ToggleGroupItem>
        <ToggleGroupItem value="partner" aria-label="Toggle user to partner" className="rounded-full px-4 data-[state=on]:bg-rose-400 data-[state=on]:text-white">
          {USER_NAMES['partner']}
        </ToggleGroupItem>
      </ToggleGroup>
    </header>
  );
}