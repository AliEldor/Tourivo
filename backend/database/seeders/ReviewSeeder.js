import Tour from '../../models/Tour.js';
import Review from '../../models/Review.js';
import { ReviewFactory } from '../../factories/index.js';

const ReviewSeeder = {
    seed: async (tours, users, reviewsPerTour = 3) => {
        const reviews = [];

        for (const tour of tours) {
            // Pick random users to create reviews
      const selectedUsers = users.sort(() => 0.5 - Math.random()).slice(0, reviewsPerTour);
      
      for (const user of selectedUsers) {
        const reviewData = await ReviewFactory.create(tour._id, user._id, {
            username: user.username
          });
      }

        }
    }
}