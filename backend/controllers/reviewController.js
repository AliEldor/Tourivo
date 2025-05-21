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


