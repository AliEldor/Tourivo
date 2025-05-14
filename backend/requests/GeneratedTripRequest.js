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
            ];
        }

    }
}