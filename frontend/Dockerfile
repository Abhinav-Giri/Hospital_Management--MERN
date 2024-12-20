# Backend/Dockerfile
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your backend runs on (e.g., 3001)
EXPOSE 3002

# Start the application
CMD ["npm", "start"]
