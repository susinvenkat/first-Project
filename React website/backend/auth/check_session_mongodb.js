/**
 * Check Session Handler - MongoDB Version
 */

const { ObjectId } = require('mongodb');
const { getCollection } = require('../config/mongodb');

/**
 * Check session handler
 */
async function checkSession(req, res) {
  try {
    if (!req.session.logged_in || !req.session.user_id) {
      return res.json({
        logged_in: false,
        user: null
      });
    }
    
    // Verify user still exists and is active
    const usersCollection = await getCollection('users');
    const user = await usersCollection.findOne({
      _id: new ObjectId(req.session.user_id),
      status: 'active'
    });
    
    if (!user) {
      req.session.destroy();
      return res.json({
        logged_in: false,
        user: null
      });
    }
    
    return res.json({
      logged_in: true,
      user: {
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Session check error:', error);
    return res.status(500).json({
      logged_in: false,
      user: null
    });
  }
}

module.exports = { checkSession };
