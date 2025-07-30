import React from 'react';
import './SpellingWaspGame.css';
import { quizData } from '../data/quizData';
import { Theme } from '../types';
import { getThemeConfig } from '../utils/themeUtils';
import { useGameState } from '../hooks/useGameState';
import { WASP_CONTAINER_WIDTH } from '../constants';

interface SpellingWaspGameProps {
  theme: Theme;
  gameStarted: boolean;
  onGameStart: () => void;
  gameTitle: string;
}

const SpellingWaspGame: React.FC<SpellingWaspGameProps> = ({ theme, gameStarted, onGameStart, gameTitle }) => {
  const { gameState, demoState, selectAnswer, restart } = useGameState(gameStarted);
  const themeConfig = getThemeConfig(theme);

  // Demo data for gameplay preview
  const demoQuestions = [
    { word: '🍕', emoji: '🍕', options: ['Pizza', 'Piza', 'Pizzaa', 'Pizaa'], correct: 0 },
    { word: '🍦', emoji: '🍦', options: ['Ice Cream', 'Icecream', 'Ice Creamm', 'Icee Cream'], correct: 0 },
    { word: '🍔', emoji: '🍔', options: ['Burger', 'Burgr', 'Burgger', 'Burgerr'], correct: 0 },
    { word: '🍰', emoji: '🍰', options: ['Cake', 'Cakke', 'Cakee', 'Caake'], correct: 0 },
  ];

  const question = gameState.currentQuestion < quizData.questions.length ? quizData.questions[gameState.currentQuestion] : null;

  return (
    <div className="game-container" style={{ background: themeConfig.gameContainerBg }}>
      {/* Question Counter */}
      {gameStarted && !gameState.gameEnded && (
        <div 
          className="question-counter"
          style={{ background: themeConfig.questionCounterBg }}
        >
          {gameState.currentQuestion + 1}
        </div>
      )}
      
      {!gameStarted ? (
        // Title and Play Button Screen
        <div className="question-container flex flex-col items-center justify-center">
          <div className="text-center mb-6">
            <h1 className={`text-4xl font-bold mb-6 ${themeConfig.titleColor}`}>{gameTitle}</h1>
            
            {/* Demo Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200/50 p-4 mb-6 mx-auto" style={{ maxWidth: '400px', width: '400px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.1)' }}>
              <h2 className={`text-2xl font-black mb-4 text-center ${themeConfig.titleColor}`}>
                Demo Preview
              </h2>
              
              {/* Demo Gameplay */}
              <div className="space-y-3">
                {/* Score */}
                <div className="flex justify-center items-center text-sm">
                  <div className="font-semibold text-gray-700">
                    Score: {demoState.score}/4
                  </div>
                </div>

                {/* Demo Timer Bar */}
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2 demo-timer-container">
                  <div 
                    className="h-1.5 rounded-full transition-all duration-100 demo-timer-bar"
                    style={{ 
                      width: demoState.timerWidth,
                      background: themeConfig.timerBarBg
                    }}
                  ></div>
                </div>

                {/* Current Question */}
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-3 border border-orange-200">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">
                    How do you spell this word?
                  </h3>
                  <div className="text-4xl font-bold text-center mb-3">
                    {demoQuestions[demoState.question].emoji}
                  </div>
                  
                  {/* Options */}
                  <div className="grid grid-cols-2 gap-2">
                    {demoQuestions[demoState.question].options.map((option, index) => (
                      <button
                        key={index}
                        className={`p-2 rounded-md text-xs font-medium transition-all duration-300 ${
                          index === demoQuestions[demoState.question].correct
                            ? 'bg-green-100 text-green-800 border border-green-300'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Demo Status */}
                <div className="text-center text-xs text-gray-500">
                  <p>pretend the wasp is chasing you</p>
                </div>
              </div>
            </div>
            
            <button
              className={`${themeConfig.playButtonBg} text-white text-xl font-bold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition`}
              onClick={onGameStart}
            >
              Play
            </button>
          </div>
        </div>
      ) : gameState.gameEnded ? (
        // Victory/Defeat Screen
        <div className="question-container flex items-center justify-center">
          <div className="text-center">
            <h2 className={`text-2xl font-bold mb-4 ${themeConfig.titleColor}`}>
              {gameState.gameEndReason === 'wasp' ? '🐝 The wasp caught you!' : '🎉 You survived the quiz!'}
            </h2>
            <div className="text-gray-800 mb-6 font-medium">Score: {gameState.score}/{quizData.questions.length}</div>
            <button 
              className={`${themeConfig.playButtonBg} text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200`}
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
            <div className={`question-container${gameState.fadeOut ? ' fade-out' : ''}`}>  
              <div className="timer-container">
                <div className="timer-bar" style={{ 
                  width: gameState.timerWidth, 
                  transition: gameState.timerTransition,
                  background: themeConfig.timerBarBg
                }}></div>
              </div>
              <div className="question-text">{question.question}</div>
              <div className="options-container">
                {question.options.map((option, idx) => {
                  let btnClass = 'option-button';
                  if (gameState.answerSelected) {
                    if (gameState.selectedIndex === -1) {
                      // Timer ran out - show all options
                      btnClass += idx === question.correctAnswer ? ' correct' : ' incorrect';
                    } else {
                      // User selected an answer - only show feedback for their choice
                      if (idx === gameState.selectedIndex) {
                        btnClass += idx === question.correctAnswer ? ' correct' : ' incorrect';
                      }
                    }
                  }
                  return (
                    <button key={idx} className={btnClass} onClick={() => selectAnswer(idx)} disabled={gameState.answerSelected}>{option}</button>
                  );
                })}
              </div>
            </div>
          )}
          <div className="wasp-container" style={{ 
            background: themeConfig.waspContainerBg,
            borderBottom: `4px solid`,
            borderImage: `${themeConfig.waspContainerBorder} 1`
          }}>
            <div className="wasp" style={{ 
              left: `calc(20px + ${(gameState.waspPosition/WASP_CONTAINER_WIDTH)*(WASP_CONTAINER_WIDTH)}px)`,
              transform: `translateY(${gameState.waspVerticalOffset}px)`
            }}>🐝</div>
            <div className="progress-bar" style={{ background: themeConfig.progressBarBg }}></div>
            <div className="human">👤</div>
          </div>
        </>
      )}
    </div>
  );
};

export default SpellingWaspGame; 