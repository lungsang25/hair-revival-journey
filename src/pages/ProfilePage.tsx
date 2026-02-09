import { ProgressBar } from "@/components/ProgressBar";
import { streakMilestones } from "@/data/tasks";
import { AppState } from "@/types/hair-tracker";
import { Flame, Trophy, Calendar, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfilePageProps {
  state: AppState;
  currentDay: number;
}

export default function ProfilePage({ state, currentDay }: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="mx-auto max-w-lg px-4">
        <h1 className="mb-4 text-2xl font-bold text-foreground">Profile</h1>

        {/* Stats */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <Calendar className="mx-auto mb-1 h-5 w-5 text-primary" />
            <p className="text-2xl font-bold text-foreground">{currentDay}</p>
            <p className="text-xs text-muted-foreground">Days In</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <Flame className="mx-auto mb-1 h-5 w-5 text-streak" />
            <p className="text-2xl font-bold text-foreground">{state.streaks.current}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <Trophy className="mx-auto mb-1 h-5 w-5 text-warning" />
            <p className="text-2xl font-bold text-foreground">{state.streaks.best}</p>
            <p className="text-xs text-muted-foreground">Best Streak</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <Target className="mx-auto mb-1 h-5 w-5 text-secondary" />
            <p className="text-2xl font-bold text-foreground capitalize">{state.user.commitmentLevel}</p>
            <p className="text-xs text-muted-foreground">Commitment</p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mb-4 rounded-xl border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-bold text-foreground">Overall Progress</h3>
          <ProgressBar current={currentDay} total={84} label={`Day ${currentDay} of 84`} />
        </div>

        {/* Milestones */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-bold text-foreground">Milestones</h3>
          <div className="space-y-3">
            {streakMilestones.map((m) => {
              const achieved = state.streaks.best >= m.days;
              return (
                <div key={m.days} className="flex items-center gap-3">
                  <span className="text-xl">{m.emoji}</span>
                  <div className="flex-1">
                    <p className={cn(
                      "text-sm font-semibold",
                      achieved ? "text-foreground" : "text-muted-foreground"
                    )}>{m.label}</p>
                    <p className="text-xs text-muted-foreground">{m.days} day streak</p>
                  </div>
                  {achieved && <span className="text-xs font-bold text-primary">Achieved!</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* User Info */}
        <div className="mt-4 rounded-xl border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-bold text-foreground">Your Protocol</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Age Range</span>
              <span className="font-medium text-foreground">{state.user.ageRange}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Focus Areas</span>
              <span className="font-medium text-foreground text-right max-w-[200px]">{state.user.hairPattern.join(", ")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Started</span>
              <span className="font-medium text-foreground">{state.user.startDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
