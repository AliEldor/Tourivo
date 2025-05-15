import { PhotoDetectionService  } from "../services/PhotoDetectionService.js";
import { ResponseTrait } from "../traits/ResponseTrait.js";

// upload a new photo
export const uploadPhoto = async (req, res) => {
  try {
    const userId = req.user.id;
    
    if (!req.file) {
      return ResponseTrait.errorResponse(res, "No image file provided", 400);
    }
    
    const response = await PhotoDetectionService .uploadPhoto(userId, req.file, req.body);

    if (!response.success) {
      return ResponseTrait.errorResponse(res, response.error, 500);
    }

    return ResponseTrait.successResponse(res, {
      message: "Photo uploaded and analyzed successfully",
      data: response.data,
    });
  } catch (err) {
    console.error("Error in upload controller:", err);
    return ResponseTrait.errorResponse(res, "Failed to upload photo", 500);
  }
};

// get a specific photo
export const getPhoto = async (req, res) => {
  const { id } = req.params;
  const response = await PhotoDetectionService .getPhoto(id);

  if (!response.success) {
    return ResponseTrait.errorResponse(
      res,
      response.error,
      response.statusCode || 500
    );
  }

  return ResponseTrait.successResponse(res, response.data);
};

// Get all photos for a user
export const getUserPhotos = async (req, res) => {
  const userId = req.user.id;
  const response = await PhotoDetectionService .getUserPhotos(userId);

  if (!response.success) {
    return ResponseTrait.errorResponse(res, response.error, 500);
  }

  return ResponseTrait.successResponse(res, {
    count: response.count,
    data: response.data,
  });
};

// Get photos for a specific tour
export const getTourPhotos = async (req, res) => {
  const { tourId } = req.params;
  const response = await PhotoDetectionService .getTourPhotos(tourId);

  if (!response.success) {
    return ResponseTrait.errorResponse(res, response.error, 500);
  }

  return ResponseTrait.successResponse(res, {
    count: response.count,
    data: response.data,
  });
};

export const getPhotosByLandmark = async (req, res) => {
  const { landmarkName } = req.params;
  const response = await PhotoDetectionService .getPhotosByLandmark(landmarkName);

  if (!response.success) {
    return ResponseTrait.errorResponse(res, response.error, 500);
  }

  return ResponseTrait.successResponse(res, {
    count: response.count,
    data: response.data,
  });
};

