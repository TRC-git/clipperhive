import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Users, Search, Star, StarOff, ExternalLink } from 'lucide-react';

interface ClipperDirectoryProps {
  userId: string;
  onUpdate: () => void;
}

interface Clipper {
  id: string;
  username: string;
  profile_picture: string | null;
  youtube_tokens: any[];
  role: string;
  is_bookmarked?: boolean;
  notes?: string;
}

const ClipperDirectory: React.FC<ClipperDirectoryProps> = ({ userId, onUpdate }) => {
  const [clippers, setClippers] = useState<Clipper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarks, setBookmarks] = useState<Record<string, string>>({});
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [clipperForNote, setClipperForNote] = useState<string | null>(null);

  useEffect(() => {
    fetchClippers();
    fetchBookmarks();
  }, [userId, showBookmarked]);

  const fetchClippers = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('users')
        .select('id, username, profile_picture, youtube_tokens, role')
        .eq('role', 'clipper');
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      if (data) {
        setClippers(data as Clipper[]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch clippers');
      console.error('Error fetching clippers:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('clipper_id, notes')
        .eq('booker_id', userId);
      
      if (error) throw error;
      
      if (data) {
        const bookmarkMap: Record<string, string> = {};
        data.forEach(bookmark => {
          bookmarkMap[bookmark.clipper_id] = bookmark.notes || '';
        });
        setBookmarks(bookmarkMap);
      }
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
    }
  };

  const toggleBookmark = async (clipperId: string) => {
    try {
      if (bookmarks[clipperId]) {
        // Remove bookmark
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('booker_id', userId)
          .eq('clipper_id', clipperId);
        
        if (error) throw error;
        
        const newBookmarks = { ...bookmarks };
        delete newBookmarks[clipperId];
        setBookmarks(newBookmarks);
      } else {
        // Add bookmark
        const { error } = await supabase
          .from('bookmarks')
          .insert({
            booker_id: userId,
            clipper_id: clipperId,
            notes: ''
          });
        
        if (error) throw error;
        
        setBookmarks({ ...bookmarks, [clipperId]: '' });
      }
      
      onUpdate();
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    }
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

  const filteredClippers = clippers
    .filter(clipper => showBookmarked ? bookmarks[clipper.id] !== undefined : true)
    .filter(clipper => 
      clipper.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map(clipper => ({
      ...clipper,
      is_bookmarked: bookmarks[clipper.id] !== undefined,
      notes: bookmarks[clipper.id] || ''
    }));

  const getTotalSubscribers = (youtube_tokens: any[]) => {
    if (!youtube_tokens || !youtube_tokens.length) return 0;
    return youtube_tokens.reduce((sum, channel) => sum + (channel.subscribers || 0), 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Clipper Directory</h2>
          
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
                        
                        <button
                          onClick={() => toggleBookmark(clipper.id)}
                          className="ml-2 p-1 rounded-full hover:bg-gray-100"
                          title={clipper.is_bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
                        >
                          {clipper.is_bookmarked ? (
                            <Star className="h-5 w-5 text-yellow-500" />
                          ) : (
                            <StarOff className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
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
                              <button
                                onClick={() => openNoteDialog(clipper.id)}
                                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                              >
                                Add Note
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 text-right">
                      <button
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                          // This would open a modal to invite clipper to a project
                          alert(`Invite ${clipper.username} to a project - feature coming soon!`);
                        }}
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
    </div>
  );
};

export default ClipperDirectory;