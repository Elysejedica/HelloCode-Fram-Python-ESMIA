import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import Layout from '../components/common/Layout';
import LessonCard from '../components/learning/LessonCard';
import { Code, BookOpen, RefreshCw, Layers, AlertCircle } from 'lucide-react';
import MonacoEditor from '@monaco-editor/react';

const LANGUAGES = [
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
];

const MONACO_LANG_MAP: Record<string, string> = {
  python: 'python',
  javascript: 'javascript',
  java: 'java',
};

const LanguageDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [language, setLanguage] = useState<any | null>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('python');
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('access');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const [languageRes, progressRes] = await Promise.all([
          axios.get(`${API_URL}/api/languages/${slug}/`, { headers }),
          axios.get(`${API_URL}/api/progress/`, { headers })
        ]);
        
        setLanguage(languageRes.data);
        setProgress(progressRes.data);
      } catch (err) {
        setError('Failed to load language details');
        console.error('Language detail fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (slug) {
      fetchData();
    }
  }, [slug]);
  
  useEffect(() => {
    const fetchProgress = async () => {
      const token = localStorage.getItem('access');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(`${API_URL}/api/progress/`, { headers });
      setProgress(res.data);
    };
    fetchProgress();
  }, [slug]);
  
  const getLessonProgress = (lessonId: number) => {
    return progress.find(p => p.lesson === lessonId);
  };
  
  const isLessonCompleted = (lessonId: number) => {
    return progress.some((p) => p.lesson === lessonId && p.completed);
  };
  
  const calculateOverallProgress = () => {
    if (!language || !language.lessons || language.lessons.length === 0) {
      return {
        completed: 0,
        total: 0,
        percentage: 0
      };
    }
    
    const totalLessons = language.lessons.length;
    const completedLessons = language.lessons.filter((lesson: any) => {
      const lessonProgress = getLessonProgress(lesson.id);
      return lessonProgress && lessonProgress.completed;
    }).length;
    
    return {
      completed: completedLessons,
      total: totalLessons,
      percentage: Math.round((completedLessons / totalLessons) * 100)
    };
  };
  
  const isLessonLocked = (index: number) => {
    if (index === 0) return false;
    
    const previousLesson = language.lessons[index - 1];
    const previousLessonProgress = getLessonProgress(previousLesson.id);
    
    return !previousLessonProgress?.completed;
  };
  
  const refreshProgress = async () => {
    try {
      const token = localStorage.getItem('access');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const progressRes = await axios.get(`${API_URL}/api/progress/`, { headers });
      setProgress(progressRes.data);
    } catch (err) {
      // Optionnel: gérer l'erreur
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    try {
      const token = localStorage.getItem('access');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.post(`${API_URL}/api/run-code/`, { code, language: selectedLanguage }, { headers });
      setOutput(res.data.output);
    } catch (err: any) {
      setOutput('Erreur lors de l\'exécution');
    }
    setIsRunning(false);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-64px-200px)] flex items-center justify-center">
          <div className="flex items-center space-x-2 text-neutral-600">
            <RefreshCw size={20} className="animate-spin" />
            <span>Loading language details...</span>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error || !language) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg flex items-start">
            <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
            <span>{error || 'Language not found'}</span>
          </div>
        </div>
      </Layout>
    );
  }
  
  const progressStats = calculateOverallProgress();
  
  return (
    <Layout>
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center text-primary-600">
                <Code size={32} />
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">{language.name}</h1>
              <p className="text-white/90 max-w-2xl mb-4">{language.description}</p>
              
              <div className="bg-white/10 rounded-lg p-3 max-w-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Your progress</span>
                  <span className="text-sm font-medium">{progressStats.percentage}%</span>
                </div>
                <div className="progress-bar bg-white/20">
                  <div 
                    className="progress-bar-fill bg-white" 
                    style={{ width: `${progressStats.percentage}%` }}
                  />
                </div>
                <div className="mt-1 text-xs text-white/80">
                  {progressStats.completed} of {progressStats.total} lessons completed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex items-center">
          <Layers size={20} className="text-neutral-600 mr-2" />
          <h2 className="text-2xl font-bold">Learning Path</h2>
        </div>
        
        {language.lessons && language.lessons.length > 0 ? (
          <div className="space-y-4">
            {language.lessons
              .sort((a: any, b: any) => a.level - b.level || a.order - b.order)
              .map((lesson: any, index: number) => {
                const locked = isLessonLocked(index);
                
                return (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    isCompleted={isLessonCompleted(lesson.id)}
                    isLocked={locked}
                    refreshProgress={refreshProgress}
                  />
                );
              })}
          </div>
        ) : (
          <div className="text-center py-8 bg-neutral-50 rounded-lg">
            <BookOpen size={48} className="mx-auto text-neutral-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">No lessons available yet</h3>
            <p className="text-neutral-600">
              This language curriculum is under development.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LanguageDetailPage;