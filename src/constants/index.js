// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:8920",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  ARTIS: 'ARTIS',
  USER: 'USER',
};

// Song Status
export const SONG_STATUS = {
  WAIT: 'Wait',
  ACTIVATE: 'Activate',
  SHUTDOWN: 'ShutDown',
};

// File Upload Limits
export const FILE_LIMITS = {
  IMAGE_MAX_SIZE: 1000000, // 1MB
  AUDIO_MAX_SIZE: 19000000, // 19MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  ALLOWED_AUDIO_TYPES: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 5,
  DEFAULT_PAGE: 1,
};

// Routes
export const ROUTES = {
  HOME: '/',
  HOME_ALT: '/home',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: '/admin',
  ARTIS: '/artis',
  ERROR: '/error',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCOUNT: 'account',
  TOKEN: 'token',
  THEME: 'theme',
};

// Default Songs Data
export const DEFAULT_SONGS = [
  {
    id: 1,
    name: 'Cô gái M52',
    artist: 'HuyR',
    image: '/src/asset/song1.jpg',
    audio: '/src/asset/song1.mp3',
    duration: 213,
  },
  {
    id: 2,
    name: 'Mây lang thang',
    image: '/src/asset/song2.jpg',
    artist: 'Tùng Tea',
    audio: '/src/asset/song2.mp3',
    duration: 197,
  },
  {
    id: 3,
    name: 'Bèo dạt mây trôi',
    image: '/src/asset/song3.jpg',
    artist: 'Hương Tú',
    audio: '/src/asset/song3.mp3',
    duration: 207,
  },
  {
    id: 4,
    name: 'Yume Tourou',
    image: '/src/asset/song4.jpg',
    artist: 'RADWIMPS',
    audio: '/src/asset/song4.mp3',
    duration: 129,
  },
];

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  MIN_PASSWORD_LENGTH: 6,
  MIN_NAME_LENGTH: 6,
};

// UI Constants
export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  NOTIFICATION_DURATION: 3000,
  DEBOUNCE_DELAY: 500,
};
