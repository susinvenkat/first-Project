# Project Structure

## Overview
This is a modern React-based web application built with Vite, featuring a Node.js/MongoDB backend for authentication and document management.

## Root Directory Structure

```
React website/
├── src/                    # Frontend source code
├── backend/                # Backend API and services
├── public/                 # Static assets
├── docs/                   # Project documentation
├── scripts/                # Build and utility scripts
├── dist/                   # Production build output
└── node_modules/           # Dependencies
```

## Frontend Structure (`/src`)

```
src/
├── main.jsx               # Application entry point
├── App.jsx                # Root component with routing
├── index.css              # Global styles and animations
├── App.css                # App-specific styles
│
├── assets/                # Static assets (images, icons)
│
├── components/            # Reusable components
│   ├── common/           # Shared components (SEO, ErrorBoundary)
│   ├── layout/           # Layout components (Header, Footer, Navigation)
│   └── ui/               # UI primitives (Button, Card, Badge, etc.)
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Badge.jsx
│       ├── GradientText.jsx
│       ├── Container.jsx
│       ├── Section.jsx
│       ├── Heading.jsx
│       └── LazyImage.jsx
│
├── pages/                 # Page components
│   ├── Home_Advanced.jsx  # Main landing page
│   ├── About_Enhanced.jsx # About page
│   ├── Industries_Enhanced.jsx
│   ├── Products_Enhanced.jsx
│   ├── Careers_Enhanced.jsx
│   ├── Contact.jsx
│   ├── Login.jsx
│   ├── global/           # Global page components
│   └── archive/          # Deprecated pages
│
├── context/              # React Context providers
│   ├── AuthContext.jsx   # Authentication state
│   └── LanguageContext.jsx # Internationalization
│
├── i18n/                 # Internationalization
│   └── translations.js   # Translation strings (7 languages)
│
├── hooks/                # Custom React hooks
│   └── useAccessibility.js
│
├── services/             # API and external services
└── utils/                # Utility functions
```

## Backend Structure (`/backend`)

```
backend/
├── server.js             # Express server entry point
├── package.json          # Backend dependencies
│
├── config/               # Configuration files
│   ├── database.php      # PHP database config (legacy)
│   └── mongodb.js        # MongoDB connection
│
├── auth/                 # Authentication system
│   ├── login_mongodb.js  # MongoDB-based login
│   ├── logout_mongodb.js
│   ├── check_session_mongodb.js
│   ├── login_page.html
│   └── *.php            # Legacy PHP auth (being phased out)
│
├── api/                  # API endpoints
│   ├── submit_application.php
│   ├── upload_document.php
│   ├── download_document.php
│   ├── list_documents.php
│   ├── verify_document.php
│   └── delete_document.php
│
├── admin/                # Admin panel (PHP)
│   ├── index.php
│   ├── dashboard.php
│   └── settings.php
│
├── dashboard/            # User dashboard
│   └── index.php
│
├── database/             # Database schemas and setup
│   ├── database_schema.sql
│   ├── database_schema_auth.sql
│   ├── database_schema_documents.sql
│   └── setup_mongodb.js
│
├── setup/                # Setup scripts
│   ├── setup.php
│   └── setup_admin.php
│
└── docs/                 # Backend documentation
    ├── ADMIN_SETUP_GUIDE.md
    ├── LOGIN_CREDENTIALS.md
    ├── LOGIN_SETUP_GUIDE.md
    ├── MONGODB_SETUP_GUIDE.md
    └── MONGODB_LOCAL_INSTALL.md
```

## Documentation Structure (`/docs`)

```
docs/
├── guides/               # Implementation guides
│   ├── ANIMATION_GUIDE.md
│   ├── SEO_MOBILE_GUIDE.md
│   ├── UI_IMPROVEMENTS_GUIDE.md
│   ├── TROUBLESHOOTING.md
│   └── QUICK_IMPLEMENTATION_GUIDE.md
│
├── archives/             # Historical documentation
│   ├── LOGIN_*.md       # Login system migration docs
│   ├── MIGRATION_COMPLETE.md
│   ├── TODOS_COMPLETED.md
│   ├── IMPLEMENTATION_CHECKLIST.md
│   ├── original-html/   # Original HTML pages
│   └── country-pages/   # Old country-specific pages
│
├── ASSET_INVENTORY.md
├── ASSET_UPDATE_SUMMARY.md
├── FINAL_UI_REPORT.md
├── MODERN_HOME_REDESIGN.md
├── NEW_FEATURES_DOCUMENTATION.md
├── PROJECT_STRUCTURE_UI.md
└── UI_IMPROVEMENTS_SUMMARY.md
```

## Public Assets (`/public`)

```
public/
├── robots.txt           # SEO crawler instructions
├── sitemap.xml          # Site structure for search engines
├── site.webmanifest     # PWA manifest
└── assets/
    ├── img/            # Images and graphics
    └── search/         # Search-related assets
```

## Scripts (`/scripts`)

```
scripts/
├── start-dev.bat       # Development server launcher
└── fix-issues.bat      # Issue resolution script
```

## Configuration Files (Root)

- `package.json` - Frontend dependencies and scripts
- `vite.config.js` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint rules
- `.env` - Environment variables
- `.env.development` - Development environment variables
- `.gitignore` - Git ignore rules
- `index.html` - HTML entry point

## Key Technologies

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom animations
- **Routing**: React Router v6
- **State Management**: Context API (Auth, Language)
- **i18n**: Custom translation system (7 languages)
- **Components**: Custom design system with glassmorphism

### Backend
- **Runtime**: Node.js with Express
- **Database**: MongoDB (migrated from MySQL)
- **Legacy**: PHP endpoints (being phased out)
- **Authentication**: JWT-based with sessions

### Build & Dev Tools
- **Build**: Vite
- **Linting**: ESLint
- **CSS Processing**: PostCSS with Tailwind
- **Package Manager**: npm

## Development Workflow

1. **Start Development Server**: `npm run dev` (Frontend on port 5173+)
2. **Start Backend Server**: `cd backend && npm start` (Backend on port 3000)
3. **Build for Production**: `npm run build`
4. **Preview Production**: `npm run preview`

## Port Configuration

- Frontend Dev: `5173` (or next available: 5174, 5175...)
- Backend API: `3000`
- Vite proxy configured to route `/api` to `http://localhost:3000`

## Important Notes

- The project is transitioning from PHP/MySQL to Node.js/MongoDB
- Legacy PHP files are maintained for backward compatibility
- All new pages use the enhanced React component system
- Translation system supports: English, Hindi, Arabic, Korean, Chinese, Russian, German
- Design system includes: Card, Badge, Button, GradientText, LazyImage components
