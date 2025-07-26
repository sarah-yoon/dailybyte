import React, { useState, useRef, useEffect } from 'react';
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
      return 'You\'re up pretty early';
    case 'morning':
      return 'Wakey wakey';
    case 'noon':
      return 'Feeling bored?';
    case 'afternoon':
      return 'Is the day over yet?';
    case 'sunset':
      return 'What a day!';
    case 'night':
      return 'Don\'t stay up too late...';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragOffsetY, setDragOffsetY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating) return;
    
    setIsDragging(true);
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStartY(clientY);
    setDragOffsetY(0);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || isAnimating) return;
    
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const offsetY = clientY - dragStartY;
    setDragOffsetY(offsetY);
  };

  const handleDragEnd = () => {
    if (!isDragging || isAnimating) return;
    
    setIsDragging(false);
    
    // Determine if we should change cards based on drag distance and velocity
    const threshold = 50; // Reduced from 100px to 50px for easier navigation
    const velocity = Math.abs(dragOffsetY) / 10; // simple velocity calculation
    
    if (Math.abs(dragOffsetY) > threshold || velocity > 3) { // Reduced velocity threshold from 5 to 3
      setIsAnimating(true);
      
      if (dragOffsetY > 0) {
        // Swipe down - go to previous card or loop to last
        if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
        } else {
          // Loop to last card
          setCurrentIndex(games.length - 1);
        }
      } else if (dragOffsetY < 0) {
        // Swipe up - go to next card or loop to first
        if (currentIndex < games.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          // Loop to first card
          setCurrentIndex(0);
        }
      }
      
      // Reset drag offset
      setDragOffsetY(0);
      
      // End animation after transition
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    } else {
      // Snap back to current position
      setDragOffsetY(0);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;
      
      if (e.key === 'ArrowDown' && currentIndex < games.length - 1) {
        // Swipe up animation for next card
        setIsAnimating(true);
        setDragOffsetY(-50); // Start with a small offset to trigger animation
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          setDragOffsetY(0);
          setTimeout(() => {
            setIsAnimating(false);
          }, 300);
        }, 50);
      } else if (e.key === 'ArrowDown' && currentIndex === games.length - 1) {
        // Loop back to first game
        setIsAnimating(true);
        setDragOffsetY(-50);
        setTimeout(() => {
          setCurrentIndex(0);
          setDragOffsetY(0);
          setTimeout(() => {
            setIsAnimating(false);
          }, 300);
        }, 50);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        // Swipe down animation for previous card
        setIsAnimating(true);
        setDragOffsetY(50);
        setTimeout(() => {
          setCurrentIndex(prev => prev - 1);
          setDragOffsetY(0);
          setTimeout(() => {
            setIsAnimating(false);
          }, 300);
        }, 50);
      } else if (e.key === 'ArrowUp' && currentIndex === 0) {
        // Loop back to last game
        setIsAnimating(true);
        setDragOffsetY(50);
        setTimeout(() => {
          setCurrentIndex(games.length - 1);
          setDragOffsetY(0);
          setTimeout(() => {
            setIsAnimating(false);
          }, 300);
        }, 50);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isAnimating, games.length]);

  // Prevent default touch behaviors
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => document.removeEventListener('touchmove', preventDefault);
  }, [isDragging]);

  const currentGame = games[currentIndex];
  const nextGame = currentIndex < games.length - 1 ? games[currentIndex + 1] : null;
  const prevGame = currentIndex > 0 ? games[currentIndex - 1] : null;

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

      {/* Swipeable Card Stack */}
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-3xl font-semibold mb-8 text-center ${getSubtitleColor(theme)}`}>
          {getSubtitle(theme)}
        </h2>
        


        {/* Card Container */}
        <div 
          ref={containerRef}
          className="relative h-[36rem] flex items-center justify-center"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >


          {/* Previous Card (behind) */}
          {prevGame && (
            <div 
              className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
              style={{
                transform: `translateY(${dragOffsetY > 0 ? dragOffsetY * 0.3 : 0}px) scale(0.9)`,
                opacity: dragOffsetY > 0 ? 0.3 + (dragOffsetY / 200) : 0.3,
                zIndex: 10
              }}
            >
              <GameCard
                game={prevGame}
                onClick={() => onGameSelect(prevGame)}
                delay={0}
                theme={theme}
                direction={direction}
                scrolling={scrolling}
                scrollVelocity={scrollVelocity}
                isStacked={true}
                isInFocus={false}
              />
            </div>
          )}

          {/* Show last card when at first position and swiping down */}
          {currentIndex === 0 && dragOffsetY > 0 && (
            <div 
              className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
              style={{
                transform: `translateY(${dragOffsetY * 0.3}px) scale(0.9)`,
                opacity: 0.3 + (dragOffsetY / 200),
                zIndex: 10
              }}
            >
              <GameCard
                game={games[games.length - 1]}
                onClick={() => onGameSelect(games[games.length - 1])}
                delay={0}
                theme={theme}
                direction={direction}
                scrolling={scrolling}
                scrollVelocity={scrollVelocity}
                isStacked={true}
                isInFocus={false}
              />
            </div>
          )}

          {/* Current Card (front) */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(${dragOffsetY}px)`,
              zIndex: 20
            }}
          >
            <GameCard
              game={currentGame}
              onClick={() => onGameSelect(currentGame)}
              delay={0}
              theme={theme}
              direction={direction}
              scrolling={scrolling}
              scrollVelocity={scrollVelocity}
              isStacked={false}
              isInFocus={true}
            />
          </div>

          {/* Next Card (behind) */}
          {nextGame && (
            <div 
              className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
              style={{
                transform: `translateY(${dragOffsetY < 0 ? dragOffsetY * 0.3 : 0}px) scale(0.9)`,
                opacity: dragOffsetY < 0 ? 0.3 + (Math.abs(dragOffsetY) / 200) : 0.3,
                zIndex: 10
              }}
            >
              <GameCard
                game={nextGame}
                onClick={() => onGameSelect(nextGame)}
                delay={0}
                theme={theme}
                direction={direction}
                scrolling={scrolling}
                scrollVelocity={scrollVelocity}
                isStacked={true}
                isInFocus={false}
              />
            </div>
          )}

          {/* Show first card when at last position and swiping up */}
          {currentIndex === games.length - 1 && dragOffsetY < 0 && (
            <div 
              className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
              style={{
                transform: `translateY(${dragOffsetY * 0.3}px) scale(0.9)`,
                opacity: 0.3 + (Math.abs(dragOffsetY) / 200),
                zIndex: 10
              }}
            >
              <GameCard
                game={games[0]}
                onClick={() => onGameSelect(games[0])}
                delay={0}
                theme={theme}
                direction={direction}
                scrolling={scrolling}
                scrollVelocity={scrollVelocity}
                isStacked={true}
                isInFocus={false}
              />
            </div>
          )}
        </div>



        {/* Navigation Instructions */}
        <div className="text-center mt-6 text-sm font-bold">
          <p className={`${getTitleColor(theme)}`}>
            Swipe up/down or use arrow keys to navigate (↓ next, ↑ previous)
          </p>
        </div>
      </div>
    </div>
  );
};

export default GamesList;