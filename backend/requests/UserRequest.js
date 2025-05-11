import { body, param } from "express-validator";
import { ResponseTrait } from "../traits/ResponseTrait.js";
import { validationResult } from "express-validator";

export const validateUser = (method) => {
    switch (method) {
        case "createUser": {
            return [
              body("username").notEmpty().withMessage("Username is required"),
              body("email")
                .notEmpty().withMessage("Email is required")
                .isEmail().withMessage("Invalid email format"),
              body("password")
                .notEmpty().withMessage("Password is required")
                .isLength({ min: 3 }).withMessage("Password must be at least 3 characters"),
              body("photo").optional(),
              body("role").optional().isIn(["user", "admin"]).withMessage("Role must be either user or admin"),
            ];
          }

          case "updateUser": {
            return [
              param("id").isMongoId().withMessage("Invalid user ID"),
              body("username").optional(),
              body("email")
                .optional()
                .isEmail().withMessage("Invalid email format"),
              body("password")
                .optional()
                .isLength({ min: 3 }).withMessage("Password must be at least 3 characters"),
              body("photo").optional(),
              body("role").optional().isIn(["user", "admin"]).withMessage("Role must be either user or admin"),
            ];
          }

    }
}