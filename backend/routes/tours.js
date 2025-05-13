import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getFeaturedTour,
  getSingleTour,
  getTourBySearch,
  getTourCount,
  updateTour,
} from "../controllers/tourController.js";
import { validate, validateTour } from "../requests/TourRequest.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create new tour (admin)
router.post("/", verifyAdmin, validateTour("createTour"), validate, createTour);

// Update tour
router.put("/:id", validateTour("updateTour"), validate, updateTour);

// Delete tour
router.delete("/:id", validateTour("deleteTour"), validate, deleteTour);

// Get tour by search
router.get(
    "/search/getTourBySearch",
    validateTour("getTourBySearch"),
    validate,
    getTourBySearch
  );

  // Get featured tours
router.get("/search/getFeaturedTours", getFeaturedTour);

  // Get tour counts
router.get("/search/getTourCount", getTourCount);

// Get all tours
router.get("/", validateTour("getAllTour"), validate, getAllTour);

// Get single tour
router.get("/:id", validateTour("getSingleTour"), validate, getSingleTour);





export default router;
