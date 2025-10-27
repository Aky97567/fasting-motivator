// src/components/TimeInput.tsx

import { useState } from 'react';
import { Clock } from 'lucide-react';

interface TimeInputProps {
  onSubmit: (date: Date) => void;
}

export function TimeInput({ onSubmit }: TimeInputProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;
    
    const dateTime = new Date(`${date}T${time}`);
    if (dateTime > new Date()) {
      alert('Last meal time cannot be in the future');
      return;
    }
    
    onSubmit(dateTime);
  };

  const setToNow = () => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().slice(0, 5);
    setDate(dateStr);
    setTime(timeStr);
  };

  return (
    <div className="time-input-container">
      <div className="welcome-text">
        <Clock size={48} />
        <h1>Fasting Tracker</h1>
        <p>Track your fasting journey and see the benefits unfold</p>
      </div>

      <form onSubmit={handleSubmit} className="time-input-form">
        <div className="input-group">
          <label htmlFor="date">Last Meal Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="time">Last Meal Time</label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="button" onClick={setToNow} className="btn-secondary">
            Set to Now
          </button>
          <button type="submit" className="btn-primary">
            Start Tracking
          </button>
        </div>
      </form>
    </div>
  );
}
