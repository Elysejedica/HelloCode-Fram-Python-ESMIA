import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import Layout from '../components/common/Layout';
import CodeEditor from '../components/learning/CodeEditor';
import Quiz from '../components/learning/Quiz';
import { BookOpen, ChevronLeft, ChevronRight, RefreshCw, AlertCircle, Check } from 'lucide-react';

const LessonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [lesson, setLesson] = useState<any | null>(null);
  const [language, setLanguage] = useState<any | null>(null);
  const [progress, setProgress] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Track quiz and exercise completion
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<number>>(new Set());
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const lessonResponse = await axios.get(`${API_URL}/api/lessons/${id}/`);
        setLesson(lessonResponse.data);
        
        // Fetch language
        const languageResponse = await axios.get(`${API_URL}/api/languages/${lessonResponse.data.language}/`);
        setLanguage(languageResponse.data);
        
        // Check for existing progress
        try {
          const progressResponse = await axios.get(`${API_URL}/api/progress/?lesson=${id}`);
          if (progressResponse.data.length > 0) {
            setProgress(progressResponse.data[0]);
          } else {
            // Create progress entry if none exists
            const newProgressResponse = await axios.post(`${API_URL}/api/progress/`, {
              lesson: parseInt(id as string),
              completed: false
            });
            setProgress(newProgressResponse.data);
          }
        } catch (progressError) {
          console.error('Progress fetch error:', progressError);
        }
      } catch (err) {
        setError('Failed to load lesson');
        console.error('Lesson fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchData();
    }
  }, [id]);
  
  const handleLessonComplete = async () => {
    if (!progress || progress.completed) return;
    
    setIsSaving(true);
    
    try {
      const response = await axios.patch(`${API_URL}/api/progress/${progress.id}/`, {
        completed: true
      });
      
      setProgress(response.data);
    } catch (err) {
      console.error('Failed to update progress', err);
    } finally {
      setIsSaving(false);
    }
  };
  
  
  const canCompleteLesson = () => {
    if (!lesson) return false;
    
    // Check if all quizzes are completed
    const allQuizzesCompleted = lesson.quizzes.length === 0 || 
      lesson.quizzes.every((quiz: any) => completedQuizzes.has(quiz.id));
    
    // Check if all exercises are completed
    const allExercisesCompleted = lesson.exercises.length === 0 || 
      lesson.exercises.every((exercise: any) => completedExercises.has(exercise.id));
    
    return allQuizzesCompleted && allExercisesCompleted;
  };
  
  const handleQuizComplete = (quizId: number, isCorrect: boolean) => {
    if (isCorrect) {
      setCompletedQuizzes(prev => new Set(prev).add(quizId));
    }
  };
  
  const handleExerciseComplete = (exerciseId: number) => {
    setCompletedExercises(prev => new Set(prev).add(exerciseId));
  };
  
  const navigateToNextLesson = () => {
    if (!language || !lesson) return;
    
    const sortedLessons = [...language.lessons].sort((a, b) => 
      a.level - b.level || a.order - b.order
    );
    
    const currentIndex = sortedLessons.findIndex(l => l.id === lesson.id);
    
    if (currentIndex < sortedLessons.length - 1) {
      navigate(`/lessons/${sortedLessons[currentIndex + 1].id}`);
    } else {
      // If this was the last lesson, go back to language page
      navigate(`/languages/${language.slug}`);
    }
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-64px-200px)] flex items-center justify-center">
          <div className="flex items-center space-x-2 text-neutral-600">
            <RefreshCw size={20} className="animate-spin" />
            <span>Loading lesson...</span>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error || !lesson) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg flex items-start">
            <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
            <span>{error || 'Lesson not found'}</span>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <div className="flex items-center text-sm text-neutral-600 mb-2">
            <BookOpen size={16} className="mr-1" />
            <span>{language?.name} - Level {lesson.level}</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
          
          {progress?.completed && (
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full inline-flex items-center text-sm font-medium">
              <Check size={16} className="mr-1" />
              Completed
            </div>
          )}
        </div>
        
        <div className="prose prose-blue max-w-none mb-10">
          <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
        </div>
        
        {lesson.quizzes && lesson.quizzes.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Quiz Time</h2>
            <div className="space-y-6">
              {lesson.quizzes.map((quiz: any) => (
                <Quiz 
                  key={quiz.id} 
                  quiz={quiz} 
                  onComplete={(isCorrect) => handleQuizComplete(quiz.id, isCorrect)}
                />
              ))}
            </div>
          </div>
        )}
        
        {lesson.exercises && lesson.exercises.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Practice</h2>
            <div className="space-y-8">
              {lesson.exercises.map((exercise: any) => (
                <div key={exercise.id} className="space-y-4">
                  <div className="prose prose-blue max-w-none">
                    <h3>{exercise.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: exercise.instruction }} />
                  </div>
                  <CodeEditor 
                    exerciseId={exercise.id} 
                    initialCode={exercise.initial_code}
                    onSuccess={() => handleExerciseComplete(exercise.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-12 flex justify-between">
          <button
            onClick={() => navigate(`/languages/${language?.slug}`)}
            className="btn btn-outline flex items-center"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Path
          </button>
          
          {progress?.completed ? (
            <button
              onClick={navigateToNextLesson}
              className="btn btn-primary flex items-center"
            >
              Next Lesson
              <ChevronRight size={16} className="ml-1" />
            </button>
          ) : (
            <button
              onClick={handleLessonComplete}
              disabled={!canCompleteLesson() || isSaving}
              className={`btn btn-primary flex items-center ${
                !canCompleteLesson() || isSaving ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSaving ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                  Saving...
                </>
              ) : (
                <>
                  Complete Lesson
                  <Check size={16} className="ml-1" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LessonPage;