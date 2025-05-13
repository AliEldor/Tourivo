import { body, param } from "express-validator";
import { ResponseTrait } from "../traits/ResponseTrait.js";
import { validationResult } from "express-validator";

export const validateReview = (method) => {
  switch (method) {
    case "createReview": {
      return [
        param("tourId").isMongoId().withMessage("Invalid tour ID"),
        body("username").notEmpty().withMessage("Username is required"),
        body("reviewText").notEmpty().withMessage("Review text is required"),
        body("rating")
          .notEmpty()
          .withMessage("Rating is required")
          .isInt({ min: 0, max: 5 })
          .withMessage("Rating must be between 0 and 5"),
      ];
    }

    case "getTourReviews": {
        return [
          param("tourId").isMongoId().withMessage("Invalid tour ID")
        ];
      }

  }
};
