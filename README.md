> **Deprecation Notice**
> The `trusted-business-advisors` directory is deprecated and will be removed soon. Please do not make any changes to this directory as it will be deleted in an upcoming update.

# Business Analysis Academy

A modern web application for the Business Analysis Academy, built with Next.js, React, and Supabase. The aim of the application is to host courses and resources as well as information on Tools for business analysis professionals. Users will be able to view the what courses and resources are available, but to be able to view and download them then they will have to register and login. The exception is publically available resources, like YouTube videos or links to other websites, which they can follow without registering.

User registration will involve them completing a questionnaire to help us understand their background and interests. This will help us to better understand their needs and provide them with the most relevant content. As well as gain insights into their ability to be a good BA. 

## Features

- 🎨 Modern, responsive UI built with Tailwind CSS
- ⚡ Server-side rendering with Next.js
- ✉️ Contact form with server-side validation
- 🌓 Light/dark theme support
- 🚀 Optimized for performance and accessibility
- 🔒 Secure form handling with rate limiting
- 📱 Fully responsive design

## Tech Stack

- Next.js 14
- React 18
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

3. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Update the environment variables in `.env.local` with your configuration:
   - SMTP settings for the contact form
   - Any other required API keys

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


## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```bash
# Supabase Configuration (if using Supabase)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# SMTP Configuration for Email
SMTP_HOST=your_smtp_host_here
SMTP_PORT=587
SMTP_USER=your_smtp_username_here
SMTP_PASS=your_smtp_password_here
SMTP_FROM=your_email@example.com
SMTP_FROM_NAME="Your Name"

# Environment
NODE_ENV=development

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=5

# Contact Form
CONTACT_EMAIL=your_contact_email@example.com

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Development

- Run the development server:
  ```bash
  npm run dev
  ```

- Lint your code:
  ```bash
  npm run lint
  ```

- Format your code:
  ```bash
  npm run format
  ```

## Deployment

This project can be deployed to any platform that supports Next.js applications. Recommended platforms:

- [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)

Make sure to set up all required environment variables in your deployment platform's settings.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact us at [your-email@example.com](mailto:your-email@example.com).
