import { TourService } from "../services/TourService.js";
import { ResponseTrait } from "../traits/ResponseTrait.js";

export const createTour = async (req, res) => {
  try {
    const tourData = await TourService.createTour(req.body);
    return ResponseTrait.successResponse(res, tourData);
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to create tour",
      500
    );
  }
};

export const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tourData = await TourService.updateTour(id, req.body);
    return ResponseTrait.successResponse(res, tourData);
  } catch (error) {
    const statusCode = error.message === "Tour not found" ? 404 : 500;
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to update tour",
      statusCode
    );
  }
};

export const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TourService.deleteTour(id);
    return ResponseTrait.successResponse(res, result);
  } catch (error) {
    const statusCode = error.message === "Tour not found" ? 404 : 500;
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to delete tour",
      statusCode
    );
  }
};


