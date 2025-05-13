import faker from "faker";

const TourFactory = {
  create: async (overrides = {}) => {
    const defaultTour = {
      title: `${faker.address.city()} Adventure Tour`,
      city: faker.address.city(),
      address: faker.address.streetAddress(),
      distance: faker.datatype.number({ min: 10, max: 1000 }),
      photo: faker.image.nature(),
      desc: faker.lorem.paragraphs(3),
      price: faker.datatype.number({ min: 50, max: 2000 }),
      maxGroupSize: faker.datatype.number({ min: 1, max: 20 }),
      featured: faker.datatype.boolean(),
      reviews: [],
    };

    return { ...defaultTour, ...overrides };
  },
};

export default TourFactory;
