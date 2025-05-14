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

    
});