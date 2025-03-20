import React, { useState } from 'react';
import { Star, StarOff } from 'lucide-react';

interface BookmarkStarProps {
  clipperId: string;
  initialIsBookmarked: boolean;
  onToggle?: (clipperId: string, isNowBookmarked: boolean) => void;
  isNested?: boolean; // Add prop to indicate if component is nested in a button
}

/**
 * A standalone component that directly manipulates localStorage for immediate bookmark updates
 */
const BookmarkStar: React.FC<BookmarkStarProps> = ({ 
  clipperId, 
  initialIsBookmarked,
  onToggle,
  isNested = false // Default to false
}) => {
  // Local state for UI updates
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);

  // Function to directly check the current state in localStorage
  const checkBookmarkState = (): boolean => {
    try {
      const savedBookmarks = localStorage.getItem('clipper_bookmarks') || '[]';
      const bookmarkedIds = JSON.parse(savedBookmarks);
      if (!Array.isArray(bookmarkedIds)) {
        console.error('clipper_bookmarks is not an array, resetting');
        localStorage.setItem('clipper_bookmarks', '[]');
        return false;
      }
      return bookmarkedIds.includes(clipperId);
    } catch (err) {
      console.error('Error checking bookmark state:', err);
      return false;
    }
  };

  // Direct function to add bookmark to localStorage
  const addBookmark = () => {
    try {
      const savedBookmarks = localStorage.getItem('clipper_bookmarks') || '[]';
      let bookmarkedIds;
      try {
        bookmarkedIds = JSON.parse(savedBookmarks);
        if (!Array.isArray(bookmarkedIds)) {
          console.error('clipper_bookmarks is not an array, resetting');
          bookmarkedIds = [];
        }
      } catch (e) {
        console.error('Error parsing clipper_bookmarks:', e);
        bookmarkedIds = [];
      }
      
      // Add to bookmarks if not already there
      if (!bookmarkedIds.includes(clipperId)) {
        bookmarkedIds.push(clipperId);
        localStorage.setItem('clipper_bookmarks', JSON.stringify(bookmarkedIds));
        console.log(`DIRECT: Added ${clipperId} to bookmarks`);
        console.log('New bookmarks:', localStorage.getItem('clipper_bookmarks'));
        
        // Force a DOM update to other components (backup strategy)
        document.querySelectorAll(`[data-clipper-id="${clipperId}"]`).forEach(el => {
          if (el instanceof HTMLElement) {
            el.dataset.bookmarked = "true";
            const starIcon = el.querySelector('.text-gray-400');
            if (starIcon instanceof HTMLElement) {
              starIcon.classList.replace('text-gray-400', 'text-yellow-500');
            }
          }
        });
      }
    } catch (err) {
      console.error('Error adding bookmark:', err);
    }
  };

  // Direct function to remove bookmark from localStorage
  const removeBookmark = () => {
    try {
      const savedBookmarks = localStorage.getItem('clipper_bookmarks') || '[]';
      let bookmarkedIds;
      try {
        bookmarkedIds = JSON.parse(savedBookmarks);
        if (!Array.isArray(bookmarkedIds)) {
          console.error('clipper_bookmarks is not an array, resetting');
          bookmarkedIds = [];
          localStorage.setItem('clipper_bookmarks', '[]');
          return;
        }
      } catch (e) {
        console.error('Error parsing clipper_bookmarks:', e);
        bookmarkedIds = [];
        localStorage.setItem('clipper_bookmarks', '[]');
        return;
      }
      
      // Multiple strategies for removal - try both filter approaches
      const filteredIds = bookmarkedIds.filter(id => id !== clipperId);
      const stringFilteredIds = bookmarkedIds.filter(id => String(id) !== String(clipperId));
      
      // Verify removal was successful and use the most effective filter
      if (filteredIds.length < bookmarkedIds.length) {
        localStorage.setItem('clipper_bookmarks', JSON.stringify(filteredIds));
        console.log(`DIRECT: Removed ${clipperId} from bookmarks (method 1)`);
      } else if (stringFilteredIds.length < bookmarkedIds.length) {
        localStorage.setItem('clipper_bookmarks', JSON.stringify(stringFilteredIds));
        console.log(`DIRECT: Removed ${clipperId} from bookmarks (method 2)`);
      } else {
        // Last resort - manual removal
        console.error(`DIRECT: Failed to remove ${clipperId} using filters, trying direct removal`);
        const indexToRemove = bookmarkedIds.findIndex(id => id === clipperId || String(id) === String(clipperId));
        if (indexToRemove >= 0) {
          bookmarkedIds.splice(indexToRemove, 1);
          localStorage.setItem('clipper_bookmarks', JSON.stringify(bookmarkedIds));
          console.log(`DIRECT: Removed ${clipperId} with splice method`);
        } else {
          console.error(`DIRECT: Could not find ${clipperId} in bookmarks`);
        }
      }
      
      // Force a DOM update to other components (backup strategy)
      document.querySelectorAll(`[data-clipper-id="${clipperId}"]`).forEach(el => {
        if (el instanceof HTMLElement) {
          el.dataset.bookmarked = "false";
          const starIcon = el.querySelector('.text-yellow-500');
          if (starIcon instanceof HTMLElement) {
            starIcon.classList.replace('text-yellow-500', 'text-gray-400');
          }
        }
      });
      
      console.log('New bookmarks:', localStorage.getItem('clipper_bookmarks'));
    } catch (err) {
      console.error('Error removing bookmark:', err);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check current state directly from localStorage for maximum reliability
    const currentState = checkBookmarkState();
    console.log(`BookmarkStar click: ${clipperId} current state: ${currentState}`);
    
    // Update localStorage directly and immediately
    if (currentState) {
      removeBookmark();
    } else {
      addBookmark();
    }
    
    // Update UI state for visual feedback
    setIsBookmarked(!currentState);
    
    // Call onToggle callback if provided
    if (onToggle) {
      onToggle(clipperId, !currentState);
    }
    
    // Dispatch a custom event for any other components that need to know
    try {
      const event = new CustomEvent('clipper_bookmark_changed', {
        detail: {
          clipperId,
          isBookmarked: !currentState
        }
      });
      window.dispatchEvent(event);
      
      // Also dispatch the older event format for backward compatibility
      const legacyEvent = new CustomEvent('clipper_bookmarks_changed', {
        detail: {
          bookmarkedIds: !currentState 
            ? [...(JSON.parse(localStorage.getItem('clipper_bookmarks') || '[]'))]
            : (JSON.parse(localStorage.getItem('clipper_bookmarks') || '[]')).filter((id: string) => id !== clipperId),
          action: !currentState ? 'add' : 'remove',
          clipperId
        }
      });
      window.dispatchEvent(legacyEvent);
    } catch (err) {
      console.error('Error dispatching event:', err);
    }
  };
  
  // Common props for both button and div versions
  const commonProps = {
    onClick: handleClick,
    className: "ml-2 p-1 rounded-full hover:bg-gray-100",
    title: isBookmarked ? "Remove from bookmarks" : "Add to bookmarks",
    id: `bookmark-star-${clipperId}`,
    "data-bookmarked": isBookmarked.toString(),
    "data-clipper-id": clipperId
  };
  
  // Render content (the star icon)
  const content = isBookmarked ? (
    <Star className="h-5 w-5 text-yellow-500" />
  ) : (
    <StarOff className="h-5 w-5 text-gray-400" />
  );

  // Render as div if nested, button otherwise
  return isNested ? (
    <div {...commonProps}>
      {content}
    </div>
  ) : (
    <button {...commonProps}>
      {content}
    </button>
  );
};

export default BookmarkStar; 