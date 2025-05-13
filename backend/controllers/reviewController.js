import { ReviewService } from "../services/ReviewService.js";
import { ResponseTrait } from "../traits/ResponseTrait.js";

// Create a new review
export const createReview = async (req, res) => {
    const tourId = req.params.tourId;
    const userId = req.user.id;

    // Add user ID from auth token to review data
  const reviewData = {
    ...req.body,
    userId: userId
  };

  const response = await ReviewService.createReview(tourId, reviewData);


}