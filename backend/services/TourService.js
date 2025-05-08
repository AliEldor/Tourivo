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

  deleteTour: async (id) => {
    try {
      const deletedTour = await Tour.findByIdAndDelete(id);

      if (!deletedTour) {
        return {
          success: false,
          error: "Tour not found",
        };
      }

      return {
        success: true,
        message: "Successfully deleted",
      };
    } catch (err) {
      return {
        success: false,
        error: "Failed to delete tour",
      };
    }
  },

  getSingleTour: async (id) => {
    try {
      const tour = await Tour.findById(id).populate("reviews");

      if (!tour) {
        return {
          success: false,
          error: "Tour not found",
        };
      }

      return {
        success: true,
        data: tour,
      };
    } catch (err) {
      return {
        success: false,
        error: "Failed to find tour",
      };
    }
  },


  getAllTours: async (page = 0) => {
    try {
      const tours = await Tour.find({})
        .populate("reviews")
        .skip(page * 8)
        .limit(8);
      
      return {
        success: true,
        count: tours.length,
        data: tours
      };
    } catch (err) {
      return {
        success: false,
        error: "Failed to find tours"
      };
    }
  },

  getTourBySearch: async (query) => {
    try {
      const { city, price, maxGroupSize } = query;
      const cityRegex = new RegExp(city, "i");
      
      const tours = await Tour.find({
        city: cityRegex,
        price: { $gte: parseInt(price) },
        maxGroupSize: { $gte: parseInt(maxGroupSize) }
      }).populate("reviews");

      return {
        success: true,
        data: tours
      };
    } catch (err) {
      return {
        success: false,
        error: "Failed to find tours"
      };
    }
  },

  getFeaturedTours: async () => {
    try {
      const tours = await Tour.find({ featured: true })
        .populate("reviews")
        .limit(8);
      
      return {
        success: true,
        data: tours
      };
    } catch (err) {
      return {
        success: false,
        error: "Failed to find featured tours"
      };
    }
  },

  getTourCount: async () => {
    try {
      const tourCount = await Tour.estimatedDocumentCount();
      
      return {
        success: true,
        data: tourCount
      };
    } catch (err) {
      return {
        success: false,
        error: "Failed to fetch tour count"
      };
    }
  }

};
