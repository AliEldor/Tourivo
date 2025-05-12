import { BookingService } from "../services/BookingService.js";
import { ResponseTrait } from "../traits/ResponseTrait.js";

// Create new booking
export const createBooking = async (req, res) => {
  // Add user ID from auth token to booking data
  const bookingData = {
    ...req.body,
    userId: req.user.id,
  };

  const response = await BookingService.createBooking(bookingData);

  if (!response.success) {
    return ResponseTrait.errorResponse(res, response.error, 500);
  }

  return ResponseTrait.successResponse(res, {
    message: "Your tour is booked",
    data: response.data,
  });
};

// Get a single booking
export const getBooking = async (req, res) => {
    const { id } = req.params;
    const response = await BookingService.getBooking(id);

    if (!response.success) {
        return ResponseTrait.errorResponse(
          res, 
          response.error, 
          response.statusCode || 500
        );
      }
      
}
