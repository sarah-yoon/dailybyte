import React, { useEffect, useRef, useState } from 'react';
import './SpellingWaspGame.css';

const quizData = {
  totalQuestions: 9,
  questions: [
    { id: 1, image: 'tiramisu.jpg', question: 'How do you spell this word?', options: ['Tiramisoo', 'Tiramisu', 'Tiramisou', 'Tiramisue'], correctAnswer: 1 },
    { id: 2, image: 'cappuccino.jpg', question: 'How do you spell this word?', options: ['Capuccino', 'Cappucino', 'Cappuccino', 'Capucccino'], correctAnswer: 2 },
    { id: 3, image: 'macaron.jpg', question: 'How do you spell this word?', options: ['Macaroon', 'Macarron', 'Macaron', 'Macarone'], correctAnswer: 2 },
    { id: 4, image: 'espresso.jpg', question: 'How do you spell this word?', options: ['Expresso', 'Espresso', 'Espreso', 'Expressso'], correctAnswer: 1 },
    { id: 5, image: 'cannoli.jpg', question: 'How do you spell this word?', options: ['Cannolli', 'Cannoli', 'Cannolee', 'Cannoly'], correctAnswer: 1 },
    { id: 6, image: 'gelato.jpg', question: 'How do you spell this word?', options: ['Gellato', 'Gelatto', 'Gelato', 'Gellatto'], correctAnswer: 2 },
    { id: 7, image: 'panna-cotta.jpg', question: 'How do you spell this word?', options: ['Panna Cotta', 'Panna-Cotta', 'Pannacotta', 'Panna-Cota'], correctAnswer: 1 },
    { id: 8, image: 'affogato.jpg', question: 'How do you spell this word?', options: ['Affogatto', 'Afogato', 'Affogato', 'Affogatto'], correctAnswer: 2 },
    { id: 9, image: 'profiterole.jpg', question: 'How do you spell this word?', options: ['Profiteroll', 'Profiterol', 'Profiterole', 'Profiteroles'], correctAnswer: 2 },
  ],
};

type QuizQuestion = typeof quizData.questions[number];

const TIMER_DURATION = 2000;
const FEEDBACK_DURATION = 1300;
const FADE_DURATION = 300;
const WASPS_PER_QUESTION = 24; // 120 total distance / 5 questions = 24 per question

const getGameContainerBg = (theme: string) => {
  switch (theme) {
    case 'sunrise':
      return 'linear-gradient(135deg, #fffaf6 0%, #fff2e6 100%)';
    case 'morning':
      return 'linear-gradient(135deg, #fafdff 0%, #f2f8ff 100%)';
    case 'noon':
      return 'linear-gradient(135deg, #fcfdff 0%, #f4f8ff 100%)';
    case 'afternoon':
      return 'linear-gradient(135deg, #e6f3ff 0%, #fff2e6 100%)';
    case 'sunset':
      return 'linear-gradient(135deg, #fff5e6 0%, #ffe6e6 100%)';
    case 'night':
      return 'linear-gradient(135deg, #f0e6ff 0%, #e6e6ff 100%)';
    default:
      return 'linear-gradient(135deg, #fffaf6 0%, #fff2e6 100%)';
  }
};

const getTimerBarBg = (theme: string) => {
  switch (theme) {
    case 'sunrise':
      return 'linear-gradient(90deg, #d84315, #e65100)';
    case 'morning':
      return 'linear-gradient(90deg, #1565c0, #0277bd)';
    case 'noon':
      return 'linear-gradient(90deg, #1976d2, #1565c0)';
    case 'afternoon':
      return 'linear-gradient(90deg, #1976d2, #f57c00)';
    case 'sunset':
      return 'linear-gradient(90deg, #d84315, #6a1b9a)';
    case 'night':
      return 'linear-gradient(90deg, #4527a0, #512da8)';
    default:
      return 'linear-gradient(90deg, #d84315, #e65100)';
  }
};

