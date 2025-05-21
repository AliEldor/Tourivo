import GeneratedTrip from "../models/GeneratedTrip.js";
import Tour from "../models/Tour.js";
import { generateAITrip } from "../utils/aiTripGeneratorPrompt.js";

export const GeneratedTripService = {
  generateTrip: async (userId, preferences) => {
    let availableTours = await Tour.find({});

    if (preferences.maxPrice) {
      availableTours = availableTours.filter(
        (tour) => tour.price <= preferences.maxPrice
      );
    }

    if (preferences.maxGroupSize) {
      availableTours = availableTours.filter(
        (tour) => tour.maxGroupSize >= preferences.maxGroupSize
      );
    }

    if (preferences.city) {
      const cityRegex = new RegExp(preferences.city, "i");
      availableTours = availableTours.filter((tour) =>
        cityRegex.test(tour.city)
      );
    }

    const tourOptions = availableTours.map((tour) => ({
      id: tour._id.toString(),
      title: tour.title,
      city: tour.city,
      address: tour.address,
      description: tour.desc,
      price: tour.price,
      maxGroupSize: tour.maxGroupSize,
      distance: tour.distance,
      featured: tour.featured,
    }));

    if (tourOptions.length === 0) {
      throw new Error("No tours available matching your preferences");
    }

    const tripData = await generateAITrip(preferences, tourOptions);;

    const tourIds = tripData.tourSelections.map(
      (selection) => selection.tourId
    );
    const validTours = await Tour.find({ _id: { $in: tourIds } });

    if (validTours.length !== tourIds.length) {
      throw new Error("Some selected tours were not found in the database");
    }

    const newTrip = new GeneratedTrip({
      userId,
      title: tripData.title,
      description: tripData.description,
      duration: preferences.duration,
      tourSelections: tripData.tourSelections,
      totalEstimatedCost: tripData.totalEstimatedCost,
      preferences: preferences,
    });

    await newTrip.save();

    const populatedTrip = await GeneratedTrip.findById(newTrip._id).populate({
      path: "tourSelections.tourId",
      model: "Tour",
    });

    return populatedTrip;
  },

  getGeneratedTrip: async (id, userId) => {
    const trip = await GeneratedTrip.findById(id).populate({
      path: "tourSelections.tourId",
      model: "Tour",
    });

    if (!trip) {
      const error = new Error("Generated trip not found");
      error.statusCode = 404;
      throw error;
    }

    if (trip.userId.toString() !== userId) {
      const error = new Error("Unauthorized access to this trip");
      error.statusCode = 403;
      throw error;
    }

    return trip;
  },

  
};
