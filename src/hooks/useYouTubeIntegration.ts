import { useState } from 'react';

interface ChannelData {
  channel_id?: string;
  channel_name?: string;
  subscribers?: number;
  total_views?: number;
  videos_count?: number;
}

export function useYouTubeIntegration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // This function creates dummy channel data instead of connecting to Supabase
  const connectYouTubeChannel = async (_userId: string, channelData: ChannelData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create a mock YouTube channel with sample data
      const mockChannel = {
        channel_id: channelData.channel_id || `UC${Math.random().toString(36).substring(2, 15)}`,
        channel_name: channelData.channel_name || 'My YouTube Channel',
        access_token: `ya29.dummy_token_${Math.random().toString(36).substring(2, 10)}`,
        refresh_token: `dummy_refresh_${Math.random().toString(36).substring(2, 10)}`,
        expires_at: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
        subscribers: channelData.subscribers || Math.floor(Math.random() * 50000) + 1000,
        total_views: channelData.total_views || Math.floor(Math.random() * 5000000) + 100000,
        videos_count: channelData.videos_count || Math.floor(Math.random() * 200) + 10
      };
      
      return mockChannel;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect YouTube channel';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const disconnectYouTubeChannel = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to disconnect YouTube channel';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const refreshYouTubeTokens = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh YouTube token';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    connectYouTubeChannel,
    disconnectYouTubeChannel,
    refreshYouTubeTokens
  };
}