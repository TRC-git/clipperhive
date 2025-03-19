import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock user data
const mockUsers = {
  bookers: [
    {
      id: '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a',
      email: 'sarah@creator.com',
      password: 'password123',
      username: 'sarahcreates',
      role: 'booker',
      profile_picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      youtube_tokens: [
        {
          channel_id: 'UC777888999AABBCC',
          channel_name: 'Sarah Creates Official',
          subscribers: 124000,
          total_views: 14500000,
          videos_count: 275
        }
      ]
    },
    {
      id: '937f9940-95b5-4c3a-8b68-3c2c2e05b6d9',
      email: 'mike@gaming.com',
      password: 'password123',
      username: 'mikegaming',
      role: 'booker',
      profile_picture: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
      youtube_tokens: [
        {
          channel_id: 'UC555666777DDEEFF',
          channel_name: 'Mike Gaming Official',
          subscribers: 350000,
          total_views: 42000000,
          videos_count: 615
        }
      ]
    },
    {
      id: '8d2f45e7-7f1a-4d3b-9e5c-1c2d3e4f5a6b',
      email: 'tech.reviews@email.com',
      password: 'password123',
      username: 'techreviewer',
      role: 'booker',
      profile_picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      youtube_tokens: [
        {
          channel_id: 'UC111222444ABCDEF',
          channel_name: 'Tech Reviewer Hub',
          subscribers: 215000,
          total_views: 28000000,
          videos_count: 430
        }
      ]
    }
  ],
  clippers: [
    {
      id: '4e5f6a7d-b8c9-4d2e-9f3a-1b2c3d4e5f6a',
      email: 'alex@editor.com',
      password: 'password123',
      username: 'alexedits',
      role: 'clipper',
      profile_picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      youtube_tokens: [
        {
          channel_id: 'UC123456789ABCDEF',
          channel_name: 'AlexEdits Pro',
          subscribers: 45000,
          total_views: 5200000,
          videos_count: 120
        }
      ]
    },
    {
      id: '5f6a7b8c-9d0e-4f1a-8b2c-3d4e5f6a7b8c',
      email: 'emma@clips.com',
      password: 'password123',
      username: 'emmaclips',
      role: 'clipper',
      profile_picture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      youtube_tokens: [
        {
          channel_id: 'UC987654321FEDCBA',
          channel_name: 'Emma Clips Official',
          subscribers: 78000,
          total_views: 9300000,
          videos_count: 210
        }
      ]
    },
    {
      id: '6a7b8c9d-0e1f-4a2b-8c3d-4e5f6a7b8c9d',
      email: 'chris@viral.com',
      password: 'password123',
      username: 'chrisviral',
      role: 'clipper',
      profile_picture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      youtube_tokens: [
        {
          channel_id: 'UC111222333ABCDE',
          channel_name: 'ChrisViral Productions',
          subscribers: 125000,
          total_views: 15000000,
          videos_count: 320
        }
      ]
    }
  ]
};

// Flatten the mock users for easier searching
const allMockUsers = [...mockUsers.bookers, ...mockUsers.clippers];

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionLoading, setSessionLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate checking for a session
    const checkSession = setTimeout(() => {
      // Check if we have a saved user in localStorage
      const savedUser = localStorage.getItem('clipperhive_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      
      setSessionLoading(false);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(checkSession);
  }, []);

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      // Simulate sign in with mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user in our mock data
      const foundUser = allMockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser && foundUser.password === password) {
        setUser(foundUser);
        // Save user to localStorage for session persistence
        localStorage.setItem('clipperhive_user', JSON.stringify(foundUser));
        navigate('/dashboard');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, username, role) => {
    try {
      setLoading(true);
      // Simulate sign up with mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if email already exists
      if (allMockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('Email already in use');
      }
      
      const newUser = {
        id: `mock-${Date.now()}`,
        email,
        password,
        username,
        role,
        profile_picture: null,
        youtube_tokens: []
      };
      
      setUser(newUser);
      // Save user to localStorage for session persistence
      localStorage.setItem('clipperhive_user', JSON.stringify(newUser));
      navigate('/dashboard');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // Simulate sign out
      await new Promise(resolve => setTimeout(resolve, 300));
      setUser(null);
      // Remove user from localStorage
      localStorage.removeItem('clipperhive_user');
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    loading: loading || sessionLoading,
    signIn,
    signUp,
    signOut,
  };
}