import faker from 'faker';

const TourFactory = {
    create: async (overrides = {}) => {
        const defaultTour = {
            title: `${faker.address.city()} Adventure Tour`,
            city: faker.address.city(),
            address: faker.address.streetAddress(),
            distance: faker.datatype.number({ min: 10, max: 1000 }),
            photo: faker.image.nature(),
        }
    }
}

export default TourFactory;