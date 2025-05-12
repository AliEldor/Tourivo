import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const AuthService = {
    register: async (userData) => {
        try{
            // Check if user with same email already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        return {
          success: false,
          error: "Email already exists"
        };
      }

      // Hashing password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(userData.password, salt);

      // Create new user with hashed password
      const newUser = new User({
        username: userData.username,
        email: userData.email,
        password: hash,
        photo: userData.photo
      });

      await newUser.save();

      return {
        success: true,
        message: "User successfully registered"
      };
        } catch (err) {
            return {
              success: false,
              error: "Failed to create user"
            };
          }
    }

    
}