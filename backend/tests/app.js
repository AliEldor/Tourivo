import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dns from 'dns';

import tourRoute from '../routes/tours.js';
import userRoute from '../routes/users.js';
import authRoute from '../routes/auth.js';
import bookingRoute from '../routes/bookings.js';
import reviewRoute from '../routes/reviews.js';

// DNS setting for connection issue
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config({ path: '.env.test' });
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/booking', bookingRoute);
app.use('/api/v1/reviews', reviewRoute);

// For testing
app.get('/', (req, res) => {
  res.send('api is working');
});

export default app;