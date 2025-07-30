import React, { useState } from 'react';
import { Game, Theme } from '../types';
import { Play } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onClick: () => void;
  delay: number;
  theme: Theme;
  direction: 'up' | 'down' | null;
  scrolling: boolean;
  scrollVelocity: number;
  isStacked?: boolean;
  isInFocus?: boolean;
}

const getTitleColor = (theme: Theme) => {
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

const getTitleHoverColor = (theme: Theme) => {
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

const getMainCardBorder = (theme: Theme) => {
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

const getButtonBg = (theme: Theme) => {
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

const GameCard: React.FC<GameCardProps> = ({ game, onClick, delay, theme, direction, scrolling, isStacked = false, isInFocus = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const offsetY = scrolling
    ? direction === 'down'
      ? 40
      : -40
    : 0;

  const handleCardClick = () => {
    if (isStacked) return; // Prevent interaction with stacked cards
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`relative cursor-pointer flex items-center transition-transform duration-1000 ease-out ${
        isStacked ? 'pointer-events-none' : ''
      }`}
      onClick={handleCardClick}
      style={{ 
        animationDelay: `${delay}ms`,
        transform: `translateY(${offsetY}px)`
      }}
    >
      {/* Main Card */}
      <div 
        className={`rounded-[2.5rem] shadow-2xl hover:shadow-3xl transition-all duration-500 p-6 w-72 h-[34rem] z-20 relative flex flex-col items-center justify-start ${
          isStacked ? 'opacity-60' : ''
        }`}
        style={{ 
          background: 'linear-gradient(to bottom, #fffaf4, #fef3e6)',
          border: `2px solid ${getMainCardBorder(theme)}`,
          backdropFilter: 'blur(10px)',
          boxShadow: isStacked 
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 10px 20px -5px rgba(0, 0, 0, 0.3)'
        }}>
        {/* Title at the top */}
        <div className="text-center mb-6 mt-10">
          <h3 className={`text-2xl font-bold transition-colors ${getTitleColor(theme)} ${getTitleHoverColor(theme)}`}>
            {game.title}
          </h3>
        </div>
        
        {/* Game-specific content */}
        {game.title === "Spelling Wasp" && (
          <div className="flex-1 flex items-center justify-center w-full h-full rounded-2xl overflow-hidden card-screen" style={{ paddingTop: '-3rem' }}>
            <img 
              src="/Assets/Art/spellingwasp.png" 
              alt="Spelling Wasp" 
              className={`max-w-full max-h-full object-contain rounded-lg transition-all duration-700 hover:scale-110 hover:rotate-2 transform-gpu ${
                isInFocus ? 'animate-float' : ''
              }`}
              style={{
                filter: 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.15)) drop-shadow(0 3px 8px rgba(0, 0, 0, 0.1))',
                transform: `translateY(${scrolling ? (direction === 'down' ? 5 : -5) : 0}px)`,
                marginTop: '-3rem'
              }}
            />
          </div>
        )}
      </div>

      {/* Detail Card that slides in from right - only for non-stacked cards */}
      {!isStacked && (
        <div 
          className={`absolute top-0 left-0 h-[34rem] w-72 bg-gradient-to-br rounded-[2.5rem] shadow-2xl p-8 transform transition-all duration-500 ${
            isExpanded ? 'translate-x-72 opacity-100' : 'translate-x-0 opacity-100'
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
      )}
    </div>
  );
};

export default GameCard;