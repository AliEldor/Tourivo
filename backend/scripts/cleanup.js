import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

import '../models/User.js';  
import '../models/Tour.js';
import '../models/Review.js';
import '../models/Booking.js';

// Set DNS servers
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

async function cleanup() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      family: 4
    });
    console.log('Connected to MongoDB');
    
    const User = mongoose.model('User');
    const Tour = mongoose.model('Tour');
    const Review = mongoose.model('Review');
    const Booking = mongoose.model('Booking');
    
    // Clean up collections
    console.log('Cleaning up database...');
    
    const userResult = await User.deleteMany({});
    console.log(`Deleted ${userResult.deletedCount} users`);
    
    const tourResult = await Tour.deleteMany({});
    console.log(`Deleted ${tourResult.deletedCount} tours`);
    
    const reviewResult = await Review.deleteMany({});
    console.log(`Deleted ${reviewResult.deletedCount} reviews`);
    
    const bookingResult = await Booking.deleteMany({});
    console.log(`Deleted ${bookingResult.deletedCount} bookings`);
    
    console.log('Database cleanup completed successfully!');
  } catch (error) {
    console.error('Error cleaning up database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
}

cleanup();