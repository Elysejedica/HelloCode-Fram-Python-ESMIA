import React from 'react';
import { Award } from 'lucide-react';

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  earned_at?: string;
}

interface BadgeDisplayProps {
  badge: Badge;
  isEarned?: boolean;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badge, isEarned = false }) => {
  return (
    <div 
      className={`card p-4 flex flex-col items-center text-center 
        ${isEarned ? 'bg-white' : 'bg-neutral-100 opacity-60'}`}
    >
      <div 
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-3
          ${isEarned ? 'bg-primary-100 text-primary-600' : 'bg-neutral-200 text-neutral-500'}`}
      >
        <Award size={32} />
      </div>
      
      <h4 className="font-medium mb-1">{badge.name}</h4>
      <p className="text-sm text-neutral-600 mb-2">{badge.description}</p>
      
      {isEarned && badge.earned_at && (
        <div className="text-xs text-neutral-500">
          Earned on {new Date(badge.earned_at).toLocaleDateString()}
        </div>
      )}
      
      {!isEarned && (
        <div className="text-xs text-neutral-500">
          Keep learning to unlock this badge
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;