> **Deprecation Notice**
> The `trusted-business-advisors` directory is deprecated and will be removed soon. Please do not make any changes to this directory as it will be deleted in an upcoming update.

# Business Analysis Academy

A modern web application for the Business Analysis Academy, built with Next.js, React, and Supabase. The aim of the application is to host courses and resources as well as information on Tools for business analysis professionals. Users will be able to view the what courses and resources are available, but to be able to view and download them then they will have to register and login. The exception is publically available resources, like YouTube videos or links to other websites, which they can follow without registering.

User registration will involve them completing a questionnaire to help us understand their background and interests. This will help us to better understand their needs and provide them with the most relevant content. As well as gain insights into their ability to be a good BA. 

The application will have training routes to follow, depending on the BA's level of experience. 
- Foundation
- Practitioner
- Professional
- Master
Each of these will require an exam to be passed to progress to the next level.

The application will have lots of fun references to sheep in it. 

## Features

- Modern, responsive UI built with Tailwind CSS
- Server-side rendering with Next.js
- Authentication and data management with Supabase
- State management with React Query
- Type-safe development with TypeScript

## Tech Stack

- Next.js 14
- React 18
- Supabase
- Tailwind CSS
- TypeScript
- React Query
- Headless UI

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/OrangeAnalyticsAI/BAA.git
   cd BAA
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Update the values in `.env.local` with your Supabase credentials.

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Branch Structure

- `main` - Production branch (stable releases)
- `master` - Legacy main branch (deprecated, use `main`)
- `dev` - Development branch (integration branch for features)

### Development Workflow

1. Create a feature branch from `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Add your feature"
   ```

3. Push to the remote repository:
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. Create a pull request from your feature branch to `dev`.

## Deployment

### Development Environment

1. Push changes to the `dev` branch to trigger automatic deployment to the development environment.

### Production Deployment

1. Merge the `dev` branch into `main`:
   ```bash
   git checkout main
   git merge dev
   git push origin main
   ```
2. The main branch is automatically deployed to production via Render.

### Manual Deployment with Docker

1. Build the Docker image:
   ```bash
   docker build -t business-analysis-academy .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 business-analysis-academy
   ```

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run analyze` - Analyze bundle size

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
