import React from 'react';
import { Game } from '../App';
import GameCard from './GameCard';
import { useScrollDirection } from '../hooks/useScrollDirection';

interface GamesListProps {
  games: Game[];
  onGameSelect: (game: Game) => void;
  theme: string;
}

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

const getSubtitle = (theme: string) => {
  switch (theme) {
    case 'sunrise':
      return 'Start your day with these games!';
    case 'morning':
      return 'Bright picks for your morning!';
    case 'noon':
      return 'Midday gaming awaits!';
    case 'afternoon':
      return 'Afternoon adventures await!';
    case 'sunset':
      return 'Evening entertainment awaits!';
    case 'night':
      return 'Unwind with these night games!';
    default:
      return 'Featured Games';
  }
};

const getSubtitleColor = (theme: string) => {
  switch (theme) {
    case 'sunrise':
      return 'text-orange-400';
    case 'morning':
      return 'text-blue-400';
    case 'noon':
      return 'text-sky-600';
    case 'afternoon':
      return 'text-sky-500';
    case 'sunset':
      return 'text-yellow-200';
    case 'night':
      return 'text-purple-300';
    default:
      return 'text-rose-400';
  }
};

const GamesList: React.FC<GamesListProps> = ({ games, onGameSelect, theme }) => {
  const { direction, scrolling, scrollVelocity } = useScrollDirection();
  
  // Calculate smooth spacing based on scroll velocity
  const getSpacingValue = () => {
    if (!scrolling || scrollVelocity === 0) return 32; // Normal spacing when not scrolling
    
    // Map scroll velocity to spacing with more granular control
    // Clamp velocity between 0 and 3 pixels per millisecond for more range
    const clampedVelocity = Math.min(scrollVelocity, 3);
    const normalizedVelocity = clampedVelocity / 3; // 0 to 1 with more precision
    
    // Interpolate spacing from 32px (normal) to 8px (minimum bunched)
    // Use more intermediate steps for smoother transitions
    const spacing = 32 - (normalizedVelocity * 24); // 24 = 32 - 8
    
    return Math.max(8, spacing); // Ensure spacing doesn't go below 8px
  };

  const spacingValue = getSpacingValue();

  return (
    <div className="container mx-auto px-6 py-12 relative">
      {/* Theme Label */}
      <div className="absolute top-16 right-8 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 px-12 py-8 transform rotate-3 relative">
          {/* Tape effect */}
          <div className="absolute -top-4 -left-4 w-20 h-10 bg-gray-300/80 rounded-sm transform -rotate-12"></div>
          <div className="absolute -top-4 -right-4 w-20 h-10 bg-gray-300/80 rounded-sm transform rotate-12"></div>
          
          <div className="text-2xl font-medium text-gray-700">
            <span className="font-semibold">Today:</span> Desserts
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-16">
        <h1 className={`text-6xl font-bold mb-4 tracking-tight ${getTitleColor(theme)}`}>
          daily<span className={getTitleColor(theme)}>byte</span>
        </h1>
      </div>

      {/* Games Grid */}
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-3xl font-semibold mb-8 text-center ${getSubtitleColor(theme)}`}>
          {getSubtitle(theme)}
        </h2>
        <div 
          className="flex flex-col items-center transition-all duration-3000 ease-in-out"
          style={{ 
            gap: `${spacingValue}px`
          }}
        >
          {games.map((game, index) => (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => onGameSelect(game)}
              delay={index * 100}
              theme={theme}
              direction={direction}
              scrolling={scrolling}
              scrollVelocity={scrollVelocity}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesList;