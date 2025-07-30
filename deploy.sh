#!/bin/bash

# Build the React app
echo "🔨 Building React app..."
npm run build

# Deploy to Google App Engine
echo "🚀 Deploying to Google App Engine..."
gcloud app deploy app.yaml --quiet

echo "✅ Deployment complete!"
echo "🌐 Your app is now live at: https://dailybyte-api-dot-your-project-id.appspot.com" 