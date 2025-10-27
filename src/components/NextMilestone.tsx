// src/components/NextMilestone.tsx

import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, CheckCircle2 } from 'lucide-react';
import type { FastingMilestone } from '../utils/types/fasting';

interface NextMilestoneProps {
  milestone: FastingMilestone;
  hoursUntilNext: number;
}

export function NextMilestone({ milestone, hoursUntilNext }: NextMilestoneProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hours = Math.floor(hoursUntilNext);
  const minutes = Math.floor((hoursUntilNext % 1) * 60);

  return (
    <div className="next-milestone-container">
      <button 
        className="next-milestone-header"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="next-milestone-main">
          <div className="next-label">
            <Clock size={16} />
            Next Milestone
          </div>
          <div className="next-title" style={{ color: milestone.color }}>
            {milestone.title}
          </div>
          <div className="next-time">
            in {hours}h {minutes}m
          </div>
        </div>
        <div className="expand-icon">
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </button>

      {isExpanded && (
        <div className="next-milestone-details">
          <div className="details-header">What's Coming:</div>
          <ul className="benefits-list">
            {milestone.benefits.map((benefit, idx) => (
              <li key={idx}>
                <CheckCircle2 size={16} style={{ color: milestone.color }} />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
