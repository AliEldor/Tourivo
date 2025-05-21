import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  generateTrip,
  getUserGeneratedTrips,
  getGeneratedTrip,
  deleteGeneratedTrip,
  bookGeneratedTrip,
} from "../controllers/generatedTripController.js";
import { validateGeneratedTrip, validate } from "../requests/GeneratedTripRequest.js";

const router = express.Router();

router.post("/", verifyToken, validateGeneratedTrip("generateTrip"), validate, generateTrip);

router.get("/", verifyToken, getUserGeneratedTrips);

router.get("/:id", verifyToken, validateGeneratedTrip("getGeneratedTrip"), validate, getGeneratedTrip);

router.post("/:id/book", 
  verifyToken, 
  validateGeneratedTrip("bookGeneratedTrip"), 
  validate, 
  bookGeneratedTrip
);

router.delete("/:id", verifyToken, validateGeneratedTrip("deleteGeneratedTrip"), validate, deleteGeneratedTrip);

export default router;