import User from "../models/User.js";

export const UserService = {
  createUser: async (userData) => {
    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      return {
        success: true,
        data: savedUser,
      };
    } catch (err) {
      return {
        success: false,
        error: "Failed to create user",
      };
    }
  },
};
