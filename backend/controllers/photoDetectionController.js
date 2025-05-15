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

