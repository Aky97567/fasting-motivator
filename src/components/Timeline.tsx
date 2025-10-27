// src/components/Timeline.tsx

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { FastingMilestone } from '../utils/types/fasting';

interface TimelineProps {
  milestones: FastingMilestone[];
  currentMilestone: FastingMilestone;
  currentHours: number;
}

export function Timeline({ milestones, currentMilestone, currentHours }: TimelineProps) {
  const [hoveredMilestone, setHoveredMilestone] = useState<FastingMilestone | null>(null);

  const isCompleted = (milestone: FastingMilestone) => currentHours >= milestone.hours;
  const isCurrent = (milestone: FastingMilestone) => milestone.hours === currentMilestone.hours;
  
  // Check if milestone is one of the last two
  const isLastTwo = (milestone: FastingMilestone) => {
    const index = milestones.findIndex(m => m.hours === milestone.hours);
    return index >= milestones.length - 2;
  };

  return (
    <div className="timeline-container">
      <div className="timeline-line" />
      
      {milestones.map((milestone) => {
        const completed = isCompleted(milestone);
        const current = isCurrent(milestone);
        const lastTwo = isLastTwo(milestone);
        
        return (
          <div
            key={milestone.hours}
            className={`timeline-item ${completed ? 'completed' : ''} ${current ? 'current' : ''}`}
            onMouseEnter={() => setHoveredMilestone(milestone)}
            onMouseLeave={() => setHoveredMilestone(null)}
          >
            <div 
              className="timeline-dot"
              style={{ 
                backgroundColor: completed ? milestone.color : 'transparent',
                borderColor: milestone.color 
              }}
            >
              {current && (
                <div className="current-pulse" style={{ borderColor: milestone.color }} />
              )}
            </div>

            {current && <div className="current-arrow" style={{ borderLeftColor: milestone.color }} />}

            {hoveredMilestone?.hours === milestone.hours && (
              <div 
                className={`timeline-hover-card ${lastTwo ? 'align-bottom' : ''}`}
                style={{ borderColor: milestone.color }}
              >
                <div className="hover-card-header">
                  <h4 style={{ color: milestone.color }}>{milestone.title}</h4>
                  <span className="hover-card-hours">{milestone.hours}h</span>
                </div>
                <ul className="hover-card-benefits">
                  {milestone.benefits.map((benefit, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={14} style={{ color: milestone.color }} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
