/* eslint-disable @typescript-eslint/no-unused-vars */
// Mock Supabase client for development
interface YouTubeChannel {
  channel_id: string;
  channel_name: string;
  subscribers: number;
  total_views: number;
}

interface User {
  id: string;
  username: string;
  profile_picture: string | null;
  youtube_tokens: YouTubeChannel[];
  role: string;
}

interface Bookmark {
  booker_id: string;
  clipper_id: string;
  notes: string;
}

interface Message {
  id: string;
  project_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user?: User;
}

interface WorkflowData {
  requirements: string[];
  target_audience: {
    details: string;
  };
  style_guide: string;
  timeline: {
    submission_window: string;
    review_period: string;
  };
}

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  cpm_rate: number;
  status: string;
  created_at: string;
  updated_at?: string;
  booker_id: string;
  max_clips_allowed: number;
  completion_deadline: string;
  clips_submitted?: number;
  workflow_data: WorkflowData;
  clips?: Array<{
    id: string;
    title: string;
    url: string;
    status: string;
    submitted_at: string;
  }>;
}

interface RealtimeFilter {
  event: 'INSERT' | 'UPDATE' | 'DELETE';
  schema?: string;
  table?: string;
  filter?: string;
}

interface RealtimePayload<T = unknown> {
  new: T;
  old: T;
  errors: null | unknown[];
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
}

interface ProjectInvitation {
  id: string;
  project_id: string;
  clipper_id: string;
  booker_id: string;
  status: 'pending' | 'accepted' | 'declined';
  message: string | null;
  created_at: string;
  updated_at: string;
}

interface ProjectBookmark {
  id: string;
  project_id: string;
  user_id: string;
  created_at: string;
}

type QueryResult<T> = {
  data: T[] | null;
  error: Error | null;
  order?: (column: string, options: { ascending: boolean }) => QueryResult<T>;
};

type SingleResult<T> = {
  data: T | null;
  error: Error | null;
};

