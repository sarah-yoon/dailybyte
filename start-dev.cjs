const { spawn } = require('child_process');

console.log('🚀 Starting development servers...\n');

// Start Express server
const expressServer = spawn('node', ['server.cjs'], {
  stdio: 'inherit',
  shell: true
});

console.log('📡 Express server starting on port 3001...');

// Wait a moment for Express to start, then start Vite
setTimeout(() => {
  const viteServer = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true
  });

  console.log('⚡ Vite dev server starting...');

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down servers...');
    expressServer.kill();
    viteServer.kill();
    process.exit();
  });

  process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down servers...');
    expressServer.kill();
    viteServer.kill();
    process.exit();
  });

}, 2000); 