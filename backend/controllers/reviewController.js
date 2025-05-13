import { ReviewService } from "../services/ReviewService.js";
import { ResponseTrait } from "../traits/ResponseTrait.js";

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

  const response = await ReviewService.updateReview(reviewId, userId, req.body);

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
};

// Delete review
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.id;

  const response = await ReviewService.deleteReview(reviewId, userId);

};
