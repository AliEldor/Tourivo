import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const ReviewService = {
    createReview: async (tourId, reviewData) => {
        try {
            // Check if tour exists
      const tour = await Tour.findById(tourId);
      if (!tour) {
        return {
          success: false,
          error: "Tour not found",
          statusCode: 404
        };
      }

      // Create new review with tour ID
      const newReview = new Review({
        ...reviewData,
        productId: tourId
      });

      // Save the review
      const savedReview = await newReview.save();

      // Update the tour's reviews array
      await Tour.findByIdAndUpdate(tourId, {
        $push: { reviews: savedReview._id }
      });

      return {
        success: true,
        data: savedReview
      };
        } catch (err) {
            return {
              success: false,
              error: "Failed to submit review"
            };
          }
    }
}