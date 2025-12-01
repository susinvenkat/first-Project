/**
 * MongoDB Database Setup & Initialization Script
 * Run this file ONCE to set up the MongoDB database
 * Usage: node setup_mongodb.js
 */

const bcrypt = require('bcryptjs');
const { connectDB, getCollection, initializeDatabase, closeDB } = require('./config/mongodb');

const output = [];
const errors = [];

async function setupDatabase() {
  try {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 MongoDB Database Setup - Susin Group');
    console.log('='.repeat(60) + '\n');
    
    // Connect to MongoDB
    await connectDB();
    output.push('✓ Database connection successful');
    
    // Initialize collections
    await initializeDatabase();
    output.push('✓ Collections created/verified');
    
    // Create default users
    const usersCollection = await getCollection('users');
    
    // Check if admin user exists
    const adminExists = await usersCollection.findOne({ username: 'admin' });
    
    if (!adminExists) {
      // Create default admin user
      const adminPassword = await bcrypt.hash('Admin@2025', 10);
      
      await usersCollection.insertOne({
        username: 'admin',
        password: adminPassword,
        email: 'admin@susingroup.com',
        full_name: 'System Administrator',
        role: 'admin',
        status: 'active',
        employee_id: null,
        department: null,
        phone: null,
        created_at: new Date(),
        last_login: null,
        password_changed_at: null,
        failed_login_attempts: 0,
        locked_until: null
      });
      
      output.push('✓ Default admin user created');
      output.push('  Username: admin');
      output.push('  Password: Admin@2025');
      output.push('  Email: admin@susingroup.com');
    } else {
      output.push('⚠ Admin user already exists - skipped creation');
    }
    
    // Check if HR user exists
    const hrExists = await usersCollection.findOne({ username: 'hr_manager' });
    
    if (!hrExists) {
      // Create HR manager user
      const hrPassword = await bcrypt.hash('HR@2025', 10);
      
      await usersCollection.insertOne({
        username: 'hr_manager',
        password: hrPassword,
        email: 'hr@susingroup.com',
        full_name: 'HR Manager',
        role: 'hr',
        status: 'active',
        department: 'Human Resources',
        employee_id: null,
        phone: null,
        created_at: new Date(),
        last_login: null,
        password_changed_at: null,
        failed_login_attempts: 0,
        locked_until: null
      });
      
      output.push('✓ HR manager user created');
      output.push('  Username: hr_manager');
      output.push('  Password: HR@2025');
      output.push('  Email: hr@susingroup.com');
    } else {
      output.push('⚠ HR manager already exists - skipped creation');
    }
    
    output.push('');
    output.push('='.repeat(60));
    output.push('Setup completed successfully!');
    output.push('='.repeat(60));
    output.push('');
    output.push('You can now start the server:');
    output.push('→ npm start');
    output.push('');
    output.push('IMPORTANT: Change default passwords after first login!');
    
  } catch (error) {
    errors.push(`✗ Error: ${error.message}`);
  } finally {
    // Display output
    console.log('\n');
    output.forEach(line => console.log(line));
    errors.forEach(line => console.error(line));
    console.log('\n');
    
    await closeDB();
  }
}

setupDatabase();
