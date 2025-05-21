import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import DatabaseSeeder from '../database/seeders/index.js';

// Set DNS servers (same as in your index.js)
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config({ path: '.env.test' });

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      serverSelectionTimeoutMS: 15000,
      family: 4 // Use IPv4
    });
    console.log('Connected to MongoDB');
    
    await DatabaseSeeder.seedAll();
    
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    try {
      await mongoose.connection.close();
      console.log('Database connection closed');
    } catch (err) {
      console.error('Error closing database connection:', err);
    }
    // Force exit to prevent hanging
    process.exit(0);
  }
}

seed();