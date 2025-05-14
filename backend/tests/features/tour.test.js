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
    
    });
});