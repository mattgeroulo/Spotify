FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Set NODE_ENV for production
ENV NODE_ENV=production

# Use a non-root user for better security
RUN addgroup -S app && adduser -S app -G app && chown -R app:app /usr/src/app
USER app

# The server listens on 3001 (configurable via PORT env var)
EXPOSE 3001

# Start the app
CMD ["npm", "start"]
