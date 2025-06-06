import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle } from 'lucide-react';

interface LessonCardProps {
  lesson: {
    id: number;
    title: string;
    level: number;
    slug: string;
  };
  isCompleted?: boolean;
  isLocked?: boolean;
  refreshProgress?: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ 
  lesson, 
  isCompleted = false,
  isLocked = false,
  refreshProgress
}) => {
  return (
    <Link
      to={isLocked ? '#' : `/lessons/${lesson.id}`}
      className={`card p-4 flex items-center transition-all duration-200 ${
        isLocked 
          ? 'opacity-60 cursor-not-allowed' 
          : 'hover:shadow-md'
      }`}
      onClick={(e) => isLocked && e.preventDefault()}
    >
      <div className={`flex-shrink-0 ${isCompleted ? 'text-green-500' : 'text-neutral-400'}`}>
        {isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
      </div>
      
      <div className="ml-3 flex-grow">
        <h4 className="font-medium">{lesson.title}</h4>
        <div className="text-sm text-neutral-500">
          Level {lesson.level}
        </div>
      </div>
      
      <div className="flex-shrink-0">
        {isLocked ? (
          <span className="badge badge-warning">Locked</span>
        ) : isCompleted ? (
          <span className="badge badge-success">Completed</span>
        ) : (
          <span className="badge badge-primary">Available</span>
        )}
      </div>
    </Link>
  );
};

export default LessonCard;