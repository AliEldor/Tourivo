import faker from 'faker';

const ReviewFactory = {
    create: async (tourId, userId, overrides = {}) => {
        const defaultReview = {
            productId: tourId,
            userId: userId,
            username: faker.internet.userName(),
            reviewText: faker.lorem.paragraph(),
            rating: faker.datatype.number({ min: 1, max: 5 })
        }
    }
}