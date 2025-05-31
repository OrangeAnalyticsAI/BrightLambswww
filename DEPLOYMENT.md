# Deployment Guide for Business Analysis Academy

This guide explains how to deploy the Business Analysis Academy application using Docker and Render.

## Prerequisites

1. A GitHub account
2. A Render account (sign up at [render.com](https://render.com/))
3. Docker installed locally (for testing)
4. Node.js and npm/yarn installed

## Local Development with Docker

1. Build the Docker image:
   ```bash
   docker build -t business-analysis-academy .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 business-analysis-academy
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Render

### 1. Push to GitHub

Make sure your code is pushed to a GitHub repository.

### 2. Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" and select "Web Service"
3. Connect your GitHub repository
4. Select your repository
5. Configure your service:
   - Name: `business-analysis-academy`
   - Region: Choose the one closest to your users
   - Branch: `main` (or your preferred branch)
   - Runtime: `Docker`
   - Build Command: Leave empty (handled by Dockerfile)
   - Start Command: Leave empty (handled by Dockerfile)
6. Click "Advanced" and add your environment variables:
   - `NODE_ENV=production`
   - `NEXT_PUBLIC_SUPABASE_URL` (your Supabase URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (your Supabase anon key)
   - Any other environment variables your app needs
7. Click "Create Web Service"

### 3. Automatic Deploys

Render will automatically deploy your application. Future pushes to the connected branch will trigger automatic deployments.

## Environment Variables

Create a `.env.local` file for local development with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
# Add other environment variables as needed
```

## Troubleshooting

- If the build fails, check the logs in the Render dashboard
- Ensure all environment variables are set correctly
- Check that your Dockerfile builds successfully locally before deploying
