# DailyByte - Interactive Game Collection

A beautiful, theme-aware game collection with advanced swipeable card interface and AI-powered quiz generation.

## Features

- **Swipeable Game Cards**: Advanced drag-to-dismiss interface with keyboard navigation
- **Dynamic Themes**: Time-based themes (sunrise, morning, noon, afternoon, sunset, night)
- **AI Quiz Generation**: Generate new Spelling Wasp questions using OpenAI GPT-4o
- **Responsive Design**: Beautiful UI with smooth animations and transitions

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.7 or higher)
- OpenAI API key

### Environment Setup

1. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up your API key**:
   - Copy `.env.example` to `.env`
   - Replace `your_openai_api_key_here` with your actual OpenAI API key
   ```bash
   cp .env.example .env
   # Then edit .env with your API key
   ```

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the full development environment** (both React and Express servers):
   ```bash
   npm run dev:full
   ```

3. **Open your browser** to `http://localhost:5173`

## How to Use

### Testing Panel
- Click the handle on the left side of the screen to open the testing panel
- Use theme buttons to test different visual themes
- Use "New Day" to generate new quiz content

### New Day Feature
1. Click "New Day" in the testing panel
2. Enter a theme (e.g., "Fruits", "Animals", "Colors", "Food")
3. Click "Submit"
4. The system will:
   - Call OpenAI GPT-4o to generate new spelling questions
   - Update the Spelling Wasp game with new content
   - Show a loading state during generation

### Game Navigation
- **Swipe up/down** on game cards to navigate
- **Arrow keys** (↑/↓) for keyboard navigation
- **Click** on a card to view game details
- **Loop navigation** at the ends of the list

## File Structure

```
dailybyte/
├── src/
│   ├── components/
│   │   ├── GamesList.tsx      # Swipeable game cards
│   │   ├── GameCard.tsx       # Individual game card
│   │   ├── GameDetail.tsx     # Game detail view
│   │   └── SpellingWaspGame.tsx # Spelling game with quiz data
│   ├── App.tsx                # Main app with New Day modal
│   └── ...
├── server.js                  # Express server for API calls
├── update_spelling_game.py    # Python script for quiz generation
├── generate_quiz.py           # Alternative quiz generator
└── start-dev.js              # Development server launcher
```

## API Integration

The app uses a Node.js Express server to:
1. Receive theme requests from the React frontend
2. Call the Python script with the theme
3. Update the SpellingWaspGame.tsx file with new quiz data
4. Return success/error responses

## Development

### Running Individual Servers
- **React only**: `npm run dev`
- **Express only**: `node server.js`
- **Both**: `npm run dev:full`

### Quiz Generation
- **Automatic**: Use "New Day" feature in the app
- **Manual**: Run `python update_spelling_game.py` and enter a theme
- **Generate TypeScript**: Run `python generate_quiz.py` for copy/paste code

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express
- **AI**: OpenAI GPT-4o API
- **Python**: Scripts for quiz generation
- **Animations**: CSS transitions, transforms, keyframes

## Deployment

### Google Cloud Platform (GCP)

#### Option 1: App Engine
```bash
# Install Google Cloud SDK
# https://cloud.google.com/sdk/docs/install

# Initialize your project
gcloud init

# Deploy to App Engine
./deploy.sh
```

#### Option 2: Cloud Run (Recommended)
```bash
# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com

# Deploy using Cloud Build
gcloud builds submit --config cloudbuild.yaml
```

#### Environment Variables
Set your OpenAI API key in GCP:
```bash
gcloud app deploy app.yaml --set-env-vars OPENAI_API_KEY=your_api_key_here
```

### Local Production Build
```bash
npm run build
npm start
```

## Customization

### Adding New Games
1. Add game data to the `games` array in `App.tsx`
2. Create a new game component in `src/components/`
3. Add game logic and styling

### Modifying Quiz Generation
1. Edit the prompt in `update_spelling_game.py`
2. Adjust the quiz structure in `SpellingWaspGame.tsx`
3. Test with different themes

### Theme Customization
1. Modify theme functions in `SpellingWaspGame.tsx`
2. Update CSS variables in `index.css`
3. Add new theme options to the testing panel

## Security

### API Key Management
- **Never commit API keys**: The `.env` file is in `.gitignore` and won't be uploaded to GitHub
- **Use environment variables**: All API keys are loaded from environment variables
- **Template file**: Use `.env.example` as a template for setting up your own environment

## Troubleshooting

### Common Issues
- **Python not found**: Ensure Python is installed and in PATH
- **API errors**: Check OpenAI API key in `.env` file
- **Missing dependencies**: Run `pip install -r requirements.txt`
- **File not found**: Ensure all files are in the correct locations
- **Port conflicts**: Change ports in `server.js` and `vite.config.ts`

### Debug Mode
- Check browser console for frontend errors
- Check terminal for backend errors
- Use browser dev tools to inspect network requests

## License

This project is for educational and personal use.
