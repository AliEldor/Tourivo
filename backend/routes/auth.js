import express from "express";
import { login, register, logout } from "../controllers/authController.js";
import { validate, validateAuth } from "../requests/AuthRequest.js";

const router = express.Router();

// Register new user
router.post("/register", validateAuth("register"), validate, register);