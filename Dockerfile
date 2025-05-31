# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Create public directory and copy from trusted-business-advisors if it exists
RUN mkdir -p public && \
    if [ -d "trusted-business-advisors/public" ]; then \
      cp -r trusted-business-advisors/public/. ./public/; \
      echo "Copied files from trusted-business-advisors/public"; \
    else \
      echo "No trusted-business-advisors/public directory found"; \
    fi

# Set environment to production
ENV NODE_ENV=production

# Build the application
RUN npm run build

# List build output for debugging
RUN ls -la .next/
RUN ls -la public/ || echo "No public directory found"

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package.json package-lock.json* ./

# Install only production dependencies
RUN npm ci --only=production

# Create necessary directories
RUN mkdir -p public

# Copy built assets from builder
COPY --from=builder /app/.next ./.next
# Copy public directory if it exists
RUN if [ -d "/app/public" ]; then \
      cp -r /app/public/. ./public/; \
    else \
      echo "No public directory to copy"; \
    fi
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/next-env.d.ts ./

# Expose the port the app runs on
EXPOSE 3000

# Set the command to run the app
ENV NODE_ENV=production
ENV PORT=3000

# Create a simple health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the application
CMD ["npm", "start"]
