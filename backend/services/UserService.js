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

  updateUser: async (id, userData) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: userData },
        { new: true }
      );

      if (!updatedUser) {
        return {
          success: false,
          error: "User not found",
        };
      }

      return {
        success: true,
        data: updatedUser,
      };
    } catch (err) {
      return {
        success: false,
        error: "Failed to update user",
      };
    }
  },

  deleteUser: async (id) => {
    try{
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return {
              success: false,
              error: "User not found",
            };
          }
          return {
            success: true,
            message: "Successfully deleted",
          };
    }
    catch (err) {
        return {
          success: false,
          error: "Failed to delete user",
        };
      }
  }

};
