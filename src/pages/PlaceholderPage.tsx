import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  progress?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ 
  title, 
  description, 
  progress = 65, 
  action 
}) => {
  const { user, loading } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-10 w-10 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600 mb-6">Please log in to view this page.</p>
          <a
            href="/auth"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900">
              {title}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {description}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="mt-12 flex flex-col items-center justify-center bg-white p-12 rounded-lg shadow-md">
        <Construction className="h-20 w-20 text-indigo-400 mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon</h2>
        <p className="text-gray-600 text-center max-w-md mb-8">
          We're working hard to bring this feature to life. Check back soon for updates!
        </p>
        <div className="w-full max-w-md h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-500">Development Progress: {progress}%</p>
        
        {action && (
          <button
            onClick={action.onClick}
            className="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default PlaceholderPage;