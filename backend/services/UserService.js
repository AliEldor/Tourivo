import User from "../models/User.js";

export const UserService = {
  createUser: async (userData) => {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  },

  updateUser: async (id, userData) => {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: userData },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  },

  
};
