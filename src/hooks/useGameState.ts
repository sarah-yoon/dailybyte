import { useState, useEffect, useRef, useCallback } from 'react';
import { GameState, DemoState } from '../types';
import { TIMER_DURATION, FADE_DURATION, WASP_SPEED, WASP_CONTAINER_WIDTH } from '../constants';
import { quizData } from '../data/quizData';

const initialGameState: GameState = {
  currentQuestion: 0,
  score: 0,
  waspPosition: 0,
  waspSpeed: WASP_SPEED,
  waspVerticalOffset: 0,
  gameEnded: false,
  gameEndReason: null,
  answerSelected: false,
  selectedIndex: null,
  timerWidth: '100%',
  timerTransition: 'none',
  fadeOut: false,
};

const initialDemoState: DemoState = {
  question: 0,
  score: 0,
  waspPosition: 0,
  timerWidth: '100%',
};

export const useGameState = (gameStarted: boolean) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [demoState, setDemoState] = useState<DemoState>(initialDemoState);
  const [quizVersion, setQuizVersion] = useState(0);

  const waspInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const feedbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Force re-render when quiz data changes (Vite HMR should handle this)
  useEffect(() => {
    setQuizVersion(prev => prev + 1);
  }, []);

  // Demo animation loop
  useEffect(() => {
    if (gameStarted) return;

    const demoInterval = setInterval(() => {
      setDemoState(prev => ({
        ...prev,
        question: (prev.question + 1) % 4,
        score: Math.min(prev.score + 1, 4),
        waspPosition: Math.max(0, prev.waspPosition - 50),
        timerWidth: '100%'
      }));
    }, 3000);

    return () => clearInterval(demoInterval);
  }, [gameStarted]);

  // Demo timer effect
  useEffect(() => {
    if (gameStarted) return;

    const timerInterval = setInterval(() => {
      setDemoState(prev => ({
        ...prev,
        timerWidth: `${Math.max(0, parseFloat(prev.timerWidth) - 3.33)}%`
      }));
    }, 100);

    return () => clearInterval(timerInterval);
  }, [gameStarted, demoState.question]);

  // Wasp movement effect
  useEffect(() => {
    if (!gameStarted || gameState.gameEnded) return;

    waspInterval.current = setInterval(() => {
      setGameState(prev => {
        const next = Math.min(WASP_CONTAINER_WIDTH, prev.waspPosition + prev.waspSpeed);
        
        if (next >= WASP_CONTAINER_WIDTH) {
          setTimeout(() => {
            setGameState(current => ({
              ...current,
              gameEndReason: 'wasp',
              gameEnded: true
            }));
          }, 1000);
        }
        
        return { ...prev, waspPosition: next };
      });
    }, 50);

    return () => {
      if (waspInterval.current) clearInterval(waspInterval.current);
    };
  }, [gameState.waspSpeed, gameState.gameEnded, gameStarted]);

  // Wasp dramatic up/down movement effect
  useEffect(() => {
    if (!gameStarted || gameState.gameEnded) return;

    const verticalInterval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        waspVerticalOffset: Math.sin(Date.now() * 0.01) * 15
      }));
    }, 100);

    return () => clearInterval(verticalInterval);
  }, [gameStarted, gameState.gameEnded]);

  const selectAnswer = useCallback((idx: number) => {
    if (!gameStarted || gameState.answerSelected || gameState.gameEnded) return;

    if (timerTimeout.current) {
      clearTimeout(timerTimeout.current);
      timerTimeout.current = null;
    }

    setGameState(prev => ({
      ...prev,
      answerSelected: true,
      selectedIndex: idx
    }));

    const question = quizData.questions[gameState.currentQuestion];
    const isCorrect = idx === question.correctAnswer;

    if (isCorrect) {
      setGameState(prev => ({ ...prev, score: prev.score + 1 }));
    }

    // Wasp movement logic
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        waspPosition: isCorrect ? Math.max(0, prev.waspPosition - 150) : prev.waspPosition + 100
      }));
    }, 200);

    // Move to next question with consistent delay
    const delay = 800;
    feedbackTimeout.current = setTimeout(() => {
      setGameState(prev => ({ ...prev, fadeOut: true }));
      
      fadeTimeout.current = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          fadeOut: false,
          currentQuestion: prev.currentQuestion + 1,
          answerSelected: false,
          selectedIndex: null
        }));
      }, FADE_DURATION);
    }, delay);
  }, [gameStarted, gameState.answerSelected, gameState.gameEnded, gameState.currentQuestion]);

  // Timer effect (reset visually every question)
  useEffect(() => {
    if (!gameStarted || gameState.gameEnded) return;

    if (timerTimeout.current) clearTimeout(timerTimeout.current);
    
    setGameState(prev => ({
      ...prev,
      timerTransition: 'none',
      timerWidth: '100%'
    }));

    const resetTimeout = setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        timerTransition: 'width 2s linear',
        timerWidth: '0%'
      }));

      timerTimeout.current = setTimeout(() => {
        if (!gameState.answerSelected) {
          selectAnswer(-1);
        }
      }, TIMER_DURATION);
    }, 30);

    return () => {
      if (timerTimeout.current) clearTimeout(timerTimeout.current);
      clearTimeout(resetTimeout);
    };
  }, [gameState.currentQuestion, gameStarted, gameState.answerSelected, selectAnswer, gameState.gameEnded]);

  // Check if game is completed
  useEffect(() => {
    if (!gameStarted) return;
    
    if (gameState.currentQuestion >= quizData.questions.length) {
      setGameState(prev => ({
        ...prev,
        gameEndReason: 'completed',
        gameEnded: true
      }));
    }

    return () => {
      if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current);
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    };
  }, [gameState.currentQuestion, gameStarted, gameState.gameEnded]);

  const restart = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  return {
    gameState,
    demoState,
    selectAnswer,
    restart,
    quizVersion
  };
}; 