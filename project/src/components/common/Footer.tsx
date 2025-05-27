import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Heart, Mail, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Code size={24} className="text-primary-400 mr-2" />
              <span className="text-xl font-bold text-white">HelloCode</span>
            </div>
            <p className="text-neutral-400 mb-4">
              Learn programming like a language - interactive, engaging, and effective.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-neutral-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-neutral-700">
                  <Github size={16} />
                </span>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-neutral-700">
                  <Mail size={16} />
                </span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/languages" className="text-neutral-400 hover:text-white">
                  Learning Paths
                </Link>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-neutral-700 pt-8 flex items-center justify-center">
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} HelloCode. Made with
            <Heart size={14} className="inline-block mx-1 text-red-500" />
            for learning.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;