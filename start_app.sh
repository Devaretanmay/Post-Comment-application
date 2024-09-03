#!/bin/bash

# Function to check if a command exists
command_exists () {
    type "$1" &> /dev/null ;
}

# Check if npm is installed
if ! command_exists npm ; then
    echo "npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Install global dependencies
echo "Installing global dependencies..."
sudo npm install -g nodemon concurrently react-scripts

# Install main project dependencies
echo "Installing main project dependencies..."
npm install

# Install dependencies for all services
echo "Installing dependencies for all services..."
npm run postinstall

# Set correct permissions
echo "Setting correct permissions..."
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) ~/.config

# Ensure all node_modules folders have correct permissions
find . -name "node_modules" -type d -prune -exec sudo chown -R $(whoami) {} +

# Make sure all the start scripts are executable
chmod +x posts/index.js comments/index.js theme-service/index.js

# Start all services concurrently
echo "Starting all services..."
npm start