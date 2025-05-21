import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const AuthService = {
  register: async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userData.password, salt);

    const newUser = new User({
      username: userData.username,
      email: userData.email,
      password: hash,
      photo: userData.photo,
    });

    await newUser.save();

    return { message: "User successfully registered" };
  },

  login: async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const checkCorrectPassword = await bcrypt.compare(password, user.password);

    if (!checkCorrectPassword) {
      const error = new Error("Incorrect email or password");
      error.statusCode = 401;
      throw error;
    }

    const { password: userPassword, role, ...rest } = user._doc;

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    return {
      token,
      data: { ...rest },
      role,
    };
  },
};
