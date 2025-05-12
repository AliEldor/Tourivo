import { body, param } from "express-validator";
import { ResponseTrait } from "../traits/ResponseTrait.js";
import { validationResult } from "express-validator";

export const validateBooking = (method) => {
    switch (method) {
        case "createBooking": {
            return [
                body("tourName").notEmpty().withMessage("Tour name is required"),
                body("fullName").notEmpty().withMessage("Full name is required"),
                body("guestSize")
          .notEmpty().withMessage("Guest size is required")
          .isInt({ min: 1 }).withMessage("Guest size must be at least 1"),
            ] 
        }
    }
}