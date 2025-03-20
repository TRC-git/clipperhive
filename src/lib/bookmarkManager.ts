/**
 * Global bookmark manager that provides direct access to bookmark state
 * This bypasses React state management to ensure consistency
 */

const BOOKMARK_STORAGE_KEY = 'clipper_bookmarks';

// Get bookmarks from localStorage
export const getBookmarks = (): string[] => {
  try {
    const savedBookmarks = localStorage.getItem(BOOKMARK_STORAGE_KEY);
    console.log('Raw bookmarks from localStorage:', savedBookmarks);
    
    if (!savedBookmarks) {
      console.log('No bookmarks found, returning empty array');
      return [];
    }
    
    const parsed = JSON.parse(savedBookmarks);
    if (!Array.isArray(parsed)) {
      console.error('Parsed bookmarks is not an array, resetting');
      localStorage.setItem(BOOKMARK_STORAGE_KEY, '[]');
      return [];
    }
    
    return parsed;
  } catch (error) {
    console.error('Error reading bookmarks:', error);
    return [];
  }
};

// Add a bookmark
export const addBookmark = (clipperId: string): void => {
  try {
    const bookmarks = getBookmarks();
    
    // Check if already bookmarked
    if (bookmarks.includes(clipperId)) {
      console.log(`Clipper ${clipperId} already bookmarked`);
      return;
    }
    
    // Add the bookmark
    const newBookmarks = [...bookmarks, clipperId];
    localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(newBookmarks));
    console.log(`Added bookmark for ${clipperId}, new bookmarks:`, newBookmarks);
    
    // Update any star elements in the DOM
    updateStarElements(clipperId, true);
    
    // Notify other components
    notifyBookmarkChange(newBookmarks, 'add', clipperId);
  } catch (error) {
    console.error('Error adding bookmark:', error);
  }
};

// Remove a bookmark
export const removeBookmark = (clipperId: string): void => {
  try {
    const bookmarks = getBookmarks();
    
    // Remove the bookmark
    const newBookmarks = bookmarks.filter(id => id !== clipperId);
    
    // Extra validation to ensure it was removed
    if (bookmarks.length === newBookmarks.length) {
      console.warn(`Failed to remove ${clipperId} - wasn't found in bookmarks:`, bookmarks);
    } else {
      console.log(`Removed bookmark for ${clipperId}, new bookmarks:`, newBookmarks);
    }
    
    // Always save the filtered array
    localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(newBookmarks));
    
    // Update any star elements in the DOM
    updateStarElements(clipperId, false);
    
    // Notify other components
    notifyBookmarkChange(newBookmarks, 'remove', clipperId);
  } catch (error) {
    console.error('Error removing bookmark:', error);
  }
};

// Check if a clipper is bookmarked
export const isBookmarked = (clipperId: string): boolean => {
  const bookmarks = getBookmarks();
  return bookmarks.includes(clipperId);
};

// Toggle a bookmark
export const toggleBookmark = (clipperId: string): void => {
  if (isBookmarked(clipperId)) {
    removeBookmark(clipperId);
  } else {
    addBookmark(clipperId);
  }
};

// Update DOM elements (stars) directly when bookmark state changes
const updateStarElements = (clipperId: string, isBookmarked: boolean): void => {
  try {
    // Target the specific star by ID
    const starElement = document.getElementById(`bookmark-star-${clipperId}`);
    if (starElement) {
      starElement.setAttribute('data-bookmarked', isBookmarked.toString());
      
      // Update the icon
      const icon = starElement.querySelector('svg');
      if (icon) {
        if (isBookmarked) {
          icon.classList.add('text-yellow-500');
          icon.classList.remove('text-gray-400');
        } else {
          icon.classList.add('text-gray-400');
          icon.classList.remove('text-yellow-500');
        }
      }
    }
  } catch (error) {
    console.error('Error updating star elements:', error);
  }
};

// Notify other components about bookmark changes
const notifyBookmarkChange = (bookmarkedIds: string[], action: 'add' | 'remove', clipperId: string): void => {
  try {
    const event = new CustomEvent('clipper_bookmarks_changed', {
      detail: {
        bookmarkedIds,
        action,
        clipperId
      }
    });
    window.dispatchEvent(event);
    console.log(`Dispatched bookmark change event: ${action} ${clipperId}`);
  } catch (error) {
    console.error('Error dispatching bookmark change event:', error);
  }
};

// Export a direct function to fix any corrupted bookmark state
export const resetBookmarks = (): void => {
  localStorage.setItem(BOOKMARK_STORAGE_KEY, '[]');
  console.log('Bookmarks reset to empty array');
  
  // Notify components about the reset
  notifyBookmarkChange([], 'remove', '');
}; 