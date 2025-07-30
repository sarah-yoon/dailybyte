// Game constants
export const TIMER_DURATION = 2000;
export const FEEDBACK_DURATION = 1300;
export const FADE_DURATION = 300;
export const WASPS_PER_QUESTION = 24; // 120 total distance / 5 questions = 24 per question

// Wasp movement constants
export const WASP_SPEED = 1.2; // Fixed speed - 1.2 units per interval
export const WASP_CONTAINER_WIDTH = 520;
export const WASP_WIDTH = 30;
export const PLAYER_POSITION = 20;

// Animation constants
export const DRAG_THRESHOLD = 50; // Reduced from 100px to 50px for easier navigation
export const VELOCITY_THRESHOLD = 3; // Reduced velocity threshold from 5 to 3
export const ANIMATION_DURATION = 300;

// Demo constants
export const DEMO_INTERVAL = 3000; // Change every 3 seconds
export const DEMO_TIMER_INTERVAL = 100;
export const DEMO_TIMER_DECREASE = 3.33; // Decrease by ~3.33% every 100ms

// Local storage keys
export const THEME_STORAGE_KEY = 'todayTheme';

// API endpoints
export const API_ENDPOINTS = {
  GENERATE_QUIZ: '/api/generate-quiz',
  SAVE_QUIZ_DATA: '/api/save-quiz-data',
  HEALTH: '/api/health'
} as const; 