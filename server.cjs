const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware to parse JSON
app.use(express.json());

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

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Express server is running' });
});

app.listen(PORT, () => {
  console.log(`✅ Express server running on http://localhost:${PORT}`);
  console.log('📡 API endpoint: POST /api/generate-quiz');
}); 