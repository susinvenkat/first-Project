/**
 * Logout Handler - MongoDB Version
 */

const { getCollection } = require('../config/mongodb');

/**
 * Logout handler
 */
async function logout(req, res) {
  try {
    const sessionId = req.sessionID;
    
    // Deactivate session in database
    if (sessionId) {
      const sessionsCollection = await getCollection('user_sessions');
      await sessionsCollection.updateOne(
        { session_id: sessionId },
        { 
          $set: { 
            is_active: false,
            logout_time: new Date()
          } 
        }
      );
    }
    
    // Destroy session
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destruction error:', err);
        return res.status(500).json({
          success: false,
          message: 'Error logging out'
        });
      }
      
      res.clearCookie('connect.sid');
      return res.json({
        success: true,
        message: 'Logged out successfully'
      });
    });
    
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during logout'
    });
  }
}

module.exports = { logout };
