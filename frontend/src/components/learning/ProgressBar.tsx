import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  colorClass?: string;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max, 
  colorClass = 'bg-primary-600',
  label
}) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1 text-sm text-neutral-700">
          <span>{label}</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className="progress-bar">
        <div 
          className={`progress-bar-fill ${colorClass}`} 
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default ProgressBar;