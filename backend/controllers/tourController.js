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

export const getSingleTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tourData = await TourService.getSingleTour(id);
    return ResponseTrait.successResponse(res, tourData);
  } catch (error) {
    const statusCode = error.message === "Tour not found" ? 404 : 500;
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to find tour",
      statusCode
    );
  }
};

export const getAllTour = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const result = await TourService.getAllTours(page);
    return ResponseTrait.successResponse(res, result);
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to find tours",
      500
    );
  }
};

export const getTourBySearch = async (req, res) => {
  try {
    const tours = await TourService.getTourBySearch(req.query);
    return ResponseTrait.successResponse(res, tours);
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to find tours",
      500
    );
  }
};

export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await TourService.getFeaturedTours();
    return ResponseTrait.successResponse(res, tours);
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to find featured tours",
      500
    );
  }
};

export const getTourCount = async (req, res) => {
  try {
    const count = await TourService.getTourCount();
    return ResponseTrait.successResponse(res, count);
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to fetch tour count",
      500
    );
  }
};
