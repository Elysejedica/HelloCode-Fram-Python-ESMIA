import React from 'react';
import { Link } from 'react-router-dom';
import { Code, ChevronRight } from 'lucide-react';

interface LanguageCardProps {
  language: {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
  };
}

const LanguageCard: React.FC<LanguageCardProps> = ({ language }) => {
  return (
    <Link 
      to={`/languages/${language.slug}`}
      className="card overflow-hidden transition-all duration-200 hover:shadow-lg"
    >
      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
            <Code size={20} />
          </div>
          <h3 className="ml-3 text-xl font-semibold">{language.name}</h3>
        </div>
        
        <p className="text-neutral-600 mb-4 line-clamp-2">{language.description}</p>
        
        <div className="flex items-center text-primary-600 font-medium">
          Start learning <ChevronRight size={16} className="ml-1" />
        </div>
      </div>
      
      <div className="h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
    </Link>
  );
};

export default LanguageCard;