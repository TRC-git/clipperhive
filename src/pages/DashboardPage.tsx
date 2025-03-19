import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { Youtube, BarChart3, TrendingUp, Clock } from 'lucide-react';
import YouTubeChannelManager from '../components/YouTubeChannelManager';
import BookerDashboard from '../components/BookerDashboard';

// Dummy projects data
const dummyProjects = [
  {
    id: '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
    booker_id: '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a',
    title: 'Gaming Highlights Compilation',
    description: 'Looking for exciting gaming moments from popular streamers. Need 3-5 minute highlight reels focusing on epic plays and funny reactions.',
    budget: 1000.00,
    cpm_rate: 5.00,
    status: 'open',
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    workflow_data: {
      requirements: ['720p minimum resolution', 'Include intro and outro', 'No music copyright issues', 'Subtitles required'],
      target_audience: { age_range: '18-34', interests: ['Gaming', 'Technology', 'Entertainment'] },
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
        project_id: '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
        clipper_id: '6a7b8c9d-0e1f-4a2b-8c3d-4e5f6a7b8c9d',
        video_url: 'https://youtube.com/watch?v=sample3',
        status: 'submitted',
        portfolio_metrics: {
          views: 5000,
          likes: 800,
          comments: 100,
          shares: 50
        },
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '9c0d1e2f-3a4b-45c6-d7e8-f9a0b1c2d3e4',
        project_id: '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
        clipper_id: '6a7b8c9d-0e1f-4a2b-8c3d-4e5f6a7b8c9d',
        video_url: 'https://youtube.com/watch?v=sample6',
        status: 'submitted',
        portfolio_metrics: {
          views: 18200,
          likes: 2400,
          comments: 350,
          shares: 420
        },
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: '2b3c4d5e-6f7a-48b9-9c0d-1e2f3a4b5c6d',
    booker_id: '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a',
    title: 'Tech Review Shorts',
    description: 'Need short, engaging clips from tech review videos. Focus on key features and dramatic reactions. 30-60 seconds each.',
    budget: 750.00,
    cpm_rate: 4.50,
    status: 'in_progress',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    workflow_data: {
      requirements: ['1080p minimum resolution', 'Feature highlights only', 'Include product name'],
      target_audience: { age_range: '25-45', interests: ['Technology', 'Gadgets', 'Reviews'] },
      timeline: { submission_window: '5 days', review_period: '2 days' },
      style_guide: 'Clean cuts, focus on product detail, clear audio'
    },
    completion_deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    max_clips_allowed: 8,
    clips_submitted: 4,
    clips: [
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
        created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: '3c4d5e6f-7a8b-49c0-0d1e-2f3a4b5c6d7e',
    booker_id: '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a',
    title: 'Viral Cooking Moments',
    description: 'Seeking clips of amazing cooking transformations and reactions. Looking for "wow" moments that showcase the final reveal.',
    budget: 1200.00,
    cpm_rate: 6.00,
    status: 'completed',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    workflow_data: {
      requirements: ['HD quality', 'Clear audio', 'Before and after shots', 'Reaction moments'],
      target_audience: { age_range: '18-65', interests: ['Cooking', 'Food', 'Lifestyle'] },
      timeline: { submission_window: '10 days', review_period: '4 days' },
      style_guide: 'Vibrant colors, close-up shots of food, capture authentic reactions'
    },
    completion_deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    max_clips_allowed: 15,
    clips_submitted: 12,
    clips: [
      {
        id: '5e6f7a8b-9c0d-41e2-b3f4-a5b6c7d8e9f0',
        project_id: '3c4d5e6f-7a8b-49c0-0d1e-2f3a4b5c6d7e',
        clipper_id: '5f6a7b8c-9d0e-4f1a-8b2c-3d4e5f6a7b8c',
        video_url: 'https://youtube.com/watch?v=sample2',
        status: 'approved',
        portfolio_metrics: {
          views: 25000,
          likes: 4000,
          comments: 450,
          shares: 300
        },
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  }
];

// Dummy clips data for clipper view
const dummyClips = [
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

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const [projects, setProjects] = useState([]);
  const [clips, setClips] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (user) {
      fetchUserData();
    } else if (!loading) {
      setLoadingData(false);
    }
  }, [user, loading, refreshTrigger]);

  const handleDataRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const fetchUserData = async () => {
    setLoadingData(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      // Use dummy data instead of fetching from Supabase
      if (user?.role === 'booker') {
        setProjects(dummyProjects);
      } else if (user?.role === 'clipper') {
        setClips(dummyClips);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingData(false);
    }
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
                Welcome, {user.username}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {user.role === 'booker' ? 'Brand Account' : 'Clipper Account'}
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              {user.role === 'booker' && (
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create New Project
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Dashboard content based on user role */}
        {user.role === 'clipper' && (
          <ClipperDashboard user={user} clips={clips} onDataRefresh={handleDataRefresh} />
        )}

        {user.role === 'booker' && (
          <BookerDashboard user={user} projects={projects} onDataRefresh={handleDataRefresh} />
        )}
      </div>
    </div>
  );
};

const ClipperDashboard = ({ user, clips, onDataRefresh }) => {
  // Extract stats from YouTube channels
  const channels = user.youtube_tokens || [];
  const totalSubscribers = channels.reduce((sum, channel) => sum + (channel.subscribers || 0), 0);
  const totalViews = channels.reduce((sum, channel) => sum + (channel.total_views || 0), 0);
  
  // Calculate earnings from clips
  const totalEarnings = clips.reduce((sum, clip) => {
    if (clip.status === 'approved') {
      const views = clip.portfolio_metrics?.views || 0;
      const cpmRate = clip.projects?.cpm_rate || 0;
      return sum + (views / 1000) * cpmRate;
    }
    return sum;
  }, 0);

  return (
    <div className="mt-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <Youtube className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    YouTube Channels
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{channels.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <BarChart3 className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Subscribers
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {totalSubscribers.toLocaleString()}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Views
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {totalViews.toLocaleString()}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Earnings
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      ${totalEarnings.toFixed(2)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* YouTube Channels */}
      <div className="mt-8">
        <YouTubeChannelManager 
          userId={user.id} 
          channels={channels} 
          onChannelsUpdate={onDataRefresh} 
        />
      </div>

      {/* Recent Clips */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Recent Clips</h2>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
          {clips.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {clips.slice(0, 5).map((clip) => (
                <li key={clip.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <p className="text-sm font-medium text-indigo-600 truncate">
                            {clip.projects?.title || 'Unnamed Project'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {clip.video_url}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-4 items-center text-sm">
                        <div className="flex items-center text-gray-500">
                          <BarChart3 className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          <p>{clip.portfolio_metrics?.views?.toLocaleString() || 0} views</p>
                        </div>
                        <div>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            clip.status === 'approved' ? 'bg-green-100 text-green-800' : 
                            clip.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {clip.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-5 sm:p-6 text-center">
              <p>No clips submitted yet.</p>
              <a href="/marketplace" className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Browse Projects
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;