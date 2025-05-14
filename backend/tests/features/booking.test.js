import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import { UserFactory, TourFactory, BookingFactory } from '../../factories/index.js';
import Booking from '../../models/Booking.js';
import Tour from '../../models/Tour.js';
import User from '../../models/User.js';
import jwt from 'jsonwebtoken';

describe('Booking API', () => {
    let adminToken;
    let regularToken;
    let secondUserToken;
    let adminUser;
    let regularUser;
    let secondUser;
    let testTour;
  
    beforeAll(async () => {
      const adminData = await UserFactory.create({ role: 'admin' });
      adminUser = new User(adminData);
      await adminUser.save();
      
      const userData = await UserFactory.create({ role: 'user' });
      regularUser = new User(userData);
      await regularUser.save();
  
      const secondUserData = await UserFactory.create({ role: 'user' });
      secondUser = new User(secondUserData);
      await secondUser.save();
  
      const tourData = await TourFactory.create();
      testTour = new Tour(tourData);
      await testTour.save();
  
      adminToken = jwt.sign(
        { id: adminUser._id, role: adminUser.role },
        process.env.JWT_SECRET_KEY || 'test_secret_key',
        { expiresIn: '15d' }
      );
      
      regularToken = jwt.sign(
        { id: regularUser._id, role: regularUser.role },
        process.env.JWT_SECRET_KEY || 'test_secret_key',
        { expiresIn: '15d' }
      );
  
      secondUserToken = jwt.sign(
        { id: secondUser._id, role: secondUser.role },
        process.env.JWT_SECRET_KEY || 'test_secret_key',
        { expiresIn: '15d' }
      );
    });
  
    describe('POST /api/v1/booking', () => {
      it('should create a new booking when user is authenticated', async () => {
        const bookingData = await BookingFactory.create(
          regularUser._id.toString(),
          testTour.title
        );
  
        const response = await request(app)
          .post('/api/v1/booking')
          .set('Authorization', `Bearer ${regularToken}`)
          .set('Cookie', [`accessToken=${regularToken}`])
          .send(bookingData);
  
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('message', 'Your tour is booked');
        expect(response.body.data).toHaveProperty('data');
        expect(response.body.data.data).toHaveProperty('_id');
        expect(response.body.data.data.tourName).toBe(bookingData.tourName);
        expect(response.body.data.data.fullName).toBe(bookingData.fullName);
        
        const booking = await Booking.findById(response.body.data.data._id);
        expect(booking).not.toBeNull();
        expect(booking.tourName).toBe(bookingData.tourName);
        expect(booking.userId).toBe(regularUser._id.toString());
      });
  
      it('should not create a booking when user is not authenticated', async () => {
        const bookingData = await BookingFactory.create(
          regularUser._id.toString(),
          testTour.title
        );
  
        const response = await request(app)
          .post('/api/v1/booking')
          .send(bookingData);
  
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.error).toBe("You're not authorized");
      });
  
      
    });
  
    
});
