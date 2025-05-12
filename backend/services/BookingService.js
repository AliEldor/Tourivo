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

        getBooking: async (id) => {
            try {
              const booking = await Booking.findById(id);
              
              if (!booking) {
                return {
                  success: false,
                  error: "Booking not found",
                  statusCode: 404
                };
              }

              return {
                success: true,
                data: booking
              };
            } catch (err) {
              return {
                success: false,
                error: "Failed to find booking"
              };
            }
          },

    }
