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

const router = express.Router();

// Create new tour
router.post("/", 
    validateTour("createTour"), 
    validate, 
    createTour
  );

  // Update tour
router.put("/:id", 
    validateTour("updateTour"), 
    validate, 
    updateTour
  );

  // Delete tour
router.delete("/:id", 
    validateTour("deleteTour"), 
    validate, 
    deleteTour
  );