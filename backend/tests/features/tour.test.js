import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import { UserFactory, TourFactory } from '../../factories/index.js';
import Tour from '../../models/Tour.js';
import User from '../../models/User.js';
import jwt from 'jsonwebtoken';

describe('Tour API', () => {
    let adminToken;
    let regularToken;
    let adminUser;
    let regularUser;

    beforeAll(async () => {
        // Create admin user
    const adminData = await UserFactory.create({ role: 'admin' });
    adminUser = new User(adminData);
    await adminUser.save();
    
    // Create regular user
    const userData = await UserFactory.create({ role: 'user' });
    regularUser = new User(userData);
    await regularUser.save();

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
    });

    describe('POST /api/v1/tours', () => {
        it('should create a new tour when admin is authenticated', async () => {
          const tourData = await TourFactory.create();
    
          const response = await request(app)
            .post('/api/v1/tours')
            .set('Authorization', `Bearer ${adminToken}`)
            .set('Cookie', [`accessToken=${adminToken}`])
            .send(tourData);
    
          expect(response.status).toBe(200);
          expect(response.body.success).toBe(true);
          expect(response.body.data).toHaveProperty('_id');
          expect(response.body.data.title).toBe(tourData.title);
          expect(response.body.data.city).toBe(tourData.city);
          expect(response.body.data.price).toBe(tourData.price);

    });
});