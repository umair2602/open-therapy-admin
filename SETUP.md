# Open Therapy Admin Panel - Setup Guide

## Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
```bash
cp env.example .env.local
```

Edit `.env.local` with your values:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
DB_NAME=opentherapy_db
```

### 3. Start Development Server
```bash
npm run dev
```

## Access Information

- **App URL**: http://localhost:3000
- **Admin Login**: http://localhost:3000/login
- **Username**: `admin`
- **Password**: `admin123`

## Database Status

✅ Admin user created  
✅ Emotion categories configured  
✅ 48 emotions with AI prompts  
✅ Database: `opentherapy_db`

## Features Ready

- Landing page with Open Therapy info
- Admin authentication system
- Emotion categories management
- Add/edit emotions functionality
- AI prompt management for therapy responses

Your admin panel is ready to use! 🚀
