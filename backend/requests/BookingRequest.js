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
        body("userEmail").isEmail().withMessage("Invalid email format"),
      ];
    }
  }
};
