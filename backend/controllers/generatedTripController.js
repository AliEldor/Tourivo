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


