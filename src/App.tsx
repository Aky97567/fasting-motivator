// src/App.tsx

import { useState, useEffect } from 'react';
import { TimeInput } from './components/TimeInput';
import { MilestoneCard } from './components/MilestoneCard';
import { NextMilestone } from './components/NextMilestone';
import { Timeline } from './components/Timeline';
import { calculateProgress, MILESTONES } from './utils/milestones';
import { Flame, RotateCcw } from 'lucide-react';
import './App.css';

export default function App() {
  const [lastMealTime, setLastMealTime] = useState<Date | null>(() => {
    const stored = localStorage.getItem('lastMealTime');
    return stored ? new Date(stored) : null;
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastIntervalMinute, setLastIntervalMinute] = useState(-1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!lastMealTime) return;

    const progress = calculateProgress(lastMealTime);
    const totalMinutes = Math.floor(progress.hours * 60);
    const intervalMinute = Math.floor(totalMinutes / 15) * 15;

    if (intervalMinute > lastIntervalMinute && lastIntervalMinute !== -1) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }

    setLastIntervalMinute(intervalMinute);
  }, [currentTime, lastMealTime]);

  const handleStartTracking = (date: Date) => {
    setLastMealTime(date);
    localStorage.setItem('lastMealTime', date.toISOString());
  };

  const handleReset = () => {
    if (confirm('Reset your fasting timer?')) {
      setLastMealTime(null);
      localStorage.removeItem('lastMealTime');
      setLastIntervalMinute(-1);
    }
  };

  if (!lastMealTime) {
    return (
      <div className="app">
        <TimeInput onSubmit={handleStartTracking} />
      </div>
    );
  }

  const progress = calculateProgress(lastMealTime);
  const { hours, minutes, currentMilestone, nextMilestone, hoursUntilNext, progress: progressPercent } = progress;

  const displayHours = Math.floor(hours);
  const displayMinutes = Math.floor(minutes);

  return (
    <div className="app">
      {showCelebration && (
        <div className="celebration">
          <Flame size={64} />
          <span>15 Minutes! Keep Going! 🔥</span>
        </div>
      )}

      <Timeline 
        milestones={MILESTONES}
        currentMilestone={currentMilestone}
        currentHours={hours}
      />

      <header className="app-header">
        <div className="header-content">
          <h1>
            <Flame size={32} />
            Fasting Tracker
          </h1>
          <button onClick={handleReset} className="reset-btn" title="Reset">
            <RotateCcw size={20} />
          </button>
        </div>

        <div className="timer-display">
          <div className="time-value">
            <span className="time-number">{displayHours}</span>
            <span className="time-label">hours</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-value">
            <span className="time-number">{displayMinutes.toString().padStart(2, '0')}</span>
            <span className="time-label">minutes</span>
          </div>
        </div>
      </header>

      <div className="milestones-container">
        <div className="current-milestone-section">
          <h2>Current Milestone</h2>
          <MilestoneCard 
            milestone={currentMilestone} 
            isCurrent={true}
            progress={progressPercent}
          />
          
          {nextMilestone && (
            <NextMilestone 
              milestone={nextMilestone} 
              hoursUntilNext={hoursUntilNext}
            />
          )}
        </div>
      </div>
    </div>
  );
}
