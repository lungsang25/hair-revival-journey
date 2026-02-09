import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { DailyData } from "@/types/hair-tracker";
import { allTasks } from "@/data/tasks";

interface CalendarPageProps {
  dailyData: DailyData;
  startDate: string;
  currentDay: number;
}

export default function CalendarPage({ dailyData, startDate, currentDay }: CalendarPageProps) {
  const weeks = useMemo(() => {
    if (!startDate) return [];
    const start = new Date(startDate);
    const result: { date: string; dayNum: number; percentage: number }[][] = [];

    for (let w = 0; w < 12; w++) {
      const week: typeof result[0] = [];
      for (let d = 0; d < 7; d++) {
        const dayNum = w * 7 + d + 1;
        const date = new Date(start);
        date.setDate(date.getDate() + w * 7 + d);
        const dateStr = date.toISOString().split("T")[0];
        const dayData = dailyData[dateStr] || {};
        const completed = Object.values(dayData).filter(Boolean).length;
        const percentage = Math.round((completed / allTasks.length) * 100);
        week.push({ date: dateStr, dayNum, percentage });
      }
      result.push(week);
    }
    return result;
  }, [dailyData, startDate]);

  const getColor = (pct: number, dayNum: number) => {
    if (dayNum > currentDay) return "bg-muted text-muted-foreground/40";
    if (pct === 0) return "bg-muted text-muted-foreground";
    if (pct < 50) return "bg-destructive/20 text-destructive";
    if (pct < 80) return "bg-warning/20 text-warning";
    return "bg-primary/20 text-primary";
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="mx-auto max-w-lg px-4">
        <h1 className="mb-1 text-2xl font-bold text-foreground">Calendar</h1>
        <p className="mb-4 text-sm text-muted-foreground">Your weekly compliance overview</p>

        <div className="mb-3 flex gap-1 text-xs font-medium text-muted-foreground">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i} className="flex-1 text-center">{d}</div>
          ))}
        </div>

        <div className="space-y-2">
          {weeks.map((week, wi) => (
            <div key={wi}>
              <p className="mb-1 text-xs font-semibold text-muted-foreground">Week {wi + 1}</p>
              <div className="flex gap-1">
                {week.map((day) => (
                  <div
                    key={day.date}
                    className={cn(
                      "flex flex-1 flex-col items-center justify-center rounded-lg py-2 text-xs font-bold transition-colors",
                      getColor(day.percentage, day.dayNum),
                      day.dayNum === currentDay && "ring-2 ring-primary"
                    )}
                  >
                    <span>{day.dayNum}</span>
                    {day.dayNum <= currentDay && (
                      <span className="text-[10px] font-medium opacity-70">{day.percentage}%</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
