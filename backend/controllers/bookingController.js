import { BookingService } from "../services/BookingService.js";
import { ResponseTrait } from "../traits/ResponseTrait.js";

// Create new booking
export const createBooking = async (req, res) => {
    // Add user ID from auth token to booking data
  const bookingData = {
    ...req.body,
    userId: req.user.id
  };

  const response = await BookingService.createBooking(bookingData);
  
}