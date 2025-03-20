import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, BarChart3, TrendingUp } from 'lucide-react';
import YouTubeChannelManager from './YouTubeChannelManager';
import type { User } from '../types/user';

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

interface ClipperDashboardProps {
  user: User;
  clips: Clip[];
  onDataRefresh: () => void;
}

const ClipperDashboard: React.FC<ClipperDashboardProps> = ({ user, clips, onDataRefresh }) => {
  // Component implementation from DashboardPage.tsx
  const channels = user.youtube_tokens || [];
  const totalSubscribers = channels.reduce((sum, channel) => sum + (channel.subscribers || 0), 0);
  const totalViews = channels.reduce((sum, channel) => sum + (channel.total_views || 0), 0);
  
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

export default ClipperDashboard; 