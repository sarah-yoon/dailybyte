# DailyByte - Interactive Spelling Game

A modern, fullstack React application featuring an interactive spelling game with AI-powered quiz generation and dynamic theming based on time of day.

## 🎮 Features

### Core Gameplay
- **Spelling Wasp Game**: Interactive spelling quiz where players must answer questions before a wasp catches them
- **Dynamic Difficulty**: Timer-based gameplay with increasing challenge
- **Visual Feedback**: Real-time animations and progress indicators
- **Score Tracking**: Track your performance across quiz sessions

### AI Integration
- **AI-Generated Quizzes**: Uses OpenAI API to generate spelling questions based on themes
- **Dynamic Content**: Create new quiz themes through the "New Day" feature
- **Smart Question Generation**: AI creates realistic spelling challenges with common misspellings

### Visual Design
- **Time-Based Theming**: Automatic theme changes based on time of day (sunrise, morning, noon, afternoon, sunset, night)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Smooth Animations**: Fluid transitions and interactive elements
- **Modern UI**: Clean, intuitive interface with Tailwind CSS

### Interactive Features
- **Swipe Navigation**: Swipe through game cards with touch or mouse
- **Keyboard Controls**: Arrow key navigation support
- **Theme Testing**: Built-in theme testing panel for development
- **Game Data Editor**: Visual editor for modifying quiz questions and themes

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.7 or higher)
- **OpenAI API Key** (for AI quiz generation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dailybyte
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. **Start the development server**
   ```bash
   npm run dev:full
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 How to Play

### Getting Started
1. **Launch the application** and you'll see the main game interface
2. **Swipe through games** using touch gestures or arrow keys
3. **Select "Spelling Wasp"** to start the spelling game
4. **Click "Play"** to begin the quiz

### Gameplay
- **Answer spelling questions** before the timer runs out
- **Watch the wasp** - it moves closer with each wrong answer
- **Correct answers** push the wasp back, giving you more time
- **Complete all questions** to win, or survive until the end

### Customization
- **Edit Game Data**: Click "Edit Game Data" in the testing panel to modify quiz questions
- **Change Today Theme**: Update the "Today:" label through the editor
- **Test Themes**: Use the testing panel to preview different time-based themes

## 🛠️ Development

### Project Structure
```
dailybyte/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── constants/     # Application constants
│   └── data/          # Game data files
├── server.cjs         # Express API server
├── update_spelling_game.py  # AI quiz generation
└── generate_quiz.py   # Alternative quiz generator
```

### Available Scripts
```bash
npm run dev          # Start Vite dev server only
npm run dev:full     # Start full stack (Vite + Express)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Key Technologies
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **AI**: OpenAI API, Python
- **Styling**: Tailwind CSS with custom animations

## 🎨 Features in Detail

### Time-Based Theming
The application automatically changes its visual theme based on the current time:
- **Sunrise** (5-9 AM): Warm orange tones
- **Morning** (9-12 PM): Cool blue tones  
- **Noon** (12-3 PM): Bright sky blue
- **Afternoon** (3-7 PM): Mixed orange and blue
- **Sunset** (7-8 PM): Warm orange and purple
- **Night** (8 PM-5 AM): Deep purple tones

### AI Quiz Generation
- **Theme-based questions**: Generate quizzes based on any theme (animals, food, sports, etc.)
- **Realistic misspellings**: AI creates common spelling mistakes as distractors
- **Difficulty scaling**: Questions range from easy to challenging
- **Dynamic content**: No two quizzes are exactly the same

### Interactive UI
- **Smooth animations**: Fluid transitions between game states
- **Responsive design**: Works on all screen sizes
- **Touch-friendly**: Optimized for mobile and tablet use
- **Keyboard accessible**: Full keyboard navigation support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **OpenAI** for AI-powered quiz generation
- **React** and **Vite** for the modern development experience
- **Tailwind CSS** for the beautiful styling system
- **Express** for the robust backend API
