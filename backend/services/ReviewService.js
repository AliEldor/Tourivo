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
      
        }
    }
}