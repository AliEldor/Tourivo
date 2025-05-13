import faker from 'faker';

const BookingFactory = {
    create: async (userId, tourName, overrides = {}) => {
        const defaultBooking = {
            userId: userId,
            userEmail: faker.internet.email(),
            tourName: tourName,
        }
    }
}

export default BookingFactory;