import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { API_URL } from '../config';
import Layout from '../components/common/Layout';
import ProgressBar from '../components/learning/ProgressBar';
import { BookOpen, Code, Award, ArrowRight, RefreshCw } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [languages, setLanguages] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const [languagesRes, progressRes, badgesRes] = await Promise.all([
          axios.get(`${API_URL}/api/languages/`),
          axios.get(`${API_URL}/api/progress/`),
          axios.get(`${API_URL}/api/user-badges/`)
        ]);
        
        setLanguages(languagesRes.data);
        setProgress(progressRes.data);
        setBadges(badgesRes.data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const getLanguageProgress = (languageId: number) => {
    // Find lesson IDs that belong to this language
    const langLessonIds = languages
      .find(lang => lang.id === languageId)?.lessons
      ?.map((lesson: any) => lesson.id) || [];
    
    // Count completed lessons for this language
    const completedCount = progress
      .filter(p => langLessonIds.includes(p.lesson) && p.completed)
      .length;
    
    return {
      completed: completedCount,
      total: langLessonIds.length,
      percentage: langLessonIds.length > 0 
        ? Math.round((completedCount / langLessonIds.length) * 100) 
        : 0
    };
  };
  
  const isLessonCompleted = (lessonId: number) => {
    return progress.some((p) => p.lesson === lessonId && p.completed);
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-64px-200px)] flex items-center justify-center">
          <div className="flex items-center space-x-2 text-neutral-600">
            <RefreshCw size={20} className="animate-spin" />
            <span>Loading your dashboard...</span>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.first_name || user?.username}!
          </h1>
          <p className="text-neutral-600 mt-2">
            Continue your learning journey
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Your Learning Paths</h2>
                <Link to="/languages" className="text-primary-600 flex items-center text-sm font-medium">
                  Browse all languages <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {languages.slice(0, 4).map((language: any) => {
                  const langLessons = language.lessons || [];
                  return (
                    <Link 
                      key={language.id}
                      to={`/languages/${language.slug}`}
                      className="card p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center mb-3">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                          <Code size={20} />
                        </div>
                        <h3 className="ml-3 text-lg font-semibold">{language.name}</h3>
                      </div>
                      
                      <ProgressBar 
                        value={getLanguageProgress(language.id).completed} 
                        max={getLanguageProgress(language.id).total}
                        label={`${getLanguageProgress(language.id).completed}/${getLanguageProgress(language.id).total} lessons completed`}
                      />
                      
                      <div className="mt-4 space-y-2">
                        {langLessons.map((lesson: any) => (
                          <div key={lesson.id} className="flex items-center">
                            <span>{lesson.title}</span>
                            {isLessonCompleted(lesson.id) && (
                              <span className="ml-2 text-green-600">✔️</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Recent Lessons</h2>
              </div>
              
              <div className="card divide-y divide-neutral-200">
                {progress.length > 0 ? (
                  progress.slice(0, 5).map((prog: any) => (
                    <Link 
                      key={prog.id}
                      to={`/lessons/${prog.lesson}`}
                      className="p-4 flex items-center hover:bg-neutral-50 transition-colors"
                    >
                      <div className={`flex-shrink-0 ${prog.completed ? 'text-green-500' : 'text-neutral-400'}`}>
                        <BookOpen size={20} />
                      </div>
                      <div className="ml-3 flex-grow">
                        <p className="font-medium">{prog.lesson_title}</p>
                      </div>
                      <div className="flex-shrink-0">
                        {prog.completed ? (
                          <span className="badge badge-success">Completed</span>
                        ) : (
                          <span className="badge badge-primary">In Progress</span>
                        )}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-6 text-center text-neutral-500">
                    <BookOpen size={24} className="mx-auto mb-2" />
                    <p>You haven't started any lessons yet.</p>
                    <Link to="/languages" className="btn btn-primary mt-3">
                      Find a language to learn
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Stats Summary</h2>
              <div className="card p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">
                      {progress.filter(p => p.completed).length}
                    </div>
                    <div className="text-sm text-neutral-600">Lessons Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary-600">
                      {languages.length}
                    </div>
                    <div className="text-sm text-neutral-600">Languages Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-600">
                      {badges.length}
                    </div>
                    <div className="text-sm text-neutral-600">Badges Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(progress.filter(p => p.completed).length / Math.max(progress.length, 1) * 100)}%
                    </div>
                    <div className="text-sm text-neutral-600">Completion Rate</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Your Badges</h2>
              </div>
              
              <div className="card p-5">
                {badges.length > 0 ? (
                  <div className="space-y-3">
                    {badges.slice(0, 3).map((badge: any) => (
                      <div key={badge.id} className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 flex-shrink-0">
                          <Award size={20} />
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">{badge.badge_details.name}</div>
                          <div className="text-sm text-neutral-500">
                            {new Date(badge.earned_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Link 
                      to="/profile" 
                      className="btn btn-outline w-full mt-3 text-sm"
                    >
                      View all badges
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-4 text-neutral-500">
                    <Award size={24} className="mx-auto mb-2" />
                    <p>Complete lessons to earn badges!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;