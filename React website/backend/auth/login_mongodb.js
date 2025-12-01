/**
 * Login Authentication Handler - MongoDB Version
 * Susin Group - Employee Login System
 */

const bcrypt = require('bcryptjs');
const { getCollection } = require('../config/mongodb');

/**
 * Login handler
 */
async function login(req, res) {
  try {
    const { username, password } = req.body;
    
    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }
    
    // Get users collection
    const usersCollection = await getCollection('users');
    
    // Find user by username or email
    const user = await usersCollection.findOne({
      $or: [
        { username: username.trim() },
        { email: username.trim() }
      ]
    });
    
    if (!user) {
      await logLoginAttempt(username.trim(), null, false, 'User not found', req.ip, req.headers['user-agent']);
      return res.status(400).json({
        success: false,
        message: 'Invalid username or password'
      });
    }
    
    // Check if account is locked
    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      const timeLeft = Math.ceil((new Date(user.locked_until) - new Date()) / 60000);
      return res.status(403).json({
        success: false,
        message: `Account is locked. Please try again in ${timeLeft} minutes.`
      });
    }
    
    // Check if account is active
    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been disabled. Please contact administrator.'
      });
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      await logLoginAttempt(username.trim(), user._id, false, 'Invalid password', req.ip, req.headers['user-agent']);
      
      // Increment failed attempts
      await incrementFailedAttempts(user._id);
      
      return res.status(400).json({
        success: false,
        message: 'Invalid username or password'
      });
    }
    
    // Password verified - create session
    req.session.user_id = user._id.toString();
    req.session.username = user.username;
    req.session.email = user.email;
    req.session.full_name = user.full_name;
    req.session.role = user.role;
    req.session.logged_in = true;
    req.session.login_time = Date.now();
    
    // Update last login and reset failed attempts
    await usersCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          last_login: new Date(),
          failed_login_attempts: 0,
          locked_until: null
        }
      }
    );
    
    // Log successful login
    await logLoginAttempt(username.trim(), user._id, true, null, req.ip, req.headers['user-agent']);
    
    // Save session to sessions collection
    await saveSession(user._id, req.sessionID, req.ip, req.headers['user-agent']);
    
    // Return success response
    return res.json({
      success: true,
      message: 'Login successful',
      user: {
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      },
      redirect: getDashboardUrl(user.role)
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during login'
    });
  }
}

/**
 * Log login attempt
 */
async function logLoginAttempt(username, userId, success, failureReason, ipAddress, userAgent) {
  try {
    const loginAttemptsCollection = await getCollection('login_attempts');
    
    await loginAttemptsCollection.insertOne({
      username,
      user_id: userId,
      success,
      failure_reason: failureReason,
      ip_address: ipAddress,
      user_agent: userAgent || 'Unknown',
      attempt_time: new Date()
    });
  } catch (error) {
    console.error('Failed to log login attempt:', error);
  }
}

/**
 * Increment failed login attempts and lock account if needed
 */
async function incrementFailedAttempts(userId) {
  try {
    const usersCollection = await getCollection('users');
    const user = await usersCollection.findOne({ _id: userId });
    
    const failedAttempts = (user.failed_login_attempts || 0) + 1;
    const updateData = {
      failed_login_attempts: failedAttempts
    };
    
    // Lock account after 5 failed attempts for 30 minutes
    if (failedAttempts >= 5) {
      const lockUntil = new Date();
      lockUntil.setMinutes(lockUntil.getMinutes() + 30);
      updateData.locked_until = lockUntil;
    }
    
    await usersCollection.updateOne(
      { _id: userId },
      { $set: updateData }
    );
  } catch (error) {
    console.error('Failed to increment failed attempts:', error);
  }
}

/**
 * Save session to database
 */
async function saveSession(userId, sessionId, ipAddress, userAgent) {
  try {
    const sessionsCollection = await getCollection('user_sessions');
    
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
    
    await sessionsCollection.insertOne({
      user_id: userId,
      session_id: sessionId,
      ip_address: ipAddress,
      user_agent: userAgent || 'Unknown',
      created_at: new Date(),
      expires_at: expiresAt,
      is_active: true
    });
  } catch (error) {
    console.error('Failed to save session:', error);
  }
}

/**
 * Get dashboard URL based on user role
 */
function getDashboardUrl(role) {
  switch (role) {
    case 'admin':
    case 'hr':
      return '/admin-dashboard';
    case 'manager':
      return '/manager-dashboard';
    case 'employee':
      return '/employee-dashboard';
    default:
      return '/dashboard';
  }
}

module.exports = { login };
