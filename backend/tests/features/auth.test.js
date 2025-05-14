import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import { UserFactory } from "../../factories/index.js";
import User from "../../models/User.js";
import bcrypt from "bcryptjs";

describe("Auth API", () => {
  describe("POST /api/v1/auth/register", () => {
    it("should register a new user", async () => {
      const userData = await UserFactory.create();

      await User.deleteMany({ email: userData.email });

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          username: userData.username,
          email: userData.email,
          password: 'password123',
          photo: userData.photo
        });

        expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      // Verify user was created in the database
      const user = await User.findOne({ email: userData.email });
      expect(user).not.toBeNull();
      expect(user.username).toBe(userData.username);
    });

    it('should not register a user with an existing email', async () => {
        const userData = await UserFactory.create();
        const user = new User(userData);
        await user.save();

        const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          username: 'newusername',
          email: userData.email, // Same email
          password: 'password123'
    });

    expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Email already exists');

    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login a user with correct credentials', async () => {
      // Create a user with a known password
      const plainPassword = 'testpassword123';
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(plainPassword, salt);
      
      const userData = await UserFactory.create({
        password: hashedPassword
      });
      
      const user = new User(userData);
      await user.save();

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: userData.email,
          password: plainPassword
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('role');
      expect(response.body.data.role).toBe(userData.role);


      expect(response.headers['set-cookie']).toBeDefined();
      expect(response.headers['set-cookie'][0]).toContain('accessToken');
    });

    it('should not login with incorrect password', async () => {
      const userData = await UserFactory.create();
      const user = new User(userData);
      await user.save();

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: userData.email,
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Incorrect email or password');
    });

    it('should not login with non-existent email', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('User not found');
    });
  });
});


