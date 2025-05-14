import { GeneratedTripService } from "../services/GeneratedTripService.js";
import { ResponseTrait } from "../traits/ResponseTrait.js";

export const generateTrip = async (req, res) => {
  const userId = req.user.id;
  const preferences = req.body;

  const response = await GeneratedTripService.generateTrip(userId, preferences);

  if (!response.success) {
    return ResponseTrait.errorResponse(res, response.error, 500);
  }

  return ResponseTrait.successResponse(res, {
    message: "Trip generated successfully",
    data: response.data,
  });
};


