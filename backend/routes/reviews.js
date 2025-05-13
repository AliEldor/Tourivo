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

  // Get all reviews by the logged in user
router.get(
    "/user",
    verifyToken,
    getUserReviews
  );

  // Update a review/for the owner of the review
router.put(
    "/:reviewId",
    verifyToken,
    validateReview("updateReview"),
    validate,
    updateReview
  );

  // Delete a review/for the owner of the review
router.delete(
    "/:reviewId",
    verifyToken,
    validateReview("deleteReview"),
    validate,
    deleteReview
  );
  
  export default router;