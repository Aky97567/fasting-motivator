// src/utils/types/fasting.ts

export interface FastingMilestone {
  hours: number;
  title: string;
  benefits: string[];
  color: string;
}

export interface FastingProgress {
  currentHours: number;
  currentMilestone: FastingMilestone;
  nextMilestone: FastingMilestone | null;
  hoursUntilNext: number;
  minutesInCurrentInterval: number;
}
