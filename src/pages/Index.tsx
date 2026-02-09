import { useAppState } from "@/hooks/useAppState";
import { Onboarding } from "@/components/Onboarding";
import { Dashboard } from "@/components/Dashboard";
import { BottomNav } from "@/components/BottomNav";
import { Routes, Route } from "react-router-dom";
import CalendarPage from "@/pages/CalendarPage";
import ProgressPage from "@/pages/ProgressPage";
import LearnPage from "@/pages/LearnPage";
import ProfilePage from "@/pages/ProfilePage";

const Index = () => {
  const {
    state,
    currentDay,
    currentWeek,
    currentMonth,
    todayCompletion,
    toggleTask,
    completeOnboarding,
    getPillarCompletion,
  } = useAppState();

  if (!state.user.onboardingComplete) {
    return (
      <Onboarding
        onComplete={(data) =>
          completeOnboarding({
            ...data,
            startDate: "",
            onboardingComplete: false,
          })
        }
      />
    );
  }

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <Dashboard
              currentDay={currentDay}
              currentWeek={currentWeek}
              currentMonth={currentMonth}
              streak={state.streaks.current}
              todayCompletion={todayCompletion}
              onToggleTask={toggleTask}
              getPillarCompletion={getPillarCompletion}
            />
          }
        />
        <Route
          path="calendar"
          element={
            <CalendarPage
              dailyData={state.dailyData}
              startDate={state.user.startDate}
              currentDay={currentDay}
            />
          }
        />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="learn" element={<LearnPage />} />
        <Route path="profile" element={<ProfilePage state={state} currentDay={currentDay} />} />
      </Routes>
      <BottomNav />
    </>
  );
};

export default Index;
