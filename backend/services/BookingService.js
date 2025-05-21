import Booking from "../models/Booking.js";

export const BookingService = {
  createBooking: async (bookingData) => {
    const newBooking = new Booking(bookingData);
    const savedBooking = await newBooking.save();
    return savedBooking;
  },

  getBooking: async (id) => {
    const booking = await Booking.findById(id);

    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    return booking;
  },

  getAllBookings: async () => {
    const bookings = await Booking.find();

    return {
      count: bookings.length,
      data: bookings,
    };
  },

  getUserBookings: async (userId) => {
    const bookings = await Booking.find({ userId: userId });

    return {
      count: bookings.length,
      data: bookings,
    };
  },
};
