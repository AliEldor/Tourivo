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