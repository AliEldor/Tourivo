import express from "express";
import { verifyAdmin, verifyUser, verifyToken } from "../utils/verifyToken.js";
import {
  createBooking,
  getAllBooking,
  getBooking,
  getUserBookings
} from "../controllers/bookingController.js";
import { validateBooking, validate } from "../requests/BookingRequest.js";

const router = express.Router();

// Create a new booking/ only authenticated users can book
router.post("/", 
  verifyToken, 
  validateBooking("createBooking"), 
  validate, 
  createBooking
);

// Get user's bookings /users can only see their own bookings
router.get("/my-bookings", verifyToken, getUserBookings);

// Get a specific booking 
router.get("/:id", 
  verifyToken, 
  validateBooking("getBooking"), 
  validate, 
  getBooking
);

// Get all bookings by admins
router.get("/", verifyAdmin, getAllBooking);

export default router;