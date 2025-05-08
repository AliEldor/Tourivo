import Tour from "../models/Tour.js";

export const TourService = {
  createTour: async (tourData) => {
    try {
      const newTour = new Tour(tourData);
      const savedTour = await newTour.save();
      return {
        success: true,
        data: savedTour,
      };
    } catch (err) {
      return {
        success: false,
        error: "Failed to create tour",
      };
    }
  },

  updateTour: async (id, tourData) => {
    try {
      const updatedTour = await Tour.findByIdAndUpdate(
        id,
        { $set: tourData },
        { new: true }
      );

      if (!updatedTour) {
        return {
          success: false,
          error: "Tour not found",
        };
      }

      return {
        success: true,
        data: updatedTour,
      };
    } catch (err) {
      return {
        success: false,
        error: "Failed to update tour",
      };
    }
  },
};
