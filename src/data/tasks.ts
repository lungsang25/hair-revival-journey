import { Task } from "@/types/hair-tracker";

export const pillar1Tasks: Task[] = [
  { id: "no_shampoo", label: "No shampoo (water-only wash)", pillar: 1, daily: true },
  { id: "sunlight", label: "15-30 min sunlight exposure", pillar: 1, daily: true },
  { id: "no_gluten", label: "Avoided gluten today", pillar: 1, daily: true },
  { id: "no_processed", label: "Avoided processed foods", pillar: 1, daily: true },
  { id: "shower_filter", label: "Shower filter active", pillar: 1, daily: true, oneTimeSetup: true },
  { id: "no_hair_products", label: "No synthetic hair products", pillar: 1, daily: true },
];

export const pillar2Tasks: Task[] = [
  { id: "morning_massage", label: "Morning scalp massage", pillar: 2, daily: true, timer: 300 },
  { id: "evening_massage", label: "Evening scalp massage", pillar: 2, daily: true, timer: 300 },
  { id: "essential_oils", label: "Applied rosemary oil", pillar: 2, daily: true },
  { id: "microneedling", label: "Microneedling session", pillar: 2, daily: false, frequency: "Every other day", timer: 240, guide: true },
  { id: "inversion", label: "Inversion therapy", pillar: 2, daily: false, frequency: "4x/week", timer: 600 },
];

export const pillar3Tasks: Task[] = [
  { id: "breakfast_eggs", label: "3-4 eggs + butter + greens", pillar: 3, daily: true },
  { id: "lunch_meat", label: "100g meat + rice + mushrooms", pillar: 3, daily: true },
  { id: "snack_seeds", label: "Pumpkin/sunflower seeds", pillar: 3, daily: true },
  { id: "water", label: "8 glasses of water", pillar: 3, daily: true, counter: true },
  { id: "morning_wheatgrass", label: "Wheat grass powder (1 tsp)", pillar: 3, daily: true },
  { id: "morning_kelp", label: "Kelp powder (1/4 tsp)", pillar: 3, daily: true },
  { id: "evening_wheatgrass", label: "Evening wheat grass", pillar: 3, daily: true },
  { id: "evening_kelp", label: "Evening kelp", pillar: 3, daily: true },
  { id: "hair_mask", label: "Nutrient hair mask (4-7hrs)", pillar: 3, daily: false, frequency: "2x/week", timer: 14400 },
];

export const allTasks = [...pillar1Tasks, ...pillar2Tasks, ...pillar3Tasks];

export const pillarInfo = [
  { id: 1, name: "Reduce Scalp Inflammation", icon: "🛡️", tasks: pillar1Tasks, colorClass: "pillar-inflammation" },
  { id: 2, name: "Improve Blood Flow", icon: "💉", tasks: pillar2Tasks, colorClass: "pillar-bloodflow" },
  { id: 3, name: "Supply Nutrients", icon: "🥗", tasks: pillar3Tasks, colorClass: "pillar-nutrients" },
];

export const streakMilestones = [
  { days: 7, label: "Week Warrior", emoji: "🥉" },
  { days: 30, label: "Monthly Champion", emoji: "🥈" },
  { days: 60, label: "Halfway Hero", emoji: "🥇" },
  { days: 84, label: "Transformation Complete", emoji: "🏆" },
];
