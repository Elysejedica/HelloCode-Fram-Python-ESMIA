import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/common/Layout';
import ProgressBar from '../components/learning/ProgressBar';
import BadgeDisplay from '../components/learning/BadgeDisplay';
import { User, BookOpen, Award, RefreshCw, AlertCircle } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [languages, setLanguages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const [profileRes, languagesRes] = await Promise.all([
          axios.get(`${API_URL}/api/profile/`),
          axios.get(`${API_URL}/api/languages/`)
        ]);
        
        setProfile(profileRes.data);
        setLanguages(languagesRes.data);
      } catch (err) {
        setError('Failed to load profile data');
        console.error('Profile data fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const getLessonsByLanguage = () => {
    if (!profile || !languages.length) return {};
    
    const lessonLanguageMap: Record<number, number> = {};
    
    // Map each lesson to its language
    languages.forEach((language) => {
      language.lessons?.forEach((lesson: any) => {
        lessonLanguageMap[lesson.id] = language.id;
      });
    });
    
    // Group progress by language
    const progressByLanguage: Record<number, any[]> = {};
    
    profile.progress.forEach((progress: any) => {
      const languageId = lessonLanguageMap[progress.lesson];
      if (!languageId) return;
      
      if (!progressByLanguage[languageId]) {
        progressByLanguage[languageId] = [];
      }
      
      progressByLanguage[languageId].push(progress);
    });
    
    return progressByLanguage;
  };
  
  const calculateLanguageProgress = (languageId: number) => {
    const progressByLanguage = getLessonsByLanguage();
    const languageProgress = progressByLanguage[languageId] || [];
    
    const language = languages.find(lang => lang.id === languageId);
    const totalLessons = language?.lessons?.length || 0;
    const completedLessons = languageProgress.filter(p => p.completed).length;
    
    return {
      completed: completedLessons,
      total: totalLessons,
      percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
    };
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-64px-200px)] flex items-center justify-center">
          <div className="flex items-center space-x-2 text-neutral-600">
            <RefreshCw size={20} className="animate-spin" />
            <span>Loading profile...</span>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error || !profile) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg flex items-start">
            <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
            <span>{error || 'Profile not found'}</span>
          </div>
        </div>
      </Layout>
    );
  }
  
  const progressByLanguage = getLessonsByLanguage();
  const totalLessonsCompleted = profile.progress.filter((p: any) => p.completed).length;
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <div className="card p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                  <User size={24} />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold">
                    {profile.first_name} {profile.last_name}
                  </h1>
                  <p className="text-neutral-600">@{profile.username}</p>
                </div>
              </div>
              
              <div className="border-t border-neutral-200 pt-4">
                <div className="text-sm text-neutral-600">Email</div>
                <div className="font-medium">{profile.email}</div>
              </div>
            </div>
            
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Award size={20} className="mr-2" />
                Badges
              </h2>
              
              {profile.badges && profile.badges.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {profile.badges.map((badge: any) => (
                    <BadgeDisplay 
                      key={badge.id} 
                      badge={badge.badge_details}
                      isEarned={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-neutral-50 p-4 rounded-lg text-center">
                  <p className="text-neutral-600">
                    You haven't earned any badges yet. Complete lessons to earn badges!
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Learning Statistics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-primary-600">
                    {totalLessonsCompleted}
                  </div>
                  <div className="text-sm text-neutral-600">
                    Lessons Completed
                  </div>
                </div>
                
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-secondary-600">
                    {Object.keys(progressByLanguage).length}
                  </div>
                  <div className="text-sm text-neutral-600">
                    Languages Started
                  </div>
                </div>
                
                <div className="bg-accent-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-accent-600">
                    {profile.badges?.length || 0}
                  </div>
                  <div className="text-sm text-neutral-600">
                    Badges Earned
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <BookOpen size={20} className="mr-2" />
                Language Progress
              </h2>
              
              {Object.keys(progressByLanguage).length > 0 ? (
                <div className="space-y-6">
                  {Object.keys(progressByLanguage).map((languageId) => {
                    const language = languages.find(l => l.id === parseInt(languageId));
                    if (!language) return null;
                    
                    const progress = calculateLanguageProgress(parseInt(languageId));
                    
                    return (
                      <div key={languageId} className="border-b border-neutral-200 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{language.name}</h3>
                          <span className="text-sm text-neutral-600">
                            {progress.completed}/{progress.total} lessons
                          </span>
                        </div>
                        <ProgressBar 
                          value={progress.completed} 
                          max={progress.total} 
                          colorClass={
                            progress.percentage >= 75 ? 'bg-green-600' : 
                            progress.percentage >= 50 ? 'bg-primary-600' : 
                            progress.percentage >= 25 ? 'bg-secondary-600' : 
                            'bg-primary-400'
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-neutral-50 p-4 rounded-lg text-center">
                  <p className="text-neutral-600">
                    You haven't started learning any languages yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;