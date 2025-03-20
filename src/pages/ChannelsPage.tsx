import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import YouTubeChannelManager from '../components/YouTubeChannelManager';
import { Youtube, TrendingUp, Users } from 'lucide-react';

const ChannelsPage = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Channel Management</h1>
          <p className="text-gray-600 mb-6">Please log in to manage your YouTube channels.</p>
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

  const channels = user.youtube_tokens || [];
  const totalSubscribers = channels.reduce((sum, channel) => sum + (channel.subscribers || 0), 0);
  const totalViews = channels.reduce((sum, channel) => sum + (channel.total_views || 0), 0);

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:flex md:items-center md:justify-between mb-8">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900">Channel Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Connect and manage your YouTube channels
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
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
                        Connected Channels
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
                  <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                    <Users className="h-6 w-6 text-purple-600" />
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
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <TrendingUp className="h-6 w-6 text-green-600" />
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
          </div>

          {/* Channel Manager */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <YouTubeChannelManager
              userId={user.id}
              channels={channels}
              onChannelsUpdate={() => {}}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChannelsPage; 