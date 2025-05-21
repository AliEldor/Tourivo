import { PhotoDetectionService } from "../services/PhotoDetectionService.js";
import { ResponseTrait } from "../traits/ResponseTrait.js";

export const uploadPhoto = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return ResponseTrait.errorResponse(res, "No image file provided", 400);
    }

    const photo = await PhotoDetectionService.uploadPhoto(
      userId,
      req.file,
      req.body
    );

    return ResponseTrait.successResponse(res, {
      message: "Photo uploaded and analyzed successfully",
      data: photo,
    });
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to upload photo",
      500
    );
  }
};

export const getPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await PhotoDetectionService.getPhoto(id);
    return ResponseTrait.successResponse(res, photo);
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to find photo",
      error.statusCode || 500
    );
  }
};

export const getUserPhotos = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await PhotoDetectionService.getUserPhotos(userId);
    return ResponseTrait.successResponse(res, result);
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to fetch user photos",
      500
    );
  }
};

export const getTourPhotos = async (req, res) => {
  try {
    const { tourId } = req.params;
    const result = await PhotoDetectionService.getTourPhotos(tourId);
    return ResponseTrait.successResponse(res, result);
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to fetch tour photos",
      500
    );
  }
};

export const getPhotosByLandmark = async (req, res) => {
  try {
    const { landmarkName } = req.params;
    const result = await PhotoDetectionService.getPhotosByLandmark(
      landmarkName
    );
    return ResponseTrait.successResponse(res, result);
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to fetch photos by landmark",
      500
    );
  }
};


