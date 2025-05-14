import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import { UserFactory, TourFactory, ReviewFactory } from '../../factories/index.js';
import Review from '../../models/Review.js';
import Tour from '../../models/Tour.js';
import User from '../../models/User.js';
import jwt from 'jsonwebtoken';

describe('Review API', () => {
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

  describe('POST /api/v1/reviews/:tourId', () => {
    it('should create a new review when user is authenticated', async () => {
      const reviewData = {
        username: regularUser.username,
        reviewText: 'This was an amazing tour!',
        rating: 5
      };

      const response = await request(app)
        .post(`/api/v1/reviews/${testTour._id}`)
        .set('Authorization', `Bearer ${regularToken}`)
        .set('Cookie', [`accessToken=${regularToken}`])
        .send(reviewData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.message).toBe('Review submitted');
      expect(response.body.data.data).toHaveProperty('_id');
      expect(response.body.data.data.reviewText).toBe(reviewData.reviewText);
      expect(response.body.data.data.rating).toBe(reviewData.rating);
      expect(response.body.data.data.userId.toString()).toBe(regularUser._id.toString());
      expect(response.body.data.data.productId.toString()).toBe(testTour._id.toString());

      const review = await Review.findById(response.body.data.data._id);
      expect(review).not.toBeNull();
      expect(review.reviewText).toBe(reviewData.reviewText);

      const updatedTour = await Tour.findById(testTour._id);
      expect(updatedTour.reviews).toContainEqual(new mongoose.Types.ObjectId(review._id));
    });

    it('should not create a review when user is not authenticated', async () => {
      const reviewData = {
        username: regularUser.username,
        reviewText: 'Great tour!',
        rating: 4
      };

      const response = await request(app)
        .post(`/api/v1/reviews/${testTour._id}`)
        .send(reviewData);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("You're not authorized");
    });

    it('should validate required review fields', async () => {
      const reviewData = {};

      const response = await request(app)
        .post(`/api/v1/reviews/${testTour._id}`)
        .set('Authorization', `Bearer ${regularToken}`)
        .set('Cookie', [`accessToken=${regularToken}`])
        .send(reviewData);

      expect(response.status).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body.result).toBeInstanceOf(Array);
      expect(response.body.result.length).toBeGreaterThan(0);
    });

    it('should return 404 for non-existent tour ID', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const reviewData = {
        username: regularUser.username,
        reviewText: 'Great tour!',
        rating: 4
      };

      const response = await request(app)
        .post(`/api/v1/reviews/${nonExistentId}`)
        .set('Authorization', `Bearer ${regularToken}`)
        .set('Cookie', [`accessToken=${regularToken}`])
        .send(reviewData);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Tour not found');
    });
  });

  describe('GET /api/v1/reviews/tour/:tourId', () => {
    beforeEach(async () => {
      await Review.deleteMany({ productId: testTour._id });
      await Tour.findByIdAndUpdate(testTour._id, { reviews: [] });

      for (let i = 0; i < 3; i++) {
        const reviewData = await ReviewFactory.create(
          testTour._id,
          i % 2 === 0 ? regularUser._id : secondUser._id
        );
        const review = new Review(reviewData);
        await review.save();

        await Tour.findByIdAndUpdate(testTour._id, {
          $push: { reviews: review._id }
        });
      }
    });

    it('should get all reviews for a specific tour', async () => {
      const response = await request(app)
        .get(`/api/v1/reviews/tour/${testTour._id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(3);

      response.body.data.forEach(review => {
        expect(review.productId.toString()).toBe(testTour._id.toString());
      });
    });

    it('should return 404 for non-existent tour ID', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .get(`/api/v1/reviews/tour/${nonExistentId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Tour not found');
    });
  });

  describe('GET /api/v1/reviews/user', () => {
    beforeEach(async () => {
      await Review.deleteMany({ userId: regularUser._id });

      const tourData = await TourFactory.create();
      const secondTour = new Tour(tourData);
      await secondTour.save();

      for (let i = 0; i < 2; i++) {
        const tourId = i === 0 ? testTour._id : secondTour._id;
        const reviewData = await ReviewFactory.create(tourId, regularUser._id);
        const review = new Review(reviewData);
        await review.save();

        await Tour.findByIdAndUpdate(tourId, {
          $push: { reviews: review._id }
        });
      }
    });

    it('should get all reviews by the authenticated user', async () => {
      const response = await request(app)
        .get('/api/v1/reviews/user')
        .set('Authorization', `Bearer ${regularToken}`)
        .set('Cookie', [`accessToken=${regularToken}`]);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(2);

      response.body.data.forEach(review => {
        expect(review.userId.toString()).toBe(regularUser._id.toString());
      });
    });

    it('should not allow access without authentication', async () => {
      const response = await request(app)
        .get('/api/v1/reviews/user');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("You're not authorized");
    });
  });

  
});
