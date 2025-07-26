import React, { useState, useEffect } from 'react';
import { Game } from '../App';
import { ArrowLeft } from 'lucide-react';
import SpellingWaspGame from './SpellingWaspGame';

const getTitleColor = (theme: string) => {
  switch (theme) {
    case 'sunrise':
      return 'text-orange-500';
    case 'morning':
      return 'text-blue-500';
    case 'noon':
      return 'text-sky-700';
    case 'afternoon':
      return 'text-sky-600';
    case 'sunset':
      return 'text-orange-800';
    case 'night':
      return 'text-purple-200';
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

interface GameDetailProps {
  game: Game | null;
  onBack: () => void;
  theme: string;
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