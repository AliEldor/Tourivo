import { body, param } from "express-validator";
import { ResponseTrait } from "../traits/ResponseTrait.js";
import { validationResult } from "express-validator";

export const validateReview = (method) => {
    switch (method) {
        case "createReview": {
            return [
                param("tourId").isMongoId().withMessage("Invalid tour ID"),
                
            ]
        }
    }
}