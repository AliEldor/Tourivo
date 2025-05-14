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

export const getUserGeneratedTrips = async (req, res) => {
  const userId = req.user.id;

  const response = await GeneratedTripService.getUserGeneratedTrips(userId);

  if (!response.success) {
    return ResponseTrait.errorResponse(res, response.error, 500);
  }

  return ResponseTrait.successResponse(res, {
    count: response.count,
    data: response.data,
  });
};

export const getGeneratedTrip = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const response = await GeneratedTripService.getGeneratedTrip(id, userId);

  if (!response.success) {
    return ResponseTrait.errorResponse(
      res,
      response.error,
      response.statusCode || 500
    );
  }

  return ResponseTrait.successResponse(res, response.data);
};

export const deleteGeneratedTrip = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const response = await GeneratedTripService.deleteGeneratedTrip(id, userId);

  if (!response.success) {
    return ResponseTrait.errorResponse(
      res,
      response.error,
      response.statusCode || 500
    );
  }

  return ResponseTrait.successResponse(res, {
    message: response.message,
  });
}

  

