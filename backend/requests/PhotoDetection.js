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

    
  }
};

