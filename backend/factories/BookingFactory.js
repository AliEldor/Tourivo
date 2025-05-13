import faker from 'faker';

const BookingFactory = {
    create: async (userId, tourName, overrides = {}) => {
        const defaultBooking = {
            userId: userId,
            userEmail: faker.internet.email(),
            tourName: tourName,
            fullName: faker.name.findName(),
            guestSize: faker.datatype.number({ min: 1, max: 8 }),
        }
    }
}

export default BookingFactory;