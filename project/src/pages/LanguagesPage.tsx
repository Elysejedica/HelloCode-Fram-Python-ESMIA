import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import Layout from '../components/common/Layout';
import LanguageCard from '../components/learning/LanguageCard';
import { Search, RefreshCw } from 'lucide-react';

const LanguagesPage: React.FC = () => {
  const [languages, setLanguages] = useState<any[]>([]);
  const [filteredLanguages, setFilteredLanguages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const fetchLanguages = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`${API_URL}/api/languages/`);
        setLanguages(response.data);
        setFilteredLanguages(response.data);
      } catch (err) {
        setError('Failed to load languages');
        console.error('Languages fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLanguages();
  }, []);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredLanguages(languages);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = languages.filter(
        language => language.name.toLowerCase().includes(query) || 
                   language.description.toLowerCase().includes(query)
      );
      setFilteredLanguages(filtered);
    }
  }, [searchQuery, languages]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-64px-200px)] flex items-center justify-center">
          <div className="flex items-center space-x-2 text-neutral-600">
            <RefreshCw size={20} className="animate-spin" />
            <span>Loading languages...</span>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Programming Languages</h1>
          <p className="text-neutral-600 max-w-3xl">
            Choose a programming language to start your learning journey. Each language has a structured path with interactive lessons, quizzes, and coding exercises.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <div className="mb-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search languages..."
              className="input pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {filteredLanguages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLanguages.map(language => (
              <LanguageCard key={language.id} language={language} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-neutral-600">No languages found matching your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LanguagesPage;