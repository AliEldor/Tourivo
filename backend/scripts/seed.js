import mongoose from 'mongoose';
import dotenv from 'dotenv';
import DatabaseSeeder from '../database/seeders/index.js';

dotenv.config();

async function seed() {
    try{
        console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
    
    await DatabaseSeeder.seedAll();
    
    console.log('Seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
      } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
      }
}

seed();
