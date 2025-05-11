import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js";
import { validate, validateUser } from "../requests/UserRequest.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Update user
router.put("/:id", verifyUser, validateUser("updateUser"), validate, updateUser);