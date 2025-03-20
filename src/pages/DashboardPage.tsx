import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import BookerDashboard from '../components/BookerDashboard';
import type { Project } from '../types/project';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/user';
import ClipperDashboard from '../components/ClipperDashboard';

// Dummy projects data
const dummyProjects: Project[] = [
  {
    id: '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
    booker_id: '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a',
    title: 'Gaming Highlights Compilation',
    description: 'Looking for exciting gaming moments from popular streamers. Need 3-5 minute highlight reels focusing on epic plays and funny reactions.',
    budget: 1000.00,
    cpm_rate: 5.00,
    status: 'open',
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    workflow_data: {
      requirements: ['720p minimum resolution', 'Include intro and outro', 'No music copyright issues', 'Subtitles required'],
      target_audience: { details: 'Gaming enthusiasts aged 18-34' },
      review_guidelines: 'Focus on engaging moments. Highlight product features clearly.',
      timeline: { submission_window: '7 days', review_period: '3 days' },
      style_guide: 'Upbeat tone, quick cuts between scenes, highlight reactions'
    },
    completion_deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    max_clips_allowed: 10,
    clips_submitted: 2,
    clips: [
      {
        id: '6f7a8b9c-0d1e-42f3-c4a5-b6c7d8e9f0a1',
        title: 'Epic Gaming Moment',
        url: 'https://youtube.com/watch?v=sample3',
        status: 'submitted',
        submitted_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: '2b3c4d5e-6f7a-48b9-9c0d-1e2f3a4b5c6d',
    booker_id: '937f9940-95b5-4c3a-8b68-3c2c2e05b6d9',
    title: 'Tech Review Shorts',
    description: 'Need short, engaging clips from tech review videos. Focus on key features and dramatic reactions. 30-60 seconds each.',
    budget: 750.00,
    cpm_rate: 4.50,
    status: 'in_progress',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    workflow_data: {
      requirements: ['1080p minimum resolution', 'Feature highlights only', 'Include product name'],
      target_audience: { details: 'Tech enthusiasts aged 25-45' },
      review_guidelines: 'Focus on product features and reactions',
      timeline: { submission_window: '5 days', review_period: '2 days' },
      style_guide: 'Clean cuts, focus on product detail, clear audio'
    },
    completion_deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    max_clips_allowed: 8,
    clips_submitted: 4,
    clips: [
      {
        id: '4d5e6f7a-8b9c-40d1-a2e3-f4a5b6c7d8e9',
        title: 'Product Feature Review',
        url: 'https://youtube.com/watch?v=sample1',
        status: 'approved',
        submitted_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  }
];

interface Clip {
  id: string;
  project_id: string;
  clipper_id: string;
  video_url: string;
  status: string;
  portfolio_metrics?: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
  created_at: string;
  projects?: {
    title: string;
    description: string;
    cpm_rate: number;
  };
}

// Dummy clips data for clipper view
const dummyClips: Clip[] = [
  {
    id: '4d5e6f7a-8b9c-40d1-a2e3-f4a5b6c7d8e9',
    project_id: '2b3c4d5e-6f7a-48b9-9c0d-1e2f3a4b5c6d',
    clipper_id: '4e5f6a7d-b8c9-4d2e-9f3a-1b2c3d4e5f6a',
    video_url: 'https://youtube.com/watch?v=sample1',
    status: 'approved',
    portfolio_metrics: {
      views: 15000,
      likes: 2500,
      comments: 300,
      shares: 150
    },
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    projects: {
      title: 'Tech Review Shorts',
      description: 'Need short, engaging clips from tech review videos.',
      cpm_rate: 4.50
    }
  },
  {
    id: '7a8b9c0d-1e2f-43a4-b5c6-d7e8f9a0b1c2',
    project_id: '3c4d5e6f-7a8b-49c0-0d1e-2f3a4b5c6d7e',
    clipper_id: '4e5f6a7d-b8c9-4d2e-9f3a-1b2c3d4e5f6a',
    video_url: 'https://youtube.com/watch?v=sample4',
    status: 'approved',
    portfolio_metrics: {
      views: 42000,
      likes: 5800,
      comments: 720,
      shares: 950
    },
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    projects: {
      title: 'Viral Cooking Moments',
      description: 'Seeking clips of amazing cooking transformations and reactions.',
      cpm_rate: 6.00
    }
  },
  {
    id: '8b9c0d1e-2f3a-44b5-c6d7-e8f9a0b1c2d3',
    project_id: '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
    clipper_id: '4e5f6a7d-b8c9-4d2e-9f3a-1b2c3d4e5f6a',
    video_url: 'https://youtube.com/watch?v=sample5',
    status: 'submitted',
    portfolio_metrics: {
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0
    },
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    projects: {
      title: 'Gaming Highlights Compilation',
      description: 'Looking for exciting gaming moments from popular streamers.',
      cpm_rate: 5.00
    }
  }
];

const DashboardPage: React.FC = () => {
  const { user, loading } = useAuth() as { user: User | null; loading: boolean };
  const [projects, setProjects] = useState<Project[]>([]);
  const [clips, setClips] = useState<Clip[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      if (!loading && user && mounted) {
        // Only set loading if we don't already have data
        if ((user.role === 'booker' && projects.length === 0) || 
            (user.role === 'clipper' && clips.length === 0)) {
          setLoadingData(true);
        }
        
        try {
          // Remove artificial delay - it's causing the flash
          // Use dummy data instead of fetching from Supabase
          if (user.role === 'booker' && mounted && projects.length === 0) {
            setProjects([...dummyProjects]);
          } else if (user.role === 'clipper' && mounted && clips.length === 0) {
            setClips([...dummyClips]);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          if (mounted) {
            setLoadingData(false);
          }
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [user, loading, refreshTrigger, projects.length, clips.length]);

  const handleDataRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Loading state
  if (loading || loadingData) {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <p className="text-gray-600 mb-6">Please log in to view your dashboard.</p>
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
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome, {user?.username}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {user?.role === 'booker' ? 'Brand Account' : 'Clipper Account'}
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              {user?.role === 'booker' && (
                <button
                  type="button"
                  onClick={() => navigate('/projects')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  + New Project
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Dashboard content based on user role */}
        {user?.role === 'clipper' && (
          <ClipperDashboard user={user} clips={clips} onDataRefresh={handleDataRefresh} />
        )}

        {user?.role === 'booker' && (
          <BookerDashboard user={user} projects={projects} onDataRefresh={handleDataRefresh} />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;