import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const ReviewService = {
  createReview: async (tourId, reviewData) => {

    const tour = await Tour.findById(tourId);
    if (!tour) {
      const error = new Error("Tour not found");
      error.statusCode = 404;
      throw error;
    }

    const newReview = new Review({
      ...reviewData,
      productId: tourId,
    });

   
    const savedReview = await newReview.save();


    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    return savedReview;
  },

  getTourReviews: async (tourId) => {

    const tour = await Tour.findById(tourId);
    if (!tour) {
      const error = new Error("Tour not found");
      error.statusCode = 404;
      throw error;
    }

  
    const reviews = await Review.find({ productId: tourId });

    return reviews;
  },

  getUserReviews: async (userId) => {

    const reviews = await Review.find({ userId: userId }).populate("productId");

    return reviews;
  },

  updateReview: async (reviewId, updateData) => {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedReview) {
      const error = new Error("Review not found");
      error.statusCode = 404;
      throw error;
    }

    return updatedReview;
  },

  deleteReview: async (reviewId) => {
    const review = await Review.findById(reviewId);

    if (!review) {
      const error = new Error("Review not found");
      error.statusCode = 404;
      throw error;
    }

    const tour = await Tour.findById(review.productId);
    if (tour) {
      await Tour.findByIdAndUpdate(review.productId, {
        $pull: { reviews: reviewId },
      });
    }

    await Review.findByIdAndDelete(reviewId);

    return { message: "Review deleted" };
  },
};
