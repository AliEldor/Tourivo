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
    
    
  });

  
});
