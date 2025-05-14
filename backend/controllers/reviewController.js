import { ReviewService } from "../services/ReviewService.js";
import { ResponseTrait } from "../traits/ResponseTrait.js";
import Review from "../models/Review.js";

// Create a new review
export const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  const userId = req.user.id;

  // Add user ID from auth token to review data
  const reviewData = {
    ...req.body,
    userId: userId,
  };

  const response = await ReviewService.createReview(tourId, reviewData);

  if (!response.success) {
    return ResponseTrait.errorResponse(
      res,
      response.error,
      response.statusCode || 500
    );
  }

  return ResponseTrait.successResponse(res, {
    message: "Review submitted",
    data: response.data,
  });
};

// Get reviews for a tour
export const getTourReviews = async (req, res) => {
  const { tourId } = req.params;

  const response = await ReviewService.getTourReviews(tourId);

  if (!response.success) {
    return ResponseTrait.errorResponse(
      res,
      response.error,
      response.statusCode || 500
    );
  }

  return ResponseTrait.successResponse(res, response.data);
};

// Get user's reviews
export const getUserReviews = async (req, res) => {
  const userId = req.user.id;

  const response = await ReviewService.getUserReviews(userId);

  if (!response.success) {
    return ResponseTrait.errorResponse(
      res,
      response.error,
      response.statusCode || 500
    );
  }

  return ResponseTrait.successResponse(res, response.data);
};

// Update review
export const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.id;
  const isAdmin = req.user.role === "admin";

  try {
    
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
    
    const response = await ReviewService.updateReview(reviewId, req.body);

    if (!response.success) {
      return ResponseTrait.errorResponse(
        res,
        response.error,
        response.statusCode || 500
      );
    }

    return ResponseTrait.successResponse(res, {
      message: "Review updated",
      data: response.data,
    });
  } catch (err) {
    return ResponseTrait.errorResponse(res, "Failed to update review", 500);
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.id;
  const isAdmin = req.user.role === "admin";

  try {
    
    const review = await Review.findById(reviewId);
    
    if (!review) {
      return ResponseTrait.errorResponse(res, "Review not found", 404);
    }
    
    
    if (review.userId.toString() !== userId && !isAdmin) {
      return ResponseTrait.errorResponse(
        res, 
        "You can only delete your own reviews", 
        403
      );
    }
    
    const response = await ReviewService.deleteReview(reviewId);

    if (!response.success) {
      return ResponseTrait.errorResponse(
        res,
        response.error,
        response.statusCode || 500
      );
    }

    return ResponseTrait.successResponse(res, {
      message: "Review deleted",
    });
  } catch (err) {
    console.error("Error in deleteReview controller:", err);
    return ResponseTrait.errorResponse(res, "Failed to delete review", 500);
  }
};