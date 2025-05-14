import { body, param } from "express-validator";
import { ResponseTrait } from "../traits/ResponseTrait.js";
import { validationResult } from "express-validator";

export const validateGeneratedTrip = (method) => {
    switch (method) {
        case "generateTrip": {
            return [
                body("budget")
          .notEmpty()
          .withMessage("Budget is required")
          .isNumeric()
          .withMessage("Budget must be a number"),
          body("duration")
          .notEmpty()
          .withMessage("Duration is required")
          .isInt({ min: 1, max: 30 })
          .withMessage("Duration must be between 1 and 30 days"),
          body("interests")
          .notEmpty()
          .withMessage("Interests are required"),
        body("destinationType")
          .optional()
          .isString()
          .withMessage("Destination type must be a string"),
          body("season")
          .optional()
          .isString()
          .withMessage("Season must be a string"),
        body("city")
          .optional()
          .isString()
          .withMessage("City must be a string"),
          body("maxPrice")
          .optional()
          .isNumeric()
          .withMessage("Max price must be a number"),
        body("maxGroupSize")
          .optional()
          .isNumeric()
          .withMessage("Max group size must be a number"),
            ];
        }

        case "getGeneratedTrip": 
    case "deleteGeneratedTrip": {
      return [
        param("id")
          .isMongoId()
          .withMessage("Invalid trip ID")
      ];
    }

    }
}