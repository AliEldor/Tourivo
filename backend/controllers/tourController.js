import { TourService } from "../services/TourService.js";
import { ResponseTrait } from "../traits/ResponseTrait.js";


// Create new tour
export const createTour = async (req, res) => {
    const response = await TourService.createTour(req.body);

    if (!response.success) {
        return ResponseTrait.errorResponse(res, response.error, 500);
      }
      
      return ResponseTrait.successResponse(res, response.data);
    };

