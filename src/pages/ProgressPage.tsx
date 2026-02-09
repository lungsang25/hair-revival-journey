import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="mx-auto max-w-lg px-4">
        <h1 className="mb-1 text-2xl font-bold text-foreground">Progress</h1>
        <p className="mb-6 text-sm text-muted-foreground">Track your transformation</p>

        <div className="mb-6 space-y-3">
          {["Week 1", "Week 4", "Week 8", "Week 12"].map((week) => (
            <div key={week} className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-3 text-sm font-bold text-foreground">{week}</h3>
              <div className="grid grid-cols-4 gap-2">
                {["Front", "Left", "Right", "Crown"].map((angle) => (
                  <button
                    key={angle}
                    className="flex aspect-square flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted text-muted-foreground transition-colors hover:border-primary/40"
                  >
                    <Camera className="mb-1 h-4 w-4" />
                    <span className="text-[10px] font-medium">{angle}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Button className="touch-target w-full" size="lg">
          <Camera className="mr-2 h-5 w-5" /> Take Progress Photo
        </Button>
      </div>
    </div>
  );
}
