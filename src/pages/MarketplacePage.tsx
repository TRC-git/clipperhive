import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { Clock, DollarSign, TrendingUp, Search, ExternalLink, Plus } from 'lucide-react';
import { cn } from "@/lib/utils";
import BookmarkStar from '../components/BookmarkStar';
import { useToast } from '@/hooks/use-toast';

interface YouTubeChannel {
  channel_id: string;
  channel_name: string;
  subscribers: number;
  total_views: number;
}

// Add categories constant at the top of the file
const CATEGORIES = {
  projects: ['All', 'Gaming', 'Tech', 'Lifestyle', 'Education', 'Entertainment'],
  clippers: ['All', 'Gaming Highlights', 'Lifestyle & Beauty', 'Viral Content', 'Tech Reviews', 'Educational']
};

// Update the dummy data to include categories
const dummyMarketplaceProjects = [
  {
    id: '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
    booker_id: '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a',
    title: 'Gaming Highlights Compilation',
    category: 'Gaming',
    description: 'Looking for exciting gaming moments from popular streamers. Need 3-5 minute highlight reels focusing on epic plays and funny reactions.',
    budget: 1000.00,
    cpm_rate: 5.00,
    status: 'open',
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    booker: {
      id: '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a',
      username: 'sarahcreates',
      profile_picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'
    }
  },
  {
    id: '4d5e6f7a-8b9c-40d1-a2e3-f4a5b6c7d8e9',
    booker_id: '937f9940-95b5-4c3a-8b68-3c2c2e05b6d9',
    title: 'Esports Highlights Compilation',
    category: 'Gaming',
    description: 'Looking for high-energy clips from major esports tournaments. Focus on player reactions and game-changing moments. Need 5-7 minute compilations.',
    budget: 1800.00,
    cpm_rate: 7.50,
    status: 'open',
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    booker: {
      id: '937f9940-95b5-4c3a-8b68-3c2c2e05b6d9',
      username: 'mikegaming',
      profile_picture: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400'
    }
  },
  {
    id: '5e6f7a8b-9c0d-41e2-b3f4-a5b6c7d8e9f0',
    booker_id: '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a',
    title: 'Product Review Shorts',
    category: 'Tech',
    description: 'Need engaging 30-second clips highlighting key features of latest tech products. Focus on visually impressive transformations and reactions.',
    budget: 950.00,
    cpm_rate: 5.25,
    status: 'open',
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    booker: {
      id: '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a',
      username: 'sarahcreates',
      profile_picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'
    }
  },
  {
    id: '6f7a8b9c-0d1e-42f3-a4b5-c6d7e8f9a0b1',
    booker_id: '8d2f45e7-7f1a-4d3b-9e5c-1c2d3e4f5a6b',
    title: 'Travel Vlog Highlights',
    category: 'Lifestyle',
    description: 'Seeking captivating moments from travel content. Focus on breathtaking scenery, unique cultural experiences, and authentic reactions. 1-2 minute clips.',
    budget: 1500.00,
    cpm_rate: 6.75,
    status: 'open',
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    booker: {
      id: '8d2f45e7-7f1a-4d3b-9e5c-1c2d3e4f5a6b',
      username: 'techreviewer',
      profile_picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
    }
  },
  {
    id: '7b8c9d0e-1f2a-3b4c-d5e6-f7a8b9c0d1e2',
    booker_id: '937f9940-95b5-4c3a-8b68-3c2c2e05b6d9',
    title: 'Viral Moments in Sports',
    category: 'Gaming',
    description: 'Looking for jaw-dropping sports moments from recent games and tournaments. Need clips that capture incredible athleticism, skill, and crowd reactions.',
    budget: 2200.00,
    cpm_rate: 8.50,
    status: 'open',
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    booker: {
      id: '937f9940-95b5-4c3a-8b68-3c2c2e05b6d9',
      username: 'mikegaming',
      profile_picture: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400'
    }
  },
  {
    id: '8c9d0e1f-2a3b-4c5d-e6f7-a8b9c0d1e2f3',
    booker_id: '8d2f45e7-7f1a-4d3b-9e5c-1c2d3e4f5a6b',
    title: 'Tech Unboxing Reactions',
    category: 'Tech',
    description: 'Seeking genuine reaction clips from tech unboxing videos. Focus on first impressions, surprise moments, and detailed feature reveals.',
    budget: 1300.00,
    cpm_rate: 6.00,
    status: 'open',
    created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    booker: {
      id: '8d2f45e7-7f1a-4d3b-9e5c-1c2d3e4f5a6b',
      username: 'techreviewer',
      profile_picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
    }
  }
];

