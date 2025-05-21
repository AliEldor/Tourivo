import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

// Connect to test database before tests
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST || process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    family: 4 // Use IPv4
    });
  });

  // Clear test database collections after each test
afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });

  // Disconnect from test database after all tests
afterAll(async () => {
    await mongoose.connection.close();
  });