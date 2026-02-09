import { useLocalStorage } from "./useLocalStorage";
import { AppState, DailyCompletion } from "@/types/hair-tracker";
import { useMemo, useCallback } from "react";
import { allTasks } from "@/data/tasks";

const defaultState: AppState = {
  user: {
    ageRange: "",
    commitmentLevel: "",
    hairPattern: [],
    startDate: "",
    onboardingComplete: false,
  },
  dailyData: {},
  photos: {},
  metrics: {},
  streaks: { current: 0, best: 0 },
  settings: {
    notifications: true,
    maskDays: ["Mon", "Thu"],
  },
};

export function useAppState() {
  const [state, setState] = useLocalStorage<AppState>("hairRegrowthData", defaultState);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const currentDay = useMemo(() => {
    if (!state.user.startDate) return 0;
    const start = new Date(state.user.startDate);
    const now = new Date(today);
    const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.min(Math.max(diff + 1, 1), 84);
  }, [state.user.startDate, today]);

  const currentWeek = useMemo(() => Math.ceil(currentDay / 7), [currentDay]);
  const currentMonth = useMemo(() => Math.ceil(currentDay / 28), [currentDay]);

  const todayCompletion = useMemo(() => state.dailyData[today] || {}, [state.dailyData, today]);

  const toggleTask = useCallback((taskId: string) => {
    setState((prev) => {
      const dayData = prev.dailyData[today] || {};
      const newDayData: DailyCompletion = {
        ...dayData,
        [taskId]: !dayData[taskId],
      };
      const newDailyData = { ...prev.dailyData, [today]: newDayData };

      // Recalculate streak
      let streak = 0;
      const d = new Date(today);
      while (true) {
        const dateStr = d.toISOString().split("T")[0];
        const dayCompletion = newDailyData[dateStr];
        if (!dayCompletion) break;
        const completedCount = Object.values(dayCompletion).filter(Boolean).length;
        if (completedCount >= allTasks.length * 0.5) {
          streak++;
          d.setDate(d.getDate() - 1);
        } else {
          break;
        }
      }

      return {
        ...prev,
        dailyData: newDailyData,
        streaks: {
          current: streak,
          best: Math.max(streak, prev.streaks.best),
        },
      };
    });
  }, [setState, today]);

  const completeOnboarding = useCallback((user: AppState["user"]) => {
    setState((prev) => ({
      ...prev,
      user: { ...user, onboardingComplete: true, startDate: today },
    }));
  }, [setState, today]);

  const getPillarCompletion = useCallback(
    (pillarTasks: { id: string }[]) => {
      const completed = pillarTasks.filter((t) => todayCompletion[t.id]).length;
      return { completed, total: pillarTasks.length, percentage: Math.round((completed / pillarTasks.length) * 100) };
    },
    [todayCompletion]
  );

  return {
    state,
    setState,
    today,
    currentDay,
    currentWeek,
    currentMonth,
    todayCompletion,
    toggleTask,
    completeOnboarding,
    getPillarCompletion,
  };
}