const getWaspContainerBg = (theme: string) => {
  switch (theme) {
    case 'sunrise':
      return 'linear-gradient(90deg, #ffeaa7, #fdcb6e)';
    case 'morning':
      return 'linear-gradient(90deg, #a8edea, #fed6e3)';
    case 'noon':
      return 'linear-gradient(90deg, #d299c2, #fef9d7)';
    case 'afternoon':
      return 'linear-gradient(90deg, #a8edea, #fed6e3)';
    case 'sunset':
      return 'linear-gradient(90deg, #ffeaa7, #fdcb6e)';
    case 'night':
      return 'linear-gradient(90deg, #d299c2, #fef9d7)';
    default:
      return 'linear-gradient(90deg, #ffeaa7, #fdcb6e)';
  }
};

const getTitleColor = (theme: string) => {
  switch (theme) {
    case 'sunrise':
      return 'text-orange-700';
    case 'morning':
      return 'text-blue-700';
    case 'noon':
      return 'text-sky-800';
    case 'afternoon':
      return 'text-orange-700';
    case 'sunset':
      return 'text-orange-800';
    case 'night':
      return 'text-purple-700';
    default:
      return 'text-gray-800';
  }
};

const getPlayButtonBg = (theme: string) => {
  switch (theme) {
    case 'sunrise':
      return 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700';
    case 'morning':
      return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700';
    case 'noon':
      return 'bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700';
    case 'afternoon':
      return 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600';
    case 'sunset':
      return 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700';
    case 'night':
      return 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700';
    default:
      return 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600';
  }
};

const getQuestionCounterBg = (theme: string) => {
  switch (theme) {
    case 'sunrise':
      return 'linear-gradient(135deg, #d84315, #e65100)';
    case 'morning':
      return 'linear-gradient(135deg, #1565c0, #0277bd)';
    case 'noon':
      return 'linear-gradient(135deg, #1976d2, #1565c0)';
    case 'afternoon':
      return 'linear-gradient(135deg, #1976d2, #f57c00)';
    case 'sunset':
      return 'linear-gradient(135deg, #d84315, #6a1b9a)';
    case 'night':
      return 'linear-gradient(135deg, #4527a0, #512da8)';
    default:
      return 'linear-gradient(135deg, #d84315, #e65100)';
  }
};

const getProgressBarBg = (theme: string) => {
  switch (theme) {
    case 'sunrise':
      return '#d84315';
    case 'morning':
      return '#1565c0';
    case 'noon':
      return '#1976d2';
    case 'afternoon':
      return '#1976d2';
    case 'sunset':
      return '#d84315';
    case 'night':
      return '#4527a0';
    default:
      return '#d84315';
  }
};

const getWaspContainerBorder = (theme: string) => {
  switch (theme) {
    case 'sunrise':
      return 'linear-gradient(90deg, #ff6b35, #f7931e, #ff6b35)';
    case 'morning':
      return 'linear-gradient(90deg, #4facfe, #00f2fe, #4facfe)';
    case 'noon':
      return 'linear-gradient(90deg, #87ceeb, #c0dfff, #87ceeb)';
    case 'afternoon':
      return 'linear-gradient(90deg, #87ceeb, #ffa07a, #87ceeb)';
    case 'sunset':
      return 'linear-gradient(90deg, #ff6b35, #8b5cf6, #ff6b35)';
    case 'night':
      return 'linear-gradient(90deg, #667eea, #764ba2, #667eea)';
    default:
      return 'linear-gradient(90deg, #ff6b35, #f7931e, #ff6b35)';
  }
};

interface SpellingWaspGameProps {
  theme: string;
  gameStarted: boolean;
  onGameStart: () => void;
  gameTitle: string;
}

