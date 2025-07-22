import React, { useState } from 'react';
import GamesList from './components/GamesList';
import GameDetail from './components/GameDetail';

export interface Game {
  id: number;
  title: string;
  description: string;
  genre: string;
  players: string;
  duration: string;
  difficulty: string;
}

const games: Game[] = [
  {
    id: 1,
    title: "Pixel Quest",
    description: "Embark on a retro-style adventure through mystical lands filled with challenging puzzles and hidden treasures.",
    genre: "Adventure",
    players: "1 Player",
    duration: "2-4 hours",
    difficulty: "Medium"
  },
  {
    id: 2,
    title: "Neon Runner",
    description: "Race through futuristic cityscapes in this high-speed endless runner with stunning neon visuals.",
    genre: "Arcade",
    players: "1 Player",
    duration: "Quick sessions",
    difficulty: "Easy"
  },
  {
    id: 3,
    title: "Mind Maze",
    description: "Test your intellect with increasingly complex puzzles that will challenge your problem-solving skills.",
    genre: "Puzzle",
    players: "1-2 Players",
    duration: "1-3 hours",
    difficulty: "Hard"
  },
  {
    id: 4,
    title: "Garden Builder",
    description: "Create and nurture your dream garden in this relaxing simulation game with beautiful seasonal changes.",
    genre: "Simulation",
    players: "1 Player",
    duration: "Open-ended",
    difficulty: "Easy"
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'game'>('home');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setCurrentPage('game');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50">
      {currentPage === 'home' ? (
        <GamesList games={games} onGameSelect={handleGameSelect} />
      ) : (
        <GameDetail game={selectedGame} onBack={handleBackToHome} />
      )}
    </div>
  );
}

export default App;