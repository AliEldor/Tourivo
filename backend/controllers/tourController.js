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

    // Update tour
export const updateTour = async (req, res) => {
    const { id } = req.params;
    const response = await TourService.updateTour(id, req.body);
    
    if (!response.success) {
      return ResponseTrait.errorResponse(res, response.error, response.error === "Tour not found" ? 404 : 500);
    }
    
    return ResponseTrait.successResponse(res, response.data);
  };


  // Delete tour
export const deleteTour = async (req, res) => {
    const { id } = req.params;
    const response = await TourService.deleteTour(id);
    
    if (!response.success) {
      return ResponseTrait.errorResponse(res, response.error, response.error === "Tour not found" ? 404 : 500);
    }
    
    return ResponseTrait.successResponse(res, { message: "Successfully deleted" });
  };

  // Get single tour
export const getSingleTour = async (req, res) => {
    const { id } = req.params;
    const response = await TourService.getSingleTour(id);
    
    if (!response.success) {
      return ResponseTrait.errorResponse(res, response.error, response.error === "Tour not found" ? 404 : 500);
    }
    
    return ResponseTrait.successResponse(res, response.data);
  };

