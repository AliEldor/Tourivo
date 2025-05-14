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

  
});
