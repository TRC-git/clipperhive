export interface User {
  id: string;
  username: string;
  role: 'booker' | 'clipper';
  youtube_tokens?: Array<{
    channel_id: string;
    channel_name: string;
    subscribers: number;
    total_views: number;
  }>;
} 