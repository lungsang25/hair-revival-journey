import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface TimerProps {
  duration: number;
  onComplete?: () => void;
  label: string;
}

export function Timer({ duration, onComplete, label }: TimerProps) {
  const [remaining, setRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, remaining, onComplete]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setRemaining(duration);
    clearInterval(intervalRef.current);
  }, [duration]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const progress = ((duration - remaining) / duration) * 100;

  return (
    <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
      <div className="relative h-12 w-12 flex-shrink-0">
        <svg className="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
          <circle
            cx="24" cy="24" r="20" fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 20}`}
            strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-foreground">
          {mins}:{secs.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="flex-1 text-sm font-medium text-foreground">{label}</span>
      <div className="flex gap-1">
        <Button
          size="icon"
          variant="ghost"
          className="h-9 w-9"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button size="icon" variant="ghost" className="h-9 w-9" onClick={reset}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
