import request from "supertest";
import mongoose from "mongoose";
import app from "../../index.js";
import { UserFactory } from "../../factories/index.js";
import User from "../../models/User.js";
import bcrypt from "bcryptjs";

describe("Auth API", () => {
  describe("POST /api/v1/auth/register", () => {
    it("should register a new user", async () => {
      const userData = await UserFactory.create();

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

    });
  });
});
