import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Users, Search, Star, StarOff, ExternalLink, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import BookmarkStar from './BookmarkStar';
import * as BookmarkManager from '../lib/bookmarkManager';

interface QueryBuilder<T> {
  eq: (column: string, value: string) => QueryBuilder<T>;
  order: (column: string, options: { ascending: boolean }) => Promise<{ data: T[] | null; error: Error | null }>;
}

interface SupabaseTable {
  select: (query: string) => QueryBuilder<Project>;
}

interface MockSupabaseClient {
  from: (table: string) => SupabaseTable;
}

interface ClipperDirectoryProps {
  userId: string;
  onUpdate: () => void;
  showOnlyBookmarked?: boolean;
  hideSearch?: boolean;
}

interface YouTubeChannel {
  channel_id: string;
  channel_name: string;
  subscribers: number;
  total_views: number;
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
  workflow_data: {
    requirements: string[];
    target_audience: { details: string };
    style_guide: string;
    timeline: { submission_window: string; review_period: string };
  };
}

const ClipperDirectory: React.FC<ClipperDirectoryProps> = ({ userId, onUpdate, showOnlyBookmarked = false, hideSearch = false }) => {
  const { toast } = useToast();
  const [clippers, setClippers] = useState<Clipper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarks, setBookmarks] = useState<Record<string, string>>({});
  const [showBookmarked, setShowBookmarked] = useState(showOnlyBookmarked);
  const [noteText, setNoteText] = useState('');
  const [clipperForNote, setClipperForNote] = useState<string | null>(null);
  const [selectedClipper, setSelectedClipper] = useState<Clipper | null>(null);
  const [showProjectSelector, setShowProjectSelector] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectSearchTerm, setProjectSearchTerm] = useState('');
  const [clipperToRemove, setClipperToRemove] = useState<Clipper | null>(null);

  useEffect(() => {
    // Log the current localStorage bookmarks for debugging
    try {
      const savedBookmarks = BookmarkManager.getBookmarks();
      console.log('Initial bookmarks on mount:', savedBookmarks);
      
      // Log the clipper IDs for cross-referencing
      console.log('Available clipper IDs:');
      clippers.forEach(c => console.log(`${c.username}: ${c.id}`));
    } catch (error) {
      console.error('Error reading initial bookmarks:', error);
    }
    
    fetchClippers();
    fetchBookmarks();
  }, [userId]);

  useEffect(() => {
    // Refresh bookmarks every time component is shown
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchBookmarks();
      }
    }, 1000); // Check every second when tab is visible
    
    return () => clearInterval(interval);
  }, []);

  // Reset localStorage bookmarks to empty array if invalid to fix any corrupted state
  useEffect(() => {
    // Check and repair localStorage if needed
    try {
      const savedBookmarks = localStorage.getItem('clipper_bookmarks');
      if (savedBookmarks) {
        try {
          const parsed = JSON.parse(savedBookmarks);
          
          // If it's not an array, reset it
          if (!Array.isArray(parsed)) {
            console.error('Corrupted bookmarks, resetting to empty array');
            localStorage.setItem('clipper_bookmarks', '[]');
          }
        } catch (parseError) {
          console.error('Invalid JSON in clipper_bookmarks, resetting', parseError);
          localStorage.setItem('clipper_bookmarks', '[]');
        }
      }
    } catch (e) {
      console.error('Error checking localStorage integrity:', e);
    }
  }, []);

  const fetchClippers = async () => {
    try {
      setLoading(true);
      
      // Define mock clippers data matching the auth system dummy users
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
          ]
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
          ]
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
          ]
        }
      ];
      
      // Try to fetch from Supabase but with a fallback to mock data
      const { data, error } = await supabase
        .from('users')
        .select('id, username, profile_picture, youtube_tokens, role')
        .eq('role', 'clipper');
      
      if (error || !data || data.length === 0) {
        // If Supabase fetch fails or returns empty data, use mock data
        console.log("Using mock clippers data");
        setClippers(mockClippers);
      } else {
        setClippers(data as Clipper[]);
      }
    } catch (err) {
      setError('Failed to fetch clippers');
      console.error('Error fetching clippers:', err);
      
      // Use mock data as fallback when there's an error
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
          ]
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
          ]
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
          ]
        }
      ];
      setClippers(mockClippers);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookmarks = async () => {
    try {
      // First load from localStorage (source of truth)
      const bookmarkedIds = BookmarkManager.getBookmarks();
      console.log("Fetched bookmarks from localStorage:", bookmarkedIds);
      
      // Create a bookmarks object for the component state
      const bookmarkMap: Record<string, string> = {};
      bookmarkedIds.forEach(id => {
        bookmarkMap[id] = '';
      });
      
      // Set component state
      setBookmarks(bookmarkMap);
      
      // Update clipper is_bookmarked flags
      const updatedClippers = clippers.map(clipper => ({
        ...clipper,
        is_bookmarked: bookmarkedIds.includes(clipper.id)
      }));
      setClippers(updatedClippers);
      
      // Then try to load from supabase as backup
      try {
        const { data, error } = await supabase
          .from('bookmarks')
          .select('clipper_id, notes')
          .eq('booker_id', userId);
        
        if (!error && data && data.length > 0) {
          // Save supabase data to localStorage for next time
          const typedData = data as Array<{ clipper_id: string; notes: string }>;
          const supabaseIds = typedData.map(b => b.clipper_id);
          
          console.log("Received Supabase bookmarks:", supabaseIds);
          
          // Only update localStorage if different from current bookmarks
          if (JSON.stringify(supabaseIds.sort()) !== JSON.stringify([...bookmarkedIds].sort())) {
            console.log("Updating localStorage with Supabase bookmarks");
            localStorage.setItem('clipper_bookmarks', JSON.stringify(supabaseIds));
            
            // Dispatch event to update other components
            const event = new CustomEvent('clipper_bookmarks_changed', {
              detail: {
                bookmarkedIds: supabaseIds,
                action: 'update',
                clipperId: ''
              }
            });
            window.dispatchEvent(event);
          }
        }
      } catch (err: unknown) {
        console.error('Error fetching bookmarks from Supabase:', err);
      }
    } catch (err: unknown) {
      console.error('Error in fetchBookmarks:', err);
    }
  };

  const handleBookmarkToggle = (clipperId: string, isNowBookmarked: boolean) => {
    console.log(`ClipperDirectory: Bookmark toggle callback for ${clipperId} - is now bookmarked: ${isNowBookmarked}`);
    
    // Bookmark manager handles the localStorage updates and events
    // We just need to update the local React state
    
    // Update bookmarks state object
    const newBookmarks = { ...bookmarks };
    if (isNowBookmarked) {
      newBookmarks[clipperId] = '';
    } else {
      delete newBookmarks[clipperId];
    }
    setBookmarks(newBookmarks);
    
    // Update clipper objects
    const updatedClippers = clippers.map(clipper => {
      if (clipper.id === clipperId) {
        return {
          ...clipper,
          is_bookmarked: isNowBookmarked
        };
      }
      return clipper;
    });
    setClippers(updatedClippers);
    
    // Call parent update
    onUpdate();
  };

  const openNoteDialog = (clipperId: string) => {
    setClipperForNote(clipperId);
    setNoteText(bookmarks[clipperId] || '');
  };

  const saveNote = async () => {
    if (!clipperForNote) return;
    
    try {
      const { error } = await supabase
        .from('bookmarks')
        .update({ notes: noteText })
        .eq('booker_id', userId)
        .eq('clipper_id', clipperForNote);
      
      if (error) throw error;
      
      setBookmarks({ ...bookmarks, [clipperForNote]: noteText });
      setClipperForNote(null);
      onUpdate();
    } catch (err) {
      console.error('Error saving note:', err);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data, error } = await (supabase as unknown as MockSupabaseClient)
        .from('projects')
        .select('*')
        .eq('booker_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data as Project[] || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load projects';
      console.error('Error fetching projects:', errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const handleInviteToProject = (clipper: Clipper) => {
    setSelectedClipper(clipper);
    setShowProjectSelector(true);
    fetchProjects();
  };

  const handleProjectSelect = async (project: Project) => {
    if (!selectedClipper) return;

    try {
      // Here you would typically make an API call to invite the clipper to the project
      // For now, we'll just show a success toast
      toast({
        title: 'Invitation Sent',
        description: `Invited ${selectedClipper.username} to project: ${project.title}`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send invitation';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setShowProjectSelector(false);
      setSelectedClipper(null);
      setProjectSearchTerm('');
    }
  };

  const handleRemoveFromDirectory = async (clipper: Clipper) => {
    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('booker_id', userId)
        .eq('clipper_id', clipper.id);

      if (error) throw error;

      // Update local state
      const newBookmarks = { ...bookmarks };
      delete newBookmarks[clipper.id];
      setBookmarks(newBookmarks);
      
      // Update localStorage
      try {
        const savedBookmarks = localStorage.getItem('clipper_bookmarks') || '[]';
        let bookmarkedIds = JSON.parse(savedBookmarks);
        bookmarkedIds = bookmarkedIds.filter((id: string) => id !== clipper.id);
        localStorage.setItem('clipper_bookmarks', JSON.stringify(bookmarkedIds));
      } catch (e) {
        console.error('Error updating localStorage bookmarks:', e);
      }

      toast({
        title: 'Clipper Removed',
        description: `${clipper.username} has been removed from your directory.`,
      });

      onUpdate();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove clipper';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setClipperToRemove(null);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(projectSearchTerm.toLowerCase())
  );

  const filteredClippers = clippers
    .map(clipper => ({
      ...clipper,
      is_bookmarked: !!bookmarks[clipper.id]
    }))
    .filter(clipper => {
      const matchesSearch = clipper.username.toLowerCase().includes(searchTerm.toLowerCase());
      const isBookmarked = clipper.is_bookmarked;
      return matchesSearch && (!showBookmarked || isBookmarked);
    });

  const getTotalSubscribers = (youtube_tokens: YouTubeChannel[]) => {
    if (!youtube_tokens || !youtube_tokens.length) return 0;
    return youtube_tokens.reduce((sum, channel) => sum + (channel.subscribers || 0), 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        {!hideSearch && (
          <div className="mb-6 flex items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search clippers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {!showOnlyBookmarked && (
              <button
                onClick={() => setShowBookmarked(!showBookmarked)}
                className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {showBookmarked ? (
                  <>
                    <StarOff className="h-4 w-4 mr-2" />
                    Show All
                  </>
                ) : (
                  <>
                    <Star className="h-4 w-4 mr-2" />
                    Show Bookmarked
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm text-gray-500">Loading clippers...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : filteredClippers.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No clippers found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {showBookmarked 
                ? "You haven't bookmarked any clippers yet."
                : "No clippers match your search criteria."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredClippers.map((clipper) => {
                const totalSubscribers = getTotalSubscribers(clipper.youtube_tokens || []);
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
                          <h3 className="text-lg font-medium text-gray-900">{clipper.username}</h3>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <span>{totalSubscribers.toLocaleString()} subscribers</span>
                            <span className="mx-1">•</span>
                            <span>{channelCount} {channelCount === 1 ? 'channel' : 'channels'}</span>
                          </div>
                        </div>
                        
                        <BookmarkStar
                          clipperId={clipper.id}
                          initialIsBookmarked={clipper.is_bookmarked || false}
                          onToggle={handleBookmarkToggle}
                        />
                      </div>
                      
                      {clipper.is_bookmarked && clipper.notes && (
                        <div className="mt-3 p-3 bg-yellow-50 rounded-md">
                          <p className="text-sm text-gray-700">{clipper.notes}</p>
                        </div>
                      )}
                      
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="col-span-2">
                          <div className="flex justify-between">
                            <button 
                              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                              onClick={() => window.open(`/marketplace?clipper=${clipper.id}`, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View Portfolio
                            </button>
                            
                            {clipper.is_bookmarked && (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => openNoteDialog(clipper.id)}
                                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                                >
                                  Add Note
                                </button>
                                <button
                                  onClick={() => setClipperToRemove(clipper)}
                                  className="inline-flex items-center px-2.5 py-1.5 border border-red-300 text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50"
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 text-right">
                      <button
                        className="w-full inline-flex items-center justify-center px-3 py-1.5 border border-indigo-600 text-xs font-medium rounded-md text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => handleInviteToProject(clipper)}
                      >
                        Invite to Project
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      {/* Note Dialog */}
      {clipperForNote && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-40" onClick={() => setClipperForNote(null)}></div>
          <div className="relative bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Add Notes</h3>
            <textarea
              rows={4}
              className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
              placeholder="Add notes about this clipper..."
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
            ></textarea>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md"
                onClick={() => setClipperForNote(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 border border-transparent rounded-md"
                onClick={saveNote}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Confirmation Dialog */}
      <AlertDialog open={!!clipperToRemove} onOpenChange={() => setClipperToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove from Directory</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove {clipperToRemove?.username} from your directory here, but not remove any communication or project data you have with them. You can re-add them again from the marketplace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => clipperToRemove && handleRemoveFromDirectory(clipperToRemove)}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Project Selector Modal */}
      <Dialog open={showProjectSelector} onOpenChange={setShowProjectSelector}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Project</DialogTitle>
            <DialogDescription>
              Choose a project to invite {selectedClipper?.username} to:
            </DialogDescription>
          </DialogHeader>
          <Command className="rounded-lg border shadow-md">
            <CommandInput
              placeholder="Search projects..."
              value={projectSearchTerm}
              onValueChange={setProjectSearchTerm}
            />
            <CommandEmpty>No projects found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {filteredProjects.map((project) => (
                <CommandItem
                  key={project.id}
                  value={project.id}
                  onSelect={() => handleProjectSelect(project)}
                  className="cursor-pointer hover:bg-gray-100 p-2"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{project.title}</span>
                    <span className="text-sm text-gray-500">
                      Budget: ${project.budget} • Status: {project.status}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClipperDirectory;