# Deployment Guide for Business Analysis Academy

This guide explains how to deploy the Business Analysis Academy application using Docker and Render, with support for multiple environments (development and production).

## Prerequisites

1. A GitHub account
2. A Render account (sign up at [render.com](https://render.com/))
3. Docker installed locally (for testing)
4. Node.js and npm installed
5. Git for version control

## Environment Setup

The project is configured with two main environments:

1. **Development (`dev` branch)**
   - Deployed as `BAA-Dev` service on Render
   - Uses development Supabase instance
   - Auto-deploys on push to `dev` branch

2. **Production (`main` branch)**
   - Deployed as `BAA` service on Render
   - Uses production Supabase instance
   - Auto-deploys on push to `main` branch

## Local Development with Docker

1. Build the Docker image:
   ```bash
   docker build -t baa-app .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env.development baa-app
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Render

The project uses Render's Blueprint feature with `render.yaml` for infrastructure as code. The configuration handles both development and production environments.

### 1. First-time Setup

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New" and select "Blueprint"
4. Connect your GitHub repository
5. Select the repository and click "Connect"
6. The services defined in `render.yaml` will be detected automatically
7. Click "Apply" to create the services

### 2. Environment Variables

Environment variables are managed through the `render.yaml` file. The following variables are required:

#### Development (BAA-Dev):
- `NODE_ENV=development`
- `PORT=3000`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### Production (BAA):
- `NODE_ENV=production`
- `PORT=3000`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Deployment Process

#### Development Deployment:
1. Push changes to the `dev` branch
2. Render will automatically detect changes and deploy to `BAA-Dev`
3. Monitor the deployment in the Render dashboard

#### Production Deployment:
1. Merge changes from `dev` to `main` branch
2. Push the `main` branch
3. Render will automatically deploy to `BAA` production service

## Local Development Setup

### Environment Files

1. `.env.development` - For local development (not committed to git)
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-dev-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-dev-anon-key
   NODE_ENV=development
   ```

2. `.env.production` - For production builds (not committed to git)
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-prod-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-prod-anon-key
   NODE_ENV=production
   ```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check the logs in the Render dashboard
   - Ensure all environment variables are set correctly
   - Verify the Docker build works locally

2. **Environment Variables**
   - Ensure all required variables are set in Render dashboard
   - Check for typos in variable names
   - Restart the service after changing environment variables

3. **Docker Issues**
   - Run `docker system prune` to clean up unused containers and images
   - Ensure Docker has enough memory allocated (at least 4GB recommended)

4. **Deployment Not Triggering**
   - Check GitHub webhook settings in Render
   - Verify the correct branch is set for auto-deployment
   - Check GitHub Actions logs if using GitHub Actions for CI/CD

## Rollback Process

1. Go to the service in Render dashboard
2. Click on "Deploys"
3. Find the previous working deployment
4. Click "Redeploy" to rollback

## Monitoring

- Check the logs in the Render dashboard for each service
- Set up health checks in the service settings
- Monitor resource usage and scale up if needed
