import express from "express";
import {
  createReview,
  getTourReviews,
  getUserReviews,
  updateReview,
  deleteReview
} from "../controllers/reviewController.js";
import { validateReview, validate } from "../requests/ReviewRequest.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Create a new review /authenticated users only
router.post(
    "/:tourId",
    verifyToken,
    validateReview("createReview"),
    validate,
    createReview
  );

  // Get all reviews for a specific tour 
router.get(
    "/tour/:tourId",
    validateReview("getTourReviews"),
    validate,
    getTourReviews
  );