// Update the MarketplaceClipper interface
interface MarketplaceClipper {
  id: string;
  username: string;
  profile_picture: string | null;
  youtube_tokens: YouTubeChannel[];
  role: string;
  is_bookmarked?: boolean;
  notes?: string;
  specialty?: string;
  rating?: number;
  projects_completed?: number;
  portfolio_url?: string;
}

// Combine dummy marketplace clippers with the existing ones
const dummyMarketplaceClippers: MarketplaceClipper[] = [
  {
    id: "1",
    username: "alexedits",
    profile_picture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    specialty: "Gaming Highlights",
    rating: 4.8,
    projects_completed: 42,
    youtube_tokens: [{
      channel_id: "UC123",
      channel_name: "Alex Edits",
      subscribers: 45000,
      total_views: 1000000
    }],
    role: "clipper",
    portfolio_url: "/portfolio/alexedits"
  },
  {
    id: "2",
    username: "emmaclips",
    profile_picture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    specialty: "Lifestyle & Beauty",
    rating: 4.9,
    projects_completed: 78,
    youtube_tokens: [{
      channel_id: "UC456",
      channel_name: "Emma's Edits",
      subscribers: 78000,
      total_views: 2000000
    }],
    role: "clipper",
    portfolio_url: "/portfolio/emmaclips"
  },
  {
    id: "3",
    username: "chrisviral",
    profile_picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    specialty: "Viral Content",
    rating: 4.95,
    projects_completed: 156,
    youtube_tokens: [{
      channel_id: "UC789",
      channel_name: "Chris Viral",
      subscribers: 125000,
      total_views: 5000000
    }],
    role: "clipper",
    portfolio_url: "/portfolio/chrisviral"
  }
];

