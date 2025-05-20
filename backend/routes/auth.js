import express from "express";
import { login, register, logout } from "../controllers/authController.js";
import { validate, validateAuth } from "../requests/AuthRequest.js";

const router = express.Router();


router.post("/register", validateAuth("register"), validate, register);


router.post("/login", validateAuth("login"), validate, login);


router.post("/logout", logout);

export default router;