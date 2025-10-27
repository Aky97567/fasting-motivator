// src/components/MilestoneCard.tsx

import type { FastingMilestone } from "../utils/types/fasting";
import { CheckCircle2 } from "lucide-react";

interface MilestoneCardProps {
  milestone: FastingMilestone;
  isCurrent: boolean;
  progress?: number;
}

export function MilestoneCard({
  milestone,
  isCurrent,
  progress = 0,
}: MilestoneCardProps) {
  return (
    <div
      className={`milestone-card ${isCurrent ? "current" : "completed"}`}
      style={{ borderColor: milestone.color }}
    >
      <div className="milestone-header">
        <h3 style={{ color: milestone.color }}>{milestone.title}</h3>
        <span className="milestone-hours">{milestone.hours}h</span>
      </div>

      {isCurrent && (
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
              backgroundColor: milestone.color,
            }}
          />
        </div>
      )}

      <ul className="benefits-list">
        {milestone.benefits.map((benefit, idx) => (
          <li key={idx}>
            <CheckCircle2 size={16} style={{ color: milestone.color }} />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
