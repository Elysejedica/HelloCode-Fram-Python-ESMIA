import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import { Check, X } from 'lucide-react';

interface Choice {
  [key: string]: string;
}

interface QuizProps {
  quiz: {
    id: number;
    question: string;
    choices: Choice;
  };
  onComplete?: (correct: boolean) => void;
}

const Quiz: React.FC<QuizProps> = ({ quiz, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleAnswerSelect = (key: string) => {
    setSelectedAnswer(key);
  };
  
  const handleSubmit = async () => {
    if (!selectedAnswer) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/api/quiz-attempt/`, {
        quiz: quiz.id,
        answer: selectedAnswer
      });
      
      setIsCorrect(response.data.is_correct);
      
      if (onComplete) {
        onComplete(response.data.is_correct);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
      setIsCorrect(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="card p-6">
      <h3 className="text-lg font-medium mb-4">{quiz.question}</h3>
      
      <div className="space-y-3 mb-6">
        {Object.entries(quiz.choices).map(([key, value]) => (
          <label
            key={key}
            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedAnswer === key
                ? 'border-primary-500 bg-primary-50'
                : 'border-neutral-300 hover:bg-neutral-50'
            }`}
          >
            <input
              type="radio"
              name="quiz-answer"
              value={key}
              checked={selectedAnswer === key}
              onChange={() => handleAnswerSelect(key)}
              className="form-radio h-4 w-4 text-primary-600 transition duration-150 ease-in-out"
            />
            <span className="ml-3">{value}</span>
          </label>
        ))}
      </div>
      
      {error && <div className="text-red-600 mb-4">{error}</div>}
      
      {isCorrect !== null && (
        <div 
          className={`mb-4 p-3 rounded-lg ${
            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          <div className="flex items-center">
            {isCorrect ? (
              <>
                <Check size={18} className="mr-2" />
                <span>Correct! Great job!</span>
              </>
            ) : (
              <>
                <X size={18} className="mr-2" />
                <span>Incorrect. Try again!</span>
              </>
            )}
          </div>
        </div>
      )}
      
      <button
        onClick={handleSubmit}
        disabled={!selectedAnswer || isSubmitting || isCorrect !== null}
        className={`btn btn-primary w-full ${
          (!selectedAnswer || isSubmitting || isCorrect !== null) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
            Checking...
          </span>
        ) : isCorrect !== null ? (
          'Completed'
        ) : (
          'Submit Answer'
        )}
      </button>
    </div>
  );
};

export default Quiz;