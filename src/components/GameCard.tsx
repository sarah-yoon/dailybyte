import React, { useState } from 'react';
import { Game } from '../App';
import { Play, Users, Clock, Star } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onClick: () => void;
  delay: number;
  theme: string;
  direction: 'up' | 'down' | null;
  scrolling: boolean;
  scrollVelocity: number;
}

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
      return 'text-gray-700';
  }
};

const getTitleHoverColor = (theme: string) => {
  switch (theme) {
    case 'sunrise':
      return 'hover:text-orange-500';
    case 'morning':
      return 'hover:text-blue-500';
    case 'noon':
      return 'hover:text-sky-600';
    case 'afternoon':
      return 'hover:text-sky-700';
    case 'sunset':
      return 'hover:text-orange-600';
    case 'night':
      return 'hover:text-purple-200';
    default:
      return 'hover:text-gray-800';
  }
};

const getMainCardBg = (theme: string) => {
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
      return 'linear-gradient(135deg, #b8aee8 0%, #d1c4f6 100%)'; // lighter, soft purple
    default:
      return 'linear-gradient(135deg, #fffaf6 0%, #fff2e6 100%)';
  }
};

const getMainCardBorder = (theme: string) => {
  switch (theme) {
    case 'sunrise':
      return '#ffc285'; // medium orange
    case 'morning':
      return '#6fb0e6'; // medium blue
    case 'noon':
      return '#53a6e6'; // medium sky blue
    case 'afternoon':
      return '#ffa07a'; // medium orange
    case 'sunset':
      return '#ff8c42'; // medium orange-red
    case 'night':
      return '#9d7fdc'; // medium purple
    default:
      return '#ffc285';
  }
};

const getButtonBg = (theme: string) => {
  switch (theme) {
    case 'sunrise':
      return 'bg-orange-600 hover:bg-orange-700';
    case 'morning':
      return 'bg-blue-700 hover:bg-blue-800';
    case 'noon':
      return 'bg-sky-700 hover:bg-sky-800';
    case 'afternoon':
      return 'bg-orange-600 hover:bg-orange-700';
    case 'sunset':
      return 'bg-orange-700 hover:bg-orange-800';
    case 'night':
      return 'bg-indigo-900 hover:bg-indigo-950'; // more blue-toned purple
    default:
      return 'bg-orange-600 hover:bg-orange-700';
  }
};

const GameCard: React.FC<GameCardProps> = ({ game, onClick, delay, theme, direction, scrolling, scrollVelocity }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const offsetY = scrolling
    ? direction === 'down'
      ? 40
      : -40
    : 0;

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
      className="relative cursor-pointer flex items-center transition-transform duration-1000 ease-out"
      onClick={handleCardClick}
      style={{ 
        animationDelay: `${delay}ms`,
        transform: `translateY(${offsetY}px)`
      }}
    >
      {/* Main Card */}
      <div className="rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-6 w-80 h-80 z-20 relative flex items-center justify-center"
        style={{ 
          background: getMainCardBg(theme),
          border: `2px solid ${getMainCardBorder(theme)}`,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.1)'
        }}>
        <div className="text-center">
          <h3 className={`text-2xl font-bold transition-colors ${getTitleColor(theme)} ${getTitleHoverColor(theme)}`}>
            {game.title}
          </h3>
        </div>
      </div>

      {/* Detail Card that slides in from right */}
      <div 
        className={`absolute top-0 left-0 h-80 w-80 bg-gradient-to-br rounded-2xl shadow-2xl p-8 transform transition-all duration-500 ${
          isExpanded ? 'translate-x-80 opacity-100' : 'translate-x-0 opacity-100'
        } z-10`}
        style={{ 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
          border: `2px solid ${getMainCardBorder(theme)}`,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            <h4 className={`text-xl font-bold mb-3 ${theme === 'night' ? 'text-white' : 'text-gray-800'}`}>{game.title}</h4>
            <p className={`text-sm mb-4 leading-relaxed ${theme === 'night' ? 'text-gray-200' : 'text-gray-700'}`}>{game.description}</p>
            
          </div>
          
          <button 
            className={`w-full text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center ${getButtonBg(theme)}`}
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