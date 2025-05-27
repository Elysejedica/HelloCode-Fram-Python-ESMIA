import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import { Code, BookOpen, Users, Award, ChevronRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Learn Programming
                <br />
                <span className="text-secondary-300">Like a Language</span>
              </h1>
              <p className="text-lg mb-8 max-w-md text-white/90">
                Interactive lessons, hands-on coding exercises, and personalized learning paths to help you master programming skills.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="btn bg-white text-primary-700 hover:bg-neutral-100">
                  Get Started for Free
                </Link>
                <Link to="/languages" className="btn bg-white/20 text-white hover:bg-white/30">
                  Explore Courses
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-full h-full bg-secondary-500 rounded-xl transform rotate-3"></div>
                <div className="relative bg-white rounded-xl shadow-xl p-6 text-neutral-800">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <pre className="text-sm font-mono">
                    <code>
                      <span className="text-purple-600">def</span> <span className="text-blue-600">hello_world</span>():
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-600">"""Say hello to the world"""</span>
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-600">print</span>(<span className="text-orange-600">"Hello, World!"</span>)
                      <br />
                      <br />
                      <span className="text-blue-600">hello_world</span>()
                      <br />
                      <span className="text-neutral-500"># Output: Hello, World!</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Learn with HelloCode?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Our platform is designed to make learning programming enjoyable, effective, and tailored to your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                <Code size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Interactive Learning</h3>
              <p className="text-neutral-600">
                Write and run code directly in your browser with immediate feedback.
              </p>
            </div>
            
            <div className="card p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 rounded-lg bg-secondary-100 flex items-center justify-center text-secondary-600 mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Structured Paths</h3>
              <p className="text-neutral-600">
                Progress through carefully designed learning paths for multiple languages.
              </p>
            </div>
            
            <div className="card p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 rounded-lg bg-accent-100 flex items-center justify-center text-accent-600 mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Support</h3>
              <p className="text-neutral-600">
                Join a community of learners to share knowledge and get help.
              </p>
            </div>
            
            <div className="card p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Achievement System</h3>
              <p className="text-neutral-600">
                Earn badges and track your progress to stay motivated throughout your journey.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Languages Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Popular Learning Paths
              </h2>
              <p className="text-lg text-neutral-600 max-w-xl">
                Start your journey with one of our most popular programming languages.
              </p>
            </div>
            <Link 
              to="/languages" 
              className="btn btn-primary mt-4 md:mt-0 flex items-center"
            >
              View All Paths <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card overflow-hidden transition-all duration-200 hover:shadow-lg">
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Code size={20} />
                  </div>
                  <h3 className="ml-3 text-xl font-semibold">Python</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Learn Python, one of the most beginner-friendly and versatile programming languages.
                </p>
                <div className="flex items-center text-primary-600 font-medium">
                  Start learning <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
              <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-700"></div>
            </div>
            
            <div className="card overflow-hidden transition-all duration-200 hover:shadow-lg">
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                    <Code size={20} />
                  </div>
                  <h3 className="ml-3 text-xl font-semibold">JavaScript</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Master JavaScript, the language that powers the web and enables interactive websites.
                </p>
                <div className="flex items-center text-primary-600 font-medium">
                  Start learning <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
              <div className="h-1.5 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
            </div>
            
            <div className="card overflow-hidden transition-all duration-200 hover:shadow-lg">
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <Code size={20} />
                  </div>
                  <h3 className="ml-3 text-xl font-semibold">Java</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Build robust applications with Java, a widely-used language for enterprise systems.
                </p>
                <div className="flex items-center text-primary-600 font-medium">
                  Start learning <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
              <div className="h-1.5 bg-gradient-to-r from-red-500 to-red-600"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-accent-600 to-accent-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join thousands of learners mastering programming skills on HelloCode.
          </p>
          <Link 
            to="/register" 
            className="btn bg-white text-accent-700 hover:bg-neutral-100 text-lg px-8 py-3"
          >
            Sign Up Free
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;