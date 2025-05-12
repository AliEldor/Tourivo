import Booking from "../models/Booking.js";

export const BookingService = {
    createBooking: async (bookingData) => {
        try {
            const newBooking = new Booking(bookingData);
            const savedBooking = await newBooking.save();
            
            return {
              success: true,
              data: savedBooking
            };
          } catch (err) {
            return {
              success: false,
              error: "Failed to create booking"
            };
          }
        },

        

    }
