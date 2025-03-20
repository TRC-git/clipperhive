import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  project_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user?: {
    id: string;
    email: string;
    user_metadata?: {
      full_name?: string;
    };
  };
}

interface ProjectChatProps {
  projectId: string;
  currentUser: User;
  onClose: () => void;
}

export default function ProjectChat({ projectId, currentUser, onClose }: ProjectChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
    subscribeToMessages();
  }, [projectId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      // TODO: Replace with proper types from Supabase SDK when finalized
      const { data, error } = await (supabase as unknown as {
        from: (table: string) => {
          select: (query: string) => {
            eq: (column: string, value: string) => {
              order: (column: string, options: { ascending: boolean }) => Promise<{ data: Message[] | null; error: Error | null }>;
            };
          };
        };
      })
        .from('project_messages')
        .select(`
          *,
          user:user_id (
            id,
            email,
            user_metadata
          )
        `)
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages((data || []) as Message[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const subscribeToMessages = () => {
    const subscription = supabase
      .channel('project_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'project_messages',
          filter: `project_id=eq.${projectId}`
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const { error } = await supabase
        .from('project_messages')
        .insert({
          project_id: projectId,
          user_id: currentUser.id,
          content: newMessage.trim()
        });

      if (error) throw error;
      setNewMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">Project Chat</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close chat</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-400">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.user_id === currentUser.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.user_id === currentUser.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.user_id !== currentUser.id && (
                <p className="text-xs font-medium mb-1">
                  {message.user?.user_metadata?.full_name || message.user?.email}
                </p>
              )}
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${message.user_id === currentUser.id ? 'text-indigo-100' : 'text-gray-500'}`}>
                {formatTime(message.created_at)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
} 