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