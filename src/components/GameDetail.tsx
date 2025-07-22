import React from 'react';
import { Game } from '../App';
import { ArrowLeft, Play, Users, Clock, Star } from 'lucide-react';

interface GameDetailProps {
  game: Game | null;
  onBack: () => void;
}

const GameDetail: React.FC<GameDetailProps> = ({ game, onBack }) => {
  if (!game) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Game Title */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold text-gray-800">{game.title}</h1>
      </div>
      
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