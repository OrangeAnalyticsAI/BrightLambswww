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
RUN npm ci --only=production

# Copy built assets from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/next-env.d.ts ./

# Expose the port the app runs on
EXPOSE 3000

# Set the command to run the app
ENV NODE_ENV=production
ENV PORT=3000

# Use the correct start command based on the output mode
CMD ["npm", "start"]
