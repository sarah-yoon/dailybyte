# Use Node.js 18 as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Install Python and dependencies
RUN apk add --no-cache python3 py3-pip
RUN pip3 install --break-system-packages -r requirements.txt

# Build the React app
RUN npm run build

# Expose port
EXPOSE 8080

# Start the server
CMD ["npm", "start"] 