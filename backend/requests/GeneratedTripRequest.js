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

    case "bookGeneratedTrip": {
        return [
            param("id")
          .isMongoId()
          .withMessage("Invalid trip ID"),
        body("fullName")
          .notEmpty()
          .withMessage("Full name is required"),
          body("guestSize")
          .notEmpty()
          .withMessage("Guest size is required")
          .isInt({ min: 1 })
          .withMessage("Guest size must be at least 1"),
        body("phone")
          .notEmpty()
          .withMessage("Phone number is required")
          .isNumeric()
          .withMessage("Phone must be a number"),
          body("bookAt")
          .notEmpty()
          .withMessage("Booking date is required")
          .isISO8601()
          .withMessage("Invalid date format"),
        body("userEmail")
          .isEmail()
          .withMessage("Invalid email format"),
        ];
    }

    case "regenerateTrip": {
        return [
            param("id")
          .isMongoId()
          .withMessage("Invalid trip ID"),
        body("adjustments")
          .optional()
          .isObject()
          .withMessage("Adjustments must be an object"),
          body("adjustments.budget")
          .optional()
          .isNumeric()
          .withMessage("Budget must be a number"),
        body("adjustments.duration")
          .optional()
          .isInt({ min: 1, max: 30 })
          .withMessage("Duration must be between 1 and 30 days"),
          body("adjustments.includeTours")
          .optional()
          .isArray()
          .withMessage("includeTours must be an array"),
        body("adjustments.excludeTours")
          .optional()
          .isArray()
          .withMessage("excludeTours must be an array"),

        ];
    }

    }
}