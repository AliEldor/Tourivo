import faker from 'faker';

const TourFactory = {
    create: async (overrides = {}) => {
        const defaultTour = {
            title: `${faker.address.city()} Adventure Tour`,
            city: faker.address.city(),
            address: faker.address.streetAddress(),
        }
    }
}

export default TourFactory;