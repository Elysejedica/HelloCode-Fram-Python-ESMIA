import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, Code, LogOut, User, Terminal } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Code size={24} className="text-primary-600 mr-2" />
                <span className="text-xl font-bold text-primary-600">HelloCode</span>
              </Link>
            </div>
            
            {isAuthenticated && (
              <nav className="ml-8 flex space-x-4 items-center">
                <Link 
                  to="/dashboard" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/languages" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
                >
                  <span className="flex items-center">
                    <BookOpen size={16} className="mr-1" />
                    Learn
                  </span>
                </Link>
                <Link 
                  to="/exercise" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
                >
                  <span className="flex items-center">
                    <Terminal size={16} className="mr-1" />
                    Exercice
                  </span>
                </Link>
              </nav>
            )}
          </div>
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center text-sm font-medium text-neutral-700 hover:text-primary-600"
                >
                  <User size={16} className="mr-1" />
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-sm font-medium text-neutral-700 hover:text-primary-600"
                >
                  <LogOut size={16} className="mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-neutral-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;