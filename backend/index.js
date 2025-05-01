import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dns from 'dns'; 

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
app.use(cors());
app.use(cookieParser());

app.listen(port, () => { 
    connect();
    console.log("server listening on port", port);
});