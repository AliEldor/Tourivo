import { GeneratedTripService } from "../services/GeneratedTripService.js";
import { ResponseTrait } from "../traits/ResponseTrait.js";

export const generateTrip = async (req, res) => {
  try {
    const userId = req.user.id;
    const preferences = req.body;

    const tripData = await GeneratedTripService.generateTrip(
      userId,
      preferences
    );

    return ResponseTrait.successResponse(res, {
      message: "Trip generated successfully",
      data: tripData,
    });
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to generate trip",
      500
    );
  }
};

export const getUserGeneratedTrips = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await GeneratedTripService.getUserGeneratedTrips(userId);

    return ResponseTrait.successResponse(res, {
      count: result.count,
      data: result.data,
    });
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to fetch generated trips",
      500
    );
  }
};

export const getGeneratedTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const trip = await GeneratedTripService.getGeneratedTrip(id, userId);

    return ResponseTrait.successResponse(res, trip);
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to fetch trip",
      error.statusCode || 500
    );
  }
};

export const deleteGeneratedTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await GeneratedTripService.deleteGeneratedTrip(id, userId);

    return ResponseTrait.successResponse(res, result);
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to delete trip",
      error.statusCode || 500
    );
  }
};


