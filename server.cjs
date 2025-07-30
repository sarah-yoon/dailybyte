const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
//app.use('/api', express.Router());

// API endpoint to generate quiz data
app.post('/api/generate-quiz', async (req, res) => {
  const { theme } = req.body;
  
  if (!theme) {
    return res.status(400).json({ error: 'Theme is required' });
  }

  console.log(`Received theme request: ${theme}`);

  try {
    // Call the Python script with the theme
    const pythonProcess = spawn('python', ['update_spelling_game.py'], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    // Send the theme to the Python script
    pythonProcess.stdin.write(theme);
    pythonProcess.stdin.end();

    let output = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        console.log('Python script output:', output);
        res.json({ 
          success: true, 
          message: `Quiz generated successfully for theme: ${theme}`,
          output: output 
        });
      } else {
        console.error('Python script error:', errorOutput);
        res.status(500).json({ 
          error: 'Failed to generate quiz',
          details: errorOutput 
        });
      }
    });

  } catch (error) {
    console.error('Error calling Python script:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to save quiz data
app.post('/api/save-quiz-data', async (req, res) => {
  const { quizData } = req.body;
  
  if (!quizData) {
    return res.status(400).json({ error: 'Quiz data is required' });
  }

  console.log('Received quiz data save request');

  try {
    // Write the quiz data to the file
    fs.writeFileSync('src/data/quizData.ts', quizData, 'utf8');
    
    console.log('Quiz data saved successfully');
    res.json({ 
      success: true, 
      message: 'Quiz data saved successfully'
    });
  } catch (error) {
    console.error('Error saving quiz data:', error);
    res.status(500).json({ 
      error: 'Failed to save quiz data',
      details: error.message 
    });
  }
});

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Express server is running' });
});

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Express server running on http://0.0.0.0:${PORT}`);
  console.log('📡 API endpoint: POST /api/generate-quiz');
}); 