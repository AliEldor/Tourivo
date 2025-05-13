import faker from 'faker';

const ReviewFactory = {
    create: async (tourId, userId, overrides = {}) => {
        const defaultReview = {
            productId: tourId,
            userId: userId,
        }
    }
}