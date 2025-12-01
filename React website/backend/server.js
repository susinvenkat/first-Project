/**
 * Express Server for MongoDB Backend
 * Susin Group Authentication API
 */

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { connectDB } = require('./config/mongodb');
const { login } = require('./auth/login_mongodb');
const { logout } = require('./auth/logout_mongodb');
const { checkSession } = require('./auth/check_session_mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'susin-session-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true,
    maxAge: parseInt(process.env.SESSION_EXPIRES_MS) || 86400000 // 24 hours
  }
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'MongoDB backend is running' });
});

// Auth routes
app.post('/api/auth/login', login);
app.post('/api/auth/logout', logout);
app.get('/api/auth/check-session', checkSession);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Connect to MongoDB and start server
async function startServer() {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`\n${'='.repeat(50)}`);
      console.log(`🚀 MongoDB Backend Server Running`);
      console.log(`${'='.repeat(50)}`);
      console.log(`📡 Server: http://localhost:${PORT}`);
      console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth/login`);
      console.log(`💚 Health: http://localhost:${PORT}/api/health`);
      console.log(`${'='.repeat(50)}\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down server...');
  const { closeDB } = require('./config/mongodb');
  await closeDB();
  process.exit(0);
});

startServer();
