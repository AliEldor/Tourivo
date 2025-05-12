import { body } from "express-validator";
import { ResponseTrait } from "../traits/ResponseTrait.js";
import { validationResult } from "express-validator";

export const validateAuth = (method) => {
  switch (method) {
    case "register": {
      return [
        body("username")
          .notEmpty()
          .withMessage("Username is required")
          .isLength({ min: 3 })
          .withMessage("Username must be at least 3 characters"),
        body("email")
          .notEmpty()
          .withMessage("Email is required")
          .isEmail()
          .withMessage("Invalid email format"),
        body("password")
          .notEmpty()
          .withMessage("Password is required")
          .isLength({ min: 3 })
          .withMessage("Password must be at least 3 characters"),
        body("photo").optional(),
      ];
    }

    case "login": {
      return [
        body("email")
          .notEmpty()
          .withMessage("Email is required")
          .isEmail()
          .withMessage("Invalid email format"),
        body("password").notEmpty().withMessage("Password is required"),
      ];
    }
  }
};
