import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Search, Star, Trash2, Clock, Check, X, ExternalLink } from 'lucide-react';
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
import { cn } from "@/lib/utils";
import BookmarkStar from '../components/BookmarkStar';

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

interface AuthUser {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
    username: string;
  };
}

const ClippersPage: React.FC = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [clippers, setClippers] = useState<Clipper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarks, setBookmarks] = useState<Record<string, string>>({});
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [selectedClipper, setSelectedClipper] = useState<Clipper | null>(null);
  const [showProjectSelector, setShowProjectSelector] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectSearchTerm, setProjectSearchTerm] = useState('');
  const [clipperToRemove, setClipperToRemove] = useState<Clipper | null>(null);
  const [invitations, setInvitations] = useState<Record<string, Record<string, ProjectInvitation>>>({});

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user as AuthUser);
      if (data.user) {
        fetchClippers();
        fetchBookmarks(data.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser((session?.user as AuthUser) ?? null);
      if (session?.user) {
        fetchClippers();
        fetchBookmarks(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchInvitations();
    }
  }, [user]);

  const fetchClippers = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('users')
        .select('id, username, profile_picture, youtube_tokens, role')
        .eq('role', 'clipper');
      
      if (error) throw error;
      
      setClippers(data as Clipper[]);
    } catch (err) {
      setError('Failed to fetch clippers');
      console.error('Error fetching clippers:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookmarks = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('bookmarks')
        .select('clipper_id, notes')
        .eq('booker_id', userId);
      
      const bookmarkMap: Record<string, string> = {};
      if (data) {
        data.forEach((bookmark) => {
          const { clipper_id, notes } = bookmark as { clipper_id: string; notes: string };
          bookmarkMap[clipper_id] = notes || '';
        });
      }
      setBookmarks(bookmarkMap);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
    }
  };

  const fetchInvitations = async () => {
    if (!user) return;

    try {
      const result = await supabase
        .from('project_invitations')
        .select('*')
        .eq('booker_id', user.id);

      // Type assertion for the mock client response
      const response = result as unknown as { data: ProjectInvitation[] | null; error: Error | null };
      const { data, error } = response;

      if (error) throw error;

      const invitationsMap: Record<string, Record<string, ProjectInvitation>> = {};
      if (data) {
        data.forEach((invitation) => {
          if (!invitationsMap[invitation.clipper_id]) {
            invitationsMap[invitation.clipper_id] = {};
          }
          invitationsMap[invitation.clipper_id][invitation.project_id] = invitation;
        });
      }
      setInvitations(invitationsMap);
    } catch (err) {
      console.error('Error fetching invitations:', err);
    }
  };

  const toggleBookmark = async (clipperId: string, event?: React.MouseEvent) => {
    if (!user) return;

    event?.preventDefault();
    event?.stopPropagation();

    try {
      const isCurrentlyBookmarked = bookmarks[clipperId] !== undefined;
      const newBookmarks = { ...bookmarks };
      
      if (isCurrentlyBookmarked) {
        delete newBookmarks[clipperId];
      } else {
        newBookmarks[clipperId] = '';
      }
      
      setBookmarks(newBookmarks);

      if (isCurrentlyBookmarked) {
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('booker_id', user.id)
          .eq('clipper_id', clipperId);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('bookmarks')
          .insert({
            booker_id: user.id,
            clipper_id: clipperId,
            notes: ''
          });
        
        if (error) throw error;
      }
    } catch (err) {
      console.error('Error toggling bookmark:', err);
      if (user) {
        fetchBookmarks(user.id);
      }
    }
  };

  const fetchProjects = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('booker_id', user.id);

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
    if (!selectedClipper || !user) return;

    // Check if an invitation already exists
    const clipperInvitations = invitations[selectedClipper.id] || {};
    const existingInvitation = clipperInvitations[project.id];
    
    if (existingInvitation) {
      toast({
        title: 'Already Invited',
        description: `${selectedClipper.username} has already been invited to this project (${existingInvitation.status}).`,
        variant: 'default',
      });
      setShowProjectSelector(false);
      setSelectedClipper(null);
      setProjectSearchTerm('');
      return;
    }

    try {
      const result = await supabase
        .from('project_invitations')
        .insert({
          project_id: project.id,
          clipper_id: selectedClipper.id,
          booker_id: user.id,
          status: 'pending' as const
        });

      if (result.error) throw result.error;

      const singleResult = await result.select().single();
      const { data, error } = singleResult as { data: ProjectInvitation | null; error: Error | null };

      if (error) throw error;

      // Update local state with the complete invitation data
      if (data) {
        setInvitations(prev => {
          const newState = { ...prev };
          if (!newState[selectedClipper.id]) {
            newState[selectedClipper.id] = {};
          }
          newState[selectedClipper.id][project.id] = data;
          return newState;
        });

        toast({
          title: 'Invitation Sent',
          description: `Invited ${selectedClipper.username} to project: ${project.title}`,
        });
      }
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
    if (!user) return;

    try {
      // Remove from user's directory
      const { error } = await supabase
        .from('clipper_directory')
        .delete()
        .eq('user_id', user.id)
        .eq('clipper_id', clipper.id);

      if (error) throw error;

      // Update local state to remove the clipper
      setClippers(prevClippers => prevClippers.filter(c => c.id !== clipper.id));

      toast({
        title: 'Clipper Removed',
        description: `${clipper.username} has been removed from your directory. You can re-add them from the marketplace.`,
      });
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
    .filter(clipper => showBookmarked ? bookmarks[clipper.id] !== undefined : true)
    .filter(clipper => 
      clipper.username?.toLowerCase().includes(searchTerm.toLowerCase() || '') || false
    )
    .map(clipper => ({
      ...clipper,
      is_bookmarked: bookmarks[clipper.id] !== undefined,
      notes: bookmarks[clipper.id] || ''
    }));

  const getTotalSubscribers = (youtube_tokens: YouTubeChannel[]) => {
    if (!youtube_tokens || !youtube_tokens.length) return 0;
    return youtube_tokens.reduce((sum, channel) => sum + (channel.subscribers || 0), 0);
  };

  const renderProjectItem = (project: Project) => {
    const clipperInvitations = selectedClipper ? (invitations[selectedClipper.id] || {}) : {};
    const invitation = clipperInvitations[project.id];

    return (
      <CommandItem
        key={project.id}
        value={project.id}
        onSelect={() => handleProjectSelect(project)}
        className={cn(
          "cursor-pointer hover:bg-gray-100 p-2",
          invitation && "opacity-75"
        )}
        disabled={!!invitation}
      >
        <div className="flex flex-col flex-1">
          <span className="font-medium">{project.title}</span>
          <span className="text-sm text-gray-500">
            Budget: ${project.budget} • Status: {project.status}
          </span>
        </div>
        {invitation && (
          <div className="flex items-center gap-2 ml-2">
            {invitation.status === 'pending' && (
              <div className="flex items-center text-yellow-600">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">Pending</span>
              </div>
            )}
            {invitation.status === 'accepted' && (
              <div className="flex items-center text-green-600">
                <Check className="h-4 w-4 mr-1" />
                <span className="text-sm">Accepted</span>
              </div>
            )}
            {invitation.status === 'declined' && (
              <div className="flex items-center text-red-600">
                <X className="h-4 w-4 mr-1" />
                <span className="text-sm">Declined</span>
              </div>
            )}
          </div>
        )}
      </CommandItem>
    );
  };

  const renderInviteButton = (clipper: Clipper) => {
    const clipperInvitations = invitations[clipper.id] || {};
    const hasActive = Object.values(clipperInvitations).some(
      inv => inv.status === 'pending' || inv.status === 'accepted'
    );

    if (hasActive) {
      const pendingCount = Object.values(clipperInvitations).filter(inv => inv.status === 'pending').length;
      const acceptedCount = Object.values(clipperInvitations).filter(inv => inv.status === 'accepted').length;

      return (
        <button
          className={cn(
            "w-full inline-flex items-center justify-center px-3 py-1.5 border text-xs font-medium rounded-md",
            "border-purple-600 text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          )}
          onClick={() => handleInviteToProject(clipper)}
        >
          {pendingCount > 0 && (
            <>
              <Clock className="h-3 w-3 mr-1" />
              {pendingCount} Pending
            </>
          )}
          {acceptedCount > 0 && !pendingCount && (
            <>
              <Check className="h-3 w-3 mr-1" />
              {acceptedCount} Active
            </>
          )}
        </button>
      );
    }

    return (
      <button
        className="w-full inline-flex items-center justify-center px-3 py-1.5 border border-indigo-600 text-xs font-medium rounded-md text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => handleInviteToProject(clipper)}
      >
        Invite to Project
      </button>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!user ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Please sign in to view the clipper directory.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">My Clipper Directory</h2>
              
              <div className="flex space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Search clippers"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <button
                  onClick={() => setShowBookmarked(!showBookmarked)}
                  className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md ${
                    showBookmarked 
                      ? 'bg-indigo-100 text-indigo-700 border-indigo-300' 
                      : 'text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Bookmarked
                </button>
              </div>
            </div>

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
              <div className="text-center py-12">
                <p className="text-gray-500">
                  {showBookmarked 
                    ? "You haven't bookmarked any clippers yet."
                    : "No clippers match your search criteria."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredClippers.map((clipper) => {
                  const totalSubscribers = getTotalSubscribers(clipper.youtube_tokens || []);
                  const channelCount = clipper.youtube_tokens?.length || 0;
                  
                  return (
                    <div key={clipper.id} className="bg-white overflow-hidden border border-gray-200 rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
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
                            
                            <div className="ml-4">
                              <h3 className="text-lg font-medium text-gray-900">{clipper.username}</h3>
                              <div className="mt-1 flex items-center text-sm text-gray-500">
                                <span>{totalSubscribers.toLocaleString()} subscribers</span>
                                <span className="mx-1">•</span>
                                <span>{channelCount} {channelCount === 1 ? 'channel' : 'channels'}</span>
                              </div>
                            </div>
                          </div>

                          <BookmarkStar
                            clipperId={clipper.id}
                            initialIsBookmarked={clipper.is_bookmarked || false}
                            onToggle={(id: string, isNowBookmarked: boolean) => {
                              // Update local UI state
                              const updatedClippers = clippers.map(c => 
                                c.id === id ? {...c, is_bookmarked: isNowBookmarked} : c
                              );
                              setClippers(updatedClippers);
                              
                              // Also call the existing bookmark function
                              toggleBookmark(id);
                            }}
                            isNested={true}
                          />
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setClipperToRemove(clipper)}
                              className="inline-flex items-center px-2.5 py-1.5 text-xs text-gray-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                            <a
                              href={`/portfolio/${clipper.username}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-2.5 py-1.5 text-xs text-gray-700 hover:text-gray-900 whitespace-nowrap"
                            >
                              View Portfolio
                              <ExternalLink className="h-3.5 w-3.5 ml-1" />
                            </a>
                          </div>

                          {/* Render button directly without nesting */}
                          <div className="sm:flex-1">
                            {renderInviteButton(clipper)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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
              {filteredProjects.map((project) => renderProjectItem(project))}
            </CommandGroup>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClippersPage; 