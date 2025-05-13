import { faker } from '@faker-js/faker';

const BookingFactory = {
  create: async (userId, tourName, overrides = {}) => {

    const phoneString = faker.string.numeric(10); // Generate a string of 10 digits
    const phone = parseInt(phoneString); // Convert to number

    const defaultBooking = {
      userId: userId,
      userEmail: faker.internet.email(),
      tourName: tourName,
      fullName: faker.person.fullName(),
      guestSize: faker.number.int({ min: 1, max: 8 }),
      phone: phone,
      bookAt: faker.date.future(),
    };

    return { ...defaultBooking, ...overrides };
  },
};

export default BookingFactory;
