export interface Game {
  id: number;
  title: string;
  description: string;
  genre: string;
  players: string;
  duration: string;
  difficulty: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizData {
  totalQuestions: number;
  questions: QuizQuestion[];
}

export type Theme = 'sunrise' | 'morning' | 'noon' | 'afternoon' | 'sunset' | 'night';

export interface GameState {
  currentQuestion: number;
  score: number;
  waspPosition: number;
  waspSpeed: number;
  waspVerticalOffset: number;
  gameEnded: boolean;
  gameEndReason: 'wasp' | 'completed' | null;
  answerSelected: boolean;
  selectedIndex: number | null;
  timerWidth: string;
  timerTransition: 'none' | 'width 2s linear';
  fadeOut: boolean;
}

export interface DemoState {
  question: number;
  score: number;
  waspPosition: number;
  timerWidth: string;
}

export interface ThemeConfig {
  titleColor: string;
  subtitle: string;
  subtitleColor: string;
  gameContainerBg: string;
  timerBarBg: string;
  waspContainerBg: string;
  waspContainerBorder: string;
  playButtonBg: string;
  questionCounterBg: string;
  progressBarBg: string;
} 