const mockData: {
  users: User[];
  bookmarks: Record<string, Bookmark>;
  project_messages: Message[];
  projects: Project[];
  project_invitations: ProjectInvitation[];
  project_bookmarks: ProjectBookmark[];
} = {
  users: [
    {
      id: '4e5f6a7d-b8c9-4d2e-9f3a-1b2c3d4e5f6a',
      username: 'alexedits',
      profile_picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      youtube_tokens: [
        {
          channel_id: 'UC123456789ABCDEF',
          channel_name: 'AlexEdits Pro',
          subscribers: 45000,
          total_views: 5200000
        }
      ],
      role: 'clipper'
    },
    {
      id: '5f6a7b8c-9d0e-4f1a-8b2c-3d4e5f6a7b8c',
      username: 'emmaclips',
      profile_picture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      youtube_tokens: [
        {
          channel_id: 'UC987654321FEDCBA',
          channel_name: 'Emma Clips Official',
          subscribers: 78000,
          total_views: 9300000
        }
      ],
      role: 'clipper'
    },
    {
      id: '6a7b8c9d-0e1f-4a2b-8c3d-4e5f6a7b8c9d',
      username: 'chrisviral',
      profile_picture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      youtube_tokens: [
        {
          channel_id: 'UC111222333ABCDE',
          channel_name: 'ChrisViral Productions',
          subscribers: 125000,
          total_views: 15000000
        }
      ],
      role: 'clipper'
    }
  ],
  bookmarks: {},
  project_messages: [],
  projects: [
    {
      id: '1',
      title: 'Gaming Highlights Compilation',
      description: 'Looking for exciting gaming moments from popular streamers. Need 3-5 minute highlight reels focusing on epic plays and funny reactions.',
      budget: 1000,
      cpm_rate: 5,
      status: 'open',
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      booker_id: '1',
      workflow_data: {
        requirements: ['720p minimum resolution', 'Include intro and outro', 'No music copyright issues', 'Subtitles required'],
        target_audience: { details: 'Gaming enthusiasts aged 18-34' },
        style_guide: 'Upbeat tone, quick cuts between scenes, highlight reactions',
        timeline: { submission_window: '7 days', review_period: '3 days' }
      },
      completion_deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      max_clips_allowed: 10,
      clips_submitted: 2,
      clips: [
        {
          id: '1',
          title: 'Epic Gaming Moment',
          url: 'https://youtube.com/watch?v=sample1',
          status: 'submitted',
          submitted_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
    },
    {
      id: '2',
      title: 'Tech Review Shorts',
      description: 'Need short, engaging clips from tech review videos. Focus on key features and dramatic reactions. 30-60 seconds each.',
      budget: 750,
      cpm_rate: 4.50,
      status: 'in_progress',
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      booker_id: '1',
      workflow_data: {
        requirements: ['1080p minimum resolution', 'Feature highlights only', 'Include product name'],
        target_audience: { details: 'Tech enthusiasts aged 25-45' },
        style_guide: 'Clean cuts, focus on product detail, clear audio',
        timeline: { submission_window: '5 days', review_period: '2 days' }
      },
      completion_deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      max_clips_allowed: 8,
      clips_submitted: 4,
      clips: [
        {
          id: '2',
          title: 'Product Feature Review',
          url: 'https://youtube.com/watch?v=sample2',
          status: 'approved',
          submitted_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
    }
  ],
  project_invitations: [],
  project_bookmarks: [
    {
      id: crypto.randomUUID(),
      project_id: '1',
      user_id: '1',
      created_at: new Date().toISOString()
    }
  ]
};

type TableInsertPayload = Bookmark | Partial<Message> | ProjectInvitation | {
  booker_id: string;
  title: string;
  description: string;
  budget: number;
  cpm_rate: number;
  status: string;
  max_clips_allowed: number;
  completion_deadline: string;
  workflow_data: WorkflowData;
};

interface AuthUser {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
    username: string;
  };
}

interface AuthSession {
  user: AuthUser;
}

export interface MockSupabaseClient {
  from: (table: string) => {
    select: (query: string) => {
      eq: (column: string, value: string) => QueryResult<unknown>;
      order: (column: string, options: { ascending: boolean }) => QueryResult<unknown>;
    };
    insert: (payload: TableInsertPayload) => {
      data: unknown;
      error: Error | null;
      select: () => {
        single: () => SingleResult<unknown>;
      };
    };
    update: (data: Partial<Bookmark>) => {
      eq: (column: string, value: string) => {
        eq: (column: string, value: string) => { error: null };
      };
    };
    delete: () => {
      eq: (column: string, value: string) => {
        eq: (column: string, value: string) => { error: null };
      };
    };
  };
  channel: (channel: string) => {
    on: (event: string, filter: RealtimeFilter, callback: (payload: RealtimePayload) => void) => {
      subscribe: () => {
        unsubscribe: () => void;
      };
    };
  };
  auth: {
    getUser: () => Promise<{ data: { user: AuthUser }; error: null }>;
    onAuthStateChange: (callback: (event: string, session: AuthSession) => void) => {
      data: { subscription: { unsubscribe: () => void } };
    };
  };
}

export const supabase = {
  from: (table: string) => ({
    select: (__: string) => ({
      eq: (__column: string, __value: string): QueryResult<unknown> => {
        let filteredData: unknown[] = [];
        
        switch(table) {
          case 'project_messages':
            filteredData = mockData.project_messages;
            break;
          case 'users':
            filteredData = mockData.users;
            break;
          case 'projects':
            filteredData = mockData.projects;
            break;
          case 'project_invitations':
            filteredData = mockData.project_invitations.filter(inv => {
              switch(__column) {
                case 'booker_id':
                  return inv.booker_id === __value;
                case 'clipper_id':
                  return inv.clipper_id === __value;
                case 'project_id':
                  return inv.project_id === __value;
                default:
                  return false;
              }
            });
            break;
          default:
            filteredData = Object.values(mockData.bookmarks);
        }

        const result: QueryResult<unknown> = {
          data: filteredData,
          error: null
        };

        if (table !== 'project_invitations') {
          result.order = (column: string, options: { ascending: boolean }) => ({
            data: filteredData,
            error: null
          });
        }

        return result;
      }
    }),
    insert: (payload: TableInsertPayload) => {
      let insertedData: unknown = null;

      if (table === 'project_invitations') {
        const invitation: ProjectInvitation = {
          id: Math.random().toString(36).substring(7),
          ...payload as Partial<ProjectInvitation>,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as ProjectInvitation;
        mockData.project_invitations.push(invitation);
        insertedData = invitation;
      } else if ('booker_id' in payload && 'clipper_id' in payload) {
        const key = `${payload.booker_id}-${payload.clipper_id}`;
        mockData.bookmarks[key] = payload as Bookmark;
        insertedData = payload;
      } else if ('project_id' in payload) {
        const message = {
          id: crypto.randomUUID(),
          created_at: new Date().toISOString(),
          ...payload
        } as Message;
        mockData.project_messages.push(message);
        insertedData = message;
      } else if ('title' in payload) {
        insertedData = payload;
      }

      const result = {
        data: insertedData,
        error: null as Error | null,
        select: () => ({
          single: () => ({
            data: insertedData,
            error: null
          })
        })
      };

      return result;
    },
    update: (data: Partial<Bookmark>) => ({
      eq: (_column: string, _value: string) => ({
        eq: (_column: string, _value: string) => ({ error: null }),
        error: null
      })
    }),
    delete: () => ({
      eq: (_column: string, _value: string) => ({
        eq: (_column: string, _value: string) => ({ error: null }),
        error: null
      })
    })
  }),
  channel: (_channel: string) => ({
    on: (_event: string, _filter: RealtimeFilter, callback: (payload: RealtimePayload) => void) => ({
      subscribe: () => ({
        unsubscribe: () => {}
      })
    })
  }),
  auth: {
    getUser: async () => ({
      data: { 
        user: {
          id: '1', // Using the first mock user from mockData.users
          email: 'proclippper@example.com',
          user_metadata: {
            full_name: mockData.users[0].username,
            username: mockData.users[0].username
          }
        }
      },
      error: null
    }),
    onAuthStateChange: (callback: (event: string, session: AuthSession) => void) => {
      // Simulate initial auth state with first mock user
      callback('SIGNED_IN', { 
        user: {
          id: '1',
          email: 'proclipper@example.com',
          user_metadata: {
            full_name: mockData.users[0].username,
            username: mockData.users[0].username
          }
        }
      });
      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      };
    }
  }
};