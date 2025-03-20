import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, Clock, Briefcase, BarChart2, Star, ExternalLink } from 'lucide-react';
import { Project } from '../types/project';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface YouTubeChannel {
  channel_id: string;
  channel_name: string;
  subscribers: number;
  total_views: number;
}

interface ProjectBookmark {
  project_id: string;
}

interface Clipper {
  id: string;
  username: string;
  profile_picture: string | null;
  youtube_tokens: YouTubeChannel[];
  role: string;
  is_bookmarked?: boolean;
  notes?: string;
}

interface BookerDashboardProps {
  user: {
    id: string;
    youtube_tokens?: YouTubeChannel[];
  };
  projects: Project[];
  onDataRefresh: () => void;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const navigate = useNavigate();
  
  // Calculate days remaining
  const deadline = new Date(project.completion_deadline);
  const daysLeft = Math.max(0, Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  
  // Calculate progress
  const progress = (project.clips_submitted / project.max_clips_allowed) * 100;
  
  // Format created date
  const createdDate = new Date(project.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white overflow-hidden shadow rounded-lg"
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900 truncate">{project.title}</h3>
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            project.status === 'open' ? 'bg-green-100 text-green-800' :
            project.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {project.status === 'in_progress' ? 'In Progress' : 
             project.status === 'completed' ? 'Completed' : 'Open'}
          </span>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500 line-clamp-3">{project.description}</p>
        </div>
        
        {/* Project stats */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center bg-gray-50 p-2 rounded">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <span className="mt-1 text-xs font-semibold text-gray-700">${project.budget}</span>
            <span className="text-xs text-gray-500">Budget</span>
          </div>
          <div className="flex flex-col items-center bg-gray-50 p-2 rounded">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="mt-1 text-xs font-semibold text-gray-700">{project.clips_submitted}/{project.max_clips_allowed}</span>
            <span className="text-xs text-gray-500">Clips</span>
          </div>
          <div className="flex flex-col items-center bg-gray-50 p-2 rounded">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="mt-1 text-xs font-semibold text-gray-700">{daysLeft}</span>
            <span className="text-xs text-gray-500">Days Left</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
      
      {/* Card footer */}
      <div className="px-5 py-3 bg-gray-50 flex justify-between items-center">
        <span className="text-xs text-gray-500">Created {createdDate}</span>
        <button 
          onClick={() => navigate(`/projects/${project.id}`)}
          className="text-xs text-indigo-600 hover:text-indigo-900 font-medium"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

const BookerDashboard: React.FC<BookerDashboardProps> = ({ user, projects, onDataRefresh }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const navigate = useNavigate();
  const [bookmarkedProjects, setBookmarkedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [clippers, setClippers] = useState<Clipper[]>([]);
  const [bookmarkedClippers, setBookmarkedClippers] = useState<Clipper[]>([]);
  const [loadingClippers, setLoadingClippers] = useState(false);

  useEffect(() => {
    fetchBookmarkedProjects();
    fetchClippers();
  }, [user.id, projects]);

  // Add a useEffect to ensure we always check localStorage on mount
  useEffect(() => {
    // Always read current state from localStorage on mount
    try {
      const savedBookmarks = localStorage.getItem('clipper_bookmarks') || '[]'; 
      console.log('BookerDashboard loading initial localStorage bookmarks on mount:', savedBookmarks);
      
      try {
        const bookmarkedIds = JSON.parse(savedBookmarks);
        if (Array.isArray(bookmarkedIds)) {
          // Update clippers with localStorage bookmark state
          const updatedClippers = clippers.map(clipper => ({
            ...clipper,
            is_bookmarked: bookmarkedIds.includes(clipper.id)
          }));
          
          setClippers(updatedClippers);
          setBookmarkedClippers(updatedClippers.filter(c => c.is_bookmarked));
          console.log('Updated clipper bookmark state from localStorage on mount');
        }
      } catch (parseError) {
        console.error('Error parsing localStorage bookmarks on mount:', parseError);
      }
    } catch (err) {
      console.error('Error accessing localStorage on mount:', err);
    }
  }, []);

  const fetchBookmarkedProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('project_bookmarks')
        .select('project_id')
        .eq('user_id', user.id);

      if (error) throw error;

      const bookmarks = (data || []) as ProjectBookmark[];
      const bookmarkedIds = new Set(bookmarks.map(b => b.project_id));
      const bookmarkedProjs = projects.filter(p => bookmarkedIds.has(p.id));
      setBookmarkedProjects(bookmarkedProjs);
      onDataRefresh(); // Call onDataRefresh after updating bookmarks
    } catch (err) {
      console.error('Error fetching bookmarked projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClippers = async () => {
    try {
      setLoadingClippers(true);
      
      // Use auth system dummy users (matching the real test accounts)
      const mockClippers: Clipper[] = [
        {
          id: '4e5f6a7d-b8c9-4d2e-9f3a-1b2c3d4e5f6a',
          username: 'alexedits',
          profile_picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          role: 'clipper',
          youtube_tokens: [
            {
              channel_id: 'UC123456789ABCDEF',
              channel_name: 'AlexEdits Pro',
              subscribers: 45000,
              total_views: 5200000
            }
          ],
          is_bookmarked: false
        },
        {
          id: '5f6a7b8c-9d0e-4f1a-8b2c-3d4e5f6a7b8c',
          username: 'emmaclips',
          profile_picture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
          role: 'clipper',
          youtube_tokens: [
            {
              channel_id: 'UC987654321FEDCBA',
              channel_name: 'Emma Clips Official',
              subscribers: 78000,
              total_views: 9300000
            }
          ],
          is_bookmarked: false
        },
        {
          id: '6a7b8c9d-0e1f-4a2b-8c3d-4e5f6a7b8c9d',
          username: 'chrisviral',
          profile_picture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
          role: 'clipper',
          youtube_tokens: [
            {
              channel_id: 'UC111222333ABCDE',
              channel_name: 'ChrisViral Productions',
              subscribers: 125000,
              total_views: 15000000
            }
          ],
          is_bookmarked: false
        }
      ];
      
      // Load bookmarks from localStorage for consistent state across pages
      try {
        const savedBookmarks = localStorage.getItem('clipper_bookmarks');
        console.log('BookerDashboard initial localStorage bookmarks:', savedBookmarks);
        
        if (savedBookmarks) {
          let bookmarkedIds: string[] = [];
          try {
            const parsed = JSON.parse(savedBookmarks);
            if (Array.isArray(parsed)) {
              bookmarkedIds = parsed.map(id => String(id));
            } else {
              console.error('BookerDashboard: Invalid localStorage bookmarks format');
            }
          } catch (parseError) {
            console.error('BookerDashboard: Error parsing bookmarks', parseError);
          }

          // Apply bookmark state from localStorage - this is our source of truth
          mockClippers.forEach(clipper => {
            clipper.is_bookmarked = bookmarkedIds.includes(clipper.id);
          });
          
          // We'll just sync TO Supabase in the background, but not use the result
          console.log(`Using ${bookmarkedIds.length} bookmarks from localStorage as source of truth`);
        } else {
          // If no localStorage data, default to empty
          mockClippers.forEach(clipper => {
            clipper.is_bookmarked = false;
          });
        }
      } catch (err) {
        console.error('Error getting bookmarks:', err);
      }
      
      setClippers(mockClippers);
      setBookmarkedClippers(mockClippers.filter(c => c.is_bookmarked));
      
    } catch (err) {
      console.error('Error fetching clippers:', err);
      // Ensure we have some data to display even if everything fails
      const fallbackClippers: Clipper[] = [
        {
          id: '4e5f6a7d-b8c9-4d2e-9f3a-1b2c3d4e5f6a',
          username: 'alexedits',
          profile_picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          role: 'clipper',
          youtube_tokens: [
            {
              channel_id: 'UC123456789ABCDEF',
              channel_name: 'AlexEdits Pro',
              subscribers: 45000,
              total_views: 5200000
            }
          ],
          is_bookmarked: false
        },
        {
          id: '5f6a7b8c-9d0e-4f1a-8b2c-3d4e5f6a7b8c',
          username: 'emmaclips',
          profile_picture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
          role: 'clipper',
          youtube_tokens: [
            {
              channel_id: 'UC987654321FEDCBA',
              channel_name: 'Emma Clips Official',
              subscribers: 78000,
              total_views: 9300000
            }
          ],
          is_bookmarked: false
        }
      ];
      
      // Load bookmarks from localStorage even for fallback data
      try {
        const savedBookmarks = localStorage.getItem('clipper_bookmarks');
        if (savedBookmarks) {
          const bookmarkedIds = new Set(JSON.parse(savedBookmarks));
          fallbackClippers.forEach(clipper => {
            clipper.is_bookmarked = bookmarkedIds.has(clipper.id);
          });
        }
      } catch (e) {
        console.error('Error loading fallback bookmarks:', e);
      }
      
      setClippers(fallbackClippers);
      setBookmarkedClippers(fallbackClippers.filter(c => c.is_bookmarked));
    } finally {
      setLoadingClippers(false);
    }
  };

  // Calculate stats
  const openProjects = projects.filter(p => p.status === 'open').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'in_progress').length;
  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);

  // Get latest 3 projects when no bookmarks
  const displayProjects = bookmarkedProjects.length > 0 ? bookmarkedProjects : projects.slice(0, 3);
  
  // Get bookmarked clippers only (previously had a fallback to top clippers by subscribers)
  /* Previously showed top clippers when no bookmarks:
  const displayClippers = bookmarkedClippers.length > 0 
    ? bookmarkedClippers 
    : clippers
        .sort((a, b) => {
          const aSubscribers = a.youtube_tokens?.reduce((sum, channel) => sum + (channel.subscribers || 0), 0) || 0;
          const bSubscribers = b.youtube_tokens?.reduce((sum, channel) => sum + (channel.subscribers || 0), 0) || 0;
          return bSubscribers - aSubscribers;
        })
        .slice(0, 3);
  */
  const displayClippers = bookmarkedClippers;

  // Helper function to get total subscribers
  const getTotalSubscribers = (youtube_tokens: YouTubeChannel[] = []) => {
    return youtube_tokens.reduce((sum, channel) => sum + (channel.subscribers || 0), 0);
  };

  // Add an event listener for bookmark changes
  useEffect(() => {
    const handleBookmarkChange = (event: CustomEvent) => {
      console.log('BookerDashboard received bookmark change event:', event.detail);
      
      try {
        // Always read current state from localStorage (source of truth)
        const savedBookmarks = localStorage.getItem('clipper_bookmarks') || '[]';
        let bookmarkedIds: string[] = [];
        
        try {
          const parsed = JSON.parse(savedBookmarks);
          if (Array.isArray(parsed)) {
            bookmarkedIds = parsed.map(id => String(id));
            console.log('BookerDashboard refreshing from localStorage:', bookmarkedIds);
          }
        } catch (parseError) {
          console.error('Error parsing bookmarks in event handler:', parseError);
        }
        
        // Use the localStorage data to update the UI
        const updatedClippers = clippers.map(clipper => ({
          ...clipper,
          is_bookmarked: bookmarkedIds.includes(clipper.id)
        }));
        
        setClippers(updatedClippers);
        setBookmarkedClippers(updatedClippers.filter(c => c.is_bookmarked));
        console.log('BookerDashboard state updated from localStorage');
      } catch (err) {
        console.error('Error handling bookmark change event:', err);
      }
    };
    
    // Add event listener
    window.addEventListener('clipper_bookmark_changed', handleBookmarkChange as EventListener);
    
    // Also listen for the old event type for backward compatibility
    window.addEventListener('clipper_bookmarks_changed', handleBookmarkChange as EventListener);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('clipper_bookmark_changed', handleBookmarkChange as EventListener);
      window.removeEventListener('clipper_bookmarks_changed', handleBookmarkChange as EventListener);
    };
  }, [clippers]);

  return (
    <div>
      {/* Stats Grid */}
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
                <Briefcase className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Open Projects
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{openProjects}</div>
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
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    In Progress
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{inProgressProjects}</div>
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
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Completed
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{completedProjects}</div>
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
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Budget
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">${totalBudget.toFixed(2)}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="mt-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('projects')}
            className={`${
              activeTab === 'projects'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Active Projects
          </button>
          <button
            onClick={() => setActiveTab('clippers')}
            className={`${
              activeTab === 'clippers'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            My Clippers
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`${
              activeTab === 'analytics'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            <div className="flex items-center">
              <BarChart2 className="w-4 h-4 mr-2" />
              Analytics
            </div>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {bookmarkedProjects.length > 0 ? 'Bookmarked Projects' : 'Latest Projects'}
              </h2>
              <button
                onClick={() => navigate('/projects')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                See All Projects
              </button>
            </div>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-500">Loading projects...</p>
              </div>
            ) : displayProjects.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
                <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No projects yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating your first project
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/projects')}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Create New Project
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {displayProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'clippers' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Bookmarked Clippers
              </h2>
              <button
                onClick={() => navigate('/clippers')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                See All Clippers
              </button>
            </div>
            {loadingClippers ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-500">Loading clippers...</p>
              </div>
            ) : bookmarkedClippers.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
                <Star className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No bookmarked clippers yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Bookmark your favorite clippers to see them here
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {displayClippers.map((clipper) => {
                  const totalSubscribers = getTotalSubscribers(clipper.youtube_tokens);
                  const channelCount = clipper.youtube_tokens?.length || 0;
                  
                  return (
                    <div key={clipper.id} className="bg-white overflow-hidden border border-gray-200 rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            {clipper.profile_picture ? (
                              <img
                                className="h-12 w-12 rounded-full object-cover"
                                src={clipper.profile_picture}
                                alt={clipper.username}
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                <span className="text-lg font-medium text-indigo-600">
                                  {clipper.username.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="ml-4 flex-1">
                            <div className="flex items-center">
                              <h3 className="text-lg font-medium text-gray-900">{clipper.username}</h3>
                              {clipper.is_bookmarked && (
                                <Star className="h-4 w-4 text-yellow-500 ml-2" />
                              )}
                            </div>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <span>{totalSubscribers.toLocaleString()} subscribers</span>
                              <span className="mx-1">•</span>
                              <span>{channelCount} {channelCount === 1 ? 'channel' : 'channels'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 text-right">
                        <button
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => navigate(`/clippers?highlight=${clipper.id}`)}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Profile
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Analytics Overview</h2>
            </div>
            <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
              <BarChart2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Analytics Coming Soon</h3>
              <p className="mt-1 text-sm text-gray-500">
                Detailed analytics and insights will be available here soon
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookerDashboard;