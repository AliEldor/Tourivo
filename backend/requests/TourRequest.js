import { body, param, query } from "express-validator";
import { ResponseTrait } from "../traits/ResponseTrait.js";
import { validationResult } from "express-validator";

export const validateTour = (method) => {
    switch (method){
        case "createTour": {
            return [
              body("title").notEmpty().withMessage("Title is required"),
              body("city").notEmpty().withMessage("City is required"),
              body("address").notEmpty().withMessage("Address is required"),
              body("distance").isNumeric().withMessage("Distance must be a number"),
              body("photo").notEmpty().withMessage("Photo is required"),
              body("desc").notEmpty().withMessage("Description is required"),
              body("price").isNumeric().withMessage("Price must be a number"),
              body("maxGroupSize").isNumeric().withMessage("Max group size must be a number"),
            ];
          }

          case "updateTour": {
            return [
              param("id").isMongoId().withMessage("Invalid tour ID"),
              body("title").optional(),
              body("city").optional(),
              body("address").optional(),
              body("distance").optional().isNumeric().withMessage("Distance must be a number"),
              body("photo").optional(),
              body("desc").optional(),
              body("price").optional().isNumeric().withMessage("Price must be a number"),
              body("maxGroupSize").optional().isNumeric().withMessage("Max group size must be a number"),
            ];
          }

          case "deleteTour":
    case "getSingleTour": {
      return [
        param("id").isMongoId().withMessage("Invalid tour ID"),
      ];
    }

    case "getAllTour": {
      return [
        query("page").optional().isInt({ min: 0 }).withMessage("Page must be a positive integer"),
      ];
    }

    }
}