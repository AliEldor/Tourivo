import { faker } from '@faker-js/faker';

const ReviewFactory = {
  create: async (tourId, userId, overrides = {}) => {
    const defaultReview = {
      productId: tourId,
      userId: userId,
      username: `${faker.person.firstName().toLowerCase()}${faker.number.int(999)}`,
      reviewText: faker.lorem.paragraph(),
      rating: faker.number.int({ min: 1, max: 5 }),
    };

    return { ...defaultReview, ...overrides };
  },
};

export default ReviewFactory;
