import { VALIDATION_RULES } from '../constants';

// Email validation
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }
  
  if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
};

// Password validation
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < VALIDATION_RULES.MIN_PASSWORD_LENGTH) {
    return { 
      isValid: false, 
      message: `Password must be at least ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} characters long` 
    };
  }
  
  return { isValid: true };
};

// Name validation
export const validateName = (name) => {
  if (!name) {
    return { isValid: false, message: 'Name is required' };
  }
  
  if (name.length < VALIDATION_RULES.MIN_NAME_LENGTH) {
    return { 
      isValid: false, 
      message: `Name must be at least ${VALIDATION_RULES.MIN_NAME_LENGTH} characters long` 
    };
  }
  
  return { isValid: true };
};

// File validation
export const validateFile = (file, type = 'image') => {
  if (!file) {
    return { isValid: false, message: 'File is required' };
  }

  const maxSize = type === 'image' ? 1000000 : 19000000; // 1MB for image, 19MB for audio
  const allowedTypes = type === 'image' 
    ? ['image/jpeg', 'image/png', 'image/gif'] 
    : ['audio/mpeg', 'audio/wav', 'audio/ogg'];

  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / 1000000);
    return { 
      isValid: false, 
      message: `File size must be less than ${maxSizeMB}MB` 
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return { 
      isValid: false, 
      message: `File type must be one of: ${allowedTypes.join(', ')}` 
    };
  }

  return { isValid: true };
};

// Form validation helper
export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const fieldRules = rules[field];
    
    fieldRules.forEach(rule => {
      const result = rule(value);
      if (!result.isValid) {
        errors[field] = result.message;
        isValid = false;
      }
    });
  });

  return { isValid, errors };
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .trim();
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
