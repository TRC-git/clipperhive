import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';

interface User {
  id: string;
  email: string;
  username: string;
  role: 'booker' | 'clipper';
  profile_picture: string | null;
  youtube_tokens: Array<{
    channel_id: string;
    channel_name: string;
    subscribers: number;
    total_views: number;
    videos_count: number;
  }>;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string, role: 'booker' | 'clipper') => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
} 