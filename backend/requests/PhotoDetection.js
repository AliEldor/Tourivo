import { body, param } from "express-validator";
import { ResponseTrait } from "../traits/ResponseTrait.js";
import { validationResult } from "express-validator";

export const validatePhotoDetection = (method) => {
  switch (method) {
    case "uploadPhoto": {
      return [
        body("tourId")
          .optional()
          .isMongoId()
          .withMessage("Invalid tour ID"),
        body("tripId")
          .optional()
          .isMongoId()
          .withMessage("Invalid trip ID"),
        body("description")
          .optional()
          .isString()
          .withMessage("Description must be a string"),
        body("isPublic")
          .optional()
          .isBoolean()
          .withMessage("isPublic must be a boolean value"),
      ];
    }

    case "getPhoto": 
    case "deletePhoto": {
      return [
        param("id")
          .isMongoId()
          .withMessage("Invalid photo detection ID")
      ];
    }

    case "updatePhoto": {
      return [
        param("id")
          .isMongoId()
          .withMessage("Invalid photo detection ID"),
        body("personalNote")
          .optional()
          .isString()
          .withMessage("Personal note must be a string"),
        body("isPublic")
          .optional()
          .isBoolean()
          .withMessage("isPublic must be a boolean value"),
        body("tags")
          .optional()
          .isArray()
          .withMessage("Tags must be an array"),
      ];
    }

    case "getTourPhotos": {
      return [
        param("tourId")
          .isMongoId()
          .withMessage("Invalid tour ID")
      ];
    }

    case "getPhotosByLandmark": {
      return [
        param("landmarkName")
          .notEmpty()
          .withMessage("Landmark name is required")
          .isString()
          .withMessage("Landmark name must be a string"),
      ];
    }
  }
};

