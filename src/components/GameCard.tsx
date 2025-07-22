import React, { useState } from 'react';
import { Game } from '../App';
import { Play, Users, Clock, Star } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onClick: () => void;
  delay: number;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick, delay }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div 
      className="relative cursor-pointer flex items-center"
      onClick={handleCardClick}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Main Card */}
      <div className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-orange-200 w-80 h-80 z-20 relative flex items-center justify-center" style={{ 
        background: 'linear-gradient(135deg, #E0BBE4 0%, #D4A5D8 50%, #C8A2C8 100%)'
      }}>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 hover:text-orange-600 transition-colors">
            {game.title}
          </h3>
        </div>
      </div>

      {/* Detail Card that slides in from right */}
      <div 
        className={`absolute top-0 left-0 h-80 w-80 bg-gradient-to-br rounded-2xl shadow-xl border border-orange-200 p-8 transform transition-all duration-500 ${
          isExpanded ? 'translate-x-80 opacity-100' : 'translate-x-0 opacity-100'
        } z-10`}
        style={{ 
          background: 'linear-gradient(135deg, #FFE5D9 0%, #FFF8DC 50%, #FFB3BA 100%)'
        }}
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">{game.title}</h4>
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">{game.description}</p>
            
          </div>
          
          <button 
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <Play className="w-5 h-5 mr-2" />
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;