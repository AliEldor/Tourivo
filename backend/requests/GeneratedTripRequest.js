import { body, param } from "express-validator";
import { ResponseTrait } from "../traits/ResponseTrait.js";
import { validationResult } from "express-validator";

export const validateGeneratedTrip = (method) => {
    switch (method) {
        case "generateTrip": {
            return [

            ];
        }

    }
}