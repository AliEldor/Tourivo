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


export const getBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await BookingService.getBooking(id);

    if (booking.userId !== req.user.id && req.user.role !== "admin") {
      return ResponseTrait.errorResponse(
        res,
        "You can only access your own bookings",
        403
      );
    }

    return ResponseTrait.successResponse(res, booking);
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to find booking",
      error.statusCode || 500
    );
  }
};


