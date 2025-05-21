import User from "../models/User.js";

export const UserService = {
  createUser: async (userData) => {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  },

  
};