const MarketplacePage = () => {
  const [projects, setProjects] = useState<typeof dummyMarketplaceProjects>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const { user } = useAuth();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'projects' | 'clippers'>('projects');
  const [clippers, setClippers] = useState<MarketplaceClipper[]>([]);
  const [directory, setDirectory] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    fetchProjects();
    fetchClippers();
    if (user) {
      loadDirectory();
      loadBookmarks();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Use dummy data instead of fetching from Supabase
      setProjects(dummyMarketplaceProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClippers = async () => {
    try {
      setLoading(true);
      // In a real app, fetch from API
      // For now, combine dummy data
      setClippers(dummyMarketplaceClippers);
    } catch (err) {
      console.error('Error fetching clippers:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadDirectory = () => {
    try {
      const savedDirectory = localStorage.getItem('clipper_directory');
      if (savedDirectory) {
        setDirectory(JSON.parse(savedDirectory));
      }
    } catch (err) {
      console.error('Error loading directory:', err);
    }
  };

  const loadBookmarks = () => {
    try {
      const savedBookmarks = localStorage.getItem('clipper_bookmarks');
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch (err) {
      console.error('Error loading bookmarks:', err);
    }
  };

  const handleAddToDirectory = async (clipper: MarketplaceClipper) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add clippers to your directory.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Check if clipper is already in directory
      const isInDirectory = directory.includes(clipper.id);
      let newDirectory: string[];

      if (isInDirectory) {
        // Remove from directory
        newDirectory = directory.filter(id => id !== clipper.id);
        toast({
          title: "Removed from Directory",
          description: `${clipper.username} has been removed from your directory.`,
        });
      } else {
        // Add to directory
        newDirectory = [...directory, clipper.id];
        toast({
          title: "Added to Directory",
          description: `${clipper.username} has been added to your directory.`,
        });
      }

      // Update localStorage and state
      localStorage.setItem('clipper_directory', JSON.stringify(newDirectory));
      setDirectory(newDirectory);

    } catch (error) {
      console.error('Error updating directory:', error);
      toast({
        title: "Error",
        description: "Failed to update directory.",
        variant: "destructive",
      });
    }
  };

  const handleContactClipper = (clipper: MarketplaceClipper) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to contact clippers.",
        variant: "destructive",
      });
      return;
    }

    // Implement contact functionality
    toast({
      title: "Contact Request Sent",
      description: `A message has been sent to ${clipper.username}.`,
    });
  };

  const handleToggleBookmark = async (clipper: MarketplaceClipper) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to bookmark clippers.",
        variant: "destructive",
      });
      return;
    }

    try {
      const isBookmarked = bookmarks.includes(clipper.id);
      let newBookmarks: string[];

      if (isBookmarked) {
        newBookmarks = bookmarks.filter(id => id !== clipper.id);
        toast({
          title: "Bookmark Removed",
          description: `${clipper.username} has been removed from your bookmarks.`,
        });
      } else {
        newBookmarks = [...bookmarks, clipper.id];
        toast({
          title: "Bookmark Added",
          description: `${clipper.username} has been bookmarked.`,
        });
      }

      localStorage.setItem('clipper_bookmarks', JSON.stringify(newBookmarks));
      setBookmarks(newBookmarks);

    } catch (error) {
      console.error('Error updating bookmarks:', error);
      toast({
        title: "Error",
        description: "Failed to update bookmark.",
        variant: "destructive",
      });
    }
  };

  const filteredProjects = projects.filter(project => 
    searchTerm === '' || 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClippers = clippers.filter(clipper =>
    clipper.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (clipper.specialty && clipper.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Toggle */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Marketplace</h1>
          
          <div className="flex items-center space-x-2 bg-gray-200 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('projects')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                viewMode === 'projects' 
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Browse Projects
            </button>
            <button
              onClick={() => setViewMode('clippers')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                viewMode === 'clippers'
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Find Clippers
            </button>
          </div>
        </div>

        {/* Search and Category Filter */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <div className="relative max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={viewMode === 'projects' ? "Search projects..." : "Search clippers..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="block w-48 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {CATEGORIES[viewMode === 'projects' ? 'projects' : 'clippers'].map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          {user && (
            <div className="ml-4">
              {viewMode === 'projects' && user.role === 'booker' && (
                <a
                  href="/projects/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  List Your Project
                </a>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <svg
              className="animate-spin h-10 w-10 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : viewMode === 'projects' ? (
          // Projects View
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} user={user} />
            ))}
          </div>
        ) : (
          // Clippers View
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClippers.map((clipper) => (
              <div key={clipper.id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
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
                          <span>{clipper.specialty}</span>
                          {clipper.rating && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{clipper.rating} ★</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <BookmarkStar
                      clipperId={clipper.id}
                      initialIsBookmarked={bookmarks.includes(clipper.id)}
                      onToggle={() => handleToggleBookmark(clipper)}
                      isNested={true}
                    />
                  </div>

                  <div className="mt-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-500">Subscribers</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {clipper.youtube_tokens?.[0]?.subscribers?.toLocaleString() || '0'}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-500">Projects</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {clipper.projects_completed || '0'}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <a
                        href={clipper.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900"
                      >
                        View Portfolio
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToDirectory(clipper)}
                        className={cn(
                          "flex-1 inline-flex justify-center items-center px-3 py-2 border shadow-sm text-sm font-medium rounded-md",
                          directory.includes(clipper.id)
                            ? "border-red-300 text-red-700 bg-red-50 hover:bg-red-100"
                            : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                        )}
                      >
                        {directory.includes(clipper.id) ? 'Remove from Directory' : 'Add to Directory'}
                      </button>
                      <button
                        onClick={() => handleContactClipper(clipper)}
                        className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: typeof dummyMarketplaceProjects[0];
  user: { id: string; role?: string } | null;
}

const ProjectCard = ({ project, user }: ProjectCardProps) => {
  // Format created date
  const createdDate = new Date(project.created_at);
  const formattedDate = createdDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Calculate if user can submit (must be a clipper and not the project owner)
  const canSubmit = user && user.role === 'clipper' && user.id !== project.booker_id;
  
  // Calculate remaining time
  const daysSinceCreation = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  const remainingDays = 30 - daysSinceCreation; // Assuming 30-day window

  const [showModal, setShowModal] = useState(false);

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
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Open
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
            <TrendingUp className="h-4 w-4 text-gray-400" />
            <span className="mt-1 text-xs font-semibold text-gray-700">${project.cpm_rate}</span>
            <span className="text-xs text-gray-500">CPM Rate</span>
          </div>
          <div className="flex flex-col items-center bg-gray-50 p-2 rounded">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="mt-1 text-xs font-semibold text-gray-700">{remainingDays} days</span>
            <span className="text-xs text-gray-500">Remaining</span>
          </div>
        </div>
        
        {/* Booker info */}
        <div className="mt-5 flex items-center">
          <div className="flex-shrink-0">
            {project.booker?.profile_picture ? (
              <img
                className="h-8 w-8 rounded-full"
                src={project.booker.profile_picture}
                alt={project.booker.username}
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-sm font-medium text-indigo-600">
                  {project.booker?.username?.charAt(0).toUpperCase() || "?"}
                </span>
              </div>
            )}
          </div>
          <div className="ml-3">
            <p className="text-xs text-gray-500">Posted by</p>
            <p className="text-sm font-medium text-gray-900">{project.booker?.username || "Unknown"}</p>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="px-5 py-3 bg-gray-50 flex justify-between items-center">
        <button 
          onClick={() => setShowModal(true)}
          className="text-xs text-indigo-600 hover:text-indigo-900 font-medium flex items-center"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          View Details
        </button>
        
        {canSubmit ? (
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit a Clip
          </button>
        ) : (
          <span className="text-xs text-gray-500">
            {!user ? "Login to submit" : user.role !== 'clipper' ? "Brands can't submit" : "Your project"}
          </span>
        )}
      </div>

      {/* Project details modal */}
      {showModal && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-40" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white rounded-lg max-w-xl w-full p-6 shadow-xl">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>Posted {formattedDate}</span>
              <span className="mx-2">•</span>
              <span className="capitalize">{project.status} Project</span>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">{project.description}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Budget</p>
                <p className="text-xl font-semibold text-gray-900">${project.budget}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">CPM Rate</p>
                <p className="text-xl font-semibold text-gray-900">${project.cpm_rate}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Time Left</p>
                <p className="text-xl font-semibold text-gray-900">{remainingDays} days</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Project Requirements</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>High quality video (1080p minimum)</li>
                <li>60 seconds maximum clip length</li>
                <li>Must include intro and outro</li>
                <li>Clear audio quality</li>
                <li>No copyrighted music</li>
              </ul>
            </div>
            
            <div className="flex items-center mb-6">
              <img
                className="h-10 w-10 rounded-full"
                src={project.booker?.profile_picture}
                alt={project.booker?.username}
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{project.booker?.username}</p>
                <p className="text-xs text-gray-500">Project Creator</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Close
              </button>
              
              {canSubmit && (
                <button
                  className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MarketplacePage;