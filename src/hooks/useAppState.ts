import { useState, useEffect, useCallback } from 'react';
import { Theme, Game } from '../types';
import { getThemeByTime, capitalizeWords } from '../utils/themeUtils';
import { THEME_STORAGE_KEY, API_ENDPOINTS } from '../constants';

export const useAppState = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'game'>('home');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [testTheme, setTestTheme] = useState<Theme | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isNewDayModalOpen, setIsNewDayModalOpen] = useState(false);
  const [newDayText, setNewDayText] = useState('');
  const [lastNewDaySubmission, setLastNewDaySubmission] = useState<string>('');
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [isEditGameDataOpen, setIsEditGameDataOpen] = useState(false);

  const theme = testTheme || getThemeByTime();

  // On mount, load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      setLastNewDaySubmission(savedTheme);
    }
  }, []);

  // When lastNewDaySubmission changes, save to localStorage
  useEffect(() => {
    if (lastNewDaySubmission) {
      localStorage.setItem(THEME_STORAGE_KEY, lastNewDaySubmission);
    } else {
      localStorage.removeItem(THEME_STORAGE_KEY);
    }
  }, [lastNewDaySubmission]);

  const handleGameSelect = useCallback((game: Game) => {
    setSelectedGame(game);
    setCurrentPage('game');
  }, []);

  const handleBackToHome = useCallback(() => {
    setCurrentPage('home');
    setSelectedGame(null);
  }, []);

  const handleNewDaySubmit = useCallback(async () => {
    if (!newDayText.trim()) return;

    setIsGeneratingQuiz(true);
    setLastNewDaySubmission(newDayText);

    try {
      const response = await fetch(API_ENDPOINTS.GENERATE_QUIZ, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: newDayText.trim() }),
      });

      if (response.ok) {
        console.log('Quiz generated successfully for theme:', newDayText);
      } else {
        console.error('Failed to generate quiz');
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
    } finally {
      setIsGeneratingQuiz(false);
      setNewDayText('');
      setIsNewDayModalOpen(false);
    }
  }, [newDayText]);

  const handleResetTheme = useCallback(async () => {
    setIsGeneratingQuiz(true);
    setLastNewDaySubmission('');

    try {
      const mockDessertData = `// Quiz data that can be dynamically updated
export const quizData = {
  totalQuestions: 9,
  questions: [
    { id: 1, question: 'How do you spell this word?', options: ['Macaron', 'Maccaron', 'Macaroon', 'Maccaroon'], correctAnswer: 0 },
    { id: 2, question: 'How do you spell this word?', options: ['Souffle', 'Suflee', 'Sufle', 'Soufle'], correctAnswer: 0 },
    { id: 3, question: 'How do you spell this word?', options: ['Ecliar', 'Eclair', 'Eclaire', 'Ecclair'], correctAnswer: 1 },
    { id: 4, question: 'How do you spell this word?', options: ['Tiramisu', 'Tiramesu', 'Tiramasu', 'Tiramassu'], correctAnswer: 0 },
    { id: 5, question: 'How do you spell this word?', options: ['Cannolli', 'Canoli', 'Cannoli', 'Canolli'], correctAnswer: 2 },
    { id: 6, question: 'How do you spell this word?', options: ['Baklava', 'Baklawa', 'Baclava', 'Baklave'], correctAnswer: 0 },
    { id: 7, question: 'How do you spell this word?', options: ['Proffiterole', 'Profiterole', 'Profiterol', 'Profiteroll'], correctAnswer: 1 },
    { id: 8, question: 'How do you spell this word?', options: ['Pavolva', 'Pavlovae', 'Pavlova', 'Pavllova'], correctAnswer: 2 },
    { id: 9, question: 'How do you spell this word?', options: ['Chifon', 'Chiffan', 'Chiffonn', 'Chiffon'], correctAnswer: 3 },
  ],
};

export type QuizQuestion = typeof quizData.questions[number];`;

      const response = await fetch(API_ENDPOINTS.SAVE_QUIZ_DATA, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quizData: mockDessertData }),
      });

      if (response.ok) {
        console.log('Quiz reset successfully to desserts');
      } else {
        console.error('Failed to reset quiz');
      }
    } catch (error) {
      console.error('Error resetting quiz:', error);
    } finally {
      setIsGeneratingQuiz(false);
    }
  }, []);

  const todayTheme = capitalizeWords(lastNewDaySubmission || 'Desserts');

  return {
    // State
    currentPage,
    selectedGame,
    testTheme,
    isPanelOpen,
    isNewDayModalOpen,
    newDayText,
    lastNewDaySubmission,
    isGeneratingQuiz,
    isEditGameDataOpen,
    theme,
    todayTheme,

    // Actions
    setTestTheme,
    setIsPanelOpen,
    setIsNewDayModalOpen,
    setNewDayText,
    setIsEditGameDataOpen,
    handleGameSelect,
    handleBackToHome,
    handleNewDaySubmit,
    handleResetTheme,
  };
}; 