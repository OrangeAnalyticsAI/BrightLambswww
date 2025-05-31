# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat python3 make g++

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --verbose

# Copy the rest of the application
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Create public directory if it doesn't exist
RUN mkdir -p public

# Build the application with more verbose output
RUN npm run build --debug

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package.json package-lock.json* ./

# Install only production dependencies
RUN npm ci --only=production --prefer-offline

# Create necessary directories
RUN mkdir -p .next public

# Copy built assets from builder
COPY --from=builder /app/.next ./.next
# Only copy public directory if it exists
RUN if [ -d "/app/public" ]; then \
      cp -r /app/public/. ./public/; \
    else \
      echo "No public directory found, continuing..."; \
    fi
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/next-env.d.ts ./

# Expose the port the app runs on
EXPOSE 3000

# Set the command to run the app
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Use the correct start command based on the output mode
CMD ["npm", "start"]
