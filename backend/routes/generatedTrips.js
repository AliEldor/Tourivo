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

// Generate a new trip
router.post("/", 
  verifyToken, 
  validateGeneratedTrip("generateTrip"), 
  validate, 
  generateTrip
);

// Get all generated trips for the user
router.get("/", verifyToken, getUserGeneratedTrips);


export default router;