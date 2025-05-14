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

      const tour = await Tour.findById(response.body.data._id);
      expect(tour).not.toBeNull();
      expect(tour.title).toBe(tourData.title);
    });

    it('should not allow regular users to create a tour', async () => {
        const tourData = await TourFactory.create();
  
        const response = await request(app)
          .post('/api/v1/tours')
          .set('Authorization', `Bearer ${regularToken}`)
          .set('Cookie', [`accessToken=${regularToken}`])
          .send(tourData);
  
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.error).toBe("You're not authorized");
      });
    });

    describe('GET /api/v1/tours', () => {
        beforeEach(async () => {

          // Create test tours
          await Tour.deleteMany({});
          const tourPromises = [];
          for (let i = 0; i < 5; i++) {
            const tourData = await TourFactory.create();
            const tour = new Tour(tourData);
            tourPromises.push(tour.save());
          }
          await Promise.all(tourPromises);
        });

        it('should get all tours with pagination', async () => {
            const response = await request(app)
              .get('/api/v1/tours')
              .query({ page: 0 });
      
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('count');
            expect(Array.isArray(response.body.data.data)).toBe(true);
            expect(response.body.data.count).toBeGreaterThan(0);
          });

          it('should get tours by search criteria', async () => {
            
            const specificTour = await TourFactory.create({
              city: 'SearchTestCity',
              price: 100,
              maxGroupSize: 5
            });
            const tour = new Tour(specificTour);
      await tour.save();

      const response = await request(app)
        .get('/api/v1/tours/search/getTourBySearch')
        .query({
          city: 'SearchTestCity',
          price: 50,  
          maxGroupSize: 2  
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);

      const foundTour = response.body.data.find(t => t.city === 'SearchTestCity');
      expect(foundTour).toBeDefined();
      expect(foundTour.price).toBe(100);
      expect(foundTour.maxGroupSize).toBe(5);
    });

    it('should get featured tours', async () => {
        
        await Tour.deleteMany({});
        for (let i = 0; i < 3; i++) {
          const tourData = await TourFactory.create({ featured: true });
          const tour = new Tour(tourData);
          await tour.save();
        }
  
        const response = await request(app)
          .get('/api/v1/tours/search/getFeaturedTours');
  
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
        
        response.body.data.forEach(tour => {
          expect(tour.featured).toBe(true);
        });
      });
    });

    describe('GET /api/v1/tours/:id', () => {
        let testTour;
    
        beforeEach(async () => {
          const tourData = await TourFactory.create();
          testTour = new Tour(tourData);
          await testTour.save();
        });

        it('should get a single tour by ID', async () => {
            const response = await request(app)
              .get(`/api/v1/tours/${testTour._id}`);
      
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data._id.toString()).toBe(testTour._id.toString());
            expect(response.body.data.title).toBe(testTour.title);
          });

          it('should return 404 for non-existent tour ID', async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            
            const response = await request(app)
              .get(`/api/v1/tours/${nonExistentId}`);
      
            expect(response.status).toBe(500); 
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Tour not found');
          });
        });

        describe('PUT /api/v1/tours/:id', () => {
            let testTour;
        
            beforeEach(async () => {
              // Create a test tour
              const tourData = await TourFactory.create();
              testTour = new Tour(tourData);
              await testTour.save();
            });

            it('should update a tour when admin is authenticated', async () => {
                const updatedData = {
                  title: 'Updated Tour Title',
                  price: 999
                };

                const response = await request(app)
        .put(`/api/v1/tours/${testTour._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .set('Cookie', [`accessToken=${adminToken}`])
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updatedData.title);
      expect(response.body.data.price).toBe(updatedData.price);

      const updatedTour = await Tour.findById(testTour._id);
      expect(updatedTour.title).toBe(updatedData.title);
      expect(updatedTour.price).toBe(updatedData.price);
    });

    it('should not allow regular users to update a tour', async () => {
      const updatedData = {
        title: 'Updated Tour Title',
        price: 999
      };

      const response = await request(app)
      .put(`/api/v1/tours/${testTour._id}`)
      .set('Authorization', `Bearer ${regularToken}`)
      .set('Cookie', [`accessToken=${regularToken}`])
      .send(updatedData);

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("You're not authorized");
  });
});

describe('DELETE /api/v1/tours/:id', () => {
    let testTour;

    beforeEach(async () => {
      const tourData = await TourFactory.create();
      testTour = new Tour(tourData);
      await testTour.save();
    });

    it('should delete a tour when admin is authenticated', async () => {
      const response = await request(app)
        .delete(`/api/v1/tours/${testTour._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .set('Cookie', [`accessToken=${adminToken}`]);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Successfully deleted');

    });
});