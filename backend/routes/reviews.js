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

router.post(
    "/:tourId",
    verifyToken,
    validateReview("createReview"),
    validate,
    createReview
  );

router.get(
    "/tour/:tourId",
    validateReview("getTourReviews"),
    validate,
    getTourReviews
  );

router.get(
    "/user",
    verifyToken,
    getUserReviews
  );

router.put(
    "/:reviewId",
    verifyToken,
    validateReview("updateReview"),
    validate,
    updateReview
  );

router.delete(
    "/:reviewId",
    verifyToken,
    validateReview("deleteReview"),
    validate,
    deleteReview
  );
  
  export default router;