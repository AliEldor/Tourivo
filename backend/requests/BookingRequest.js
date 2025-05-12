import { body, param } from "express-validator";
import { ResponseTrait } from "../traits/ResponseTrait.js";
import { validationResult } from "express-validator";

export const validateBooking = (method) => {
    switch (method) {
        case "createBooking": {
            return [
                
            ] 
        }
    }
}