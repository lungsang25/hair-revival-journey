import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Flame, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/ProgressBar";
import { Timer } from "@/components/Timer";
import { pillarInfo } from "@/data/tasks";
import { DailyCompletion } from "@/types/hair-tracker";

interface DashboardProps {
  currentDay: number;
  currentWeek: number;
  currentMonth: number;
  streak: number;
  todayCompletion: DailyCompletion;
  onToggleTask: (taskId: string) => void;
  getPillarCompletion: (tasks: { id: string }[]) => { completed: number; total: number; percentage: number };
}

export function Dashboard({
  currentDay,
  currentWeek,
  currentMonth,
  streak,
  todayCompletion,
  onToggleTask,
  getPillarCompletion,
}: DashboardProps) {
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);

  const totalTasks = pillarInfo.reduce((sum, p) => sum + p.tasks.length, 0);
  const totalCompleted = pillarInfo.reduce(
    (sum, p) => sum + p.tasks.filter((t) => todayCompletion[t.id]).length,
    0
  );

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-4 pb-3 pt-6">
        <div className="mx-auto max-w-lg">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{dateStr}</p>
              <h1 className="text-lg font-bold text-foreground">
                Day {currentDay} of 84
              </h1>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5">
              <Flame className="h-4 w-4 text-streak" />
              <span className="text-sm font-bold text-foreground">{streak}</span>
            </div>
          </div>
          <ProgressBar
            current={currentDay}
            total={84}
            label={`Week ${currentWeek} · Month ${currentMonth}`}
            size="sm"
          />
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pt-4">
        {/* Daily Summary */}
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-accent p-3">
          <Lightbulb className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-accent-foreground">
            {totalCompleted}/{totalTasks} tasks completed today
          </span>
        </div>

        {/* Pillar Cards */}
        <div className="space-y-3">
          {pillarInfo.map((pillar) => {
            const { completed, total, percentage } = getPillarCompletion(pillar.tasks);
            const isExpanded = expandedPillar === pillar.id;

            return (
              <motion.div
                key={pillar.id}
                className="overflow-hidden rounded-xl border border-border bg-card"
                layout
              >
                {/* Pillar Header */}
                <button
                  className="flex w-full items-center gap-3 p-4 text-left touch-target"
                  onClick={() => setExpandedPillar(isExpanded ? null : pillar.id)}
                >
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg text-lg", pillar.colorClass)}>
                    <span className="drop-shadow-sm">{pillar.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-foreground">{pillar.name}</h3>
                    <p className="text-xs text-muted-foreground">{completed}/{total} completed</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-sm font-bold",
                      percentage === 100 ? "text-primary" : "text-muted-foreground"
                    )}>
                      {percentage}%
                    </span>
                    <ChevronDown className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      isExpanded && "rotate-180"
                    )} />
                  </div>
                </button>

                {/* Progress bar */}
                <div className="px-4 pb-1">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", pillar.colorClass)}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                {/* Task List */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1 p-4 pt-2">
                        {pillar.tasks.map((task) => {
                          const isDone = !!todayCompletion[task.id];
                          return (
                            <div key={task.id}>
                              <button
                                onClick={() => onToggleTask(task.id)}
                                className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-muted touch-target"
                              >
                                <div className={cn(
                                  "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all",
                                  isDone ? "border-primary bg-primary" : "border-border"
                                )}>
                                  {isDone && <Check className="h-4 w-4 text-primary-foreground" />}
                                </div>
                                <span className={cn(
                                  "flex-1 text-sm font-semibold transition-all",
                                  isDone ? "text-muted-foreground line-through" : "text-foreground"
                                )}>
                                  {task.label}
                                </span>
                                {task.frequency && (
                                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                    {task.frequency}
                                  </span>
                                )}
                              </button>
                              {task.timer && !isDone && (
                                <div className="ml-8 mb-1">
                                  <Timer
                                    duration={task.timer}
                                    label={task.label}
                                    onComplete={() => onToggleTask(task.id)}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
