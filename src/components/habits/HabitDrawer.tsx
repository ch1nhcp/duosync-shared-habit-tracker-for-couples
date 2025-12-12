import { useState } from 'react';
import { Plus, Palette } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import useAppStore from '@/store/useAppStore';
import { Habit, User } from '@/types/app';
const COLOR_PALETTE = [
  'bg-sky-400', 'bg-amber-400', 'bg-violet-400', 'bg-blue-400',
  'bg-emerald-400', 'bg-rose-400', 'bg-pink-400', 'bg-indigo-400',
];
interface HabitDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function HabitDrawer({ open, onOpenChange }: HabitDrawerProps) {
  const habits = useAppStore((s) => s.habits);
  const addHabit = useAppStore((s) => s.addHabit);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitColor, setNewHabitColor] = useState(COLOR_PALETTE[0]);
  const [newHabitOwner, setNewHabitOwner] = useState<User | 'both'>('both');
  const handleAddHabit = () => {
    if (newHabitName.trim()) {
      addHabit({
        name: newHabitName.trim(),
        color: newHabitColor,
        owner: newHabitOwner,
      });
      setNewHabitName('');
      setNewHabitColor(COLOR_PALETTE[0]);
      setNewHabitOwner('both');
    }
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-background/80 backdrop-blur-sm border-border/50">
        <SheetHeader>
          <SheetTitle>Manage Habits</SheetTitle>
          <SheetDescription>Add, edit, or remove your shared habits.</SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Current Habits</h3>
            <div className="space-y-2">
              {habits.map((habit) => (
                <div key={habit.id} className="flex items-center gap-3 p-2 rounded-md bg-secondary/50">
                  <div className={cn('w-2 h-2 rounded-full', habit.color)} />
                  <span className="text-sm font-medium">{habit.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 pt-4 border-t border-border/50">
            <h3 className="text-sm font-semibold text-muted-foreground">Add New Habit</h3>
            <div className="space-y-2">
              <Label htmlFor="habit-name">Name</Label>
              <Input id="habit-name" value={newHabitName} onChange={(e) => setNewHabitName(e.target.value)} placeholder="e.g., Morning Walk" />
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex flex-wrap gap-2">
                {COLOR_PALETTE.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewHabitColor(color)}
                    className={cn(
                      'w-6 h-6 rounded-full transition-transform duration-200 hover:scale-110',
                      color,
                      newHabitColor === color && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Assign to</Label>
              <RadioGroup value={newHabitOwner} onValueChange={(value: 'me' | 'partner' | 'both') => setNewHabitOwner(value)} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="me" id="r-me" />
                  <Label htmlFor="r-me">Me</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="partner" id="r-partner" />
                  <Label htmlFor="r-partner">Partner</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="r-both" />
                  <Label htmlFor="r-both">Both</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button onClick={handleAddHabit} disabled={!newHabitName.trim()} className="w-full">
            <Plus className="w-4 h-4 mr-2" /> Add Habit
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}