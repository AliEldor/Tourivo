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
          statusCode: 404,
        };
      }

      // Create new review with tour ID
      const newReview = new Review({
        ...reviewData,
        productId: tourId,
      });

      // Save the review
      const savedReview = await newReview.save();

      // Update the tour's reviews array
      await Tour.findByIdAndUpdate(tourId, {
        $push: { reviews: savedReview._id },
      });

      return {
        success: true,
        data: savedReview,
      };
    } catch (err) {
      return {
        success: false,
        error: "Failed to submit review",
      };
    }
  },


  getTourReviews: async (tourId) => {
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

       // Find reviews for the tour
       const reviews = await Review.find({ productId: tourId });

       return {
        success: true,
        data: reviews
      };
    } catch (err) {
        return {
          success: false,
          error: "Failed to fetch reviews"
        };
      }
  },

  getUserReviews: async (userId) => {
    try{
        // Find reviews by the user
      const reviews = await Review.find({ userId: userId }).populate("productId");

      return {
        success: true,
        data: reviews
      };
    }

  }

};
