import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  generateTrip,
  getUserGeneratedTrips,
  getGeneratedTrip,
  deleteGeneratedTrip,
  bookGeneratedTrip,
  regenerateTrip,
} from "../controllers/generatedTripController.js";
import { validateGeneratedTrip, validate } from "../requests/GeneratedTripRequest.js";

const router = express.Router();



export default router;