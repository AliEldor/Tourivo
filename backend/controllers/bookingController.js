import { BookingService } from "../services/BookingService.js";
import { ResponseTrait } from "../traits/ResponseTrait.js";

export const createBooking = async (req, res) => {
  try {
  
    const bookingData = {
      ...req.body,
      userId: req.user.id,
    };

    const savedBooking = await BookingService.createBooking(bookingData);

    return ResponseTrait.successResponse(res, {
      message: "Your tour is booked",
      data: savedBooking,
    });
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to create booking",
      500
    );
  }
};



