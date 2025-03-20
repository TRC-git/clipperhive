import React, { useState } from 'react';
import { useYouTubeIntegration } from '../hooks/useYouTubeIntegration';
import { Youtube, Plus, Trash2, RefreshCw } from 'lucide-react';

type Channel = {
  channel_id: string;
  channel_name: string;
  subscribers?: number;
  total_views?: number;
  videos_count?: number;
};

interface YouTubeChannelManagerProps {
  userId: string;
  channels: Channel[];
  onChannelsUpdate: () => void;
}

const YouTubeChannelManager: React.FC<YouTubeChannelManagerProps> = ({ 
  userId, 
  channels, 
  onChannelsUpdate 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [newChannelId, setNewChannelId] = useState('');
  const [newSubscribers, setNewSubscribers] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { 
    connectYouTubeChannel, 
    disconnectYouTubeChannel, 
    refreshYouTubeTokens,
    loading: hookLoading,
  } = useYouTubeIntegration();

  const handleAddChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading('adding');

    try {
      // Validate inputs
      if (!newChannelName) {
        throw new Error('Channel name is required');
      }

      await connectYouTubeChannel(userId, {
        channel_id: newChannelId,
        channel_name: newChannelName,
        subscribers: newSubscribers ? parseInt(newSubscribers, 10) : undefined
      });

      setSuccess('Channel added successfully!');
      setNewChannelName('');
      setNewChannelId('');
      setNewSubscribers('');
      setShowAddForm(false);
      onChannelsUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add channel');
    } finally {
      setLoading(null);
    }
  };

  const handleDisconnect = async (channelId: string) => {
    setError(null);
    setSuccess(null);
    setLoading(channelId);

    try {
      await disconnectYouTubeChannel();
      setSuccess('Channel disconnected successfully!');
      onChannelsUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect channel');
    } finally {
      setLoading(null);
    }
  };

  const handleRefresh = async (channelId: string) => {
    setError(null);
    setSuccess(null);
    setLoading(`refresh-${channelId}`);

    try {
      await refreshYouTubeTokens();
      setSuccess('Channel tokens refreshed successfully!');
      onChannelsUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh channel tokens');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Your YouTube Channels</h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Connect Channel
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          </div>
        )}

        {showAddForm && (
          <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
            <h4 className="text-md font-medium mb-3">Connect YouTube Channel</h4>
            <form onSubmit={handleAddChannel}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="channel-name" className="block text-sm font-medium text-gray-700">
                    Channel Name
                  </label>
                  <input
                    type="text"
                    id="channel-name"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="channel-id" className="block text-sm font-medium text-gray-700">
                    Channel ID (optional)
                  </label>
                  <input
                    type="text"
                    id="channel-id"
                    value={newChannelId}
                    onChange={(e) => setNewChannelId(e.target.value)}
                    placeholder="UC..."
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="subscribers" className="block text-sm font-medium text-gray-700">
                    Subscribers (optional)
                  </label>
                  <input
                    type="number"
                    id="subscribers"
                    value={newSubscribers}
                    onChange={(e) => setNewSubscribers(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={loading === 'adding' || hookLoading}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      (loading === 'adding' || hookLoading) ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading === 'adding' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                      </>
                    ) : 'Add Channel'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {channels.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {channels.map((channel) => (
              <li key={channel.channel_id} className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center">
                        <Youtube className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-indigo-600">{channel.channel_name}</h4>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span className="mr-2">{channel.subscribers?.toLocaleString() || 0} subscribers</span>
                        <span className="mx-2">•</span>
                        <span>{channel.total_views?.toLocaleString() || 0} views</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRefresh(channel.channel_id)}
                      disabled={loading === `refresh-${channel.channel_id}`}
                      className="inline-flex items-center p-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      {loading === `refresh-${channel.channel_id}` ? (
                        <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <RefreshCw className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDisconnect(channel.channel_id)}
                      disabled={loading === channel.channel_id}
                      className="inline-flex items-center p-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      {loading === channel.channel_id ? (
                        <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Youtube className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No YouTube channels connected</h3>
            <p className="mt-1 text-sm text-gray-500">
              Connect your YouTube channels to start earning from your clips.
            </p>
            {!showAddForm && (
              <div className="mt-6">
                <button
                  onClick={() => setShowAddForm(true)}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Connect Channel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeChannelManager;