import Tour from "../models/Tour.js";
import "../models/Review.js";

export const TourService = {
  createTour: async (tourData) => {
    const newTour = new Tour(tourData);
    const savedTour = await newTour.save();
    return savedTour;
  },

  updateTour: async (id, tourData) => {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: tourData },
      { new: true }
    );

    if (!updatedTour) {
      throw new Error("Tour not found");
    }

    return updatedTour;
  },

  deleteTour: async (id) => {
    const deletedTour = await Tour.findByIdAndDelete(id);

    if (!deletedTour) {
      throw new Error("Tour not found");
    }

    return { message: "Successfully deleted" };
  },

  getSingleTour: async (id) => {
    const tour = await Tour.findById(id).populate("reviews");

    if (!tour) {
      throw new Error("Tour not found");
    }

    return tour;
  },

  getAllTours: async (page = 0) => {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    return {
      count: tours.length,
      data: tours,
    };
  },

  getTourBySearch: async (query) => {
    const { city, price, maxGroupSize } = query;
    const cityRegex = new RegExp(city, "i");

    const tours = await Tour.find({
      city: cityRegex,
      price: { $gte: parseInt(price) },
      maxGroupSize: { $gte: parseInt(maxGroupSize) },
    }).populate("reviews");

    return tours;
  },

  
};
