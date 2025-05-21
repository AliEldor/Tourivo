import Booking from "../models/Booking.js";

export const BookingService = {
  createBooking: async (bookingData) => {
    const newBooking = new Booking(bookingData);
    const savedBooking = await newBooking.save();
    return savedBooking;
  },

  
};
