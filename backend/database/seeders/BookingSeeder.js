import Booking from "../../models/Booking.js";
import { BookingFactory } from "../../factories/index.js";

const BookingSeeder = {
  seed: async (tours, users, bookingsCount = 30) => {
    const bookings = [];

    for (let i = 0; i < bookingsCount; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomTour = tours[Math.floor(Math.random() * tours.length)];

      const bookingData = await BookingFactory.create(
        randomUser._id,
        randomTour.title
      );
      const booking = new Booking(bookingData);
      await booking.save();
      bookings.push(booking);
    }

    console.log(`${bookings.length} bookings seeded`);
    return bookings;
  },

  truncate: async () => {
    await Booking.deleteMany({});
    console.log("Bookings collection cleared");
  },
};

export default BookingSeeder;
