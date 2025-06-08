import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LanguagesPage from './pages/LanguagesPage';
import LanguageDetailPage from './pages/LanguageDetailPage';
import LessonPage from './pages/LessonPage';
import ProfilePage from './pages/ProfilePage';
import ExercisePage from './pages/ExercisePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/languages" 
            element={
              <ProtectedRoute>
                <LanguagesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/languages/:slug" 
            element={
              <ProtectedRoute>
                <LanguageDetailPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lessons/:id" 
            element={
              <ProtectedRoute>
                <LessonPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/exercise" 
            element={
              <ProtectedRoute>
                <ExercisePage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;