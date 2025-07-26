//make the users swipe through the games list like 
//if the user finishes it shoudl say
//order based on what the user like
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
    title: "Spelling Wasp",
    description: "Challenge your mind in a retro-inspired word game where quick thinking and sharp spelling are your only defense against a swarm of stinging surprises",
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

function getThemeByTime() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 9) {
    return 'sunrise';
  } else if (hour >= 9 && hour < 12) {
    return 'morning';
  } else if (hour >= 12 && hour < 15) {
    return 'noon';
  } else if (hour >= 15 && hour < 19) {
    return 'afternoon';
  } else if (hour >= 19 && hour < 20) {
    return 'sunset';
  } else {
    return 'night';
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'game'>('home');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [testTheme, setTestTheme] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isNewDayModalOpen, setIsNewDayModalOpen] = useState(false);
  const [newDayText, setNewDayText] = useState('');
  const theme = testTheme || getThemeByTime();

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setCurrentPage('game');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedGame(null);
  };

  return (
    <div className={`theme-${theme} min-h-screen relative`}>
      {/* Peekable Testing Panel */}
      <div className={`fixed left-0 top-1/2 transform -translate-y-1/2 z-50 transition-transform duration-300 ease-in-out ${
        isPanelOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Panel */}
        <div className="bg-white/90 backdrop-blur-md rounded-r-lg shadow-xl border border-gray-200/50 p-4 min-w-[200px]">
          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">
            Testing Panel
          </h3>
          
          {/* Theme Buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setTestTheme(testTheme === 'sunrise' ? null : 'sunrise')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                testTheme === 'sunrise' 
                  ? 'bg-orange-500 text-white shadow-lg' 
                  : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-gray-200'
              }`}
            >
              Sunrise
            </button>
            <button
              onClick={() => setTestTheme(testTheme === 'morning' ? null : 'morning')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                testTheme === 'morning' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-gray-200'
              }`}
            >
              Morning
            </button>
            <button
              onClick={() => setTestTheme(testTheme === 'noon' ? null : 'noon')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                testTheme === 'noon' 
                  ? 'bg-sky-500 text-white shadow-lg' 
                  : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-gray-200'
              }`}
            >
              Noon
            </button>
            <button
              onClick={() => setTestTheme(testTheme === 'afternoon' ? null : 'afternoon')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                testTheme === 'afternoon' 
                  ? 'bg-yellow-500 text-white shadow-lg' 
                  : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-gray-200'
              }`}
            >
              Afternoon
            </button>
            <button
              onClick={() => setTestTheme(testTheme === 'sunset' ? null : 'sunset')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                testTheme === 'sunset' 
                  ? 'bg-orange-600 text-white shadow-lg' 
                  : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-gray-200'
              }`}
            >
              Sunset
            </button>
            <button
              onClick={() => setTestTheme(testTheme === 'night' ? null : 'night')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                testTheme === 'night' 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-gray-200'
              }`}
            >
              Night
            </button>
            <button
              onClick={() => setIsNewDayModalOpen(true)}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-all bg-green-500 text-white hover:bg-green-600 shadow-lg"
            >
              New Day
            </button>
          </div>
        </div>
        
        {/* Handle - positioned outside the panel */}
        <div 
          className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-md rounded-r-lg shadow-lg border border-gray-200/50 p-2 cursor-pointer hover:bg-white/95 transition-colors"
          onClick={() => setIsPanelOpen(!isPanelOpen)}
        >
          <div className="w-1 h-8 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      {/* New Day Modal */}
      {isNewDayModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-96 max-w-[90vw]">
            <h3 className="text-xl font-bold text-gray-800 mb-4">New Day</h3>
            <input
              type="text"
              value={newDayText}
              onChange={(e) => setNewDayText(e.target.value)}
              placeholder="Enter new day text..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  // Handle submit logic here
                  console.log('New day submitted:', newDayText);
                  setNewDayText('');
                  setIsNewDayModalOpen(false);
                }}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setNewDayText('');
                  setIsNewDayModalOpen(false);
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'home' ? (
        <GamesList games={games} onGameSelect={handleGameSelect} theme={theme} />
      ) : (
        <GameDetail game={selectedGame} onBack={handleBackToHome} theme={theme} />
      )}
    </div>
  );
}

export default App;