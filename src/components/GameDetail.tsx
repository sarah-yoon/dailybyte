import React, { useState, useEffect } from 'react';
import { Game, Theme } from '../types';
import { ArrowLeft } from 'lucide-react';
import SpellingWaspGame from './SpellingWaspGame';

interface GameDetailProps {
  game: Game | null;
  onBack: () => void;
  theme: Theme;
}

const GameDetail: React.FC<GameDetailProps> = ({ game, onBack, theme }) => {
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    setGameStarted(false); // Reset when game or detail changes
  }, [game]);

  if (!game) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Spelling Wasp Game */}
      {game.title === 'Spelling Wasp' && (
        <div className="mb-12 w-full flex flex-col items-center justify-center">
          <SpellingWaspGame 
            theme={theme} 
            gameStarted={gameStarted}
            onGameStart={() => setGameStarted(true)}
            gameTitle={game.title}
          />
        </div>
      )}
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 group bg-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
        Back to Games
      </button>
    </div>
  );
};

export default GameDetail;