import { ReviewService } from "../services/ReviewService.js";
import { ResponseTrait } from "../traits/ResponseTrait.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const userId = req.user.id;

    const reviewData = {
      ...req.body,
      userId: userId,
    };

    const savedReview = await ReviewService.createReview(tourId, reviewData);

    return ResponseTrait.successResponse(res, {
      message: "Review submitted",
      data: savedReview,
    });
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to submit review",
      error.statusCode || 500
    );
  }
};

export const getTourReviews = async (req, res) => {
  try {
    const { tourId } = req.params;
    const reviews = await ReviewService.getTourReviews(tourId);
    return ResponseTrait.successResponse(res, reviews);
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to fetch reviews",
      error.statusCode || 500
    );
  }
};

export const getUserReviews = async (req, res) => {
  try {
    const userId = req.user.id;
    const reviews = await ReviewService.getUserReviews(userId);
    return ResponseTrait.successResponse(res, reviews);
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to fetch user reviews",
      error.statusCode || 500
    );
  }
};

export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.role === "admin";

    const review = await Review.findById(reviewId);

    if (!review) {
      return ResponseTrait.errorResponse(res, "Review not found", 404);
    }

    if (review.userId.toString() !== userId && !isAdmin) {
      return ResponseTrait.errorResponse(
        res,
        "You can only update your own reviews",
        403
      );
    }

    const updatedReview = await ReviewService.updateReview(reviewId, req.body);

    return ResponseTrait.successResponse(res, {
      message: "Review updated",
      data: updatedReview,
    });
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to update review",
      error.statusCode || 500
    );
  }
};


