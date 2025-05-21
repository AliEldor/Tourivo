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

  deleteUser: async (id) => {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new Error("User not found");
    }

    return { message: "Successfully deleted" };
  },

  getSingleUser: async (id) => {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },

  getAllUsers: async () => {
    const users = await User.find({});

    return {
      count: users.length,
      data: users,
    };
  },
};
