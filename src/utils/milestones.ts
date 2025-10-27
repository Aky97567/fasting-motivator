// src/utils/milestones.ts

import type { FastingMilestone } from "./types/fasting";

export const MILESTONES: FastingMilestone[] = [
  {
    hours: 0,
    title: "Fed State",
    benefits: [
      "Body processing last meal",
      "Absorbing glucose and nutrients",
      "Digestive system active",
    ],
    color: "#94a3b8",
  },
  {
    hours: 4,
    title: "Post-Absorptive",
    benefits: [
      "Digestion complete",
      "Blood sugar stabilizing",
      "Body preparing for metabolic shift",
    ],
    color: "#64748b",
  },
  {
    hours: 8,
    title: "Glycogen Depletion Begins",
    benefits: [
      "Blood glucose dipping naturally",
      "Body tapping into glycogen stores",
      "Metabolic transition starting",
    ],
    color: "#475569",
  },
  {
    hours: 12,
    title: "Early Ketosis",
    benefits: [
      "Glycogen depleted",
      "Blood sugar stabilized",
      "Insulin dropping",
      "Body burning fat for fuel",
      "Reduced gut toxin exposure",
    ],
    color: "#0ea5e9",
  },
  {
    hours: 16,
    title: "Full Ketosis",
    benefits: [
      "Liver converting fat to ketones",
      "Appetite suppression begins",
      "Neurons switch to ketones",
      "Enhanced mental clarity",
      "Autophagy ramping up",
    ],
    color: "#06b6d4",
  },
  {
    hours: 18,
    title: "Deep Metabolic Shift",
    benefits: [
      "Growth hormone up 300-500%",
      "Insulin at lowest levels",
      "Maximized fat burning (200-300g/day)",
      "Significant autophagy activation",
      "Anti-aging processes begin",
      "Oxidative stress reduced up to 50%",
    ],
    color: "#8b5cf6",
  },
  {
    hours: 24,
    title: "Enhanced Autophagy",
    benefits: [
      "Deep ketosis (3-6 mmol/L)",
      "Autophagy increasing significantly",
      "BDNF increases (brain support)",
      "Damaged cell cleanup accelerates",
      "Inflammation reduction",
    ],
    color: "#a855f7",
  },
  {
    hours: 48,
    title: "Immune Regeneration",
    benefits: [
      "Peak autophagy activity",
      "Immune system eliminating old cells",
      "Stem cell production begins",
      "IGF-1 drops (anti-aging/anti-cancer)",
      "Deep cellular repair",
    ],
    color: "#d946ef",
  },
  {
    hours: 72,
    title: "Deep Regeneration",
    benefits: [
      "Maximum autophagy",
      "Massive stem cell production",
      "Immune system regeneration",
      "Deep ketosis (6-8 mmol/L)",
      'Body in "reset mode"',
      "Old cells systematically replaced",
      "Protein conservation optimized",
    ],
    color: "#ec4899",
  },
];

export function getCurrentMilestone(hours: number): FastingMilestone {
  for (let i = MILESTONES.length - 1; i >= 0; i--) {
    if (hours >= MILESTONES[i].hours) {
      return MILESTONES[i];
    }
  }
  return MILESTONES[0];
}

export function getNextMilestone(hours: number): FastingMilestone | null {
  for (let i = 0; i < MILESTONES.length; i++) {
    if (hours < MILESTONES[i].hours) {
      return MILESTONES[i];
    }
  }
  return null;
}

export function calculateProgress(lastMealTime: Date): {
  hours: number;
  minutes: number;
  currentMilestone: FastingMilestone;
  nextMilestone: FastingMilestone | null;
  hoursUntilNext: number;
  progress: number;
} {
  const now = new Date();
  const diffMs = now.getTime() - lastMealTime.getTime();
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = totalMinutes / 60;
  const minutes = totalMinutes % 60;

  const currentMilestone = getCurrentMilestone(hours);
  const nextMilestone = getNextMilestone(hours);

  const hoursUntilNext = nextMilestone ? nextMilestone.hours - hours : 0;

  const progress = nextMilestone
    ? ((hours - currentMilestone.hours) /
        (nextMilestone.hours - currentMilestone.hours)) *
      100
    : 100;

  return {
    hours,
    minutes,
    currentMilestone,
    nextMilestone,
    hoursUntilNext,
    progress,
  };
}
