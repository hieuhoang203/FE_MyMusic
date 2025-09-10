// Debounce function for search and input handling
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll and resize events
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Deep clone object
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Format time in seconds to MM:SS
export const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

// Get file extension
export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

// Check if file is image
export const isImageFile = (file) => {
  const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return imageTypes.includes(file.type);
};

// Check if file is audio
export const isAudioFile = (file) => {
  const audioTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3'];
  return audioTypes.includes(file.type);
};

// Create object URL for file preview
export const createObjectURL = (file) => {
  return URL.createObjectURL(file);
};

// Revoke object URL to free memory
export const revokeObjectURL = (url) => {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};

// Local storage helpers with error handling
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

// Error handling helper
export const handleError = (error, defaultMessage = 'An error occurred') => {
  console.error('Error:', error);
  
  if (error.response) {
    // Server responded with error status
    return error.response.data?.message || error.response.statusText || defaultMessage;
  } else if (error.request) {
    // Request was made but no response received
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    return error.message || defaultMessage;
  }
};

// Retry function for API calls
export const retry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

// Check if device is mobile
export const isMobile = () => {
  return window.innerWidth <= 768;
};

// Check if device is tablet
export const isTablet = () => {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
};

// Check if device is desktop
export const isDesktop = () => {
  return window.innerWidth > 1024;
};
