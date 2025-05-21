import { faker } from '@faker-js/faker';

const TourFactory = {
  create: async (overrides = {}) => {
    const defaultTour = {
      title: `${faker.location.city()} Adventure Tour`,
      city: faker.location.city(),
      address: faker.location.streetAddress(),
      distance: faker.number.int({ min: 10, max: 1000 }),
      photo: `https://source.unsplash.com/random/800x600/?travel,${faker.location.city().toLowerCase()}`,
      desc: faker.lorem.paragraphs(3),
      price: faker.number.int({ min: 50, max: 2000 }),
      maxGroupSize: faker.number.int({ min: 1, max: 20 }),
      featured: faker.datatype.boolean(),
      reviews: [],
    };

    return { ...defaultTour, ...overrides };
  },
};

export default TourFactory;