const SpellingWaspGame: React.FC<SpellingWaspGameProps> = ({ theme, gameStarted, onGameStart, gameTitle }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [waspPosition, setWaspPosition] = useState(0); // 0 = far left, 400 = far right
  const [waspSpeed, setWaspSpeed] = useState(1.2); // Fixed speed - 1.2 units per interval
  const [waspVerticalOffset, setWaspVerticalOffset] = useState(0); // For up/down movement
  const [gameEnded, setGameEnded] = useState(false);
  const [gameEndReason, setGameEndReason] = useState<'wasp' | 'completed' | null>(null);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number|null>(null);
  const [timerWidth, setTimerWidth] = useState('100%');
  const [timerTransition, setTimerTransition] = useState<'none' | 'width 2s linear'>('none');
  const [fadeOut, setFadeOut] = useState(false);

  const waspInterval = useRef<ReturnType<typeof setInterval>|null>(null);
  const timerTimeout = useRef<ReturnType<typeof setTimeout>|null>(null);
  const feedbackTimeout = useRef<ReturnType<typeof setTimeout>|null>(null);
  const fadeTimeout = useRef<ReturnType<typeof setTimeout>|null>(null);

  // Wasp movement effect
  useEffect(() => {
    if (!gameStarted || gameEnded) return;
    waspInterval.current = setInterval(() => {
      setWaspPosition(pos => {
        const next = Math.min(520, pos + waspSpeed);
        // Check if wasp reaches the player with a small delay
        // Wasp container width is 520px
        // Player is at right: 20px, wasp is 30px wide
        // So wasp reaches player when left position is: 520 - 30 - 20 = 470px
        // Converting to our 0-520 scale: (470 - 20) / (520 - 20) * 520 = 470
        if (next >= 520) {
          // Add a small delay before ending the game
          setTimeout(() => {
            setGameEndReason('wasp');
            setGameEnded(true);
          }, 1000);
        }
        return next;
      });
    }, 50);
    return () => { if (waspInterval.current) clearInterval(waspInterval.current); };
  }, [waspSpeed, gameEnded, gameStarted]);

  // Wasp dramatic up/down movement effect
  useEffect(() => {
    if (!gameStarted || gameEnded) return;
    const verticalInterval = setInterval(() => {
      setWaspVerticalOffset(offset => {
        // Create dramatic sine wave movement with larger amplitude
        const time = Date.now() * 0.01; // Faster oscillation
        return Math.sin(time) * 15; // 15px up/down movement
      });
    }, 100); // Update every 100ms for smoother animation
    return () => clearInterval(verticalInterval);
  }, [gameStarted, gameEnded]);

  // Timer effect (reset visually every question)
  useEffect(() => {
    if (!gameStarted || gameEnded) return;
    // Clear any previous timeouts
    if (timerTimeout.current) clearTimeout(timerTimeout.current);
    setTimerTransition('none');
    setTimerWidth('100%');
    // After a short delay, start the transition to 0%
    const resetTimeout = setTimeout(() => {
      setTimerTransition('width 2s linear');
      setTimerWidth('0%');
      timerTimeout.current = setTimeout(() => {
        if (!answerSelected) selectAnswer(-1);
      }, TIMER_DURATION);
    }, 30);
    return () => {
      if (timerTimeout.current) clearTimeout(timerTimeout.current);
      clearTimeout(resetTimeout);
    };
    // eslint-disable-next-line
  }, [currentQuestion, gameStarted]);

  function selectAnswer(idx: number) {
    if (!gameStarted || answerSelected || gameEnded) return;
    
    // Clear the timer timeout since user answered
    if (timerTimeout.current) {
      clearTimeout(timerTimeout.current);
      timerTimeout.current = null;
    }
    
    setAnswerSelected(true);
    setSelectedIndex(idx);
    const question = quizData.questions[currentQuestion];
    const isCorrect = idx === question.correctAnswer;
    if (isCorrect) setScore(s => s + 1);
    
    // Wasp movement logic
    setTimeout(() => {
      setWaspPosition(pos => isCorrect ? Math.max(0, pos - 150) : pos + 100);
    }, 200);
    
    // Move to next question with consistent delay regardless of how user answered
    const delay = 800; // Consistent delay for all answers
    feedbackTimeout.current = setTimeout(() => {
      setFadeOut(true);
      fadeTimeout.current = setTimeout(() => {
        setFadeOut(false);
        setCurrentQuestion(q => q + 1);
        setAnswerSelected(false);
        setSelectedIndex(null);
      }, FADE_DURATION);
    }, delay);
  }

  useEffect(() => {
    if (!gameStarted) return;
    if (currentQuestion >= quizData.questions.length) {
      setGameEndReason('completed');
      setGameEnded(true);
    }
    // Clean up timeouts on unmount or question change
    return () => {
      if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current);
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    };
  }, [currentQuestion, gameStarted]);

  function restart() {
    setCurrentQuestion(0);
    setScore(0);
    setWaspPosition(0);
    setWaspSpeed(3);
    setWaspVerticalOffset(0);
    setGameEnded(false);
    setGameEndReason(null);
    setAnswerSelected(false);
    setSelectedIndex(null);
    setFadeOut(false);
  }

  const question = currentQuestion < quizData.questions.length ? quizData.questions[currentQuestion] : null;

  return (
    <div className="game-container" style={{ background: getGameContainerBg(theme) }}>
      {/* Question Counter */}
      {gameStarted && !gameEnded && (
        <div 
          className="question-counter"
          style={{ background: getQuestionCounterBg(theme) }}
        >
          {currentQuestion + 1}
        </div>
      )}
      {!gameStarted ? (
        // Title and Play Button Screen
        <div className="question-container flex items-center justify-center">
          <div className="text-center">
            <h1 className={`text-4xl font-bold mb-8 ${getTitleColor(theme)}`}>{gameTitle}</h1>
            <button
              className={`${getPlayButtonBg(theme)} text-white text-xl font-bold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition`}
              onClick={onGameStart}
            >
              Play
            </button>
          </div>
        </div>
      ) : gameEnded ? (
        // Victory/Defeat Screen
        <div className="question-container flex items-center justify-center">
          <div className="text-center">
            <h2 className={`text-2xl font-bold mb-4 ${getTitleColor(theme)}`}>
              {gameEndReason === 'wasp' ? '🐝 The wasp caught you!' : '🎉 You survived the quiz!'}
            </h2>
            <div className="text-gray-800 mb-6 font-medium">Score: {score}/{quizData.questions.length}</div>
            <button 
              className={`${getPlayButtonBg(theme)} text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200`}
              onClick={restart}
            >
              Play Again
            </button>
          </div>
        </div>
      ) : (
        // Active Game Screen
        <>
          {question && (
            <div className={`question-container${fadeOut ? ' fade-out' : ''}`}>  
              <div className="timer-container">
                <div className="timer-bar" style={{ 
                  width: timerWidth, 
                  transition: timerTransition,
                  background: getTimerBarBg(theme)
                }}></div>
              </div>
              <div className="question-image">Image: {question.image}</div>
              <div className="question-text">{question.question}</div>
              <div className="options-container">
                {question.options.map((option, idx) => {
                  let btnClass = 'option-button';
                  if (answerSelected) {
                    if (selectedIndex === -1) {
                      // Timer ran out - show all options
                      btnClass += idx === question.correctAnswer ? ' correct' : ' incorrect';
                    } else {
                      // User selected an answer - only show feedback for their choice
                      if (idx === selectedIndex) {
                        btnClass += idx === question.correctAnswer ? ' correct' : ' incorrect';
                      }
                    }
                  }
                  return (
                    <button key={idx} className={btnClass} onClick={() => selectAnswer(idx)} disabled={answerSelected}>{option}</button>
                  );
                })}
              </div>
            </div>
          )}
          <div className="wasp-container" style={{ 
            background: getWaspContainerBg(theme),
            borderBottom: `4px solid`,
            borderImage: `${getWaspContainerBorder(theme)} 1`
          }}>
                          <div className="wasp" style={{ 
                left: `calc(20px + ${(waspPosition/520)*(520)}px)`,
                transform: `translateY(${waspVerticalOffset}px)`
              }}>🐝</div>
            <div className="progress-bar" style={{ background: getProgressBarBg(theme) }}></div>
            <div className="human">👤</div>
          </div>
        </>
      )}
    </div>
  );
};

export default SpellingWaspGame; 