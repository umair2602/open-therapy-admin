# Open Therapy Admin Panel

A simple and elegant admin panel for the Open Therapy mental health platform, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Simple Landing Page** - Information about Open Therapy with admin login access
- **Admin Authentication** - Secure login system with JWT tokens
- **Emotion Management** - Add, edit, and manage emotional categories and sub-emotions
- **Minimal Dashboard** - Clean interface focused on essential admin functions
- **Responsive Design** - Works on all devices

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Copy the environment variables file and configure your settings:

```bash
cp env.example .env.local
```

Then edit `.env.local` with your actual values:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure secret key for JWT tokens
- `DB_NAME` - Your database name (default: opentherapy_db)

### 3. Set Up Database
The application will automatically connect to your MongoDB database. The initial admin user and emotion categories are already set up in your database:

- Admin user: `admin` / `admin123`
- Four main emotion categories with 12 sub-emotions each
- All properly configured for AI therapy prompts

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

### Landing Page (`/`)
- Information about Open Therapy
- Admin login button
- Feature overview

### Admin Login (`/login`)
- Username: `admin`
- Password: `admin123`

### Dashboard (`/dashboard`)
- Overview statistics
- Emotion categories management
- Add new emotions to categories
- Quick action buttons

## Emotion Categories

The system includes four main energy categories:

1. **Tensa e Agitada** (Red) - Stress and anxiety emotions
2. **Animada e Confiante** (Orange) - Positive and confident emotions  
3. **Desanimada e Apática** (Gray) - Sad and apathetic emotions
4. **Calma e Leve** (Blue) - Calm and peaceful emotions

Each category contains 12 emotions with:
- Name (Portuguese)
- Description
- AI Prompt for therapy responses

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens
- **Icons**: Heroicons

## API Endpoints

- `POST /api/auth/login` - Admin authentication
- `GET /api/emotions/categories` - Fetch emotion categories
- `POST /api/emotions/categories/[id]/emotions` - Add emotions to categories

## Project Structure

```
src/
├── app/
│   ├── api/           # API routes
│   ├── dashboard/     # Admin dashboard
│   ├── login/         # Login page
│   └── page.tsx       # Landing page
├── components/        # Reusable components
├── lib/              # Database connection
└── models/           # MongoDB models
```

## Security Notes

- Change the JWT secret in production
- Use environment variables for sensitive data
- Implement proper session management for production use

## Next Steps

This is a minimal implementation. Consider adding:
- User management interface
- AI model configuration
- Analytics and reporting
- Content management
- Advanced security features

## Support

For questions or issues, please refer to the project documentation or contact the development team.
