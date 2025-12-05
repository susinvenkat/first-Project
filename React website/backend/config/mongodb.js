/**
 * MongoDB Database Configuration
 * Replaces MySQL with MongoDB
 */

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// MongoDB connection URI
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/susin_careers';
const dbName = process.env.DB_NAME || 'susin_careers';

// Create MongoDB client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db = null;
let isConnected = false;

/**
 * Connect to MongoDB
 */
async function connectDB() {
  if (isConnected && db) {
    return db;
  }

  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('✓ Successfully connected to MongoDB!');
    
    db = client.db(dbName);
    isConnected = true;
    
    // Create indexes for better performance
    await createIndexes();
    
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

/**
 * Get database instance
 */
async function getDB() {
  if (!db) {
    await connectDB();
  }
  return db;
}

/**
 * Get collection
 */
async function getCollection(collectionName) {
  const database = await getDB();
  return database.collection(collectionName);
}

/**
 * Create indexes for performance
 */
async function createIndexes() {
  try {
    const database = await getDB();
    
    // Users collection indexes
    await database.collection('users').createIndexes([
      { key: { username: 1 }, unique: true },
      { key: { email: 1 }, unique: true },
      { key: { status: 1 } },
      { key: { role: 1 } },
      { key: { created_at: -1 } }
    ]);
    
    // Login attempts collection indexes
    await database.collection('login_attempts').createIndexes([
      { key: { username: 1 } },
      { key: { user_id: 1 } },
      { key: { attempt_time: -1 } },
      { key: { ip_address: 1 } },
      { key: { attempt_time: 1 }, expireAfterSeconds: 2592000 } // 30 days TTL
    ]);
    
    // User sessions collection indexes
    await database.collection('user_sessions').createIndexes([
      { key: { session_id: 1 }, unique: true },
      { key: { user_id: 1 } },
      { key: { is_active: 1 } },
      { key: { expires_at: 1 }, expireAfterSeconds: 0 } // TTL index
    ]);
    
    // Applications collection indexes
    await database.collection('applications').createIndexes([
      { key: { email: 1 } },
      { key: { application_date: -1 } },
      { key: { status: 1 } },
      { key: { role: 1 } }
    ]);
    
    console.log('✓ Database indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
}

/**
 * Close MongoDB connection
 */
async function closeDB() {
  if (client) {
    await client.close();
    isConnected = false;
    db = null;
    console.log('MongoDB connection closed');
  }
}

/**
 * Initialize database with collections
 */
async function initializeDatabase() {
  try {
    const database = await getDB();
    
    // Create collections if they don't exist
    const collections = await database.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    const requiredCollections = [
      'users',
      'login_attempts',
      'user_sessions',
      'applications',
      'activity_log'
    ];
    
    for (const collName of requiredCollections) {
      if (!collectionNames.includes(collName)) {
        await database.createCollection(collName);
        console.log(`✓ Created collection: ${collName}`);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Export functions
module.exports = {
  connectDB,
  getDB,
  getCollection,
  closeDB,
  initializeDatabase,
  client
};
