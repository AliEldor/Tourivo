import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dns from 'dns'; 


// import routes
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import bookingRoute from './routes/bookings.js';
import reviewRoute from './routes/reviews.js';
import generatedTripRoute from './routes/generatedTrips.js';


//  DNS setting for connection issue
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// Database connection
const connect = async () => {
    try {
        
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 15000, 
            family: 4 // ipv4
        });

        console.log('MongoDB database connected');
    } 
    catch (err) {
        console.log('MongoDB database connection failed');
        console.log('Error details:', err.message);
    }
};

// For testing 
app.get('/', (req, res) => {
    res.send("api is working");
});

// Middleware
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
  }));
app.use(cookieParser());

//routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/booking', bookingRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use('/api/v1/generated-trips', generatedTripRoute);

app.listen(port, () => { 
    connect();
    console.log("server listening on port", port);
});