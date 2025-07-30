//make the users swipe through the games list like 
//if the user finishes it shoudl say
//order based on what the user like
import React, { useState, useEffect } from 'react';
import GamesList from './components/GamesList';
import GameDetail from './components/GameDetail';
import EditGameDataModal from './components/EditGameDataModal';

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
    description: "Try to spell your way out of the wasp's wrath. Hurry or else it will catch up to you, and next thing you know... x__x",
    genre: "Adventure",
    players: "1 Player",
    duration: "2-4 hours",
    difficulty: "Medium"
  },
  {
    id: 2,
    title: "Game #2",
    description: "Fake game",
    genre: "Arcade",
    players: "1 Player",
    duration: "Quick sessions",
    difficulty: "Easy"
  },
  {
    id: 3,
    title: "Game #3",
    description: "Fake game",
    genre: "Puzzle",
    players: "1-2 Players",
    duration: "1-3 hours",
    difficulty: "Hard"
  },
  {
    id: 4,
    title: "Game #4",
    description: "Fake game",
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
  const [lastNewDaySubmission, setLastNewDaySubmission] = useState<string>('');
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [isEditGameDataOpen, setIsEditGameDataOpen] = useState(false);
  const theme = testTheme || getThemeByTime();

  // On mount, load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('todayTheme');
    if (savedTheme) {
      setLastNewDaySubmission(savedTheme);
    }
  }, []);

  // When lastNewDaySubmission changes, save to localStorage
  useEffect(() => {
    if (lastNewDaySubmission) {
      localStorage.setItem('todayTheme', lastNewDaySubmission);
    } else {
      localStorage.removeItem('todayTheme');
    }
  }, [lastNewDaySubmission]);

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setCurrentPage('game');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedGame(null);
  };

  const handleNewDaySubmit = async () => {
    if (!newDayText.trim()) return;
    
    setIsGeneratingQuiz(true);
    setLastNewDaySubmission(newDayText);
    
    try {
      // Call the Python script to generate new quiz data
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: newDayText.trim() }),
      });
      
      if (response.ok) {
        console.log('✅ Quiz generated successfully for theme:', newDayText);
        // The Python script will have updated the quiz data file
        // Vite's hot module replacement should automatically reload the component
      } else {
        console.error('❌ Failed to generate quiz');
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
    } finally {
      setIsGeneratingQuiz(false);
      setNewDayText('');
      setIsNewDayModalOpen(false);
    }
  };

  // Function to capitalize first letter of each word
  const capitalizeWords = (text: string): string => {
    return text.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const handleResetTheme = async () => {
    setIsGeneratingQuiz(true);
    setLastNewDaySubmission('');
    
    try {
      // Call the Python script to reset quiz data back to desserts
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: 'Desserts' }),
      });
      
      if (response.ok) {
        console.log('✅ Quiz reset successfully to desserts');
        // The Python script will have updated the SpellingWaspGame.tsx file
      } else {
        console.error('❌ Failed to reset quiz');
      }
    } catch (error) {
      console.error('Error resetting quiz:', error);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  return (
    <div className={`theme-${theme} min-h-screen relative`}>
      {/* Peekable Testing Panel */}
      <div className={`fixed left-0 top-1/2 transform -translate-y-1/2 z-50 transition-transform duration-300 ease-in-out ${
        isPanelOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Panel */}
        <div className="bg-white/90 backdrop-blur-md rounded-r-lg shadow-xl border border-gray-200/50 p-4 w-64">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Testing Panel</h3>
          <div className="space-y-2">
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
            <button
              onClick={handleResetTheme}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-all bg-gray-400 text-white hover:bg-gray-500 shadow-lg"
            >
              Reset Today Theme
            </button>
            <button
              onClick={() => setIsEditGameDataOpen(true)}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-all bg-purple-500 text-white hover:bg-purple-600 shadow-lg"
            >
              Edit Game Data
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 text-black bg-white"
            />
            <div className="flex gap-3">
              <button
                onClick={handleNewDaySubmit}
                disabled={isGeneratingQuiz || !newDayText.trim()}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors font-medium ${
                  isGeneratingQuiz || !newDayText.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isGeneratingQuiz ? 'Generating Quiz...' : 'Submit'}
              </button>
              <button
                onClick={() => {
                  setNewDayText('');
                  setIsNewDayModalOpen(false);
                }}
                disabled={isGeneratingQuiz}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors font-medium ${
                  isGeneratingQuiz
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Game Data Modal */}
      {isEditGameDataOpen && (
        <EditGameDataModal 
          onClose={() => setIsEditGameDataOpen(false)} 
        />
      )}

      {currentPage === 'home' ? (
        <GamesList 
          games={games} 
          onGameSelect={handleGameSelect} 
          theme={theme} 
          todayTheme={capitalizeWords(lastNewDaySubmission || 'Desserts')}
        />
      ) : (
        <GameDetail game={selectedGame} onBack={handleBackToHome} theme={theme} />
      )}
    </div>
  );
}

export default App;