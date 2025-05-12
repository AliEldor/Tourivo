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
        }
    }
}