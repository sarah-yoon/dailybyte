import React from 'react';
import { Game } from '../App';
import GameCard from './GameCard';

interface GamesListProps {
  games: Game[];
  onGameSelect: (game: Game) => void;
}

const GamesList: React.FC<GamesListProps> = ({ games, onGameSelect }) => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold text-gray-800 mb-4 tracking-tight">
          daily<span className="text-purple-500">byte</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover new games every day. Quick bites of entertainment for every mood.
        </p>
      </div>

      {/* Games Grid */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Featured Games
        </h2>
        <div className="space-y-8 flex flex-col items-center">
          {games.map((game, index) => (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => onGameSelect(game)}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesList;