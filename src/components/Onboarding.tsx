import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Leaf, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingProps {
  onComplete: (data: {
    ageRange: string;
    commitmentLevel: string;
    hairPattern: string[];
  }) => void;
}

const steps = ["Welcome", "Age", "Hair", "Commit", "Summary"];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [ageRange, setAgeRange] = useState("");
  const [hairPattern, setHairPattern] = useState<string[]>([]);
  const [commitmentLevel, setCommitmentLevel] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const toggleHair = (pattern: string) => {
    setHairPattern((prev) =>
      prev.includes(pattern) ? prev.filter((p) => p !== pattern) : [...prev, pattern]
    );
  };

  const handleComplete = () => {
    onComplete({ ageRange, commitmentLevel, hairPattern });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 pt-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === step ? "w-8 bg-primary" : i < step ? "w-2 bg-primary/60" : "w-2 bg-muted"
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="flex flex-1 flex-col items-center justify-center px-6"
        >
          {step === 0 && (
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent">
                <Leaf className="h-10 w-10 text-primary" />
              </div>
              <h1 className="mb-3 text-3xl font-bold text-foreground">Natural Hair Regrowth</h1>
              <p className="mb-2 text-lg text-muted-foreground">Your 3-Month Journey</p>
              <p className="mb-8 max-w-xs text-sm text-muted-foreground">
                Reverse hair loss naturally with our science-backed 3-pillar protocol
              </p>
              <Button className="touch-target w-full max-w-xs text-base font-semibold" onClick={next}>
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {step === 1 && (
            <div className="w-full max-w-sm">
              <h2 className="mb-2 text-center text-2xl font-bold text-foreground">What's your age range?</h2>
              <p className="mb-6 text-center text-sm text-muted-foreground">This helps us customize your protocol</p>
              <div className="flex flex-col gap-3">
                {["18-25 years", "26-35 years", "36-45 years", "46+ years"].map((age) => (
                  <button
                    key={age}
                    onClick={() => setAgeRange(age)}
                    className={cn(
                      "touch-target flex items-center rounded-xl border-2 px-5 py-4 text-left text-base font-semibold transition-all",
                      ageRange === age
                        ? "border-primary bg-accent text-accent-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/40"
                    )}
                  >
                    <span className="flex-1">{age}</span>
                    {ageRange === age && <Check className="h-5 w-5 text-primary" />}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" className="touch-target flex-1" onClick={prev}>Back</Button>
                <Button className="touch-target flex-1" onClick={next} disabled={!ageRange}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="w-full max-w-sm">
              <h2 className="mb-2 text-center text-2xl font-bold text-foreground">Your hair loss pattern</h2>
              <p className="mb-6 text-center text-sm text-muted-foreground">Select all that apply</p>
              <div className="flex flex-col gap-3">
                {[
                  "Receding hairline/temples",
                  "Crown thinning",
                  "Overall density loss",
                  "Patchy hair loss",
                  "No loss yet (prevention)",
                ].map((pattern) => (
                  <button
                    key={pattern}
                    onClick={() => toggleHair(pattern)}
                    className={cn(
                      "touch-target flex items-center rounded-xl border-2 px-5 py-4 text-left text-base font-semibold transition-all",
                      hairPattern.includes(pattern)
                        ? "border-primary bg-accent text-accent-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/40"
                    )}
                  >
                    <div className={cn(
                      "mr-3 flex h-6 w-6 items-center justify-center rounded-md border-2 transition-all",
                      hairPattern.includes(pattern) ? "border-primary bg-primary" : "border-border"
                    )}>
                      {hairPattern.includes(pattern) && <Check className="h-4 w-4 text-primary-foreground" />}
                    </div>
                    <span className="flex-1">{pattern}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" className="touch-target flex-1" onClick={prev}>Back</Button>
                <Button className="touch-target flex-1" onClick={next} disabled={hairPattern.length === 0}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="w-full max-w-sm">
              <h2 className="mb-2 text-center text-2xl font-bold text-foreground">Your daily commitment</h2>
              <p className="mb-6 text-center text-sm text-muted-foreground">Results are proportional to commitment</p>
              <div className="flex flex-col gap-3">
                {[
                  { value: "full", label: "Full protocol", desc: "60-90 min/day", badge: "⭐ Best results" },
                  { value: "moderate", label: "Moderate", desc: "30-45 min/day", badge: "" },
                  { value: "minimal", label: "Minimal", desc: "15-20 min/day", badge: "" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setCommitmentLevel(opt.value)}
                    className={cn(
                      "touch-target flex items-center rounded-xl border-2 px-5 py-4 text-left transition-all",
                      commitmentLevel === opt.value
                        ? "border-primary bg-accent"
                        : "border-border bg-card hover:border-primary/40"
                    )}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-foreground">{opt.label}</span>
                        {opt.badge && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{opt.badge}</span>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{opt.desc}</span>
                    </div>
                    {commitmentLevel === opt.value && <Check className="h-5 w-5 text-primary" />}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" className="touch-target flex-1" onClick={prev}>Back</Button>
                <Button className="touch-target flex-1" onClick={next} disabled={!commitmentLevel}>
                  Generate My Plan <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="w-full max-w-sm">
              <div className="mb-4 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                  <Check className="h-7 w-7 text-primary" />
                </div>
              </div>
              <h2 className="mb-4 text-center text-2xl font-bold text-foreground">Your Protocol is Ready!</h2>

              <div className="mb-5 space-y-2 rounded-xl bg-card p-4 border border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Age</span>
                  <span className="font-medium text-foreground">{ageRange}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Focus</span>
                  <span className="font-medium text-foreground text-right max-w-[200px]">{hairPattern.join(", ")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Commitment</span>
                  <span className="font-medium text-foreground capitalize">{commitmentLevel}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium text-foreground">12 weeks (84 days)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">First results</span>
                  <span className="font-medium text-primary">Week 8-10</span>
                </div>
              </div>

              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">3 Pillars</h3>
              <div className="mb-6 space-y-2">
                {[
                  { icon: "🛡️", label: "Reduce Scalp Inflammation", cls: "pillar-inflammation" },
                  { icon: "💉", label: "Improve Blood Flow", cls: "pillar-bloodflow" },
                  { icon: "🥗", label: "Supply Nutrients", cls: "pillar-nutrients" },
                ].map((p) => (
                  <div key={p.label} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                    <span className="text-xl">{p.icon}</span>
                    <span className="text-sm font-semibold text-foreground">{p.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="touch-target flex-1" onClick={prev}>Back</Button>
                <Button className="touch-target flex-1 text-base font-semibold" onClick={handleComplete}>
                  Start Day 1 <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
