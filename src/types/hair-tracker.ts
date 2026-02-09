export interface UserProfile {
  ageRange: string;
  commitmentLevel: string;
  hairPattern: string[];
  startDate: string;
  onboardingComplete: boolean;
}

export interface Task {
  id: string;
  label: string;
  pillar: 1 | 2 | 3;
  daily: boolean;
  timer?: number; // seconds
  frequency?: string;
  guide?: boolean;
  counter?: boolean;
  oneTimeSetup?: boolean;
}

export interface DailyCompletion {
  [taskId: string]: boolean | number;
}

export interface DailyData {
  [date: string]: DailyCompletion;
}

export interface PhotoSet {
  front?: string;
  left?: string;
  right?: string;
  crown?: string;
}

export interface Photos {
  [weekKey: string]: PhotoSet;
}

export interface Metrics {
  [date: string]: {
    hairFall?: number;
    scalpTension?: number;
    hairQuality?: number;
  };
}

export interface AppState {
  user: UserProfile;
  dailyData: DailyData;
  photos: Photos;
  metrics: Metrics;
  streaks: { current: number; best: number };
  settings: {
    notifications: boolean;
    maskDays: string[];
  };
}
