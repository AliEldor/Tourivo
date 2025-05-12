import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import {
  createBooking,
  getAllBooking,
  getBooking,
  getUserBookings
} from "../controllers/bookingController.js";
import { validate, validateBooking } from "../requests/BookingRequest.js";

const router = express.Router();

// Create a new booking
router.post("/", verifyUser, validateBooking("createBooking"), validate, createBooking);

// Get a single booking by ID
router.get("/:id", verifyUser, validateBooking("getBooking"), validate, getBooking);

// Get all bookings (admin only)
router.get("/", verifyAdmin, getAllBooking);